import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaPlane, FaDownload, FaEye } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookingById } from '../api/booking';
import moment from 'moment';

const ConfirmPayment: React.FC = () =>
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = React.useState<any>(null);

    React.useEffect(() =>
    {
        getBookingById(id).then((data) => setBookingDetails(data.data)).catch((err) => console.error(err));
    }, [id]);

    if (!bookingDetails) return <div>Loading...</div>;

    return (
        <Container className="my-5 text-center">
            <div className="mb-4">
                <FaCheckCircle size={48} color="green" />
                <h4 className="fw-bold mt-3">Booking Confirmed!</h4>
                <p className="text-muted">Your trip is successfully booked. Enjoy your journey!</p>
            </div>

            <Card className="mx-auto shadow" style={{ maxWidth: '600px' }}>
                <div className="bg-primary text-white p-3 text-start rounded-top">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Flight Ticket</strong>
                            <div className="small text-white-50">Booking ID: {`#TXN-${id}`}</div>
                        </div>
                        <FaPlane size={20} />
                    </div>
                </div>

                <Card.Body className="p-4">
                    <Row className="align-items-center mb-4">
                        <Col className="text-start">
                            <h5 className="fw-bold mb-0">LAX</h5>
                            <div className="text-muted small">{bookingDetails?.tripDetails?.from}</div>
                            <div className="text-muted small">{moment(bookingDetails?.tripDetails?.departureTime, 'HH:mm').format('hh:mm A')}</div>
                        </Col>

                        <Col className="text-center">
                            <FaPlane className="text-primary" size={20} />
                            <div className="text-muted small mt-1">{moment.utc(moment.duration(moment(bookingDetails?.tripDetails?.arrivalTime, 'HH:mm').diff(moment(bookingDetails?.tripDetails?.departureTime, 'HH:mm'))).asMilliseconds()).format('H[h] mm[min]')}</div>
                        </Col>

                        <Col className="text-end">
                            <h5 className="fw-bold mb-0">SFO</h5>
                            <div className="text-muted small">{bookingDetails?.tripDetails?.to}</div>
                            <div className="text-muted small">{moment(bookingDetails?.tripDetails?.arrivalTime, 'HH:mm').format('hh:mm A')}</div>
                        </Col>
                    </Row>

                    <Row className="mb-3 text-start">
                        <Col>
                            <div className="text-muted small">Date</div>
                            <div className="fw-semibold">{new Date(bookingDetails?.tripDetails?.date).toLocaleDateString()}</div>
                        </Col>
                        <Col>
                            <div className="text-muted small">Seats</div>
                            <div className="fw-semibold">E5, E6</div>
                        </Col>
                    </Row>

                    <div className="text-start mb-4">
                        <div className="text-muted small">Total Fare Paid</div>
                        <div className="fw-bold text-success fs-5">${bookingDetails?.tripDetails?.price}</div>
                    </div>

                    <div className="text-center mb-3">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=TXN789456"
                            alt="QR Code"
                            className="rounded"
                        />
                        <div className="text-muted small mt-2">Scan this QR code at the boarding gate</div>
                    </div>

                    <Row className="mt-4">
                        <Col>
                            <Button variant="primary" className="w-100">
                                <FaDownload className="me-2" /> Download Ticket
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" className="w-100" onClick={() => navigate(`/ticket/${id}`, { state: { bookingDetails } })}>
                                <FaEye className="me-2" /> View Ticket
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ConfirmPayment;
