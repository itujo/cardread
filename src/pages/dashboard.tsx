/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import Head from 'next/head';
import Cookie from 'js-cookie';
import { useState } from 'react';
import download from 'downloadjs';
import jwtDecode from 'jwt-decode';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import api from '../services/api';
import Container from '../styles/pages/dashboard';

const Dashboard: React.FC = () => {
  // const [data, setData] = useState();
  const [date, setDate] = useState('');

  let token;
  let isAdmin: boolean;
  let authStr: string;
  try {
    token = Cookie.get('TOKEN_STORAGE_KEY');
    const decoded = jwtDecode(token);
    isAdmin = decoded.isAdmin;
    authStr = 'Bearer '.concat(token);
  } catch (error) {
    token = null;
    isAdmin = null;
    console.error(error);
  }

  const auxdate = new Date();

  const dia = auxdate.getDate().toString();
  const diaF = dia.length === 1 ? `0${dia}` : dia;
  const mes = (auxdate.getMonth() + 1).toString();
  const mesF = mes.length === 1 ? `0${mes}` : mes;
  const anoF = auxdate.getFullYear();
  const dataF = `${diaF}-${mesF}-${anoF}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api
      .get(`/letters/download/${date}`, {
        headers: { Authorization: authStr },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'text/plain' });
        download(blob, `${dataF}.txt`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let decoded;

  if (token) {
    decoded = jwtDecode(token);
  } else {
    decoded = null;
  }

  if (!token) return <div>Please, login</div>;
  if (!isAdmin) return <div>admin only page</div>;
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header pageName='Dashboard' name={decoded.user} />
      <Container>
        <input
          type='date'
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <>&nbsp;</>
        <Button variant='warning' type='submit' onClick={handleSubmit}>
          Baixar
        </Button>
      </Container>
    </>
  );
};

export default Dashboard;
