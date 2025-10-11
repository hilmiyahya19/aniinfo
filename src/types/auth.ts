// ✅ Struktur data user di Firestore dan di session NextAuth
export interface FirebaseUser {
  id: string;          // ID dokumen user di Firestore
  email: string;       // Email user
  fullname: string;    // Nama lengkap user
  password?: string; // optional karena Google login bisa tanpa password
  role: string;        // Role user (misalnya: 'admin', 'member', 'superadmin')
}

// ✅ Hasil dari fungsi Login() biasa
export interface LoginResult {
  status: boolean;
  statusCode: number;
  message: string;
  data?: FirebaseUser;
}

// ✅ Hasil dari fungsi loginWithGoogle()
export interface GoogleLoginResult {
  status: boolean;
  data?: FirebaseUser;
  message?: string;
}

// ✅ Tipe user untuk NextAuth (di session dan JWT)
export interface AuthUser {
  id: string;
  email: string;
  fullname: string;
  role: string;
}
