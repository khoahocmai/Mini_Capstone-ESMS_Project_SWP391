import Theme from "@/Theme";
import { Button, Flex, Table } from "antd";
import styled from "styled-components";

export const DivSlot = styled.div`
    margin-top: 20px;
    padding-top: 40px;
    position: relative;

    .ant-btn-default {
        font-family: ${Theme.font.primary_font};
    }

    .ant-btn-primary {
        font-family: ${Theme.font.primary_font};
    }

    .ant-form-item .ant-form-item-explain-error {
        font-family: ${Theme.font.primary_font};
    }

    .ant-picker-dropdown .ant-picker-ranges {
        font-family: ${Theme.font.primary_font};
    }

    .ant-form-item {
        color: ${Theme.color.green_1};
    }
`;

export const FlexStyled = styled(Flex)`
    display: flex;
    justify-content: center;
    align-items: center;

    .form__title {
        min-width: 100px;
        font-family: ${Theme.font.primary_font};
        font-weight: 500;
    }
    .form__input {
        width: 100%;
        font-family: ${Theme.font.primary_font} !important;
        font-weight: 300;
    }
`;

export const StyledLeft = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
        margin-right: 10px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.6rem;
        line-height: 1;
        font-weight: 500;
        font-family: ${Theme.font.primary_font};
    }

    .select {
        min-width: 120px;
        font-family: ${Theme.font.primary_font};
    }

    .ant-select-item-option-content {
        font-family: ${Theme.font.primary_font} !important;
    }
`;

export const ButtonRight = styled(Button)`
    position: absolute;
    right: 0;
    top: 0;
`;

export const SlotTable = styled(Table)`
    margin-top: 10px;
    .ant-table-cell {
        height: 65px;
        font-family: ${Theme.font.primary_font};
        font-size: 1.5rem;
    }

    .ant-typography {
        font-family: ${Theme.font.primary_font};
        font-size: 1.4rem;
    }

    .ant-picker {
        width: 100%;
    }

    .ant-tag {
        font-family: ${Theme.font.primary_font};
    }
`;
