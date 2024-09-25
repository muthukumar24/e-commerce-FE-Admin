import React, { useContext } from 'react';
import '../NavBar/NavBar.css'
import { useNavigate } from 'react-router-dom';
import { EcommerceAuthContext } from '../../context/AuthContext.jsx';

function Navbar() {
  const { user, logout } = useContext(EcommerceAuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary nav-bar" id="navbar">
      <div className="container">
        <a className="navbar-brand" href="#">
          <h3>SHOPIT</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <div className="navbar-nav mx-auto mb-2 mb-lg-0">
                <h4 className='admin-text'>Admin Panel</h4>
          </div>
            <div className="d-flex justify-content-end">
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle px-4"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i> {/* User icon */}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  {user && <li className="dropdown-item-text">Hey, {user.username}</li>}
                  <hr />
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout <i className="bi bi-box-arrow-right"></i> {/* Logout icon */}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
