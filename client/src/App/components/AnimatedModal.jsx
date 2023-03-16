import * as React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
const AnimatedModal = (props) => {
    return (<Rodal visible={props.visible} onClose={props.onClose} animation={props.animation} height={props.height}>
            {props.children}
        </Rodal>);
};
export default AnimatedModal;
