import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/layout";
import RecipeDetails from "./pages/recipeDetails/recipeDetails";
import Search from "./pages/search/search";
import Ingredients from "./pages/ingredients/ingredients";
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { AuthProvider } from "./contexts/AuthContext";
import ResetPassword from "./components/authentication/resetPassword";
import ProfileModal from "./components/profile/profileModal";
import EditProfile from "./pages/editProfile/editProfile";
import AdminHub from "./pages/admin/adminHub/adminHub";
import CheckPost from "./pages/admin/checkPost/checkPost";
import AddNewRecipe from "./pages/addNewRecipe/addNewRecipe";
import AllRecipes from "./pages/allRecipes/allRecipes";
import CategoryFullRecipes from "./components/allRecipes/categoryFullRecipes";
import NutritionTracking from "./pages/nutritionTracking/nutritionTracking";
import Upgrade from "./pages/premiumUpgrade/upgrade";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/recipe/:_id" element={<RecipeDetails />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/admin-hub" element={<AdminHub />} />
        <Route path="/check-post/:userId" element={<CheckPost />} />
        <Route path="/search" element={<Search />}></Route>
        <Route path="profile1" element={<ProfileModal />} />
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
            path="/upgrade"
            element={
              <Upgrade />
            }
        />
        <Route 
            path="/recipes"
            element={
              <AllRecipes />
            }
        />

        <Route 
            path="/search" 
            element={
              <Search />
            }
          ></Route>
        
        <Route
            path="/ingredients"
            element={
                <Ingredients />
            }
        />

        <Route path="/nutrition"
            element={
                // <ProtectedRoute roles={["premium"]}>
                    <NutritionTracking />
                // </ProtectedRoute>
            }
        />
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