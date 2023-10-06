import { Link } from 'react-router-dom';
import './navbarstyless.css';
import logo from '../../assets/logo.png';

const NavBar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="logo" className='navbar-logo'/>
        <ul className='buttons'>
          <li><Link to="/" className='navbar-link'>Register</Link></li>
          <li><Link to="/home" className='navbar-link'>Home</Link></li>
          <li><Link to="/home" className='navbar-link'>Contact Us</Link></li>
        </ul>
      {/* <div className='right'>
        <div className='avatar'></div>
      </div> */}
    </div>
  );
};


export default NavBar;