import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./components/Layout";
import { publicRoute } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            publicRoute.map((route, index) => {
              const Page = route.component
              const Layout = route.layout ?? DefaultLayout
              return <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            })
          }
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
