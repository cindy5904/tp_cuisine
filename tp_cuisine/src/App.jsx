import { useState, useRef } from 'react'
import './App.css'
import SignForm from './components/auth/SignForm'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import axios from 'axios'
import { BASE_DB_URLv } from './firebaseConfig'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteRecipe, updateRecipe } from './components/recipe/recipeSlice'
import { useSelector } from 'react-redux'


function App() {
  const [recipes, setRecipes] = useState([]);
  
  const isAuthenticated = true;
  const user = useSelector(state => state.auth.user)
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch()
  const titleRef = useRef()
  const instructionRef = useRef()
  const cookTimeRef = useRef()
  const prepTimeRef = useRef()
  const ingredientsRef = useRef()
  useEffect(() => {

    axios.get(`${BASE_DB_URLv}ingredients.json`)
      .then((response) => {
        const recipes = [];
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            recipes.push({id:key, ...response.data[key]});
          }
        }
        setRecipes(recipes);
        
        console.log(response.data)
    }).catch(error => console.error(error))
}, [])

  const HandleDelete = (recipeId)=> {
    axios.delete(`${BASE_DB_URLv}recipes/${recipeId}.json?auth=${user.idToken}`).then((response) => {
      const updateRecipes = recipes.filter((recipe)=> recipe.id !== recipeId)
      setRecipes(updateRecipes);
      dispatch(deleteRecipe(recipeId));
    }).catch(error => console.error(error))
  }
  const HandleUpdate = (recipeId) => {
    const updatedRecipe = {
      title: titleRef.current.value,
      instruction: instructionRef.current.value,
      cookTime: cookTimeRef.current.value,
      prepTime: prepTimeRef.current.value,
      ingredients: ingredientsRef.current.value
    };
  
    axios.put(`${BASE_DB_URLv}recipes/${recipeId}.json?auth=${user.idToken}`, updatedRecipe)
      .then((response) => {
        const modifiedRecipes = recipes.findIndex((recipe) => recipe.id === recipeId);
        setRecipes(modifiedRecipes);
        dispatch(updateRecipe({ id: recipeId, updatedRecipe }));
        setUpdate(!update);
      })
      .catch(error => console.error(error));
  };
  

  return (
    <>
      <Navbar/>
      {update ? (
          <div className="container mt-5">
          <h1>Mes Recettes</h1>
          <div className="row">
         
              <div  className="col-md-4 mb-4">
              <div className="form">
                <div className="form-body">
                  <input type="text" placeholder="Ajouter une recette" ref={titleRef} />
                  <textarea name="instructions" id="" cols="30" rows="10" ref={instructionRef}></textarea>
                  <input type="text" placeholder="Temps de préparation" ref={prepTimeRef}/>
                  <input type="text" placeholder="Temps de cuisson" ref={cookTimeRef}/>
                  <textarea name="" id="" cols="30" rows="10" placeholder="Ingrédients" ref={ingredientsRef}></textarea>
                  <button
                    className="btn btn-danger"
                    onClick={() => setUpdate(!update)}
                  >
                    Annuler
                  </button>
                  
                  <button
                    className="btn btn-warning ml-2"
                    onClick={() => HandleUpdate()}
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h1>Mes Recettes</h1>
          <div className="row">
            {recipes.map((recipe, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="form">
                  <div className="form-body">
                    <h2 className="form-title">{recipe.title}</h2>
                    <p className="form-text">Instructions: {recipe.instructions}</p>
                    <p className="form-text">Temps de cuisson: {recipe.cookTime}</p>
                    <p className="form-text">Temps de préparation: {recipe.prepTime}</p>
                    <p className="form-text">Ingredients: {recipe.ingredients}</p>
                    {isAuthenticated && (
                      <>
                        <button
                          className="btn btn-danger"
                          onClick={() => HandleDelete(recipe.id)}
                        >
                          Supprimer
                        </button>
                        
                        <button
                          className="btn btn-warning ml-2"
                          onClick={() => setUpdate(!update)}
                        >
                          Modifier
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
  
}

export default App
