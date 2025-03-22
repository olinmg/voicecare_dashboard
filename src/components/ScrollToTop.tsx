import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will reset scroll position to top when navigation occurs
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 