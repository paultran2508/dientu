// import type { NextPage } from 'next'
import Head from 'next/head'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { useUsersQuery } from '../src/generated/graphql'

const Home = () => {

  const { data, loading, error } = useUsersQuery({})
  // console.log(data?.users)
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
            {data?.users?.map(user => <li key={user.id}>{user.email + "  ---id: " + user.id}</li>)}
          </ul>}
      </div>
    </>
  )
}

Home.Layout = DefaultLayout
export default Home