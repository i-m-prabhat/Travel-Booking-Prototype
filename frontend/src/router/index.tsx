import AppLayout from "../layouts/AppLayout";
import { Home, MyBooking } from "../pages";

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
                path: "my-booking",
                element: <MyBooking />,
            },
        ],
    },
];
