import PropTypes from "prop-types";

import { Select } from "antd";

const SelectOption = ({ options, defaultValue }) => {
    return (
        <div>
            <Select
                style={{ minWidth: 130, marginRight: 20 }}
                defaultValue={defaultValue}
                options={options}
            />
        </div>
    );
};

SelectOption.propTypes = {
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.string,
};

export default SelectOption;
