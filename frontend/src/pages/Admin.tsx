import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Pagination } from 'react-bootstrap';
import { BsQrCode } from 'react-icons/bs';
import { FaClock, FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import AddTripModal from '../components/trip/AddTripModal';
import { createNewTrip, getAllTrips } from '../api/trips';
import { useToast } from '../hooks/useToast';
import moment from 'moment';
import { getAllBookings } from '../api/booking';

const bookingsData = [
    { id: 'B1001', user: 'Alice Smith', route: 'London to Paris', date: '2024-07-26', seats: 'A1, A2', status: 'Confirmed', qr: true },
    { id: 'B1002', user: 'Bob Johnson', route: 'Rome to Florence', date: '2024-07-24', seats: 'C5', status: 'Pending', qr: false },
    { id: 'B1003', user: 'Charlie Brown', route: 'Berlin to Munich', date: '2024-07-30', seats: 'F13, F14, F15', status: 'Confirmed', qr: true }
];

const Admin = () =>
{
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = bookingsData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (data: object) =>
    {
        createNewTrip(data).then((res) =>
        {
            toast.success('Success', 'Trip created successfully.');
            setLoading(true);
        }).catch((err) =>
        {
            toast.error('Error', 'Something went wrong while creating trip!.');
            console.error('Error creating trip:', err);
        });
        setShowModal(false);
    };

    const [trips, setTrips] = useState<any>();
    const [bookings, setBookings] = useState<any>();

    useEffect(() =>
    {
        getAllTrips({}).then((data) =>
        {
            setTrips(data.data);
            console.log('Fetched trips:', data.data);
        }).catch((err) =>
        {
            console.error('Error fetching trips:', err);
        }).finally(() => setLoading(false));

        getAllBookings().then((data) =>
        {
            setBookings(data.data);
        }).catch((err) =>
        {
            console.error('Error fetching bookings:', err);
        }).finally(() => setLoading(false));
    }, [isLoading]);
    return (
        <Container className="mt-4">
            <h4 className="mb-4 fw-500">Admin Dashboard</h4>
            <h5 className="mb-4 fw-500">Admin Overview</h5>

            <Row className="mb-4 g-4">
                <Col md={4}>
                    <Card className="overview-card py-3">
                        <Card.Body className="d-flex align-items-center">
                            <div className="icon-box bg-primary-subtle text-primary me-3 border rounded">
                                <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0C22.4183 0 26 3.58172 26 8V32C26 36.4183 22.4183 40 18 40H8C3.58172 40 0 36.4183 0 32V8C0 3.58172 3.58172 0 8 0H18Z" fill="#DBEAFE" />
                                    <path d="M18 0C22.4183 0 26 3.58172 26 8V32C26 36.4183 22.4183 40 18 40H8C3.58172 40 0 36.4183 0 32V8C0 3.58172 3.58172 0 8 0H18Z" stroke="#E5E7EB" />
                                    <path d="M18 29H8V10H18V29Z" stroke="#E5E7EB" />
                                    <g clip-path="url(#clip0_48_6221)">
                                        <path d="M8.5 15.5C8.5 14.3065 8.97411 13.1619 9.81802 12.318C10.6619 11.4741 11.8065 11 13 11C14.1935 11 15.3381 11.4741 16.182 12.318C17.0259 13.1619 17.5 14.3065 17.5 15.5C17.5 16.6935 17.0259 17.8381 16.182 18.682C15.3381 19.5259 14.1935 20 13 20C11.8065 20 10.6619 19.5259 9.81802 18.682C8.97411 17.8381 8.5 16.6935 8.5 15.5ZM13 13.5C13.275 13.5 13.5 13.275 13.5 13C13.5 12.725 13.275 12.5 13 12.5C11.3438 12.5 10 13.8438 10 15.5C10 15.775 10.225 16 10.5 16C10.775 16 11 15.775 11 15.5C11 14.3969 11.8969 13.5 13 13.5ZM12 26V20.9094C12.325 20.9688 12.6594 21 13 21C13.3406 21 13.675 20.9688 14 20.9094V26C14 26.5531 13.5531 27 13 27C12.4469 27 12 26.5531 12 26Z" fill="#2563EB" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_48_6221">
                                            <path d="M8 11H18V27H8V11Z" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <div>
                                <h4 className="fw-bold mb-0">{trips?.totalTrips ?? 0}</h4>
                                <small className="text-muted">Total Trips</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="overview-card py-3">
                        <Card.Body className="d-flex align-items-center">
                            <div className="icon-box bg-success-subtle text-success me-3 border rounded">
                                <svg width="37" height="40" viewBox="0 0 37 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.6562 0C33.0745 0 36.6562 3.58172 36.6562 8V32C36.6562 36.4183 33.0745 40 28.6562 40H8.65625C4.23797 40 0.65625 36.4183 0.65625 32V8C0.65625 3.58172 4.23797 0 8.65625 0H28.6562Z" fill="#DCFCE7" />
                                    <path d="M28.6562 0C33.0745 0 36.6562 3.58172 36.6562 8V32C36.6562 36.4183 33.0745 40 28.6562 40H8.65625C4.23797 40 0.65625 36.4183 0.65625 32V8C0.65625 3.58172 4.23797 0 8.65625 0H28.6562Z" stroke="#E5E7EB" />
                                    <path d="M28.6562 29H8.65625V10H28.6562V29Z" stroke="#E5E7EB" />
                                    <g clip-path="url(#clip0_48_6233)">
                                        <path d="M13.1562 11C13.8193 11 14.4552 11.2634 14.924 11.7322C15.3929 12.2011 15.6562 12.837 15.6562 13.5C15.6562 14.163 15.3929 14.7989 14.924 15.2678C14.4552 15.7366 13.8193 16 13.1562 16C12.4932 16 11.8573 15.7366 11.3885 15.2678C10.9196 14.7989 10.6562 14.163 10.6562 13.5C10.6562 12.837 10.9196 12.2011 11.3885 11.7322C11.8573 11.2634 12.4932 11 13.1562 11ZM24.6562 11C25.3193 11 25.9552 11.2634 26.424 11.7322C26.8929 12.2011 27.1562 12.837 27.1562 13.5C27.1562 14.163 26.8929 14.7989 26.424 15.2678C25.9552 15.7366 25.3193 16 24.6562 16C23.9932 16 23.3573 15.7366 22.8885 15.2678C22.4196 14.7989 22.1562 14.163 22.1562 13.5C22.1562 12.837 22.4196 12.2011 22.8885 11.7322C23.3573 11.2634 23.9932 11 24.6562 11ZM8.65625 20.3344C8.65625 18.4938 10.15 17 11.9906 17H13.325C13.8219 17 14.2937 17.1094 14.7188 17.3031C14.6781 17.5281 14.6594 17.7625 14.6594 18C14.6594 19.1938 15.1844 20.2656 16.0125 21C16.0062 21 16 21 15.9906 21H9.32187C8.95625 21 8.65625 20.7 8.65625 20.3344ZM21.3219 21C21.3156 21 21.3094 21 21.3 21C22.1313 20.2656 22.6531 19.1938 22.6531 18C22.6531 17.7625 22.6313 17.5312 22.5938 17.3031C23.0188 17.1062 23.4906 17 23.9875 17H25.3219C27.1625 17 28.6562 18.4938 28.6562 20.3344C28.6562 20.7031 28.3563 21 27.9906 21H21.3219ZM15.6562 18C15.6562 17.2044 15.9723 16.4413 16.5349 15.8787C17.0975 15.3161 17.8606 15 18.6562 15C19.4519 15 20.215 15.3161 20.7776 15.8787C21.3402 16.4413 21.6562 17.2044 21.6562 18C21.6562 18.7956 21.3402 19.5587 20.7776 20.1213C20.215 20.6839 19.4519 21 18.6562 21C17.8606 21 17.0975 20.6839 16.5349 20.1213C15.9723 19.5587 15.6562 18.7956 15.6562 18ZM12.6562 26.1656C12.6562 23.8656 14.5219 22 16.8219 22H20.4906C22.7906 22 24.6562 23.8656 24.6562 26.1656C24.6562 26.625 24.2844 27 23.8219 27H13.4906C13.0312 27 12.6562 26.6281 12.6562 26.1656Z" fill="#16A34A" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_48_6233">
                                            <path d="M8.65625 11H28.6562V27H8.65625V11Z" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <div>
                                <h4 className="fw-bold mb-0">{bookings?.totalBookings ?? 0}</h4>
                                <small className="text-muted">Total Bookings</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="overview-card py-3">
                        <Card.Body className="d-flex align-items-center">
                            <div className="icon-box bg-warning-subtle text-warning me-3 p-2 border rounded">
                                <FaClock size={20} />
                            </div>
                            <div>
                                <h4 className="fw-bold mb-0">12</h4>
                                <small className="text-muted">Upcoming Departures</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="row">
                <div className="col-md-6">
                    <h5 className="mb-3 fw-semibold">Trip Management</h5>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-end mb-2">
                        <Button variant="primary" className="me-2">All Trips</Button>
                        <Button variant="outline-primary" onClick={() => setShowModal(true)}>+ Add New Trip</Button>
                    </div>
                </div>
            </div>

            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Route</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Price</th>
                        <th>Total Seats</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips?.trips.map((trip: any, idx: number) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{trip?.from + " to " + trip?.to}</td>
                            <td>{moment(trip?.departureTime, 'HH:mm').format('hh:mm A')}</td>
                            <td>{moment(trip?.arrivalTime, 'HH:mm').format('hh:mm A')}</td>
                            <td>${trip?.price.toFixed(2)}</td>
                            <td>{trip?.totalSeats}</td>
                            <td>
                                <FaEdit className="text-primary me-3 cursor-pointer" />
                                <FaTrash className="text-danger cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="row mt-5">
                <div className="col-md-6">
                    <h5 className=" mb-3 fw-semibold">Booking Management</h5>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-end mb-2">
                        <Button variant="primary" className="me-2">All Bookings</Button>
                        <Button variant="outline-primary"><BsQrCode /> Verify QR</Button>
                    </div>
                </div>
            </div>


            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>SR</th>
                        <th>User</th>
                        <th>Trip Route</th>
                        <th>Date</th>
                        <th>Seats</th>
                        <th>Status</th>
                        <th>QR Verified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings?.bookings.map((booking: any, idx: number) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{booking?.userDetails?.name}</td>
                            <td>{booking.tripDetails?.from + " to " + booking.tripDetails?.to}</td>
                            <td>{new Date(booking.tripDetails.date).toLocaleDateString()}</td>
                            <td>{booking.seats}</td>
                            <td>
                                <Badge bg={booking.status === 'confirmed' ? 'success' : 'warning'} text="dark">
                                    {booking.status}
                                </Badge>
                            </td>
                            <td className="text-center">
                                {booking.qr ? <FaCheckCircle className="text-success" /> : <FaRegCircle className="text-muted" />}
                            </td>
                            <td>
                                <FaEdit className="text-primary me-3 cursor-pointer" />
                                <FaTrash className="text-danger cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className="justify-content-end">
                {Array.from({ length: Math.ceil(bookingsData.length / itemsPerPage) }).map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <AddTripModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
};

export default Admin;
