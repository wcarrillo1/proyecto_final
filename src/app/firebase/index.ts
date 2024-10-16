import {FirebaseOptions, initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {environment} from 'environments/environment';

const firebaseConfig: FirebaseOptions = environment.FIREBASE_CONFIG || {
    apiKey: "AIzaSyA7KSiybZV7dQtBrH56gc785eNkGNLKt7o",
  authDomain: "loginangular-b78d4.firebaseapp.com",
  projectId: "loginangular-b78d4",
  storageBucket: "loginangular-b78d4.appspot.com",
  messagingSenderId: "944841411897",
  appId: "1:944841411897:web:bbe835400a21278fca2ce8"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);

if (environment.NODE_ENV !== 'production') {
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
}
