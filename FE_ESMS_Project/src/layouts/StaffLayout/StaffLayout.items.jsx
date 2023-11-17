import configs from "@/configs";
import { HomeOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { MdLogout } from "react-icons/md";

const items = [
    {
        label: "Dashboard",
        key: "title",
        icon: null,
        type: "group",
        children: [
            {
                label: "Dashboard",
                key: configs.routes.staff,
                icon: <HomeOutlined />,
            },
        ],
    },

    {
        type: "divider",
    },
    {
        label: "Exam Phase",
        key: "title2",
        icon: null,
        type: "group",
        children: [
            {
                label: "Exam Phase",
                key: configs.routes.staffExamPhase,
                icon: <EditOutlined />,
            },
            {
                label: "Examiner",
                key: configs.routes.staffExaminer,
                icon: <UserOutlined />,
            },
            {
                label: "Volunteer",
                key: configs.routes.staffVolunteers,
                icon: <UserOutlined />,
            },
        ],
    },
    {
        type: "divider",
    },
];

export default items;

export const item = [
    {
        label: "Logout",
        key: "title3",
        icon: null,
        type: "group",
        children: [
            {
                label: "Logout",
                key: "logout",
                icon: <MdLogout />,
            },
        ],
    },
];
