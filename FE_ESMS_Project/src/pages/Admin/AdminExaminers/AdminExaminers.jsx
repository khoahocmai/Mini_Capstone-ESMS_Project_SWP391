// import PropTypes from "prop-types";

import ExaminerTable from "@/components/Admin/ExaminerTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminExaminers = () => {
    useScrollTopContent();

    return (
        <div>
            <Divider
                orientation="left"
                style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                }}
            >
                Examiner
            </Divider>
            <ExaminerTable />
        </div>
    );
};

AdminExaminers.propTypes = {};

export default AdminExaminers;
