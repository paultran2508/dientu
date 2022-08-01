import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import React from 'react'
import client from '../apollo'
import Provider from '../src/Provider'
import '../styles/globals.scss'
import { Children } from '../types/Children'




type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    Layout?: React.ComponentType<Children>
  }
}

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return <ApolloProvider client={client}>
    <Provider>
      {Component.Layout ?
        <Component.Layout>
          <Component {...pageProps} />
        </Component.Layout>
        : <Component {...pageProps} />
      }
    </Provider>
  </ApolloProvider>
}

export default MyApp
