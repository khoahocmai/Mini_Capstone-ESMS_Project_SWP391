// import PropTypes from "prop-types";

import { Typography } from "antd";

import PropTypes from "prop-types";

const Event = ({ event }) => {
    return (
        <div>
            <Typography className="title">Subject: {event.subCode}</Typography>
            {/* <Typography className="title">Status: {event.status}</Typography> */}
        </div>
    );
};

Event.propTypes = {
    event: PropTypes.object.isRequired,
};

export default Event;
