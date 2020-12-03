import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import api from '../services/api';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await api
      .post('/user/login', {
        username,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        Cookie.set('TOKEN_STORAGE_KEY', token, { expires: 1 });
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <p>Login</p>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>
          <input
            name='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor='password'>
          <input
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Home;
