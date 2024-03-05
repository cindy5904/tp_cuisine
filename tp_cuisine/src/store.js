import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./components/auth/authSlice";
import recipeSlice from "./components/recipe/recipeSlice";


export default configureStore({
  reducer: {
    auth: authSlice,
    recipe: recipeSlice,
  },
});