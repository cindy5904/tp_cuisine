import {createBrowserRouter} from "react-router-dom"
import SignForm from "./components/auth/SignForm"
import App from "./App"
import AddRecipe from "./components/recipe/AddRecipe"
import UpdateRecipe from "./components/UpdateRecipe"


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
      },
    
    {
      path: "/sign",
      element: <SignForm/>
    },
    {
        path:"/add-recipe",
        element: <AddRecipe/>
    },
    {
        path:"/update-recipe",
        element: <UpdateRecipe/>
    }
    
  ])
  
  export default router