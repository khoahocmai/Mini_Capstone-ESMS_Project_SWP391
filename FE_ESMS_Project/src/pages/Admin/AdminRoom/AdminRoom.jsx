import RoomTable from "@/components/Admin/RoomTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import { Divider } from "antd";

const AdminRoom = () => {
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
                Room
            </Divider>
            <RoomTable />
        </div>
    );
};

AdminRoom.propTypes = {};

export default AdminRoom;
