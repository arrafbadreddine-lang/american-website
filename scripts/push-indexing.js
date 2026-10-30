const fs = require("fs");
const crypto = require("crypto");
const https = require("https");

const CREDS_PATH = process.env.GSC_CREDENTIALS || "/Users/baderarraf/Downloads/gsc_credentials.json";
const creds = JSON.parse(fs.readFileSync(CREDS_PATH, "utf8"));

function getAccessToken(scopes) {
  return new Promise((resolve, reject) => {
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
    const now = Math.floor(Date.now() / 1000);
    const claim = Buffer.from(
      JSON.stringify({
        iss: creds.client_email,
        scope: scopes.join(" "),
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      })
    ).toString("base64url");
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(`${header}.${claim}`);
    const signature = sign.sign(creds.private_key, "base64url");
    const jwt = `${header}.${claim}.${signature}`;
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

    const req = https.request(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => resolve(JSON.parse(body).access_token));
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

function apiRequest(url, method = "GET", token = null, payload = null) {
  return new Promise((resolve, reject) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    const req = https.request(url, { method, headers }, (res) => {
      let body = "";
      res.on("data", (d) => (body += d));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: body ? JSON.parse(body) : null });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on("error", reject);
    if (payload) req.write(JSON.stringify(payload));
    req.end();
  });
}

(async () => {
  const token = await getAccessToken([
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/indexing",
  ]);

  const liveSitemap = await new Promise((resolve) => {
    https.get("https://forksavvyrecipes.com/sitemap.xml", (res) => {
      let b = "";
      res.on("data", (d) => (b += d));
      res.on("end", () => resolve(b));
    });
  });
  const urls = [...liveSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`Found ${urls.length} URLs in live sitemap.xml`);

  // Submit to IndexNow (Bing, Yandex, DuckDuckGo, Yahoo)
  const indexNowRes = await apiRequest("https://api.indexnow.org/indexnow", "POST", null, {
    host: "forksavvyrecipes.com",
    key: "forksavvyindexnow2026key",
    keyLocation: "https://forksavvyrecipes.com/forksavvyindexnow2026key.txt",
    urlList: urls,
  });
  console.log("IndexNow response status:", indexNowRes.status);

  // Re-submit sitemaps to GSC
  await apiRequest(
    "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aforksavvyrecipes.com/sitemaps/https%3A%2F%2Fforksavvyrecipes.com%2Fsitemap.xml",
    "PUT",
    token
  );
  await apiRequest(
    "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aforksavvyrecipes.com/sitemaps/https%3A%2F%2Fforksavvyrecipes.com%2Ffeed.xml",
    "PUT",
    token
  );
  console.log("GSC sitemaps (sitemap.xml & feed.xml) re-submitted!");
})();
