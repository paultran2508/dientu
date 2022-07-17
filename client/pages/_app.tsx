// import { NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import React from 'react'
// import { useRouter } from 'next/router'
// import getLayout from '../layouts'
// import { DefaultLayout } from '../layouts/DefaultLayout'
import '../styles/globals.scss'
import { Children } from '../types/Children'


type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    Layout?: React.ComponentType<Children>
  }
}

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  // const router = useRouter()
  // console.log(1)
  return <> {
    Component.Layout ?
      <Component.Layout>
        <Component {...pageProps} />
      </Component.Layout>
      : <Component {...pageProps} />
  }
  </>


}

export default MyApp
