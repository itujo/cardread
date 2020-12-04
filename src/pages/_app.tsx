/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
// import { CssBaseline } from '@material-ui/core';
import { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import 'fontsource-roboto';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
      {/* <CssBaseline /> */}
    </ThemeProvider>
  );
};

export default MyApp;
