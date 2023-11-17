// import PropTypes from "prop-types";

import ExaminerTable from "@/components/Staff/ExaminerTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const StaffExam = () => {
    useScrollTopContent();

    return (
        <div>
            <ExaminerTable />
        </div>
    );
};

StaffExam.propTypes = {};

export default StaffExam;
