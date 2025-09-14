import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface AddTripModalProps
{
    show: boolean;
    handleClose: () => void;
    handleSubmit: (data: TripFormData) => void;
}

interface TripFormData
{
    from: string;
    to: string;
    date: string;
    price: number;
    departureTime: string;
    arrivalTime: string;
    totalSeats: number;
}

const locations = ['New York', 'Sydney', 'Melbourne', 'Sharjah'];

const AddTripModal: React.FC<AddTripModalProps> = ({ show, handleClose, handleSubmit }) =>
{
    const { register, handleSubmit: formSubmit, reset, formState: { errors } } = useForm<TripFormData>();

    const onSubmit: SubmitHandler<TripFormData> = (data) =>
    {
        handleSubmit(data);
        reset(); // reset form after submit
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Body className='p-5'>
                <h6 className="fw-bold mb-4">Trip Details</h6>
                <Form onSubmit={formSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="from">
                                <Form.Label>From</Form.Label>
                                <Form.Select {...register('from', { required: true })}>
                                    <option value="">Select departure location</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </Form.Select>
                                {errors.from && <small className="text-danger">This field is required</small>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="to">
                                <Form.Label>To</Form.Label>
                                <Form.Select {...register('to', { required: true })}>
                                    <option value="">Select arrival destination</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </Form.Select>
                                {errors.to && <small className="text-danger">This field is required</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" {...register('date', { required: true })} />
                                {errors.date && <small className="text-danger">This field is required</small>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Price" {...register('price', { required: true, min: 1 })} />
                                {errors.price && <small className="text-danger">Valid price is required</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="departureTime">
                                <Form.Label>Departure Time</Form.Label>
                                <Form.Control type="time" {...register('departureTime', { required: true })} />
                                {errors.departureTime && <small className="text-danger">This field is required</small>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="arrivalTime">
                                <Form.Label>Arrival Time</Form.Label>
                                <Form.Control type="time" {...register('arrivalTime', { required: true })} />
                                {errors.arrivalTime && <small className="text-danger">This field is required</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="totalSeats" className="mb-4">
                        <Form.Label>Total Seat</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Total no. of seats"
                            {...register('totalSeats', { required: true, min: 1 })}
                        />
                        {errors.totalSeats && <small className="text-danger">Valid seat count is required</small>}
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="primary" type="submit" style={{ padding: '8px 40px' }}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTripModal;
