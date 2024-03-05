import { useRef } from "react"
import {useDispatch, useSelector} from "react-redux"
import { addRecipe } from "./recipeSlice"
import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_DB_URLv } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"

const AddRecipe = () => {
    const titleRef = useRef()
    const instructionRef = useRef()
    const cookTimeRef = useRef()
    const prepTimeRef = useRef()
    const ingredientsRef = useRef()
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
         
        const newRecipe = {
          title: titleRef.current.value,
          instruction: instructionRef.current.value,
          cookTime: cookTimeRef.current.value,
          prepTime: prepTimeRef.current.value,
          ingredients: ingredientsRef.current.value

        }
        console.log(user)
        if(user?.idToken) {
            axios.post(`${BASE_DB_URLv}ingredients.json?auth=${user.idToken}`, newRecipe).then((response) => {
              console.log(response.data);
              dispatch(addRecipe(newRecipe))
            })
            .catch((error) => {
                console.error("Erreur d'ajout de recette:", error);
              });
          } else {
            console.error("User ou idToken est null");
          }

          navigate("/") 
            
}

  return ( 
    <>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col md-12">
            <label htmlFor="">Ajouter une recette</label>
            <input type="text" placeholder="Ajouter une recette" ref={titleRef} />
        </div>
        <div>
            <textarea name="instructions" id="" cols="30" rows="10" ref={instructionRef}></textarea>
        </div>
        <div>
            <label htmlFor="">Temps de préparation : </label>
            <input type="text" ref={prepTimeRef}/>
        </div>
        <div>
            <label htmlFor="">Temps de cuisson :</label>
            <input type="text" ref={cookTimeRef}/>
        </div>
        <div>
            <textarea name="" id="" cols="30" rows="10" ref={ingredientsRef}></textarea>
        </div>
        <div>
          <button type="submit">Ajouter la recette</button>
        </div>

      </form>
    </>
   );
}

export default AddRecipe;