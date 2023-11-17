// import PropTypes from "prop-types";
import { useState } from "react";
import * as St from "./Toggle.styled";

const Toggle = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleOnChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    return (
        <St.StyledDiv className="container">
            <div className={`wrapper ${isSwitchOn ? "switch" : ""}`}>
                <label for="switch">
                    <input
                        id="switch"
                        type="checkbox"
                        onChange={handleOnChange}
                    />
                    <div className="toggle-wrapper">
                        <div className="day-night"></div>
                        <div className="tree-left">
                            <div className="tree"></div>
                            <div className="trunk">
                                <div className="branch"></div>
                                <div className="branch"></div>
                            </div>
                        </div>
                        <div className="tree-right">
                            <div className="tree-back">
                                <div className="trunk"></div>
                            </div>
                            <div className="tree-front">
                                <div className="trunk"></div>
                            </div>
                        </div>
                        <div className="moon"></div>
                        <div className="stars">
                            <div className="star big-star">
                                <div className="vertical"></div>
                                <div className="horizontal"></div>
                            </div>
                            <div className="star small-star">
                                <div className="vertical"></div>
                                <div className="horizontal"></div>
                            </div>
                        </div>
                        <div className="sun"></div>
                        <div className="hills">
                            <div className="hill-left"></div>
                            <div className="hill-right"></div>
                        </div>
                    </div>
                </label>
            </div>
        </St.StyledDiv>
    );
};

Toggle.propTypes = {};

export default Toggle;
