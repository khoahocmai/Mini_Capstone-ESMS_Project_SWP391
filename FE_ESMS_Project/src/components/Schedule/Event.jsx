// import PropTypes from "prop-types";

import { Typography } from "antd";

import PropTypes from "prop-types";

const Event = ({ event }) => {
    // console.log(event);

    return <Typography className="title">Location: {event.title}</Typography>;
};

Event.propTypes = {
    event: PropTypes.object.isRequired,
};

export default Event;
