import { Menu } from "antd";
import styled from "styled-components";
import Theme from "../../Theme";

export const DivAvatar = styled.div`
    margin-right: 30px;
    cursor: pointer;

    .avatar__wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: ${Theme.color.white_color};
        box-shadow: 0px 0px 8px 2px #dfdfdf;
        height: 40px;
        border-radius: 999px;
    }

    .avatar__icon {
        margin-right: 4px;
    }

    .avatar__content {
        padding: 0px 10px 0px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .avatar__title {
            margin: 4px;
            line-height: 1rem;
            font-size: 1.6rem;
            font-weight: 600;
            font-family: ${Theme.font.primary_font};
            color: ${Theme.color.black_1};
        }

        .avatar__desc {
            line-height: 1.6rem;
            font-size: 1.2rem;
            font-family: ${Theme.font.primary_font};
            color: ${Theme.color.gray_4};
        }
    }

    .ant-avatar-lg.ant-avatar-icon {
        font-size: 24px;
    }

    .ant-avatar-lg {
        width: 35px;
        height: 35px;
    }
`;

export const MenuLogo = styled(Menu)`
    color: red;
    background-color: ${Theme.color.white_color};
`;

export const SideDiv = styled.div`
    margin: 10px;
    height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .sidebar__image {
        margin-left: 10px;
        margin-right: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;

        .image {
            border-radius: 10px;
            width: 100%;
            height: 100%;
        }
    }

    .sidebar__heading {
        font-size: 1.8rem;
        color: ${Theme.color.blue_4};

        font-family: ${Theme.font.primary_font};
    }
`;
