import { Link } from 'react-router-dom'


const Navbar = () => {
    return ( 
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Cuisine</a>
                    <form className="d-flex" role="search">
                    <Link to={"/sign"}>
                        <button className="btn btn-outline-success mx-2" type="submit">Se connecter</button>
                    </Link>
                    <Link to={"/sign"}>
                        <button className="btn btn-outline-success mx-2" type="submit">S'inscrire</button>
                    </Link>
                    
                    </form>
                </div>
            </nav>
        </>
     );
}
 
export default Navbar;