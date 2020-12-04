/* eslint-disable react/prop-types */
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { FiLogIn } from 'react-icons/fi';
import { Button, Container, TextField } from '@material-ui/core';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import api from '../services/api';
import { muiTheme } from '../styles/theme';

const Home: React.FC = (props) => {
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
        console.error(error);
        if (error.response) {
          console.error(error.response.data);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth='md'>
        <ThemeProvider theme={muiTheme}>
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <TextField
              color='primary'
              id='username'
              placeholder='Usuário'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant='outlined'
              InputProps={{
                style: {
                  background: 'white',
                },
              }}
            />

            <TextField
              color='primary'
              id='password'
              placeholder='Senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
              InputProps={{
                style: {
                  background: 'white',
                },
              }}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              startIcon={<FiLogIn />}
            >
              Login
            </Button>
          </form>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default Home;
