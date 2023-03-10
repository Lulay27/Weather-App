import React from 'react';
import styles from './componentStyles.module.css';

function SearchBar(props) {
  return (
    <div>
      <form
        onSubmit={
          props.input !== '' ? props.handleSubmit : props.handleInvalidInput
        }
      >
        <div className={styles.inputContainer}>
          <input
            className={styles.formInput}
            onChange={(e) => props.setInput(e.target.value)}
            type="text"
            placeholder="Enter a City"
            value={props.input}
          ></input>
          <div className={styles.errorMsg}>{props.errorMsg}</div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
