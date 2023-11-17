// import PropTypes from "prop-types";
import DashboardTable from "@/components/Staff/DashboardTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const StaffDashboard = () => {
    useScrollTopContent();

    return (
        <div>
            <DashboardTable />
        </div>
    );
};

StaffDashboard.propTypes = {};

export default StaffDashboard;
