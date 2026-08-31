import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLdSchema({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
