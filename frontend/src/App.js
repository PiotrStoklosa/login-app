import React, { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegister = async () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
      role: "ADMIN"
    };
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      alert("Register successful");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    const data = { email, password };
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const json = await response.json();
        setToken(json.access_token);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Wrong login or password");
    }
  };

  const handleGetResource = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/admin', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert(await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Not permitted");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setToken('');
  };

  return (
    <div>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" value={firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>Register</button>
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleGetResource}>Get Resource</button>
        {loggedIn && <button type="button" onClick={handleLogout}>Logout</button>}
      </form>
    </div>
  );
}

export default App;
