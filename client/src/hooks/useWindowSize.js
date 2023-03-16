import { useEffect, useState } from 'react';
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return windowSize;
};
export default useWindowSize;
