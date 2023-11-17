// import PropTypes from 'prop-types'

import SlotTable from "@/components/Admin/SlotTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminSlots = () => {
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
                Time Slot
            </Divider>
            <SlotTable />
        </div>
    );
};

AdminSlots.propTypes = {};

export default AdminSlots;
