import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
