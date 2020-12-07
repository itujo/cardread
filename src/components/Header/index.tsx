/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Navbar from 'react-bootstrap/Navbar';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Header: React.FC = (props) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('TOKEN_STORAGE_KEY');
    router.push('/');
  };
  return (
    <Navbar bg='dark' variant='dark'>
      <div className='brand'>
        <Navbar.Brand href='#' onClick={handleLogout}>
          <img alt='' src='/logo.png' height='30' id='logo' />
        </Navbar.Brand>
      </div>

      <Navbar.Collapse className='text' id='text'>
        <Navbar.Text
          style={{
            display: 'flex',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {props.pageName}
        </Navbar.Text>

        <Navbar.Text
          style={{ display: 'flex', position: 'absolute', right: '1%' }}
        >
          Logado como:{' '}
          <a href='/' onClick={handleLogout}>
            &nbsp;{props.name}
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
