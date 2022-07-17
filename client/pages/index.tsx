// import type { NextPage } from 'next'
import Head from 'next/head'
import { DefaultLayout } from '../layouts/DefaultLayout'

const Home = () => {

  return (
    <>
      <Head>
        <title>Dien Tu</title>
        <meta name="description" content="Dientu shop gia re" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>day la trang home</div>
    </>

  )
}

Home.Layout = DefaultLayout
export default Home
