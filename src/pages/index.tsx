/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { FiLogIn } from 'react-icons/fi';
import { Button } from 'react-bootstrap';
import api from '../services/api';
import Container, { Input, Logo } from '../styles/pages';

const Home: React.FC = () => {
  const [textUser, setTextUser] = useState('');
  const [textPass, setTextPass] = useState('');

  const userField = useRef(null);
  const passField = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (userField.current) {
        setTextUser(userField.current.value);
        setTextPass(passField.current.value);
        clearInterval(interval);
      }
    }, 100);
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    await api
      .post('/user/login', {
        username: textUser,
        password: textPass,
      })
      .then((response) => {
        const { token } = response.data;
        const { isAdmin } = jwtDecode(token);

        if (isAdmin) {
          Cookie.set('TOKEN_STORAGE_KEY', token, { expires: 1 });
          router.push('/dashboard');
        } else {
          Cookie.set('TOKEN_STORAGE_KEY', token, { expires: 1 });
          router.push('/reader');
        }
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
      <form onSubmit={handleLogin}>
        <Container>
          <Logo src='/logo.png' alt='' />
          <Input
            ref={userField}
            type='text'
            placeholder='Usuário'
            autoFocus
            value={textUser}
            onChange={(e) => setTextUser(e.target.value)}
          />

          <Input
            ref={passField}
            type='password'
            placeholder='Senha'
            onChange={(e) => setTextPass(e.target.value)}
          />
          <>&nbsp;</>
          <Button type='submit' variant='warning'>
            <FiLogIn />
            &nbsp;ENTRAR
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default Home;
