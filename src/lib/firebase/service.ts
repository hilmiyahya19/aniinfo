// src/lib/firebase/service.ts
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";
import { FirebaseUser } from "@/types/auth";
// import { firestore } from "@/lib/firebase/init";
// import { auth } from "@/lib/firebase/init";

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
    } catch {
      return { status: false, statusCode: 400, message: "Registration failed" }
    }
  }
}

export async function Login(data: { email: string; password: string }) {
  const q = query(collection(firestore, "users"), where ("email", "==", data.email));
  const snapshot = await getDocs(q);
  // beri tahu TS bahwa hasilnya adalah FirebaseUser[]
  const users = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as FirebaseUser)
  );

  // if (users.length > 0) {
  //   const passwordMatch = await bcrypt.compare(data.password, users.password);
  //   if (passwordMatch) {
  //     return { status: true, statusCode: 200, message: "Login successful", data: users[0] };
  //   } else {
  //     return { status: false, statusCode: 400, message: "Invalid password" };
  //   }
  // } else {
  //   return { status: false, statusCode: 400, message: "User not found" };
  // }

  if (users.length > 0) {
    const user = users[0];

    // cek dulu apakah field password ada
    if (!user.password) {
      return { status: false, statusCode: 400, message: "Password not set for this account" };
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
      return { status: true, statusCode: 200, message: "Login successful", data: user };
    } else {
      return { status: false, statusCode: 400, message: "Invalid password" };
    }
  } else {
    return { status: false, statusCode: 400, message: "User not found" };
  }
}

// export async function loginWithGoogle(data: any, callback: any) {
//   const q = query(collection(firestore, "users"), where ("email", "==", data.email));
//   const snapshot = await getDocs(q);
//   const users: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//   if (users.length > 0) {
//     data.role = users[0].role;
//     await updateDoc(doc(firestore, "users", users[0].id), data).then(() => {
//       callback({status: true, data: data});
//     });
//   } else {
//     data.role = "member";
//     await addDoc(collection(firestore, "users"), data).then(() => {
//       callback({status: true, data: data});
//     });
//   }
// }

interface GoogleLoginData {
  fullname: string;
  email: string;
  type: "google";
}

interface GoogleLoginResult {
  status: boolean;
  data?: FirebaseUser;
  message?: string;
}

/**
 * Fungsi loginWithGoogle()
 * Jika user sudah ada → update nama & data
 * Jika belum ada → buat user baru dengan role "member"
 */

export async function loginWithGoogle(
  data: GoogleLoginData,
  callback: (result: GoogleLoginResult) => void
): Promise<void> {
  try {
    const q = query(collection(firestore, "users"), where("email", "==", data.email));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirebaseUser[];

    // Jika user sudah ada
    if (users.length > 0) {
      const user = users[0];
      const updatedUser: FirebaseUser = {
        id: user.id,
        email: data.email,
        fullname: data.fullname,
        role: user.role, // ambil role lama
      };

      // ❌ Jangan kirim seluruh objek typed — gunakan Partial
      await updateDoc(doc(firestore, "users", user.id), {
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        role: updatedUser.role,
      });

      callback({
        status: true,
        data: updatedUser,
      });
    }
    // Jika user baru (belum ada di Firestore)
    else {
      const newUser: FirebaseUser = {
        id: "", // akan diganti setelah addDoc
        email: data.email,
        fullname: data.fullname,
        role: "member",
      };

      const docRef = await addDoc(collection(firestore, "users"), newUser);
      newUser.id = docRef.id;

      callback({
        status: true,
        data: newUser,
      });
    }
  } catch (error: unknown) {
    // ✅ Hindari any — gunakan unknown lalu cek tipe
    let message = "Gagal login dengan Google";
    if (error instanceof Error) message = error.message;

    console.error("Error in loginWithGoogle:", message);
    callback({
      status: false,
      message,
    });
  }
}