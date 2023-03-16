import * as React from 'react';
const NavIcon = (props) => {
    return props.items.icon ? (<span className="pcoded-micon">
            <i className={props.items.icon}/>
        </span>) : null;
};
export default NavIcon;
