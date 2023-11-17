import configs from "@/configs";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import LecturerLayout from "@/layouts/LecturerLayout";
import LecturerDashboard from "@/pages/Lecturer/LecturerDashboard";
import LecturerExamSlots from "@/pages/Lecturer/LecturerExamSlots";
import LecturerRegister from "@/pages/Lecturer/LecturerRegister";
import LecturerSchedule from "@/pages/Lecturer/LecturerSchedule";
import PageNotFound from "@/pages/PageNotFound";
import { LECTURER } from "@/utils/constants";

const lecturerRoutes = [
    {
        element: (
            <AuthGuard>
                <RoleBasedGuard accessibleRoles={[LECTURER]}>
                    <LecturerLayout />
                </RoleBasedGuard>
            </AuthGuard>
        ),
        children: [
            { path: configs.routes.lecturer, element: <LecturerDashboard /> },
            {
                path: configs.routes.lecturerSchedule,
                element: <LecturerSchedule />,
            },
            {
                path: configs.routes.lecturerRegister,
                element: <LecturerRegister />,
            },
            {
                path: configs.routes.lecturerExamSlots,
                element: <LecturerExamSlots />,
            },
        ],
    },
    {
        path: configs.routes.pageNotFound,
        element: <PageNotFound />,
    },
];

export default lecturerRoutes;
