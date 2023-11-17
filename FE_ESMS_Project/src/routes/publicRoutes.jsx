import configs from "@/configs";
import GuestGuard from "@/guards/GuestGuard";
import Login from "@/pages/Login";
// import PageNotFound from "@/pages/PageNotFound";

const publicRoutes = [
    {
        path: configs.routes.login,
        element: (
            <GuestGuard>
                <Login />
            </GuestGuard>
        ),
    },
    // {
    //     path: configs.routes.pageNotFound,
    //     element: <PageNotFound />,
    // },
];

export default publicRoutes;
