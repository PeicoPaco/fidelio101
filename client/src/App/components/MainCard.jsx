import * as React from 'react';
import { useState } from 'react';
import { Dropdown, Card, Collapse } from 'react-bootstrap';
import useWindowSize from '../../hooks/useWindowSize';
import DEMO from '../../store/constant';
const MainCard = (props) => {
    const { windowWidth, windowHeight } = useWindowSize();
    const [data, setData] = useState({
        isOption: props.isOption,
        fullCard: false,
        collapseCard: false,
        loadCard: false,
        cardRemove: false
    });
    const cardReloadHandler = () => {
        setData({ ...data, loadCard: true });
        setInterval(() => {
            setData({ ...data, loadCard: false });
        }, 3000);
    };
    const cardRemoveHandler = () => {
        setData({ ...data, cardRemove: true });
    };
    let fullScreenStyle = {};
    let loader, cardHeaderRight, cardHeader;
    let card = '';
    let cardClass = [];
    if (data.isOption) {
        cardHeaderRight = (<div className="card-header-right">
                <Dropdown alignRight={true} className="btn-group card-option">
                    <Dropdown.Toggle id="dropdown-basic" className="btn-icon">
                        <i className="feather icon-more-horizontal"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="list-unstyled card-option">
                        <Dropdown.Item as="li" className="dropdown-item" onClick={() => {
                setData({ ...data, fullCard: !data.fullCard });
            }}>
                            <i className={data.fullCard ? 'feather icon-minimize' : 'feather icon-maximize'}/>
                            <a href={DEMO.BLANK_LINK}> {data.fullCard ? 'Restore' : 'Maximize'} </a>
                        </Dropdown.Item>
                        <Dropdown.Item as="li" className="dropdown-item" onClick={() => {
                setData({ ...data, collapseCard: !data.collapseCard });
            }}>
                            <i className={data.collapseCard ? 'feather icon-plus' : 'feather icon-minus'}/>
                            <a href={DEMO.BLANK_LINK}> {data.collapseCard ? 'Expand' : 'Collapse'} </a>
                        </Dropdown.Item>
                        <Dropdown.Item as="li" className="dropdown-item" onClick={cardReloadHandler}>
                            <i className="feather icon-refresh-cw"/>
                            <a href={DEMO.BLANK_LINK}> Reload </a>
                        </Dropdown.Item>
                        <Dropdown.Item as="li" className="dropdown-item" onClick={cardRemoveHandler}>
                            <i className="feather icon-trash"/>
                            <a href={DEMO.BLANK_LINK}> Remove </a>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>);
    }
    cardHeader = (<Card.Header>
            <Card.Title as="h5">{props.title}</Card.Title>
            {cardHeaderRight}
        </Card.Header>);
    if (data.fullCard) {
        cardClass = [...cardClass, 'full-card'];
        fullScreenStyle = { position: 'fixed', top: 0, left: 0, right: 0, width: windowWidth, height: windowHeight };
    }
    if (data.loadCard) {
        cardClass = [...cardClass, 'card-load'];
        loader = (<div className="card-loader">
                <i className="pct-loader1 anim-rotate"/>
            </div>);
    }
    if (data.cardRemove) {
        cardClass = [...cardClass, 'd-none'];
    }
    if (props.cardClass) {
        cardClass = [...cardClass, props.cardClass];
    }
    card = (<Card className={cardClass.join(' ')} style={fullScreenStyle}>
            {cardHeader}
            <Collapse in={!data.collapseCard}>
                <div>
                    <Card.Body>{props.children}</Card.Body>
                </div>
            </Collapse>
            {loader}
        </Card>);
    return <>{card}</>;
};
export default MainCard;
