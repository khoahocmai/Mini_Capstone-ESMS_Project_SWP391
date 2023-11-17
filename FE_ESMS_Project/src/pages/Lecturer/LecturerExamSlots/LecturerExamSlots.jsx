// import PropTypes from "prop-types";

import CancelRegisterTable from "@/components/Lecturer/MyExamSlot";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const LecturerExamPhase = () => {
    useScrollTopContent();

    return (
        <div>
            <CancelRegisterTable /> 
        </div>
    );
};

LecturerExamPhase.propTypes = {};

export default LecturerExamPhase;
