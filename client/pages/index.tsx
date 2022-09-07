// import type { NextPage } from 'next'
import Head from 'next/head'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useMeQuery } from '../src/generated/graphql'

const Home = () => {

  const { data, loading, error } = useMeQuery()
  // console.log(data?.me, "index", networkStatus, error)
  // console.log(data, "index")

  return (
    <>
      <Head>
        <title>Dien Tu</title>
        <meta name="description" content="Dientu shop gia re" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {error && <h3>{error.message}</h3>}
        {loading ? <div>loading ...</div> :
          <ul>
            <li> {data?.me?.email + "  ---id: " + data?.me?.id}</li>
          </ul>}
      </div>
    </>
  )
}

Home.Layout = DefaultLayout
export default Home