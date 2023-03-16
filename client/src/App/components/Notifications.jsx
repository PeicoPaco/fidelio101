import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { ToastProvider, ToastConsumer } from 'react-toast-notifications';
import { AttentionSeeker, Bounce, Fade, Flip, Hinge, JackInTheBox, Rotate, Slide, Zoom } from 'react-awesome-reveal';
function getAnimation(type) {
    switch (type) {
        case 'AttentionSeeker':
            return AttentionSeeker;
        case 'Bounce':
            return Bounce;
        case 'Fade':
            return Fade;
        case 'Flip':
            return Flip;
        case 'Hinge':
            return Hinge;
        case 'JackInTheBox':
            return JackInTheBox;
        case 'Rotate':
            return Rotate;
        case 'Slide':
            return Slide;
        case 'Zoom':
            return Zoom;
        default:
            return Slide;
    }
}
const Notifications = (props) => {
    const AlertMessage = ({ appearance, children, transitionDuration, transitionState, onDismiss }) => {
        const Ani = getAnimation(props.notification.animation.type);
        const direction = props.notification.animation.direction;
        return (<Ani direction={direction} triggerOnce>
                <Alert variant={appearance} dismissible onClose={onDismiss}>
                    {children}
                </Alert>
            </Ani>);
    };
    return (<ToastProvider components={{ Toast: AlertMessage }} placement={props.notification.placement}>
            <ToastConsumer>
                {({ add }) => {
            return (<span onClick={() => add(props.notification.message, {
                    appearance: props.notification.variant,
                    autoDismiss: props.notification.autoDismiss
                })}>
                            {props.children}
                        </span>);
        }}
            </ToastConsumer>
        </ToastProvider>);
};
export default Notifications;
