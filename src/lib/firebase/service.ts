// src/lib/firebase/service.ts
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs
    .filter((doc) => doc.id === id)
    .map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}