// import PropTypes from "prop-types";

import Schedule from "@/components/Schedule";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const LecturerSchedule = () => {
    useScrollTopContent();

    return (
        <div>
            <Schedule />
        </div>
    );
};

LecturerSchedule.propTypes = {};

export default LecturerSchedule;
