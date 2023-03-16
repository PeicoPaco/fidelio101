import * as React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../../../../../hooks/useWindowSize';
import NavIcon from './../NavIcon';
import NavBadge from './../NavBadge';
import * as actionTypes from '../../../../../../store/actions';
import { useSelector } from '../../../../../../store/reducer';
const NavItem = (props) => {
    const { windowWidth } = useWindowSize();
    const dispatch = useDispatch();
    const layout = useSelector((state) => state.able.layout);
    const onItemClick = () => dispatch({ type: actionTypes.COLLAPSE_MENU });
    const onItemLeave = () => dispatch({ type: actionTypes.NAV_CONTENT_LEAVE });
    let itemTitle = props.item.title;
    if (props.item.icon) {
        itemTitle = <span className="pcoded-mtext">{props.item.title}</span>;
    }
    let itemTarget = '';
    if (props.item.target) {
        itemTarget = '_blank';
    }
    let subContent;
    if (props.item.external) {
        subContent = (<a href={props.item.url} target="_blank" rel="noopener noreferrer">
                <NavIcon items={props.item}/>
                {itemTitle}
                <NavBadge layout={layout} items={props.item}/>
            </a>);
    }
    else {
        subContent = (<NavLink to={props.item.url} className="nav-link" exact={true} target={itemTarget}>
                <NavIcon items={props.item}/>
                {itemTitle}
                <NavBadge layout={layout} items={props.item}/>
            </NavLink>);
    }
    let mainContent;
    if (layout === 'horizontal') {
        mainContent = <li onClick={onItemLeave}>{subContent}</li>;
    }
    else {
        if (windowWidth < 992) {
            mainContent = (<li className={props.item.classes} onClick={onItemClick}>
                    {subContent}
                </li>);
        }
        else {
            mainContent = <li className={props.item.classes}>{subContent}</li>;
        }
    }
    return <>{mainContent}</>;
};
export default NavItem;
