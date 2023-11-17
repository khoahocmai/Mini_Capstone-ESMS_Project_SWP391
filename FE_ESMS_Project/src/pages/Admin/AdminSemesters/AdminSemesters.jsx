// import PropTypes from 'prop-types'

import SemesterTable from "@/components/Admin/SemesterTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminSemesters = () => {
    useScrollTopContent();

    return (
        <div>
            <Divider
                orientation="left"
                style={{ fontFamily: "Inter", fontSize: "1.8rem" }}
            >
                Semester
            </Divider>
            <SemesterTable />
        </div>
    );
};

AdminSemesters.propTypes = {};

export default AdminSemesters;
