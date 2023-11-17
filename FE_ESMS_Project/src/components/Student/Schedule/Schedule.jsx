// import PropTypes from "prop-types";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Event from "../Schedule/Event";
import { useEffect, useState } from "react";
import ModalSchedule from "../Schedule/ModalSchedule";
import instance from "@/utils/instance";
import { Divider, Spin } from "antd";
import * as St from "./Schedule.styled.js";
import cookies from "@/utils/cookies";

const localizer = momentLocalizer(moment);
// localizer.formats.timeGutterFormat = "H:mm";

const Schedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({});
    const [data, setData] = useState([]);
    const start = new Date(0, 0, 0, 7, 0, 0);
    const end = new Date(0, 0, 0, 19, 0, 0);
    const token = cookies.getToken();
    const [loading, setLoading] = useState(true);

    const handleEvent = (event) => {
        setIsModalOpen(true);
        setEvent(event);
    };

    const eventPropGetter = ({ start }) => {
        const isPastEvent = start < new Date();

        const className = isPastEvent ? "past-event" : "future-event";

        return {
            className,
        };
    };

    const fetchData = () => {
        setLoading(true);
        instance
            .get("students/scheduleOfStu", {
                params: {
                    token: token,
                },
            })
            .then((res) => {
                console.log(res.data.data);

                const formattedData = res.data.data.map((item, index) => {
                    item.startTime = new Date(item.startTime);
                    item.endTime = new Date(item.endTime);

                    return {
                        ...item,
                        id: index + 1,
                        key: index + 1,
                        start: item.startTime,
                        end: item.endTime,
                        title: item.roomLocation,
                    };
                });
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Divider orientation="left">My Schedule</Divider>
            <ModalSchedule
                event={event}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <Spin spinning={loading}>
                <St.Calender
                    components={{
                        header: ({ date }) =>
                            moment(date).format("ddd (DD/MM)"),
                        event: Event,
                    }}
                    enableAutoScroll
                    localizer={localizer}
                    events={data}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 578 }}
                    min={start}
                    max={end}
                    eventPropGetter={eventPropGetter}
                    onSelectEvent={handleEvent}
                    popup
                    defaultView="week"
                    views={["month", "week", "day"]}
                />
            </Spin>
        </div>
    );
};

Schedule.propTypes = {};

export default Schedule;
