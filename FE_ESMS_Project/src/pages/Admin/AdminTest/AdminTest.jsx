// import PropTypes from "prop-types";

import Test from "@/components/ExcelFile";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminTest = () => {
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
                Test
            </Divider>
            <Test />
        </div>
    );
};

AdminTest.propTypes = {};

export default AdminTest;
