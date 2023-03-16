import * as React from 'react';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as actionTypes from '../../../../../../store/actions';
import DEMO from '../../../../../../store/constant';
import { useSelector } from '../../../../../../store/reducer';
const ColorOptions = () => {
    const dispatch = useDispatch();
    const headerBackColor = useSelector((state) => state.able.headerBackColor);
    const onChangeHeaderBackColor = (headerBackColor) => dispatch({ type: actionTypes.HEADER_BACK_COLOR, headerBackColor: headerBackColor });
    let colorOptions = (<div>
            <h6 className=" text-dark">Background Color</h6>
            <div className="theme-color background-color flat">
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-blue')} className={headerBackColor === 'background-blue' ? 'active' : ''} data-value="background-blue">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-red')} className={headerBackColor === 'background-red' ? 'active' : ''} data-value="background-red">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-purple')} className={headerBackColor === 'background-purple' ? 'active' : ''} data-value="background-purple">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-info')} className={headerBackColor === 'background-info' ? 'active' : ''} data-value="background-info">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-green')} className={headerBackColor === 'background-green' ? 'active' : ''} data-value="background-green">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-dark')} className={headerBackColor === 'background-dark' ? 'active' : ''} data-value="background-dark">
                    <span />
                    <span />
                </a>
            </div>
            <h6 className=" text-dark">Background Gradient</h6>
            <div className="theme-color background-color gradient">
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-grd-blue')} className={headerBackColor === 'background-grd-blue' ? 'active' : ''} data-value="background-grd-blue">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-grd-red')} className={headerBackColor === 'background-grd-red' ? 'active' : ''} data-value="background-grd-red">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-grd-purple')} className={headerBackColor === 'background-grd-purple' ? 'active' : ''} data-value="background-grd-purple">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-grd-info')} className={headerBackColor === 'background-grd-info' ? 'active' : ''} data-value="background-grd-info">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-grd-green')} className={headerBackColor === 'background-grd-green' ? 'active' : ''} data-value="background-grd-green">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-grd-dark')} className={headerBackColor === 'background-grd-dark' ? 'active' : ''} data-value="background-grd-dark">
                    <span />
                    <span />
                </a>
            </div>
            <h6 className=" text-dark">Background Image</h6>
            <div className="theme-color background-color image">
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-img-1')} className={headerBackColor === 'background-img-1' ? 'active' : ''} data-value="background-img-1">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-img-2')} className={headerBackColor === 'background-img-2' ? 'active' : ''} data-value="background-img-2">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-img-3')} className={headerBackColor === 'background-img-3' ? 'active' : ''} data-value="background-img-3">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-img-4')} className={headerBackColor === 'background-img-4' ? 'active' : ''} data-value="background-img-4">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-img-5')} className={headerBackColor === 'background-img-5' ? 'active' : ''} data-value="background-img-5">
                    <span />
                    <span />
                </a>
                <a href={DEMO.BLANK_LINK} onClick={() => onChangeHeaderBackColor('background-img-6')} className={headerBackColor === 'background-img-6' ? 'active' : ''} data-value="background-img-6">
                    <span />
                    <span />
                </a>
            </div>
        </div>);
    return (<>
            <div className="config-scroll">
                <PerfectScrollbar>{colorOptions}</PerfectScrollbar>
            </div>
        </>);
};
export default ColorOptions;
