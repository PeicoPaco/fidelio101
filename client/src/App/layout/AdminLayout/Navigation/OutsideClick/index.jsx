import * as React from 'react';
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from '../../../../../hooks/useWindowSize';
import * as actionTypes from '../../../../../store/actions';
import { useSelector } from '../../../../../store/reducer';
const OutsideClick = (props) => {
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const collapseMenu = useSelector((state) => state.able.collapseMenu);
    const onToggleNavigation = useCallback(() => dispatch({ type: actionTypes.COLLAPSE_MENU }), [dispatch]);
    const { windowWidth } = useWindowSize();
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                if (windowWidth < 992 && collapseMenu) {
                    onToggleNavigation();
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, collapseMenu, windowWidth, onToggleNavigation]);
    return (<div className="nav-outside" ref={wrapperRef}>
            {props.children}
        </div>);
};
export default OutsideClick;
