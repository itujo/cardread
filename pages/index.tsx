import Head from 'next/head';
import Link from 'next/link';
import Container from '../styles/pages/Home';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>HomePage</title>
      </Head>
      <h1>test h1</h1>
      <p>Test123</p>
      <Link href='/about'>
        <a>Ir para sobre</a>
      </Link>
    </Container>
  );
};

export default HomePage;
