import { Modal, Tabs } from "antd";
import styled from "styled-components";

export const TabsStyled = styled(Tabs)`
    .ant-tabs-tab {
        padding: 12px 20px;

        .ant-tabs-tab-btn {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .ant-tabs-nav-list {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .ant-pagination-item {
        margin: 0 8px 0 0;
        padding: 0;
    }

    .ant-pagination-prev {
        margin: 0 8px 0 0;
        padding: 0;
    }

    .ant-pagination-next {
        margin: 0;
        padding: 0;
    }
`;

export const ModalStyled = styled(Modal)`
    .ant-modal-close {
        display: none;
    }
`;
