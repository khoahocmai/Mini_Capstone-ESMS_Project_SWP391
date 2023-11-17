import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Button, Input, Table, Tag, Typography, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as St from "./ScheduleDetail.styled";
import cookies from "@/utils/cookies";
import toast, { Toaster } from "react-hot-toast";
import { putExaminer } from "@/services/staffAddExaminer";

const ScheduleDetail = ({ noti, setNoti }) => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const pageSize = 10;
    const token = cookies.getToken();

    const [freeExaminer, setFreeExaminer] = useState([]);
    const [loadingSelect, setLoadingSelect] = useState(false);

    const [loadingButton, setLoadingButton] = useState(false);

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
            title: "Course",
            width: "18%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Num of Students",
            width: "18%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
        },
        {
            title: "Examiner",
            width: "20%",
            render: (record) => {
                if (record.examiner === "N/A") {
                    return <Tag color="default">EMPTY</Tag>;
                } else {
                    return <Tag color="volcano">{record.examiner}</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "19%",
            render: (record) => {
                if (record.status === 1 && record.examiner === "N/A") {
                    return (
                        <Typography.Link onClick={() => handleEdit(record)}>
                            Add examiner
                        </Typography.Link>
                    );
                } else {
                    return (
                        <Typography.Link disabled>Can not add</Typography.Link>
                    );
                }
            },
        },
    ];

    useEffect(() => {
        // call api here
        fetchScheduleDetail();
    }, [noti]);

    useEffect(() => {
        // call api here
        fetchFreeExaminer();
    }, []);

    const fetchScheduleDetail = () => {
        setLoading(true);
        instance
            .get(`examRooms/getExamRoomDetailByPhase?examSlotId=${param.id}`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
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

    const fetchFreeExaminer = () => {
        setLoadingSelect(true);
        instance
            .get(`examRooms/allExaminerInSlot?examslotId=${param.id}`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    value: item.examinerId,
                    label: item.examinerName,
                }));
                setFreeExaminer(formattedData);
                setLoadingSelect(false);
            })
            .catch((error) => {
                console.log(error);
                setFreeExaminer([]);
                setLoadingSelect(false);
            })
            .finally(() => {});
    };

    // const handleOk = () => {
    //     setLoadingButton(true);
    //     form.validateFields()
    //         .then((values) => {
    //             // console.log(values);
    //             instance
    //                 .put("examRooms/addExaminer", {
    //                     examRoomId: values.roomId,
    //                     examinerId: values.freeExaminer,
    //                     token: token,
    //                 })
    //                 .then(() => {
    //                     fetchScheduleDetail();
    //                     fetchFreeExaminer();
    //                     setLoadingButton(false);
    //                     setModalVisible(false);
    //                     form.resetFields();
    //                     toast.success("Add successfully!", {
    //                         style: {
    //                             borderRadius: "10px",
    //                             background: "#333",
    //                             color: "#fff",
    //                         },
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                     setLoadingButton(false);
    //                     toast.error("Can not add!", {
    //                         style: {
    //                             borderRadius: "10px",
    //                             background: "#333",
    //                             color: "#fff",
    //                         },
    //                     });
    //                 });
    //         })
    //         .catch((info) => {
    //             console.log("Validate Failed:", info);
    //         });
    // };

    const handleOk = async () => {
        setLoadingButton(true);
        form.validateFields()
            .then(async (values) => {
                try {
                    await putExaminer({
                        examRoomId: values.roomId,
                        examinerId: values.freeExaminer,
                    });
                    fetchScheduleDetail();
                    fetchFreeExaminer();
                    setLoadingButton(false);
                    setModalVisible(false);
                    form.resetFields();
                    setNoti(!noti);
                    toast.success("Add successfully!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                } catch (error) {
                    console.log(error);
                    setLoadingButton(false);
                    toast.error("Can not add!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
                setLoadingButton(false);
            });
    };

    const handleCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const handleEdit = (e) => {
        // console.log(e.examiner);
        if (e.examiner === "N/A") {
            form.setFieldsValue({
                courseCode: e.subCode,
                room: e.roomNum,
                examiner: "Empty",
                roomId: e.examroomId,
            });
        } else {
            form.setFieldsValue({
                courseCode: e.subCode,
                room: e.roomNum,
                examiner: e.examiner,
                roomId: e.examroomId,
            });
        }
        // console.log(e);
        // form.setFieldsValue({
        //     courseCode: e.subCode,
        //     room: e.roomNum,
        //     examiner: e.examiner,
        //     roomId: e.examroomId,
        // });
        setModalVisible(true);
    };

    // console.log(courseCode, room, examiner);

    const modalFooter = () => {
        return (
            <>
                <Button loading={loadingButton} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    loading={loadingButton}
                    type="primary"
                    onClick={handleOk}
                >
                    Submit
                </Button>
            </>
        );
    };

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 24,
        },
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <St.ModalStyled
                title="Edit information"
                open={modalVisible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter}
            >
                <Form
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    form={form}
                    name="courseCodeForm"
                >
                    <Form.Item
                        {...layout}
                        label="Course Code"
                        name="courseCode"
                        rules={[
                            {
                                required: false,
                                message: "Please input the course code!",
                            },
                        ]}
                        // initialValue={courseCode}
                    >
                        <Input placeholder="Course Code" disabled />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Room"
                        name="room"
                        rules={[
                            {
                                required: false,
                                message: "Please input the room!",
                            },
                        ]}
                        // initialValue={room}
                    >
                        <Input placeholder="Room" disabled />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Examiner"
                        name="examiner"
                        rules={[
                            {
                                required: false,
                                message: "Please input the examiner!",
                            },
                        ]}
                        // initialValue={examiner}
                    >
                        <Input placeholder="Examiner" disabled />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Change examiner"
                        name="freeExaminer"
                        rules={[
                            {
                                required: true,
                                message: "Please choose the examiner!",
                            },
                        ]}
                        // initialValue={selectFreeExaminer}
                    >
                        <Select
                            placeholder="Please choose the examiner!"
                            loading={loadingSelect}
                            // onChange={handleSelect}
                            // value={selectFreeExaminer}
                            className="select"
                            options={freeExaminer}
                        />
                    </Form.Item>

                    <Form.Item
                        name="roomId"
                        rules={[
                            {
                                required: false,
                                message: "Please choose the room id!",
                            },
                        ]}
                        hidden
                    >
                        <Input placeholder="Room Id" disabled />
                    </Form.Item>
                </Form>
            </St.ModalStyled>
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
        </>
    );
};

ScheduleDetail.propTypes = {
    noti: PropTypes.bool,
    setNoti: PropTypes.func,
};

export default ScheduleDetail;
