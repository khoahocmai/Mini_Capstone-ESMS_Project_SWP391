import configs from "@/configs";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import StudentLayout from "@/layouts/StudentLayout";
import StudentDashboard from "@/pages/Student/StudentDashboard";
import StudentExamSlot from "@/pages/Student/StudentExamSlot";
import StudentSchedule from "@/pages/Student/StudentSchedule";
import { STUDENT } from "@/utils/constants";

const studentRoutes = [
    {
        element: (
            <AuthGuard>
                <RoleBasedGuard accessibleRoles={[STUDENT]}>
                    <StudentLayout />
                </RoleBasedGuard>
            </AuthGuard>
        ),
        children: [
            {
                path: configs.routes.student,
                element: <StudentDashboard />,
            },
            {
                path: configs.routes.studentExamSlots,
                element: <StudentExamSlot />,
            },
            {
                path: configs.routes.studentSchedule,
                element: <StudentSchedule />,
            },
        ],
    },
];

export default studentRoutes;
