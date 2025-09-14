import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import
{
    FaPlane,
    FaBus,
    FaCalendarAlt,
    FaClock,
    FaUserCircle,
} from "react-icons/fa";
import { RiRouteLine } from "react-icons/ri";
import { Link } from "react-router-dom";


const upcomingBookings: Booking[] = [
    {
        id: "SLK79012",
        route: "New York → Los Angeles",
        date: "2024-11-15",
        time: "08:30 AM - 01:30 PM",
        seats: "A2",
        type: "flight",
        status: "Upcoming",
    },
    {
        id: "SLK74578",
        route: "Los Angeles → San Francisco",
        date: "2024-11-21",
        time: "05:30 PM - 10:30 PM",
        seats: "C2",
        type: "flight",
        status: "Upcoming",
    },
];

const pastBookings: Booking[] = [
    {
        id: "SLK12345",
        route: "Washington D.C. → Philadelphia",
        date: "2024-10-12",
        time: "06:00 AM - 12:30 PM",
        seats: "B3",
        type: "bus",
        status: "Completed",
    },
    {
        id: "SLK67654",
        route: "Chicago → St. Louis",
        date: "2024-10-02",
        time: "02:00 PM - 10:00 PM",
        seats: "A7, B8",
        type: "bus",
        status: "Completed",
    },
    {
        id: "SLK10987",
        route: "Miami → Orlando",
        date: "2024-09-18",
        time: "09:00 AM - 12:00 PM",
        seats: "F1",
        type: "bus",
        status: "Completed",
    },
];

type Booking = {
    id: string;
    route: string;
    date: string;
    time: string;
    seats: string;
    type: "flight" | "bus";
    status: string;
};

const BookingCard = ({ booking }: { booking: Booking }) =>
{
    const icon =
        booking.type === "flight" ? (
            <FaPlane className="text-primary" />
        ) : (
            <FaBus className="text-success" />
        );

    return (
        <Card className="booking-card">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">Booking ID: {booking.id}</small>
                    {icon}
                </div>
                <Badge
                    bg={booking.status === "Upcoming" ? "primary" : "success"}
                    className="mb-2"
                >
                    {booking.status}
                </Badge>
                <h6 className="fw-semibold"><RiRouteLine className="me-2 text-muted" />{booking.route}</h6>
                <p className="mb-1">
                    <FaCalendarAlt className="me-2 text-muted" />
                    {booking.date}
                </p>
                <p className="mb-1">
                    <FaClock className="me-2 text-muted" />
                    {booking.time}
                </p>
                <p className="mb-0">Seats: {booking.seats}</p>
            </Card.Body>
            <div
                className={`booking-footer py-3 fs-3 ${booking.type === "flight" ? "flight-footer" : "bus-footer"
                    }`}
            >
                {icon}
            </div>
        </Card>
    );
};

const Profile = () =>
{
    return (
        <div className="container mt-4">
            <Card className="profile-card mb-4 py-3 border rounded-3">
                <Card.Body className="d-flex align-items-center">
                    <FaUserCircle size={50} className="me-3 text-secondary" />
                    <div>
                        <h6 className="fw-bold mb-0">Alex Johnson</h6>
                        <small className="text-muted">alex.johnson@email.com</small>
                        <br />
                        <Link to="/profile/:id" className="profile-link">
                            Manage Profile
                        </Link>
                    </div>
                </Card.Body>
            </Card>
            <h5 className="fw-semibold mb-3">Upcoming Bookings</h5>
            <Row className="mb-4">
                {upcomingBookings.map((booking) => (
                    <Col md={6} key={booking.id} className="mb-3">
                        <BookingCard booking={booking} />
                    </Col>
                ))}
            </Row>
            <h5 className="fw-semibold mb-3">Past Bookings</h5>
            <Row>
                {pastBookings.map((booking) => (
                    <Col md={4} key={booking.id} className="mb-3">
                        <BookingCard booking={booking} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Profile;
