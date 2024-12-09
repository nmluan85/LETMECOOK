import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import RecipeDetails from "./pages/recipeDetails/recipeDetails";
import { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/home/header/header";
import Footer from "./components/home/footer/footer";
import Home from './pages/home/home'

const Layout = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </header>
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/recipe/:_id" element={<RecipeDetails />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => {
        console.log(data)})
  }, [])
     
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
