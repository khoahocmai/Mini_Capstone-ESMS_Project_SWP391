import configs from "@/configs";
import useAuth from "@/hooks/useAuth";
import { ADMIN, LECTURER, STAFF, STUDENT } from "@/utils/constants";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const RoleBasedGuard = ({ children, accessibleRoles }) => {
    const { user } = useAuth();

    if (!accessibleRoles.includes(user?.role))
        return <Navigate to={configs.routes.pageNotFound} />;

    return <>{children}</>;
};

RoleBasedGuard.propTypes = {
    children: PropTypes.node.isRequired,
    accessibleRoles: PropTypes.arrayOf(
        PropTypes.oneOf([ADMIN, STAFF, LECTURER, STUDENT])
    ).isRequired,
    // accessibleRoles: PropTypes.arrayOf(ADMIN, STAFF, LECTURER).isRequired,
};

export default RoleBasedGuard;
