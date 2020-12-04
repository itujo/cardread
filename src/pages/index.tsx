/* eslint-disable react/prop-types */
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { FiLogIn } from 'react-icons/fi';
import api from '../services/api';
import Container, { Button, Input, Logo } from '../styles/pages';

const Home: React.FC = () => {
  const [textUser, setTextUser] = useState('');
  const [textPass, setTextPass] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    // e.preventDefault();
    console.log(textUser, textPass);
    await api
      .post('/user/login', {
        username: textUser,
        password: textPass,
      })
      .then((response) => {
        const { token } = response.data;
        Cookie.set('TOKEN_STORAGE_KEY', token, { expires: 1 });
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.data);
        }
      });
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <Logo src='/logo.png' alt='' />
      <Input
        type='text'
        placeholder='Usuário'
        autoFocus
        onChange={(e) => setTextUser(e.target.value)}
      />

      <Input
        type='password'
        placeholder='Senha'
        autoFocus
        onChange={(e) => setTextPass(e.target.value)}
      />
      <Button onClick={handleLogin}>
        <FiLogIn />
        &nbsp;ENTRAR
      </Button>
    </Container>
  );
};

export default Home;
