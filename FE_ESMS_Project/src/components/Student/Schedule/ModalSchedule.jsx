import PropTypes from "prop-types";
import { Flex, Modal, Typography } from "antd";
import moment from "moment";

const ModalSchedule = ({ event, isModalOpen, setIsModalOpen }) => {
    const day = moment(event.startTime).format("DD/MM/YYYY");

    const startTime = moment(event.startTime).format("HH:mm");

    const endTime = moment(event.endTime).format("HH:mm");

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal
                title="Schedule detail"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Flex>
                    <Typography style={{ minWidth: 80 }}>
                        Subject Code:
                    </Typography>
                    <Typography>{event.subCode}</Typography>
                </Flex>
                <Flex>
                    <Typography style={{ minWidth: 80 }}>
                        Subject Name:
                    </Typography>
                    <Typography>{event.subName}</Typography>
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
                    <Typography>{event.roomNum}</Typography>
                </Flex>
            </Modal>
        </div>
    );
};

ModalSchedule.propTypes = {
    event: PropTypes.object,
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
};

export default ModalSchedule;
