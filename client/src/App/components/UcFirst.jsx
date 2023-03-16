import * as React from 'react';
const UcFirst = (props) => {
    return <>{props.text.charAt(0).toUpperCase() + props.text.slice(1)}</>;
};
export default UcFirst;
