import '@/styles/globals.css';
import '../styles/Pagination.css';
import '../styles/Results.css';
import '../styles/Search.css';
import '../styles/Loader.css';
import '../styles/Details.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useProgress } from '../components/progress/Progress';
import Loader from '@/components/Loader/Loader';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const { isPageLoading } = useProgress();
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/chewbacca_icon-icons.com_76942.svg" />
        <title>Star Wars Planets</title>
      </Head>
      {isPageLoading ? (
        <Loader />
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </>
  );
}
