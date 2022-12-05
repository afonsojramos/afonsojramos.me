import { Analytics } from '@vercel/analytics/react';
import debounce from 'lodash.debounce';
import { type AppType } from 'next/app';
import Router from 'next/router';
import nprogress from 'nprogress';

// Only show nprogress after 500ms (slow loading)
const start = debounce(nprogress.start, 500);
Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', () => {
  start.cancel();
  nprogress.done();
  window.scrollTo(0, 0);
});
Router.events.on('routeChangeError', () => {
  start.cancel();
  nprogress.done();
});

import '@styles/global.css';
import { ThemeProvider } from 'next-themes';

const Website: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider disableTransitionOnChange defaultTheme="dark">
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
};

export default Website;
