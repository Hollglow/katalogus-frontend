import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_gnVJxSBAE-BMqJsMcUMgF0N8l6BMIrw",
  authDomain: "szakdoga-a8fb9.firebaseapp.com",
  projectId: "szakdoga-a8fb9",
  storageBucket: "szakdoga-a8fb9.appspot.com",
  messagingSenderId: "156338303940",
  appId: "1:156338303940:web:45715b7107f8c7720caa91",
  measurementId: "G-VGWFHD0HEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
