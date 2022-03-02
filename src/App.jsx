// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { child, get, getDatabase, onDisconnect, onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';

import Home from './components/Home';
import Install from './components/Install';
import Login from './components/Login';

const firebaseConfig = {
  apiKey: 'AIzaSyC8PP8yFgQ6_UJEGiQ1s2h_Ckwk4Lxqpbo',
  authDomain: 'peerjsvr.firebaseapp.com',
  // databaseURL: 'https://peerjsvr-default-rtdb.firebaseio.com',
  projectId: 'peerjsvr',
  storageBucket: 'peerjsvr.appspot.com',
  messagingSenderId: '294400829474',
  appId: '1:294400829474:web:b49fa93b0e306fda45c27b',
  measurementId: 'G-LPDMJHWH4Q',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log('firebaseApp', firebaseApp);

// Initialize services
const auth = getAuth();
const provider = new GoogleAuthProvider();
// const db = getDatabase();

function App() {
  const [user, setUser] = useState('');

  function login(event) {
    console.log('evnet', event);

    // // 開啟等待登入狀態
    // window.sessionStorage.setItem('pending', 1);

    // 啟動外部轉址登入
    signInWithRedirect(auth, provider);
  }

  useEffect(
    () =>
      // document.title = user ? `${user}'s Feed` : 'Please login';

      onAuthStateChanged(auth, (currentUser) => {
        console.log('onAuthStateChanged(), currentUser', currentUser);
        // console.info('連線未必建立');

        if (!currentUser) {
          // 使用者登出
          console.log('User is logout');

          setUser('');
        } else {
          // 使用者登入
          console.log('User is login');

          setUser(currentUser.displayName);
        }
      }),
    []
  );

  if (!user) {
    return <Login login={login} />;
  }

  if (window.ethereum) {
    return <Home user={user} setUser={setUser} signOut={signOut} auth={auth} />;
  }
  return <Install />;
}

export default App;
