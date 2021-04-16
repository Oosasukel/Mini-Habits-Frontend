import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import Head from '../components/Head';

import '../styles/globals.css';
import { theme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head title="Mini Hábitos" />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;