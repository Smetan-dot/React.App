import '@/styles/globals.css';
import '../styles/Pagination.css';
import '../styles/Results.css';
import '../styles/Search.css';
import '../styles/Loader.css';
import '../styles/Details.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
