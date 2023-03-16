import * as React from 'react';
const NavBadge = (props) => {
    return props.items.badge ? (<span className={['label', 'pcoded-badge', props.items.badge.type].join(' ')}>{props.items.badge.title}</span>) : null;
};
export default NavBadge;
