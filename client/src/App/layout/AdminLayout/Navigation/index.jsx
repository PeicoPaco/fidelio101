import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from '../../../../hooks/useWindowSize';
import NavContent from './NavContent';
import OutsideClick from './OutsideClick';
import * as actionTypes from './../../../../store/actions';
import navigation from '../../../../menu-items';
import { useSelector } from '../../../../store/reducer';
import pushElementsbyRole from '../../../../role-menu-items';
const Navigation = () => {
    const [menuitems, setMenuItems] = useState(null)
    const { windowWidth } = useWindowSize();
    const dispatch = useDispatch();
    const layout = useSelector((state) => state.able.layout);
    const subLayout = useSelector((state) => state.able.subLayout);
    const collapseMenu = useSelector((state) => state.able.collapseMenu);
    const layoutType = useSelector((state) => state.able.layoutType);
    const rtlLayout = useSelector((state) => state.able.rtlLayout);
    const navFixedLayout = useSelector((state) => state.able.navFixedLayout);
    const headerFixedLayout = useSelector((state) => state.able.headerFixedLayout);
    const boxLayout = useSelector((state) => state.able.boxLayout);
    const profiles = useSelector((state) => state.sessionReducer.profile)
    const onChangeLayout = (layout) => dispatch({ type: actionTypes.CHANGE_LAYOUT, layout: layout });
    const resize = () => {
        const rootDom = document.getElementById('root');
        if (rootDom) {
            const contentWidth = rootDom.clientWidth;
            if (layout === 'horizontal' && contentWidth < 992) {
                onChangeLayout('vertical');
            }
        }
    };
    useEffect(() => {
        console.log(profiles)
        setMenuItems(pushElementsbyRole(profiles)) 
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profiles]);
    const scroll = () => {
        if (navFixedLayout && !headerFixedLayout) {
            const el = document.querySelector('.pcoded-navbar.menupos-fixed');
            if (!el)
                return;
            const scrollPosition = window.pageYOffset;
            if (scrollPosition > 60) {
                el.style.position = 'fixed';
                el.style.transition = 'none';
                el.style.marginTop = '0';
            }
            else {
                el.style.position = 'absolute';
                el.style.marginTop = '60px';
            }
        }
        else {
            const navBarDom = document.querySelector('.pcoded-navbar');
            if (navBarDom)
                navBarDom.removeAttribute('style');
        }
    };
    let navClass = ['pcoded-navbar'];
    navClass = [...navClass, layoutType];
    if (layout === 'horizontal') {
        navClass = [...navClass, 'theme-horizontal'];
    }
    else {
        if (navFixedLayout) {
            navClass = [...navClass, 'menupos-fixed'];
        }
        if (navFixedLayout && !headerFixedLayout) {
            window.addEventListener('scroll', scroll, true);
            /*window.scrollTo(0, 0);*/
        }
        else {
            window.removeEventListener('scroll', scroll, false);
        }
    }
    if (windowWidth < 992 && collapseMenu) {
        navClass = [...navClass, 'mob-open'];
    }
    else if (collapseMenu) {
        navClass = [...navClass, 'navbar-collapsed'];
    }
    if (layoutType === 'dark') {
        document.body.classList.add('able-pro-dark');
    }
    else {
        document.body.classList.remove('able-pro-dark');
    }
    if (rtlLayout) {
        document.body.classList.add('able-pro-rtl');
    }
    else {
        document.body.classList.remove('able-pro-rtl');
    }
    if (boxLayout) {
        document.body.classList.add('container');
        document.body.classList.add('box-layout');
    }
    else {
        document.body.classList.remove('container');
        document.body.classList.remove('box-layout');
    }
    let navBarClass = ['navbar-wrapper'];
    if (layout === 'horizontal' && subLayout === 'horizontal-2') {
        navBarClass = [...navBarClass, 'container'];
    }
    return ( menuitems && <nav className={navClass.join(' ')}>
            {windowWidth < 992 ? (<OutsideClick>
                    <div className="navbar-wrapper">
                        <NavContent navigation={menuitems?.items}/>
                    </div>
                </OutsideClick>) : (<div className={navBarClass.join(' ')}>
                    <NavContent navigation={menuitems?.items}/>
                </div>)}
        </nav>);
};
export default Navigation;
