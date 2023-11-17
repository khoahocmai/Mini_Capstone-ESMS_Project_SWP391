// import PropTypes from "prop-types";
import { LecDashboard } from "@/components/Lecturer/DashboardTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const LecturerDashboard = () => {
    useScrollTopContent();

    return (
        <div>
            <LecDashboard />
        </div>
    );
};

LecturerDashboard.propTypes = {};

export default LecturerDashboard;
