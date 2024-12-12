import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/layout";
import RecipeDetails from "./pages/recipeDetails/recipeDetails";
import Search from "./pages/search/search";
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import ProtectedRoute from "./components/home/protectedRoute/protectedRoute";
import { LoginModalProvider } from "./contexts/LoginModalContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/recipe/:_id" element={<RecipeDetails />}></Route>
        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />
        <Route path="/search" element={<Search />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  const [count, setCount] = useState(0);
  return (
    <LoginModalProvider>
      <RouterProvider router={router} />
    </LoginModalProvider>
  );
}
export default App;
