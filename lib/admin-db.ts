import { FieldPath, FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";

export async function adminAdd<T extends object>(collection: string, data: T) {
  const ref = adminDb.collection(collection).doc();
  await ref.set({ ...data, createdAt: data["createdAt" as keyof T] ?? FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return ref.id;
}
export async function adminGet<T>(collection: string, id: string) {
  const snap = await adminDb.collection(collection).doc(id).get();
  return snap.exists ? ({ id: snap.id, ...snap.data() } as T & { id: string }) : null;
}
export async function adminList<T>(collection: string) {
  const snap = await adminDb.collection(collection).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as unknown as T[];
}
export async function adminUpdate<T extends object>(collection: string, id: string, data: Partial<T>) {
  await adminDb.collection(collection).doc(id).set({ ...data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
}
export async function adminDelete(collection: string, id: string) { await adminDb.collection(collection).doc(id).delete(); }
export async function adminFind<T>(collection: string, field: string, value: unknown) {
  const snap = await adminDb.collection(collection).where(field, "==", value).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as unknown as T[];
}
export function serializeAdmin<T>(value: T): T { return JSON.parse(JSON.stringify(value, (_, v) => v instanceof Timestamp ? v.toDate().toISOString() : v)); }
export { FieldPath, FieldValue, Timestamp };
