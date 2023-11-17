import { Typography } from "antd";
import styled from "styled-components";
import Theme from "../../Theme";

export const PopupTitle = styled(Typography.Text)`
    font-size: 2rem;
`;

export const PopupDesc = styled(Typography.Text)`
    color: orange;
    cursor: pointer;
`;

export const DivHeader = styled.div`
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const DivContent = styled.div`
    width: 400px;
    max-height: 68vh;
    overflow-y: auto;
    overscroll-behavior: contain;

    .item {
        background-color: ${Theme.color.notification_color};
        margin: 0px 8px 8px 8px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        cursor: pointer;
        padding: 8px 32px 8px 8px;
        transition: background-color 0.3s;

        &::before {
            background-color: #3ea6ff;
            border-radius: 50%;
            content: "";
            display: block;
            height: 10px;
            position: absolute;
            right: 8px;
            width: 10px;
        }
    }

    .image__wrapper {
        border-radius: 50%;
        flex-shrink: 0;
        height: 40px;
        position: relative;
        width: 40px;
        margin-right: 10px;

        .image {
            width: 100%;
            height: 100%;

            .img {
                border-radius: 50%;
                height: 100%;
                object-fit: cover;
                width: 100%;
            }
        }
    }

    .desc__wrapper {
        color: black;
        flex: 1 1;
        font-size: 1.4rem;
        line-height: 18px;
        padding: 0 10px 0 6px;
        word-break: break-word;

        .desc__footer {
            color: ${Theme.color.desc_color};
            font-size: 1.3rem;
            font-weight: 500;
            margin-top: 6px;
        }
    }
`;
