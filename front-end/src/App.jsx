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
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProfileModal from "./components/profile/profileModal";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/recipe/:_id" element={<RecipeDetails />}></Route>
        <Route
            path="/profile"
            element={
              <Profile />
            }
        />
        <Route path="/search" element={<Search />}></Route>
        <Route path="/nutrition"
            element={
                // <ProtectedRoute roles={["premium"]}>
                    <Profile />
                // </ProtectedRoute>
            }
        />
        <Route path="profile1" element={<ProfileModal/>}/>
      </Route>
    </Route>
  )
);

function App() {
  const [count, setCount] = useState(0);
  return (
    <AuthProvider>
      <LoginModalProvider>
        <RouterProvider router={router} />
      </LoginModalProvider>
    </AuthProvider>
  );
}
export default App;
