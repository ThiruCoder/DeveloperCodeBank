import {
  confirmPasswordReset,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./fireBaseConfig";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordChange = (password) =>{
//     return updatePassword(auth.currentUser, password)
// }

export const doPasswordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const confirmPassword = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;
  return await confirmPasswordReset(auth, oobCode, newPassword);
};

// export const doSendEmailVerification = () =>{
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`
//     })
// }
