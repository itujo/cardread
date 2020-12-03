import Head from 'next/head';
import Link from 'next/link';
import Container from '../styles/pages/Home';

const About: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>About</title>
      </Head>
      <h1>About</h1>
      <p>Sobre o site</p>
      <Link href='/'>
        <a>Voltar para home</a>
      </Link>
    </Container>
  );
};

export default About;
