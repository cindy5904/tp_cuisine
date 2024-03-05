import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { updateRecipe } from './recipe/recipeSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BASE_DB_URLv } from '../firebaseConfig';

const UpdateRecipe = () => {
    const [recipe, setRecipe] = useState({});
    const titleRef = useRef();
    const instructionRef = useRef();
    const cookTimeRef = useRef();
    const prepTimeRef = useRef();
    const ingredientsRef = useRef();
    // const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect((recipeId) => {

      axios.put(`${BASE_DB_URLv}recipes/${recipeId}.json`)
        .then((response) => {
          setRecipe(response.data);

        })
        .catch(error => console.error(error));
    }, []);
  
    const handleUpdate = () => {
      const updatedRecipe = {
        title: titleRef.current.value,
        instructions: instructionRef.current.value,
        cookTime: cookTimeRef.current.value,
        prepTime: prepTimeRef.current.value,
        ingredients: ingredientsRef.current.value,
      };
  
      
      dispatch(updateRecipe({ id, updatedRecipe }));
  
      
      navigate('/');
    };
  
    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
        <>
       <div>
        <h2>Modifier la recette</h2>
        <form>
            <label htmlFor="title">Titre</label>
            <input type="text" id="title" ref={titleRef} defaultValue={recipe?.title} />

            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" ref={instructionRef} defaultValue={recipe?.instructions}></textarea>

            <label htmlFor="cookTime">Temps de cuisson</label>
            <input type="text" id="cookTime" ref={cookTimeRef} defaultValue={recipe?.cookTime} />

            <label htmlFor="prepTime">Temps de préparation</label>
            <input type="text" id="prepTime" ref={prepTimeRef} defaultValue={recipe?.prepTime} />

            <label htmlFor="ingredients">Ingrédients</label>
            <input type="text" id="ingredients" ref={ingredientsRef} defaultValue={recipe?.ingredients} />

            <button type="button" onClick={handleUpdate}>Mettre à jour</button>
        </form>
    </div>
        </>
    )
}

export default UpdateRecipe