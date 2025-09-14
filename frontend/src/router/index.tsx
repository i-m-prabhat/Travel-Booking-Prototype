import AppLayout from "../layouts/AppLayout";
import { Admin, Home, MyBooking, Profile, ProfileDetails } from "../pages";

export const indexRouter = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "bookings",
                element: <MyBooking />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "profile/:id",
                element: <ProfileDetails />,
            },
            {
                path: "admin",
                element: <Admin />,
            },
        ],
    },
];
