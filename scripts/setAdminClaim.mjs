import "dotenv/config";
import fs from "fs";
import path from "path";
import admin from "firebase-admin";

// Load .env.local manually if present (works on Windows too)
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  // dotenv/config already loads .env, but not .env.local reliably in node
  // so we explicitly load it:
  const dotenv = await import("dotenv");
  dotenv.config({ path: envLocalPath });
}

function getPrivateKey() {
  const key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!key) throw new Error("Missing FIREBASE_ADMIN_PRIVATE_KEY");
  return key.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: getPrivateKey(),
    }),
  });
}

const email = "inbox2hammad@gmail.com";

const user = await admin.auth().getUserByEmail(email);
await admin.auth().setCustomUserClaims(user.uid, { admin: true });

console.log("✅ Admin claim set for:", email, "uid:", user.uid);
process.exit(0);
