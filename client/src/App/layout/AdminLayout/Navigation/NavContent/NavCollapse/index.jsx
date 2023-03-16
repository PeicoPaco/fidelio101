import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DEMO from '../../../../../../store/constant';
import * as actionTypes from '../../../../../../store/actions';
import { useSelector } from '../../../../../../store/reducer';
import NavIcon from './../NavIcon';
import NavBadge from './../NavBadge';
import NavItem from '../NavItem';
import LoopNavCollapse from './index';
const NavCollapse = (props) => {
    const dispatch = useDispatch();
    const layout = useSelector((state) => state.able.layout);
    const isOpen = useSelector((state) => state.able.isOpen);
    const isTrigger = useSelector((state) => state.able.isTrigger);
    const onCollapseToggle = (id, type) => dispatch({ type: actionTypes.COLLAPSE_TOGGLE, menu: { id: id, type: type } });
    const onNavCollapseLeave = (id, type) => dispatch({ type: actionTypes.NAV_COLLAPSE_LEAVE, menu: { id: id, type: type } });
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === props.collapse.id);
        if (currentIndex > -1) {
            onCollapseToggle(props.collapse.id, props.type);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let navItems = '';
    if (props.collapse.children) {
        const collapses = props.collapse.children;
        navItems = Object.keys(collapses).map((key) => {
            const item = collapses[parseInt(key)];
            switch (item.type) {
                case 'collapse':
                    return <LoopNavCollapse key={item.id} collapse={item} type="sub"/>;
                case 'item':
                    return <NavItem layout={layout} key={item.id} item={item}/>;
                default:
                    return false;
            }
        });
    }
    let itemTitle = props.collapse.title;
    if (props.collapse.icon) {
        itemTitle = <span className="pcoded-mtext">{props.collapse.title}</span>;
    }
    let navLinkClass = ['nav-link'];
    let navItemClass = ['nav-item', 'pcoded-hasmenu'];
    const openIndex = isOpen.findIndex((id) => id === props.collapse.id);
    if (openIndex > -1) {
        navItemClass = [...navItemClass, 'active'];
        if (layout !== 'horizontal') {
            navLinkClass = [...navLinkClass, 'active'];
        }
    }
    const triggerIndex = isTrigger.findIndex((id) => id === props.collapse.id);
    if (triggerIndex > -1) {
        navItemClass = [...navItemClass, 'pcoded-trigger'];
    }
    const currentIndex = document.location.pathname
        .toString()
        .split('/')
        .findIndex((id) => id === props.collapse.id);
    if (currentIndex > -1) {
        navItemClass = [...navItemClass, 'active'];
        if (layout !== 'horizontal') {
            navLinkClass = [...navLinkClass, 'active'];
        }
    }
    const subContent = (<>
            <a href={DEMO.BLANK_LINK} className={navLinkClass.join(' ')} onClick={() => onCollapseToggle(props.collapse.id, props.type)}>
                <NavIcon items={props.collapse}/>
                {itemTitle}
                <NavBadge layout={layout} items={props.collapse}/>
            </a>
            <ul className="pcoded-submenu">{navItems}</ul>
        </>);
    let mainContent = '';
    if (layout === 'horizontal') {
        mainContent = (<li className={navItemClass.join(' ')} onMouseLeave={() => onNavCollapseLeave(props.collapse.id, props.type)} onMouseEnter={() => onCollapseToggle(props.collapse.id, props.type)}>
                {subContent}
            </li>);
    }
    else {
        mainContent = <li className={navItemClass.join(' ')}>{subContent}</li>;
    }
    return <>{mainContent}</>;
};
export default NavCollapse;
