import { createHash } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";

export async function checkRateLimit(key: string, limit: number, windowMs: number) {
  const bucket = Math.floor(Date.now() / windowMs);
  const id = createHash("sha256").update(`${key}:${bucket}`).digest("hex");
  const ref = adminDb.collection("rate_limits").doc(id);
  const result = await adminDb.runTransaction(async tx => {
    const snap = await tx.get(ref);
    const count = Number(snap.data()?.count ?? 0);
    if (count >= limit) return { allowed: false, remaining: 0 };
    tx.set(ref, { count: FieldValue.increment(1), createdAt: FieldValue.serverTimestamp() }, { merge: true });
    return { allowed: true, remaining: limit - count - 1 };
  });
  return result;
}
