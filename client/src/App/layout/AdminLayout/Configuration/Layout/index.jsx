import * as React from 'react';
import { useDispatch } from 'react-redux';
import DEMO from '../../../../../store/constant';
import * as actionTypes from '../../../../../store/actions';
import { useSelector } from '../../../../../store/reducer';
const Layout = () => {
    const dispatch = useDispatch();
    const layoutType = useSelector((state) => state.able.layoutType);
    const onChangeLayoutType = (layoutType) => dispatch({ type: actionTypes.LAYOUT_TYPE, layoutType: layoutType });
    const onReset = () => dispatch({ type: actionTypes.RESET });
    let layoutOption = (<div>
            <h6 className="text-dark">Layouts</h6>
            <div className="theme-color layout-type">
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeLayoutType('menu-dark')} title="Default Layout" className={layoutType === 'menu-dark' ? 'active' : ''} data-value="menu-dark">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeLayoutType('menu-light')} title="Light" className={layoutType === 'menu-light' ? 'active' : ''} data-value="menu-light">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeLayoutType('dark')} title="Dark" className={layoutType === 'dark' ? 'active' : ''} data-value="dark">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onReset()} title="Reset" className={layoutType === 'reset' ? 'active' : ''} data-value="reset">
                    Reset to Default
                </a>
            </div>
        </div>);
    return <>{layoutOption}</>;
};
export default Layout;
