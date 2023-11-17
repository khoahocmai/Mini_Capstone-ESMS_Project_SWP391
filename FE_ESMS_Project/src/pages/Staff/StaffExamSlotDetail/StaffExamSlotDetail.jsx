// import PropTypes from "prop-types";

import { Button, Divider, Form, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useLocation, useParams } from "react-router-dom";
import * as St from "./StaffExamSlotDetail.styled";
import CourseTable from "@/components/Staff/ExamSlotDetail/CourseTable";
import ExamRoomTable from "@/components/Staff/ExamSlotDetail/ExamRoomTable";
import ExaminerTable from "@/components/Staff/ExamSlotDetail/ExaminerTable";
import ScheduleDetail from "@/components/Staff/ExamSlotDetail/ScheduleDetail";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import useScrollTopContent from "@/hooks/useScrollTopContent";
import toast, { Toaster } from "react-hot-toast";
import cookies from "@/utils/cookies";
import { postNewStaff } from "@/services/staffDetailServices";

const StaffExamPhaseDetail = () => {
    useScrollTopContent();

    const { state } = useLocation();
    const param = useParams();
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectCourses, setSelectCourses] = useState();
    const [defaultValue, setDefaultValue] = useState();
    const [buttonStatus, setButtonStatus] = useState(true);
    const [buttonOk, setButtonOk] = useState(false);
    const [phaseId, setPhaseId] = useState(0);
    const [message, setMessage] = useState(true);

    const [noti, setNoti] = useState(false);

    const token = cookies.getToken();
    // console.log(state);

    const items = [
        {
            key: "1",
            label: "Course",
            children: <CourseTable noti={noti} />,
        },
        {
            key: "2",
            label: "Room",
            children: <ExamRoomTable noti={noti} />,
        },
        {
            key: "3",
            label: "Examiner",
            children: <ExaminerTable noti={noti} />,
        },
        {
            key: "4",
            label: "Schedule Detail",
            children: <ScheduleDetail setNoti={setNoti} noti={noti} />,
        },
    ];

    useEffect(() => {
        setPhaseId(state.phaseId);
    }, []);

    useEffect(() => {
        fetchCourse();
    }, [phaseId]);

    const fetchCourse = () => {
        setMessage(true);
        // console.log(phaseId);
        // setButtonStatus(true);
        if (phaseId !== 0) {
            instance
                .get(`studentExams?ePId=${phaseId}`, {
                    params: {
                        exslotId: param.id,
                        token: token,
                    },
                })
                .then((res) => {
                    // console.log(res.data);
                    if (
                        res.data.message ===
                        "All courses and students are scheduled"
                    ) {
                        // setMessage(false);
                        // console.log("message");
                        setButtonStatus(false);
                    } else {
                        const formattedData = res.data.data.map((item) => ({
                            value: item.courId,
                            label: item.subCode + " - " + item.numOfStu,
                        }));
                        setSelectCourses(formattedData[0].label);
                        setDefaultValue(formattedData[0].value);
                        setCourses(formattedData);
                        setButtonStatus(false);
                        setMessage(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    // const handleOk = () => {
    //     setButtonOk(true);

    //     form.validateFields()
    //         .then((values) => {
    //             if (values.course === selectCourses) {
    //                 values.course = defaultValue;
    //             }

    //             toast("Please allow time for generation!", {
    //                 icon: "😰",
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#333",
    //                     color: "#fff",
    //                 },
    //             });

    //             instance
    //                 .post(`subInSlots`, {
    //                     courId: values.course,
    //                     examSlotId: param.id,
    //                     numStu: values.numOfStu,
    //                     token: token,
    //                 })
    //                 .then((res) => {
    //                     fetchCourse();
    //                     setButtonOk(false);
    //                     setModalVisible(false);
    //                     form.resetFields();
    //                     toast.success("Successfully created!", {
    //                         style: {
    //                             borderRadius: "10px",
    //                             background: "#333",
    //                             color: "#fff",
    //                         },
    //                     });
    //                     if (res) {
    //                         setNoti(!noti);
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     fetchCourse();
    //                     console.log(error);
    //                     setButtonOk(false);
    //                     setModalVisible(false);
    //                     form.resetFields();
    //                     toast.error("This is an error!", {
    //                         style: {
    //                             borderRadius: "10px",
    //                             background: "#333",
    //                             color: "#fff",
    //                         },
    //                     });
    //                     if (error) {
    //                         setNoti(!noti);
    //                     }
    //                 })
    //                 .finally(() => {});
    //             // setNoti(!noti);
    //         })
    //         .catch((error) => {
    //             console.log("Validate Failed:", error);
    //         });
    // };

    const handleOk = () => {
        setButtonOk(true);

        form.validateFields()
            .then(async (values) => {
                if (values.course === selectCourses) {
                    values.course = defaultValue;
                }

                toast("Please wait few seconds for the generation!", {
                    icon: "😰",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });

                const res = await postNewStaff({
                    courId: values.course,
                    examSlotId: param.id,
                    numStu: values.numOfStu,
                });

                fetchCourse();
                setButtonOk(false);
                setModalVisible(false);
                form.resetFields();
                toast.success("Successfully created!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                if (res) {
                    setNoti(!noti);
                }
            })
            .catch((error) => {
                fetchCourse();
                console.log(error);
                setButtonOk(false);
                setModalVisible(false);
                form.resetFields();
                toast.error("This is an error!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                if (error) {
                    setNoti(!noti);
                }
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const operations = (
        <Button
            disabled={message}
            loading={buttonStatus}
            onClick={handleAdd}
            type="primary"
        >
            Assign Course
        </Button>
    );

    const modalFooter = () => {
        return (
            <>
                <Button loading={buttonOk} onClick={handleOk} type="primary">
                    Submit
                </Button>

                <Button loading={buttonOk} onClick={handleCancel}>
                    Cancel
                </Button>
            </>
        );
    };

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 8,
        },
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
                {state.item}
            </Divider>
            <St.ModalStyled
                title="Add new course"
                open={modalVisible}
                onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter()}
            >
                <Form
                    form={form}
                    name="add_row_form"
                    style={{ marginTop: "20px" }}
                >
                    <Form.Item
                        {...layout}
                        label="Course"
                        name="course"
                        rules={[
                            {
                                required: true,
                                message: "Please choose a course!",
                            },
                        ]}
                        // initialValue={selectCourses}
                    >
                        <Select
                            // onChange={handleSelect}
                            // value={selectTimeSlot}
                            className="select"
                            options={courses}
                            placeholder="Choose a course"
                        />
                    </Form.Item>
                    <Form.Item
                        {...layout}
                        label="Number of Student"
                        name="numOfStu"
                        rules={[
                            {
                                required: true,
                                message: "Please input number of student!",
                            },
                        ]}
                    >
                        <Input placeholder="Number of Students" />
                    </Form.Item>
                </Form>
            </St.ModalStyled>
            <St.TabsStyled
                tabBarExtraContent={operations}
                defaultActiveKey="1"
                items={items}
            />
        </>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
