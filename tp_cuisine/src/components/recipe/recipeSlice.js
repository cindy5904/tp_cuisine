import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    formMode: "",
    recipes: [],
    selectedRecipe: null,
    ingredients: [],
    isLoading: false,
    error: null
  },
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action) => {
        const { id, updatedRecipe } = action.payload;
        const index = state.recipes.findIndex((recipe) => recipe.id === id);
  
        if (index !== -1) {
            state.recipes[index] = { id, ...updatedRecipe };
          }
    },
    deleteRecipe: (state, action) => {
        state.recipes = state.recipes.filter(
            (recipe) => recipe.id !== action.payload
          );
    }

  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;