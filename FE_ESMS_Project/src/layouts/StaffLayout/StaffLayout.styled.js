import styled from "styled-components";
import { Layout } from "antd";
import Theme from "@/Theme";

const { Sider } = Layout;

export const StyleSider = styled(Sider)`
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-layout-sider-zero-width-trigger {
        top: 10px;
    }

    .ant-layout-sider-children {
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        .top__wrapper,
        .bottom__wrapper {
            width: 100%;
        }

        .ant-menu {
            background-color: white;
            /* margin-top: 20px; */

            .ant-menu-item-group-title {
                font-family: ${Theme.font.primary_font};
            }
        }

        .ant-menu-title-content {
            font-family: ${Theme.font.primary_font};
        }

        .ant-menu-light .ant-menu-item-selected {
            background-color: ${Theme.color.main_color};
            color: white;
        }
    }
`;

export const SideDiv = styled.div`
    margin: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 12px;
    border: 3px solid #f5f5f5;

    .sidebar__image {
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
        color: ${Theme.primary_color_background};

        font-family: ${Theme.font.primary_font};
    }
`;
