import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import RecipeDetails from "./pages/recipeDetails/recipeDetails";
import { useState } from 'react'
import './App.css'
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from './pages/home/home'

const Layout = () => {
  return (
    <div>
      <Header />
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
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
