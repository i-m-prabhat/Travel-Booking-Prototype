import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getTripsById } from '../api/trips';
import moment from 'moment';
import { createNewBooking } from '../api/booking';
import { useToast } from '../hooks/useToast';

const seatLayout = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
    ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'],
];

const bookedSeats = ['A2', 'B3', 'B5', 'C2', 'C6', 'D1', 'D3', 'D6', 'E1', 'E2', 'F1', 'F2', 'F3', 'F4', 'F6'];

const BookingDetails: React.FC = () =>
{
    const { id } = useParams();
    const toast = useToast();
    const [tripDetails, setTripDetails] = useState<any>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const navigate = useNavigate();
    const toggleSeat = (seat: string) =>
    {
        if (bookedSeats.includes(seat)) return;

        setSelectedSeats((prev) =>
            prev.includes(seat)
                ? prev.filter((s) => s !== seat)
                : [...prev, seat]
        );
    };


    useEffect(() =>
    {
        getTripsById(id).then((data) => setTripDetails(data.data)).catch((err) => console.error(err));
    }, [id]);

    const handlebooking = () =>
    {
        createNewBooking({ trip: id, seats: selectedSeats.length }).then((res) =>
        {
            navigate(`/payment/${res.data._id}`, { state: { tripDetails, selectedSeats } });
        }).catch(() =>
        {
            toast.error("Error", "Booking failed");
        });
    }

    return (
        <Container className="my-4">
            <Card className="shadow mb-4">
                <Card.Img
                    variant="top"
                    src="/travel.png"
                    alt="Trip"
                    style={{ maxHeight: '350px', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Row className="mb-4">
                        <Col xs={6}>
                            <h6 className="fw-bold">Trip Details</h6>
                            <p className="mb-0 text-muted small">From</p>
                            <p>{tripDetails?.from}</p>
                            <p className="mb-0 text-muted small">Date</p>
                            <p>{moment(tripDetails?.date).calendar()}</p>
                        </Col>
                        <Col xs={6} className="text-end">
                            <p className="mb-0 text-muted small">To</p>
                            <p>{tripDetails?.to}</p>
                            <p className="mb-0 text-muted small">Time</p>
                            <p>{moment(tripDetails?.departureTime, 'HH:mm').format('hh:mm A')}</p>
                            <p className="mb-0 text-muted small">Fare per seat</p>
                            <h5 className="text-primary fw-bold">${tripDetails?.price}</h5>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="shadow mb-4">
                <Card.Body>
                    <h6 className="fw-bold mb-3">Select Your Seat</h6>
                    <div className="d-flex justify-content-center mb-3 text-muted small">
                        Deluxe Cabin
                    </div>
                    <div className="d-flex flex-column align-items-center gap-2">
                        {seatLayout.map((row, rowIndex) => (
                            <div key={rowIndex} className="d-flex gap-2">
                                {row.map((seat) =>
                                {
                                    const isBooked = bookedSeats.includes(seat);
                                    const isSelected = selectedSeats.includes(seat);

                                    let variant = 'outline-secondary';
                                    if (isBooked) variant = 'danger';
                                    else if (isSelected) variant = 'primary';

                                    return (
                                        <Button
                                            key={seat}
                                            size="sm"
                                            variant={variant}
                                            disabled={isBooked}
                                            onClick={() => toggleSeat(seat)}
                                            style={{ width: 40 }}
                                        >
                                            {seat}
                                        </Button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-center mt-3 gap-4 small text-muted">
                        <div><span className="me-1 d-inline-block bg-light border" style={{ width: 14, height: 14 }}></span>Available</div>
                        <div><span className="me-1 d-inline-block bg-danger" style={{ width: 14, height: 14 }}></span>Booked</div>
                        <div><span className="me-1 d-inline-block bg-primary" style={{ width: 14, height: 14 }}></span>Selected</div>
                    </div>
                </Card.Body>
            </Card>
            <Card className="shadow mb-4">
                <Card.Body>
                    <h6 className="fw-bold">Selected Seats</h6>
                    <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
                </Card.Body>
            </Card>
            <div className="text-center mb-5">
                <Button variant="primary" size="lg" onClick={handlebooking}>Confirm Booking</Button>
            </div>
        </Container>
    );
};

export default BookingDetails;
