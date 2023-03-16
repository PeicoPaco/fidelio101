import * as React from 'react';
import NavSearch from './NavSearch';
const NavLeft = () => {
    return (<ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavSearch />
            </li>
        </ul>);
};
export default NavLeft;
