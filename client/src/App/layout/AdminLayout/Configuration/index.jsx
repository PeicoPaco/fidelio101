import * as React from 'react';
import { useState } from 'react';
import Layout from './Layout';
import TabConfig from './TabConfig';
import DEMO from '../../../../store/constant';
const Configuration = () => {
    const [configOpen, setConfigOpen] = useState(false);
    let configClass = ['menu-styler'];
    if (configOpen) {
        configClass = [...configClass, 'open'];
    }
    return (<>
            <div id="styleSelector" className={configClass.join(' ')}>
                <div className="style-toggler">
                    <a href={DEMO.BLANK_LINK} onClick={() => setConfigOpen(!configOpen)}>
                        *
                    </a>
                </div>
                <div className="style-block">
                    <h4 className="mb-2 text-dark">
                        Able Pro
                        <small className="font-weight-normal">v8.0 Customizer</small>
                    </h4>
                    <hr />
                    <div className="m-style-scroller">
                        <Layout />
                        <TabConfig />
                    </div>
                </div>
            </div>
        </>);
};
export default Configuration;
