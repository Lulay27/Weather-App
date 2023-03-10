import React from 'react';
import styles from './componentStyles.module.css';

function TitleData(props) {
  return (
    <div>
      <h1>Weather Application</h1>
      <h1>{props.time}</h1>
      <h1>{props.isLoggedIn ? `Welcome ${props.email}` : ''}</h1>
      <button className={styles.authBtn} onClick={props.signInWithGoogle}>
        Sign in with Google
      </button>
      <button className={styles.authBtn} onClick={props.signOutWithGoogle}>
        Sign out
      </button>
    </div>
  );
}

export default TitleData;
