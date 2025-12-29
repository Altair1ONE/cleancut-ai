// lib/firebaseAdmin.ts
import admin from "firebase-admin";

function required(name: string, v?: string) {
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getPrivateKey() {
  const key = required("FIREBASE_ADMIN_PRIVATE_KEY", process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  return key.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  const projectId = required("FIREBASE_ADMIN_PROJECT_ID", process.env.FIREBASE_ADMIN_PROJECT_ID);
  const clientEmail = required("FIREBASE_ADMIN_CLIENT_EMAIL", process.env.FIREBASE_ADMIN_CLIENT_EMAIL);

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: getPrivateKey(),
    }),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminFieldValue = admin.firestore.FieldValue;
