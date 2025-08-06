import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const ScrollToTop = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	// Redirect to last visited page if coming from refresh
	useEffect(() => {
		const lastVisitedPage = localStorage.getItem('lastVisitedPage');
		const isInitialLoad = sessionStorage.getItem('hasLoaded') === null;
		
		// Don't redirect if we're on auth pages during initial load
		const isAuthPage = pathname.includes('/authentication');
		
		if (isInitialLoad && lastVisitedPage && lastVisitedPage !== pathname && !isAuthPage) {
			// Mark that we've loaded
			sessionStorage.setItem('hasLoaded', 'true');
			// Navigate to last visited page
			navigate(lastVisitedPage, { replace: true });
		} else if (isInitialLoad) {
			// Mark that we've loaded even if we're already on the right page
			sessionStorage.setItem('hasLoaded', 'true');
		}
	}, [pathname, navigate]);

	return null;
};

export default ScrollToTop;
