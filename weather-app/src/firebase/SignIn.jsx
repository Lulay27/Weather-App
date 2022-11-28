import React from 'react'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../firebase-config.js'

function SignIn() {



     const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <div><button onClick={signInWithGoogle}>sign in please</button></div>
  )
}

export default SignIn