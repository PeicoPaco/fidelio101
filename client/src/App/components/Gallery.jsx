import * as React from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images-texts-videos';
import DEMO from '../../store/constant';
const Gallery = (props) => {
    const [data, setData] = useState(() => {
        let itemType;
        if (props.images) {
            itemType = 'images';
        }
        else if (props.texts) {
            itemType = 'texts';
        }
        else {
            itemType = 'videos';
        }
        return {
            lightboxIsOpen: false,
            currentItem: 0,
            itemType: itemType
        };
    });
    const openLightbox = (event, index) => {
        event.preventDefault();
        setData({
            ...data,
            currentItem: index,
            lightboxIsOpen: true
        });
    };
    const closeLightbox = () => {
        setData({
            ...data,
            currentItem: 0,
            lightboxIsOpen: false
        });
    };
    const gotoPrevious = () => {
        setData({
            ...data,
            currentItem: data.currentItem - 1
        });
    };
    const gotoNext = () => {
        setData({
            ...data,
            currentItem: data.currentItem + 1
        });
    };
    const gotoItem = (index) => {
        setData({
            ...data,
            currentItem: index
        });
    };
    const handleClickItem = () => {
        const items = data.itemType === 'videos' ? props.videos : props.images;
        if (data.currentItem === items.length - 1)
            return;
        gotoNext();
    };
    const renderGallery = () => {
        if (data.itemType === 'images') {
            const { images } = props;
            if (!images)
                return;
            let gallery;
            if (props.singleItem) {
                gallery = images
                    .filter((i) => i.useForDemo)
                    .map((obj, i) => {
                    return (<a href={obj.src} className={css(classes.thumbnail)} onClick={(e) => openLightbox(e, i)} key={i}>
                                <div className="img-thumbnail">
                                    <img src={obj.thumbnail} className={css(classes.source)} alt=""/>
                                </div>
                            </a>);
                });
                return <div className={css(classes.gallery)}>{gallery}</div>;
            }
            else {
                gallery = images
                    .filter((i) => i.useForDemo)
                    .map((obj, i) => {
                    return (<Col xl={2} lg={3} md={4} sm={6} xs={12} key={i} className="mb-1">
                                <a href={obj.src} className={css(classes.thumbnail)} onClick={(e) => openLightbox(e, i)}>
                                    <div className="img-thumbnail">
                                        <img src={obj.thumbnail} className={css(classes.source)} alt=""/>
                                    </div>
                                </a>
                            </Col>);
                });
                return (<div className={css(classes.gallery)}>
                        <Row>{gallery}</Row>
                    </div>);
            }
        }
        else if (data.itemType === 'texts') {
            const { texts } = props;
            let gallery;
            if (!texts)
                return;
            if (props.singleItem) {
                gallery = texts.map((text, i) => {
                    return (<p className={css(classes.text_thumbail)} key={i} onClick={(e) => openLightbox(e, i)}>
                            {text}
                        </p>);
                });
                return <div className={css(classes.gallery)}>{gallery}</div>;
            }
            else {
                gallery = texts.map((text, i) => {
                    return (<Col xl={2} lg={3} md={4} sm={6} xs={12} key={i} className="mb-1">
                            <p className={css(classes.text_thumbail)} onClick={(e) => openLightbox(e, i)}>
                                {text}
                            </p>
                        </Col>);
                });
                return <div className={css(classes.gallery)}>{gallery}</div>;
            }
        }
        else {
            let gallery;
            const { videos } = props;
            if (!videos)
                return;
            if (props.singleItem) {
                gallery = videos.map((videoId, i) => {
                    const videoThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    return (<a href={DEMO.BLANK_LINK} className={css(classes.video_thumbnail)} key={i} onClick={(e) => openLightbox(e, i)}>
                            <div className="img-thumbnail">
                                <img src={videoThumbnail} className={css(classes.source_video)} alt=""/>
                            </div>
                        </a>);
                });
                return <div className={css(classes.gallery)}>{gallery}</div>;
            }
            else {
                gallery = videos.map((videoId, i) => {
                    const videoThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    return (<Col xl={2} lg={3} md={4} sm={6} xs={12} key={i} className="mb-1">
                            <a href={DEMO.BLANK_LINK} className={css(classes.video_thumbnail)} onClick={(e) => openLightbox(e, i)}>
                                <div className="img-thumbnail">
                                    <img src={videoThumbnail} className={css(classes.source_video)} alt=""/>
                                </div>
                            </a>
                        </Col>);
                });
                return (<div className={css(classes.gallery)}>
                        <Row>{gallery}</Row>
                    </div>);
            }
        }
    };
    return (<div className="section">
            {props.heading && <h2>{props.heading}</h2>}
            {props.subheading && <p>{props.subheading}</p>}
            {renderGallery()}
            <Lightbox currentItem={data.currentItem} items={{ type: data.itemType, items: data.itemType === 'videos' ? props.videos : props.images }} isOpen={data.lightboxIsOpen} onClickImage={() => handleClickItem} onClickNext={gotoNext} onClickPrev={gotoPrevious} onClickThumbnail={() => gotoItem} onClose={closeLightbox} showThumbnails={props.showThumbnails} theme={props.theme} backdropClosesModal={props.backdropClosesModal}/>
        </div>);
};
Gallery.displayName = 'Gallery';
const gutter = {
    small: 2,
    large: 4
};
const classes = StyleSheet.create({
    gallery: {
        marginRight: -gutter.small,
        overflow: 'hidden',
        '@media (min-width: 500px)': {
            marginRight: -gutter.large
        }
    },
    // anchor
    thumbnail: {
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        lineHeight: 0,
        paddingRight: gutter.small,
        paddingBottom: gutter.small,
        overflow: 'hidden',
        '@media (min-width: 500px)': {
            paddingRight: gutter.large,
            paddingBottom: gutter.large
        }
    },
    // anchor
    video_thumbnail: {
        width: '50%',
        height: '258px',
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        lineHeight: 0,
        paddingRight: gutter.small,
        paddingBottom: gutter.small,
        overflow: 'hidden',
        '@media (min-width: 500px)': {
            paddingRight: gutter.large,
            paddingBottom: gutter.large
        }
    },
    // anchor
    text_thumbail: {
        cursor: 'pointer',
        height: '200px',
        'text-align': 'justify',
        'font-size': '16px',
        width: '46%',
        padding: '10px',
        margin: '10px',
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        overflow: 'scroll',
        border: 'solid 1px #E6E6E8',
        'border-radius': '4px',
        color: 'darkgray',
        '@media (min-width: 500px)': {}
    },
    // orientation
    landscape: {
        width: '30%'
    },
    square: {
        paddingBottom: 0,
        width: '40%',
        '@media (min-width: 500px)': {
            paddingBottom: 0
        }
    },
    // actual <img />
    source: {
        border: 0,
        display: 'block',
        height: 'auto',
        maxWidth: '100%',
        width: 'auto'
    },
    source_video: {
        border: 0,
        height: 'auto',
        maxWidth: '90%',
        width: 'auto'
    }
});
export default Gallery;
