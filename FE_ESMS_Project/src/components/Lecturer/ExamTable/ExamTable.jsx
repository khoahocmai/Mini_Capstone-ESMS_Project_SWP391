// import PropTypes from "prop-types";

import { Button, Divider, Popconfirm, Table, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import * as St from "./ExamTable.styled";
import instance from "@/utils/instance";
import { useParams } from "react-router-dom";
import cookies from "@/utils/cookies";
import toast, { Toaster } from "react-hot-toast";
import { putRegister } from "@/services/lecturerRegister";

const ExamTable = () => {
    const { id } = useParams();
    // console.log(id);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = cookies.getToken();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        instance
            .get(`examiners/examPhaseId?examPhaseId=${id}`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                // console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    no: index + 1,
                    startTime: item.startTime.slice(0, 5),
                    endTime: item.endTime.slice(0, 5),
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                // setLoading(false);
            });
    };

    // const handleAdd = (e) => {
    //     setLoading(true);
    //     // console.log(e);
    //     instance
    //         .put("examRooms/lecturer", {
    //             token: token,
    //             startTime: e.startTime,
    //             endTime: e.endTime,
    //             day: e.day,
    //             exPhaseId: id,
    //         })
    //         .then(() => {
    //             // console.log(res);
    //             toast.success("Successfully registed !");
    //             fetchData();
    //         })
    //         .catch((error) => {
    //             toast.error("This is an error!");
    //             console.log(error);
    //         })
    //         .finally(() => {});
    // };

    const handleAdd = async (e) => {
        try {
            setLoading(true);
            await putRegister({
                startTime: e.startTime,
                endTime: e.endTime,
                day: e.day,
                exPhaseId: id,
            });
            toast.success("Successfully registed !");
            fetchData();
        } catch (error) {
            setLoading(false);
            toast.error("This is an error!");
            console.log(error);
        }
    };

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Day",
            width: "25%",
            render: (record) => {
                return <div>{record.day}</div>;
            },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <div>{record.startTime}</div>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <div>{record.endTime}</div>;
            },
        },
        {
            title: "Available Slot",
            width: "15%",
            render: (record) => {
                return <div>{record.available}</div>;
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (record) => {
                if (record.register === 1 && record.available > 0) {
                    return (
                        <Popconfirm
                            title="Sure to register?"
                            onConfirm={() => handleAdd(record)}
                        >
                            <Typography.Link>Register</Typography.Link>
                        </Popconfirm>
                    );
                } else {
                    return (
                        <Typography.Link disabled>
                            Can not register
                        </Typography.Link>
                    );
                }
            },
            // data.length >= 1 ? (
            //     <Popconfirm
            //         title="Sure to register?"
            //         onConfirm={() => handleAdd(record.key)}
            //     >
            //         <Typography.Link>Register</Typography.Link>
            //     </Popconfirm>
            // ) : null,
        },
    ];

    const handleBack = () => {
        window.history.back();
    };

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />

            <Divider orientation="left">
                <Button onClick={handleBack} style={{ marginRight: 10 }}>
                    <ArrowLeftOutlined />
                </Button>
                Register
            </Divider>
            <Table
                scroll={{ x: true }}
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                    showSizeChanger: false,
                }}
            />
        </St.DivTable>
    );
};

ExamTable.propTypes = {};

export default ExamTable;
