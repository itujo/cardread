/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import Head from 'next/head';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../services/api';
// import { ILetter } from '../@types/Letter';
// import { ILetter } from '../@types/Letter';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>();
  const router = useRouter();

  const token = Cookie.get('TOKEN_STORAGE_KEY');

  const authStr = 'Bearer '.concat(token);

  useEffect(() => {
    api
      .get('/letters/showAll', { headers: { Authorization: authStr } })
      .then((response) => {
        console.log(response.data);

        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    Cookie.remove('TOKEN_STORAGE_KEY');
    router.push('/');
  };

  if (!token) return <div>Please, login</div>;
  if (!data) return <div>Loading</div>;
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <>
        <h1>Dashboard</h1>
        {/* {console.log(data)}

        {data.letters.map((letter: ILetter) => {
          return (
            <tr key={letter._id}>
              <td>{letter.code}</td>
              <td>{letter.readBy.username}</td>
              <td>{letter.readAt}</td>
            </tr>
          );
        })} */}

        {/* <button type='button' onClick={}>
          admin
        </button> */}
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      </>
    </>
  );
};

export default Dashboard;
