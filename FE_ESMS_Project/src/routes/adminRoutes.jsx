import configs from "@/configs";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import AdminLayout from "@/layouts/AdminLayout";
import AdminCourses from "@/pages/Admin/AdminCourses";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminExaminers from "@/pages/Admin/AdminExaminers";
import AdminPhases from "@/pages/Admin/AdminPhases";
import AdminRoom from "@/pages/Admin/AdminRoom";
import AdminSemesters from "@/pages/Admin/AdminSemesters";
import AdminSlots from "@/pages/Admin/AdminSlots";
import AdminSubjects from "@/pages/Admin/AdminSubjects";
import AdminUser from "@/pages/Admin/AdminUser";
import { ADMIN } from "@/utils/constants";

const adminRoutes = [
    {
        element: (
            <AuthGuard>
                <RoleBasedGuard accessibleRoles={[ADMIN]}>
                    <AdminLayout />
                </RoleBasedGuard>
            </AuthGuard>
        ),
        children: [
            { path: configs.routes.admin, element: <AdminDashboard /> },
            { path: configs.routes.adminUsers, element: <AdminUser /> },
            { path: configs.routes.adminCourses, element: <AdminCourses /> },
            {
                path: configs.routes.adminExaminers,
                element: <AdminExaminers />,
            },
            { path: configs.routes.adminPhases, element: <AdminPhases /> },
            { path: configs.routes.adminRooms, element: <AdminRoom /> },
            {
                path: configs.routes.adminSemesters,
                element: <AdminSemesters />,
            },
            {
                path: configs.routes.adminSlots,
                element: <AdminSlots />,
            },
            {
                path: configs.routes.adminSubjects,
                element: <AdminSubjects />,
            },
        ],
    },
];

export default adminRoutes;
