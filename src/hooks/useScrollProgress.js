import { useState, useEffect } from 'react';

/**
 * Returns the vertical scroll progress of the page as a value between 0 and 1.
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight <= 0) {
                setProgress(0);
                return;
            }
            const p = window.scrollY / totalHeight;
            setProgress(Math.min(Math.max(p, 0), 1));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}
