import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookies from "@/utils/cookies";

const ExamRoomTable = ({ noti }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const token = cookies.getToken();
    const pageSize = 10;

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Room",
            width: "20%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
        },
        {
            title: "Location",
            width: "20%",
            render: (record) => {
                return <Typography>{record.location}</Typography>;
            },
        },
    ];

    useEffect(() => {
        // call api here
        fetchRoom();
    }, [noti]);

    const fetchRoom = () => {
        setLoading(true);
        instance
            .get(`examRooms/getRoomOneSlot?exSlotID=${param.id}`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                // console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setData([]);
                setLoading(false);
            })
            .finally(() => {});
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                bordered
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </div>
    );
};

ExamRoomTable.propTypes = {
    noti: PropTypes.bool,
};

export default ExamRoomTable;
