import * as React from 'react';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as actionTypes from '../../../../../../store/actions';
import { useSelector } from '../../../../../../store/reducer';
const LayoutOptions = () => {
    const dispatch = useDispatch();
    const rtlLayout = useSelector((state) => state.able.rtlLayout);
    const navFixedLayout = useSelector((state) => state.able.navFixedLayout);
    const headerFixedLayout = useSelector((state) => state.able.headerFixedLayout);
    const boxLayout = useSelector((state) => state.able.boxLayout);
    const onChangeRtlLayout = () => dispatch({ type: actionTypes.RTL_LAYOUT });
    const onChangeNavFixedLayout = () => dispatch({ type: actionTypes.NAV_FIXED_LAYOUT });
    const onChangeHeaderFixedLayout = () => dispatch({ type: actionTypes.HEADER_FIXED_LAYOUT });
    const onChangeBoxLayout = () => dispatch({ type: actionTypes.BOX_LAYOUT });
    let layoutOption = (<div className="form-group mb-0">
            <div className="switch switch-primary d-inline m-r-10">
                <input type="checkbox" id="box-layouts" checked={boxLayout} onChange={onChangeBoxLayout}/>
                <label htmlFor="box-layouts" className="cr"/>
            </div>
            <label>Box Layouts</label>
        </div>);
    let layoutOptionHeaderFixWithoutBox = '';
    let layoutOptionNavFixWithoutBox = '';
    if (!boxLayout) {
        layoutOptionHeaderFixWithoutBox = (<div className="form-group mb-0">
                <div className="switch switch-primary d-inline m-r-10">
                    <input type="checkbox" id="header-fixed" checked={headerFixedLayout} onChange={onChangeHeaderFixedLayout}/>
                    <label htmlFor="header-fixed" className="cr"/>
                </div>
                <label>Header Fixed</label>
            </div>);
        layoutOptionNavFixWithoutBox = (<div className="form-group mb-0">
                <div className="switch switch-primary d-inline m-r-10">
                    <input type="checkbox" id="menu-fixed" checked={navFixedLayout} onChange={onChangeNavFixedLayout}/>
                    <label htmlFor="menu-fixed" className="cr"/>
                </div>
                <label>Menu Fixed</label>
            </div>);
    }
    layoutOption = (<div>
            <div className="form-group mb-0">
                <div className="switch switch-primary d-inline m-r-10">
                    <input type="checkbox" id="theme-rtl" checked={rtlLayout} onChange={onChangeRtlLayout}/>
                    <label htmlFor="theme-rtl" className="cr"/>
                </div>
                <label>RTL</label>
            </div>
            {layoutOptionNavFixWithoutBox}
            {layoutOptionHeaderFixWithoutBox}
            {layoutOption}
        </div>);
    return (<>
            <div className="config-scroll">
                <PerfectScrollbar>{layoutOption}</PerfectScrollbar>
            </div>
        </>);
};
export default LayoutOptions;
