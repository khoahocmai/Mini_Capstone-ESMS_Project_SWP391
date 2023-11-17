// import PropTypes from "prop-types";

import { Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./ExamSlot.styled";
import instance from "@/utils/instance";
import cookies from "@/utils/cookies";

const ExamSlot = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const token = cookies.getToken();
    const pageSize = 10;

    const fetchData = () => {
        setLoading(true);

        if (semesterId !== 0) {
            instance
                .get(
                    `students/scheduleOfStuBySemester?semesterId=${semesterId}`,
                    {
                        params: {
                            token: token,
                        },
                    }
                )
                .then((res) => {
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                    }));
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    setData([]);
                    setLoading(false);
                    console.log(error);
                })
                .finally(() => {});
        }
    };

    const fetchSemester = () => {
        instance
            .get("semesters/otherRole")
            .then((res) => {
                const semestersData = res.data.data.map((item) => ({
                    label: item.season + " " + item.year,
                    value: item.id,
                    status: item.status,
                }));
                const newData = semestersData.reverse();
                setSemesterId(newData[0].value);
                setSelectSemester(newData[0].label);
                setSemesters(newData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

    const handleSelectSemester = (id, option) => {
        if (id !== semesterId) {
            setSelectSemester(option.label);
            setSemesterId(id);
        }
    };

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Subject Code",
            width: "15%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Subject Name",
            width: "30%",
            render: (record) => {
                return <Typography>{record.subName}</Typography>;
            },
        },
        {
            title: "Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.day}</Typography>;
            },
            // onCell: (record, rowIndex) => {
            //     let rowSpan = 1;
            //     if (rowIndex > 0 && data[rowIndex - 1].day === record.day) {
            //         rowSpan = 0;
            //     } else {
            //         let count = 0;
            //         while (
            //             rowIndex + count < data.length &&
            //             data[rowIndex + count].day === record.day
            //         ) {
            //             count++;
            //         }
            //         rowSpan = count;
            //     }
            //     return {
            //         rowSpan: rowSpan,
            //     };
            // },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
        },
        {
            title: "Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.time}</Typography>;
            },
        },
        // {
        //     title: "Location",
        //     width: "15%",
        //     render: (record) => {
        //         return <Typography>{record.location}</Typography>;
        //     },
        // },
    ];

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelectSemester}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
            </St.StyledLeft>

            <Table
                scroll={{ x: true }}
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                    showSizeChanger: false,
                }}
            />
        </St.DivTable>
    );
};

ExamSlot.propTypes = {};

export default ExamSlot;
