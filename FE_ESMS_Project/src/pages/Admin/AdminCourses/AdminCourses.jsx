// import PropTypes from "prop-types";

import CourseTable from "@/components/Admin/CourseTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminCourses = () => {
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
                Course
            </Divider>
            <CourseTable />
        </div>
    );
};

AdminCourses.propTypes = {};

export default AdminCourses;
