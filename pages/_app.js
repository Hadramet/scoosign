import * as React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import nProgress from "nprogress";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import {createMyTheme} from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { AuthConsumer, AuthProvider } from "../contexts/jwt-context";
import { Toaster } from 'react-hot-toast';

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title> Scoosign </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={createMyTheme({ mode: 'light' })}>
          <CssBaseline />
          <Toaster position="top-center"/>
          <AuthConsumer>
            {(auth) =>
              !auth.isInitialized ? (
                <p> SplashScreen </p>
              ) : (
                getLayout(<Component {...pageProps} />)
              )
            }
          </AuthConsumer>
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
