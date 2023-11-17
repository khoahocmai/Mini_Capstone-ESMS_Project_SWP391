import PropTypes from "prop-types";
import * as St from "./ButtonAdd.styled";

const ButtonAdd = ({ setModalVisible, title, disabled }) => {
    const handleAdd = () => {
        setModalVisible(true);
    };
    return (
        <St.DivStyled>
            <St.ButtonTable
                disabled={disabled}
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                {title}
            </St.ButtonTable>
        </St.DivStyled>
    );
};

ButtonAdd.propTypes = {
    setModalVisible: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

export default ButtonAdd;
