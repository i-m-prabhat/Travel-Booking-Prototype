import AppLayout from "../layouts/AppLayout";
import { Admin, BookingDetails, ConfirmPayment, Home, MyBooking, PaymentPage, Profile, ProfileDetails, TicketDetails } from "../pages";

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
                path: "bookings/:id",
                element: <BookingDetails />,
            },
            {
                path: "payment/:id",
                element: <PaymentPage />,
            },
            {
                path: "verify-payment/:id",
                element: <ConfirmPayment />,
            },
            {
                path: "ticket/:id",
                element: <TicketDetails />,
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
