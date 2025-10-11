// src/lib/firebase/service.ts
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

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

export async function register( 
  data: { fullname: string; email: string; password: string, role?: string }
  ) {
  const q = query(collection(firestore, "users"), where ("email", "==", data.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (users.length > 0) {
    return { status: false, statusCode: 400, message: "Email already registered" };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await addDoc(collection(firestore, "users"), data)
      return { status: true, statusCode: 200, message: "Registration successful" }
    } catch (error) {
      return { status: false, statusCode: 400, message: "Registration failed" }
    }
  }
}

export async function Login(data: { email: string; password: string }) {
  const q = query(collection(firestore, "users"), where ("email", "==", data.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (users.length > 0) {
    const passwordMatch = await bcrypt.compare(data.password, users[0].password);
    if (passwordMatch) {
      return { status: true, statusCode: 200, message: "Login successful", data: users[0] };
    } else {
      return { status: false, statusCode: 400, message: "Invalid password" };
    }
  } else {
    return { status: false, statusCode: 400, message: "User not found" };
  }
}

export async function loginWithGoogle(data: any, callback: any) {
  const q = query(collection(firestore, "users"), where ("email", "==", data.email));
  const snapshot = await getDocs(q);
  const users: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (users.length > 0) {
    data.role = users[0].role;
    await updateDoc(doc(firestore, "users", users[0].id), data).then(() => {
      callback({status: true, data: data});
    });
  } else {
    data.role = "member";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({status: true, data: data});
    });
  }
}