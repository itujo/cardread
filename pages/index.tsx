import Head from 'next/head';
import Container from '../styles/pages/Home';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>HomePage</title>
      </Head>
      <h1>test h1</h1>
      <p>Test123</p>
    </Container>
  );
};

export default HomePage;
