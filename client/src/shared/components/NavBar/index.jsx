import { Link } from 'react-router-dom';
import './navbarstyless.css';
import logo from '../../assets/logo.png';
import {AiOutlineHome} from 'react-icons/ai';
import SideBar from '../SideBar';
import { useState } from 'react';
import { useLogoutQuery } from '../../../store';

const NavBar = ({links}) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { refetch, isFetching } = useLogoutQuery();
  return (
    <div className='navbar'>
      <div className='left'>
        <SideBar open={sideBarOpen} setOpen={setSideBarOpen} links={links}/>
      </div>
      <img src={logo} alt="logo" className='navbar-logo'/>

        <ul className='buttons'>
          <li>
            <Link to="/" className='navbar-link'>
              <div className='navbar-home'>
                <AiOutlineHome size={20}/>
                Home 
              </div>
            </Link>
          </li>
          <li><Link to="/" className='navbar-link' onClick={() => {if(!isFetching) refetch()}}>Logout</Link></li>
        </ul>
      {/* <div className='right'>
        <div className='avatar'></div>
      </div> */}
    </div>
  );
};


export default NavBar;