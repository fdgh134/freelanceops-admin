import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCtO8Dy7u5-rghDIo8VDpAJ87rqnalKCWE",
  authDomain: "freelanceops-admin.firebaseapp.com",
  projectId: "freelanceops-admin",
  storageBucket: "freelanceops-admin.firebasestorage.app",
  messagingSenderId: "491016542044",
  appId: "1:491016542044:web:29e1fef1736f6686161399"
};

// Firebase 초기화
export const app = initializeApp(firebaseConfig);
