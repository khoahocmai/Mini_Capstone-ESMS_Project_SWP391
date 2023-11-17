import configs from "@/configs";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();

    if (!isInitialized) return <div>loading</div>;

    if (!isAuthenticated) return <Navigate to={configs.routes.login} replace />;

    return <>{children}</>;
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthGuard;
