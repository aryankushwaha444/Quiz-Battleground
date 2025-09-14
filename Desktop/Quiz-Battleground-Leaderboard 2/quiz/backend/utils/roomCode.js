import crypto from "crypto";

// Encodes a Buffer into base32 (RFC 4648) without padding for short codes
function toBase32(buffer) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  let output = "";
  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  return output;
}

function base32ToUpperNoAmbiguity(input) {
  return input.replace(/[^A-Z2-7]/gi, "").toUpperCase();
}

export function generateRoomCode({ baseLength = 8, checksumLength = 6 } = {}) {
  const secret = process.env.ROOM_CODE_SECRET;
  if (!secret) {
    throw new Error("ROOM_CODE_SECRET env var is required");
  }

  const randomBase = toBase32(crypto.randomBytes(5)).slice(0, baseLength);
  const hmac = crypto.createHmac("sha256", secret).update(randomBase).digest();
  const checksum = toBase32(hmac).slice(0, checksumLength);
  return `${randomBase}-${checksum}`;
}

export function verifyRoomCode(code, { checksumLength = 6 } = {}) {
  const secret = process.env.ROOM_CODE_SECRET;
  if (!secret) {
    return false;
  }
  if (typeof code !== "string") return false;
  const cleaned = code.trim().toUpperCase();
  const parts = cleaned.split("-");
  if (parts.length !== 2) return false;
  const base = base32ToUpperNoAmbiguity(parts[0]);
  const provided = base32ToUpperNoAmbiguity(parts[1]);
  if (!base || !provided || provided.length < checksumLength) return false;

  const hmac = crypto.createHmac("sha256", secret).update(base).digest();
  const expected = toBase32(hmac).slice(0, checksumLength).toUpperCase();

  // constant-time comparison for equal lengths
  if (expected.length !== provided.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return diff === 0;
}
