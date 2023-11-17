import styled from "styled-components";
import { Modal, Table } from "antd";
import Theme from "@/Theme";

export const DivTable = styled.div`
    margin-top: 20px;
    padding-top: 50px;
    position: relative;

    .ant-modal-title {
        font-family: ${Theme.font.primary_font};
    }

    .ant-picker-input {
        width: 100%;
    }

    .ant-modal-close {
        display: none;
    }
`;

export const StyledTable = styled(Table)`
    .ant-table-cell {
        height: 65px;
        font-family: ${Theme.font.primary_font};
        font-size: 1.5rem;
    }

    .ant-typography {
        font-family: ${Theme.font.primary_font};
        font-size: 1.4rem;
    }

    .ant-tag {
        font-family: ${Theme.font.primary_font};
    }
`;

export const ModalStyled = styled(Modal)`
    .ant-modal-close {
        display: none;
    }
`;
