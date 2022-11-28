import {React,useState} from 'react'

import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../firebase-config.js'

function SignIn() {

const [firstName, setfirstName] = useState('')
const [profilePic, setprofilePic] = useState('')

     const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
            setfirstName(result._tokenResponse.firstName)
            setprofilePic(result._tokenResponse.photoUrl)
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <div>
      <button onClick={signInWithGoogle}>sign in please</button>
      <h1>Welcome {firstName} </h1>
      <img src={profilePic} alt='account pic'></img>
    </div>
  )
}

export default SignIn