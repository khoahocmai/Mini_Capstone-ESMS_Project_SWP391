import configs from "@/configs";
import { EditOutlined, CalendarOutlined } from "@ant-design/icons";
import { MdLogout } from "react-icons/md";

const items = [
    // {
    //     label: "Dashboard",
    //     key: "title",
    //     icon: null,
    //     type: "group",
    //     children: [
    //         {
    //             label: "Dashboard",
    //             key: configs.routes.student,
    //             icon: <HomeOutlined />,
    //         },
    //     ],
    // },

    // {
    //     type: "divider",
    // },
    {
        label: "Exam Schedule",
        key: "title2",
        icon: null,
        type: "group",
        children: [
            {
                label: "Exam Slot",
                key: configs.routes.studentExamSlots,
                icon: <EditOutlined />,
            },
            {
                label: "Schedule",
                key: configs.routes.studentSchedule,
                icon: <CalendarOutlined />,
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
