<?php
/**
 * Cloudways PHP-to-Node.js Reverse Proxy for ForkSavvy (Port 3001)
 */
$port = 3001;
$targetUrl = "http://127.0.0.1:" . $port . $_SERVER['REQUEST_URI'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);

// Forward request method and payload
$method = $_SERVER['REQUEST_METHOD'];
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
    $input = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
}

// Forward headers
$headers = [];
foreach (getallheaders() as $name => $value) {
    $lower = strtolower($name);
    if ($lower !== 'host' && $lower !== 'content-length') {
        $headers[] = "$name: $value";
    }
}
$headers[] = "X-Forwarded-For: " . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']);
$headers[] = "X-Forwarded-Proto: " . ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? 'https');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

if ($response === false) {
    http_response_code(502);
    header('Content-Type: text/html');
    echo "<h1>502 Bad Gateway</h1><p>Next.js server is starting on port {$port}. Please refresh in a moment.</p>";
    curl_close($ch);
    exit;
}

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$header_text = substr($response, 0, $header_size);
$body = substr($response, $header_size);

http_response_code($http_code);

// Forward response headers
foreach (explode("\r\n", $header_text) as $header) {
    $lower = strtolower($header);
    if (!empty($header) && 
        strpos($lower, 'transfer-encoding:') !== 0 && 
        strpos($lower, 'connection:') !== 0 && 
        strpos($lower, 'http/') !== 0) {
        header($header, false);
    }
}

echo $body;
