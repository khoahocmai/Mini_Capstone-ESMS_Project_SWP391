import PropTypes from "prop-types";
import { Flex, Modal, Typography } from "antd";
import moment from "moment";

const ModalSchedule = ({ event, isModalOpen, setIsModalOpen }) => {
    const day = moment(event.startTime).format("DD/MM/YYYY");

    const startTime = moment(event.startTime).format("HH:mm");

    const endTime = moment(event.endTime).format("HH:mm");
    // console.log(formattedDate);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        event && (
            <Modal
                title="Schedule detail"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Flex>
                    <Typography style={{ minWidth: 80 }}>Location:</Typography>
                    <Typography>{event.title}</Typography>
                </Flex>
                <Flex>
                    <Typography style={{ minWidth: 80 }}>Day:</Typography>
                    <Typography>
                        {day === "N/A" ? "Coming soon!" : day}
                    </Typography>
                </Flex>
                <Flex>
                    <Typography style={{ minWidth: 80 }}>Time:</Typography>
                    <Typography>
                        {startTime === "N/A" ? "Coming soon!" : startTime} -{" "}
                        {endTime === "N/A" ? "Coming soon!" : endTime}
                    </Typography>
                </Flex>
                <Flex>
                    <Typography style={{ minWidth: 80 }}>Room:</Typography>
                    <Typography>
                        {event.roomCode === "N/A"
                            ? "Coming soon!"
                            : event.roomCode}
                    </Typography>
                </Flex>
                <Flex>
                    <Typography style={{ minWidth: 80 }}>Subject:</Typography>
                    <Typography>
                        {event.subCode === "N/A"
                            ? "Coming soon!"
                            : event.subCode}
                    </Typography>
                </Flex>
            </Modal>
        )
    );
};

ModalSchedule.propTypes = {
    event: PropTypes.object,
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
};

export default ModalSchedule;
