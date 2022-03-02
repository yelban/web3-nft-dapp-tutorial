import React from 'react';

function Login({ login }) {
  const [username, setUsername] = React.useState('');

  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     setUser(username);
  //   }

  return (
    <div className="m-5">
      <h2>Login TAB</h2>
      <button type="button" className="btn btn-warning" onClick={login}>
        login
      </button>
      {/* <form onSubmit={handleSubmit}>
        <input onChange={(event) => setUsername(event.target.value)} placeholder="Input username" />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}

export default Login;
