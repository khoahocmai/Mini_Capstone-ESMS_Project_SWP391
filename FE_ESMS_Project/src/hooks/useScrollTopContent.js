import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollTopContent = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        const content = document.querySelector(".ant-layout-content");
        content.scrollTo(0, 0);
    }, [pathname]);
};

export default useScrollTopContent;
