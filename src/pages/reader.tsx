/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import Head from 'next/head';
import Cookie from 'js-cookie';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../services/api';
import Container, { Input } from '../styles/pages/reader';
import Header from '../components/Header';

const Reader: React.FC = () => {
  const [code, setCode] = useState<string>('');
  let decoded;

  const token = Cookie.get('TOKEN_STORAGE_KEY');
  if (token) {
    decoded = jwtDecode(token);
  } else {
    decoded = null;
  }

  const authStr = 'Bearer '.concat(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api
      .post(
        '/letters/insert',
        { code },
        {
          headers: { Authorization: authStr },
        }
      )
      .then((response) => {
        setCode('');
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.errors.code.kind === 'unique') {
            alert('Código já lido');
            setCode('');
          }
          if (error.response.data.errors.code.kind === 'regexp') {
            alert('Código inválido');
            setCode('');
          }
        } else {
          console.error(error);
        }
      });
  };

  if (!token) return <Container>Please, login</Container>;
  return (
    <>
      <Header pageName='Leitura' name={decoded.user} />
      <Head>
        <title>Leitura</title>
      </Head>
      <Container>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Código de barras'
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </form>
      </Container>
    </>
  );
};

export default Reader;
