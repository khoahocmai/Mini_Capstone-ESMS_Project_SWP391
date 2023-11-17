// import PropTypes from "prop-types";

import { Button, DatePicker, Divider, Form, Modal, Select, Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import * as St from "./ExamSlotTable.styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import configs from "@/configs";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";
import toast, { Toaster } from "react-hot-toast";
import { postExamSlot } from "@/services/staffExamSlot";
import dayjs from "dayjs";

const ExamPhaseTable = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectTimeSlot, setSelectTimeSlot] = useState();
    const [defaultValue, setDefaultValue] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [statusButton, setStatusButton] = useState(false);
    const pageSize = 10;
    const [day, setDay] = useState("");

    const token = cookies.getToken();

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Day",
            width: "30%",
            render: (record) => {
                return <div>{record.day}</div>;
            },
        },
        {
            title: "Start Time",
            width: "20%",
            render: (record) => {
                return <div>{record.startTime}</div>;
            },
        },
        {
            title: "End Time",
            width: "20%",
            render: (record) => {
                return <div>{record.endTime}</div>;
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        style={{ background: "#5194f2" }}
                        onClick={() => handleEdit(record)}
                    >
                        Detail
                    </Button>
                );
            },
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchTimeSlot();
    }, [semesterId]);

    const fetchData = () => {
        if (state.data.status === true) {
            setStatusButton(true);
        }
        setSemesterId(state.data.semId);
        instance
            .get(`examSlots/${id}`, {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
                    startTime: item.timeSlot.startTime.slice(0, -3),
                    endTime: item.timeSlot.endTime.slice(0, -3),
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setData([]);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchTimeSlot = () => {
        if (semesterId !== 0) {
            instance
                .get(`timeSlots/des?examphaseId=${id}&semesterId=${semesterId}`)
                .then((res) => {
                    if (id !== 0) {
                        const formattedData = res.data.data.map((item) => ({
                            value: item.id,
                            label:
                                item.startTime.slice(0, -3) +
                                "-" +
                                item.endTime.slice(0, -3),
                        }));
                        setSelectTimeSlot(formattedData[0].label);
                        setDefaultValue(formattedData[0].value);
                        setTimeSlots(formattedData);
                        setButtonStatus(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setTimeSlots([]);
                })
                .finally(() => {});
        }
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    // const handleOk = () => {
    //     form.validateFields()
    //         .then((values) => {
    //             if (values.slot === selectTimeSlot) {
    //                 values.slot = defaultValue;
    //             }
    //             // console.log(id, values.day, values.slot);
    //             instance
    //                 .post(`examSlots`, {
    //                     ePId: id,
    //                     timeSlotId: values.slot,
    //                     day: values.day,
    //                     token: token,
    //                 })
    //                 .then((res) => {
    //                     toast.success("Successfully created!");
    //                     console.log(res);
    //                     fetchData();
    //                     setModalVisible(false);
    //                     form.resetFields();
    //                 })
    //                 .catch((error) => {
    //                     toast.error("This is an error");
    //                     console.log(error.response.data.message);
    //                 });
    //         })
    //         .catch((error) => {
    //             console.log("Validate Failed:", error);
    //         });
    // };

    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                try {
                    if (values.slot === selectTimeSlot) {
                        values.slot = defaultValue;
                    }
                    console.log(id, day, values.slot);
                    await postExamSlot({
                        ePId: id,
                        timeSlotId: values.slot,
                        day: day,
                    });
                    toast.success("Successfully created!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                    // console.log(res);
                    fetchData();
                    setModalVisible(false);
                    form.resetFields();
                } catch (error) {
                    toast.error("This is an error", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                    console.log(error.response.data.message);
                }
            })
            .catch((error) => {
                console.log("Validate Failed:", error);
            });
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf("day");
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleEdit = (e) => {
        // navigate(configs.routes.staff + `/examSlot/${e.id}`);
        // console.log(state.data);
        // console.log(e);

        navigate(configs.routes.staff + `/examSlotDetail/${e.id}`, {
            state: {
                item:
                    "Day: " +
                    e.day +
                    " Time: " +
                    e.timeSlot.startTime.slice(0, 5) +
                    "-" +
                    e.timeSlot.endTime.slice(0, 5),
                phaseId: id,
            },
        });
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleAuto = () => {
        instance
            .get(`autoCreateExamRooms`, {
                params: {
                    examPhaseId: id,
                    token: token,
                },
            })
            .then(() => {
                // console.log(res);
                fetchData();
            })
            .catch((error) => {
                // console.log(error.response.data.message);
                toast.error(error.response.data.message, {
                    // icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            });
    };

    // const onChangeDay = (_, date) => {
    //     // console.log(date);
    //     setDay(date);
    // };
    // const handleSelect = (id, option) => {};

    const onChangeDay = (_, date) => {
        setDay(date);
    };

    const layout = {
        labelCol: {
            span: 6,
        },
        labelAlign: "left",
        wrapperCol: {
            span: 24,
        },
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <Divider orientation="left">
                <Button onClick={handleBack} style={{ marginRight: 10 }}>
                    <ArrowLeftOutlined />
                </Button>
                {state.data.ePName +
                    " - " +
                    state.data.startDay +
                    " - " +
                    state.data.endDay}
            </Divider>

            <St.DivTable>
                {statusButton ? (
                    <St.FlexStyled>
                        <Button
                            style={{ marginRight: 14 }}
                            type="primary"
                            onClick={handleAuto}
                        >
                            Auto Generate
                        </Button>
                        <Button
                            loading={buttonStatus}
                            type="primary"
                            style={{ marginBottom: 16 }}
                            onClick={handleAdd}
                        >
                            Add a exam slot
                        </Button>
                    </St.FlexStyled>
                ) : null}
                <Modal
                    title="Add a slot"
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} name="add_row_form">
                        <Form.Item
                            {...layout}
                            label="Day"
                            name="day"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the day!",
                                },
                            ]}
                        >
                            <DatePicker
                                disabledDate={disabledDate}
                                onChange={onChangeDay}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                        <Form.Item
                            {...layout}
                            label="Time slot"
                            name="slot"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the slot!",
                                },
                            ]}
                            // initialValue={selectTimeSlot}
                        >
                            <Select
                                // onChange={handleSelect}
                                // value={selectTimeSlot}
                                className="select"
                                options={timeSlots}
                                placeholder="Choose a slot"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={loading}
                    pagination={{
                        pageSize: pageSize,
                        hideOnSinglePage: data.length <= pageSize,
                    }}
                />
            </St.DivTable>
        </>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
