import React from 'react'
import {auth} from '../firebase-config.js'
import { signOut} from 'firebase/auth'


function SignedOut() {

     const signOutWithGoogle = () => {
          signOut(auth)
            .then(() => { 
              console.log('successful');
            })
            .catch((err) => {
              console.log(err);
            });
        };

  return (
    <div><button onClick={signOutWithGoogle}>SIGN OUT RIGHT NOW</button></div>
  )
}

export default SignedOut