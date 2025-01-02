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
import EditProfile from "./pages/editProfile/editProfile";
import AddNewRecipe from "./pages/addNewRecipe/addNewRecipe";
import AllRecipes from "./pages/allRecipes/allRecipes";
import CategoryFullRecipes from "./components/allRecipes/categoryFullRecipes";
import NutritionTracking from "./pages/nutritionTracking/nutritionTracking";

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
        <Route
          path="/profile/add-recipe"
          element={<AddNewRecipe />}
        />
        <Route
            path="/edit-profile"
            element={
              <EditProfile />
            }
        />
        <Route 
            path="/recipes"
            element={
              <AllRecipes />
            }
        />
        <Route path="/search" element={<Search />}></Route>
        <Route path="/nutrition"
            element={
                // <ProtectedRoute roles={["premium"]}>
                    <NutritionTracking />
                // </ProtectedRoute>
            }
        />
        <Route path="profile1" element={<ProfileModal/>}/>
        <Route path="/category/:category" element={<CategoryFullRecipes />} />
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
