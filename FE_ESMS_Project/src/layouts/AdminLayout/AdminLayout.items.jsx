import configs from "@/configs";
import {
    HomeOutlined,
    EditOutlined,
    BookOutlined,
    UserOutlined,
    ProfileOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

import { SiGoogleclassroom } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { TbChalkboard } from "react-icons/tb";

const items = [
    {
        label: "Dashboard",
        key: "title",
        icon: null,
        type: "group",
        children: [
            {
                label: "Dashboard",
                key: configs.routes.admin,
                icon: <HomeOutlined />,
            },
        ],
    },

    {
        type: "divider",
    },
    {
        label: "Frequently Table",
        key: "title2",
        icon: "null",
        type: "group",
        children: [
            {
                label: "Phase",
                key: configs.routes.adminPhases,
                icon: <EditOutlined />,
            },
            {
                label: "Time Slots",
                key: configs.routes.adminSlots,
                icon: <TbChalkboard />,
            },
            {
                label: "Courses",
                key: configs.routes.adminCourses,
                icon: <ProfileOutlined />,
            },
        ],
    },

    {
        type: "divider",
    },
    {
        label: "Seldom Table",
        title: "title3",
        icon: "null",
        type: "group",
        children: [
            {
                label: "Subjects",
                key: configs.routes.adminSubjects,
                icon: <BookOutlined />,
            },
            {
                label: "Rooms",
                key: configs.routes.adminRooms,
                icon: <SiGoogleclassroom />,
            },
            {
                label: "Semesters",
                key: configs.routes.adminSemesters,
                icon: <CalendarOutlined />,
            },
            {
                label: "Users",
                key: configs.routes.adminUsers,
                icon: <UserOutlined />,
            },
            {
                label: "Examiners",
                key: configs.routes.adminExaminers,
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
                label: <span>Logout</span>,
                key: configs.routes.login,
                icon: <MdLogout />,
            },
        ],
    },
];
