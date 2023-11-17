// import PropTypes from "prop-types";
import { Avatar, Badge, Layout, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import * as St from "./HeaderLayout.styled";
import PopUpOver from "../PopUpOver";
import useAuth from "@/hooks/useAuth";
// import avatar from "../../assets/images/avatar.jpg";

const { Header } = Layout;

const HeaderLayout = () => {
    const { user } = useAuth();

    return (
        <Header
            style={{
                margin: "0 15px",
                padding: 0,
                background: "white",
            }}
        >
            <Space
                align="center"
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Space align="center">
                    <PopUpOver>
                        <Badge dot count={0} offset={[-8, 0]}>
                            <BellOutlined
                                style={{
                                    cursor: "pointer",
                                    fontSize: "2rem",
                                    paddingRight: "10px",
                                }}
                            />
                        </Badge>
                    </PopUpOver>

                    <St.DivAvatar>
                        <div className="avatar__wrapper">
                            <div className="avatar__content">
                                <h3 className="avatar__title">{user.name}</h3>
                                <p className="avatar__desc">{user.email}</p>
                            </div>
                            <Avatar
                                className="avatar__icon"
                                size="large"
                                // icon={<UserOutlined />}
                                src={user.image_url}
                            />
                        </div>
                    </St.DivAvatar>
                </Space>
            </Space>
        </Header>
    );
};

HeaderLayout.propTypes = {};

export default HeaderLayout;
