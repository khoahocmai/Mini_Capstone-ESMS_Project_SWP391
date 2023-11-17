// import PropTypes from "prop-types";

import ExamTable from "@/components/Lecturer/ExamTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const LecturerRegister = () => {
    useScrollTopContent();

    return (
        <div>
            <ExamTable />
        </div>
    );
};

LecturerRegister.propTypes = {};

export default LecturerRegister;
