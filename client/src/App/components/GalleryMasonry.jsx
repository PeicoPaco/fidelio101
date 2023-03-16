import * as React from 'react';
import { useEffect, useState, createRef } from 'react';
const GalleryMasonry = (props) => {
    const [columns, setColumns] = useState(1);
    const masonryRef = createRef();
    const getColumns = (w) => {
        return (props.brakePoints.reduceRight((p, c, i) => {
            return c < w ? p : i;
        }, props.brakePoints.length) + 1);
    };
    const onResize = () => {
        if (masonryRef.current) {
            const columns_ = getColumns(masonryRef.current.offsetWidth);
            if (columns_ !== columns) {
                setColumns(columns_);
            }
        }
    };
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const mapChildren = () => {
        let col = [];
        const numC = columns;
        for (let i = 0; i < numC; i++) {
            col.push([]);
        }
        return props.children.reduce((p, c, i) => {
            if (Array.isArray(p)) {
                let v = p[i % numC];
                if (Array.isArray(v))
                    v.push(c);
            }
            return p;
        }, col);
    };
    const newChildren = mapChildren();
    return (<div className="masonry" ref={masonryRef}>
            {newChildren &&
            newChildren.map((col, ci) => {
                return (<div className="column" key={ci}>
                            {col.map((child, i) => {
                        return <div key={i}>{child}</div>;
                    })}
                        </div>);
            })}
        </div>);
};
export default GalleryMasonry;
