import configs from "@/configs";
import useAuth from "@/hooks/useAuth";
import { ADMIN, LECTURER, STAFF, STUDENT } from "@/utils/constants";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
    const { user, isInitialized, isAuthenticated } = useAuth();

    if (!isInitialized) return <div>loading</div>;

    if (isAuthenticated) {
        switch (user.role) {
            case ADMIN:
                return <Navigate to={configs.routes.admin} />;

            case STAFF:
                return <Navigate to={configs.routes.staff} />;

            case LECTURER:
                return <Navigate to={configs.routes.lecturer} />;

            case STUDENT:
                return <Navigate to={configs.routes.studentExamSlots} />;

            default:
                return <Navigate to={configs.routes.login} />;
        }
    }

    return <>{children}</>;
};

GuestGuard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GuestGuard;
