// import PropTypes from "prop-types";

import UserTable from "@/components/Admin/UserTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminUser = () => {
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
                User
            </Divider>
            <UserTable />
        </div>
    );
};

AdminUser.propTypes = {};

export default AdminUser;
