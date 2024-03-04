import React,{useEffect} from 'react'
import { NavLink,useLocation,useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();

  let history = useNavigate()

  const Logout =()=>{
    localStorage.removeItem('token');
    history('/login')

  }

  useEffect(() => {
   console.log(location.pathname);
  }, [location]);
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</NavLink>
        </li>
      </ul>
    {!localStorage.getItem('token') ? <form className='d-flex ' style={{position:"absolute" ,right:"20px"}}>
        <NavLink className="btn btn-primary mx-2" to="/login" role='button'>Login</NavLink>
        <NavLink className="btn btn-primary mx-2" to="/signup" role='button'>SignUP</NavLink> 
      </form>:<button  style={{position:"absolute" ,right:"20px"}} onClick={Logout} className='btn btn-primary'>Signout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar