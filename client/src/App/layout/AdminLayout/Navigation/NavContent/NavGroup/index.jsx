import * as React from 'react';
import NavCollapse from './../NavCollapse';
import NavItem from './../NavItem';
const navGroup = (props) => {
    let navItems = '';
    if (props.group.children) {
        const groups = props.group.children;
        navItems = Object.keys(groups).map((key) => {
            const item = groups[parseInt(key)];
            switch (item.type) {
                case 'collapse':
                    return <NavCollapse key={item.id} collapse={item} type="main"/>;
                case 'item':
                    return <NavItem key={item.id} item={item}/>;
                default:
                    return false;
            }
        });
    }
    return (<>
            <li key={props.group.id} className="nav-item pcoded-menu-caption">
                <label>{props.group.title}</label>
            </li>
            {navItems}
        </>);
};
export default navGroup;
