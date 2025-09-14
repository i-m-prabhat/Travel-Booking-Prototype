import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { FaPlane, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBus, FaChair, FaCreditCard, FaWallet } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPayment, verifyPayment } from '../api/payments';
import moment from 'moment';

const PaymentPage: React.FC = () =>
{
    const { id } = useParams();
    const { state } = useLocation();
    const { tripDetails } = state || { tripDetails: null };
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handlePayment = (data: any) =>
    {
        createPayment({ bookingId: id, method: paymentMethod, userData: data }).then((res) =>
        {
            verifyPayment({ paymentId: res.data._id, success: true, transactionId: `TXN-${res.data._id}` }).then(() =>
            {
                navigate(`/verify-payment/${id}`);
            }).catch((err) =>
            {
                console.error(err);
            })
        }).catch((err) =>
        {
            console.error(err);
        });
    };

    return (
        <Container className="my-5">
            <h4 className="fw-bold mb-4">Checkout & Payment</h4>
            <Form onSubmit={handleSubmit(handlePayment)}>
                <Row>
                    <Col md={7}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <h6 className="fw-bold">Your Information</h6>
                                <p className="text-muted small mb-3">Please provide your contact details for this booking</p>

                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        {...register('fullName', { required: 'Name is required' })}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {typeof errors.fullName?.message === 'string' ? errors.fullName.message : null}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Your Email Address"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {typeof errors.email?.message === 'string' ? errors.email.message : null}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Your Phone Number"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            minLength: { value: 10, message: 'Too short' }
                                        })}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {typeof errors.phone?.message === 'string' ? errors.phone.message : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-sm px-3">
                            <Card.Body>
                                <h6 className="fw-bold mb-3">Payment Method</h6>
                                <div className="mb-3">
                                    <Form.Check
                                        type="radio"
                                        id="credit-card"
                                        name="paymentMethod"
                                        label={<span><FaCreditCard className="me-2" /> Credit or Debit Card</span>}
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="bg-light p-2 rounded"
                                    />
                                </div>

                                <div className="mb-4">
                                    <Form.Check
                                        type="radio"
                                        id="wallet"
                                        name="paymentMethod"
                                        label={<span><FaWallet className="me-2" /> Digital Wallet</span>}
                                        checked={paymentMethod === 'wallet'}
                                        onChange={() => setPaymentMethod('wallet')}
                                        className="bg-light p-2 rounded"
                                    />
                                </div>

                                {paymentMethod === 'card' && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Card Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="**** **** **** ****"
                                                {...register('cardNumber', {
                                                    required: 'Card number is required',
                                                    minLength: { value: 16, message: 'Card number too short' }
                                                })}
                                                isInvalid={!!errors.cardNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {typeof errors.cardNumber?.message === 'string' ? errors.cardNumber.message : null}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Cardholder Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                {...register('cardName', { required: 'Cardholder name is required' })}
                                                isInvalid={!!errors.cardName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {typeof errors.cardName?.message === 'string' ? errors.cardName.message : null}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Expiry Date</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        {...register('expiry', {
                                                            required: 'Expiry date is required'
                                                        })}
                                                        isInvalid={!!errors.expiry}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {typeof errors.expiry?.message === 'string' ? errors.expiry.message : null}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>CVV</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="***"
                                                        {...register('cvv', {
                                                            required: 'CVV is required',
                                                            minLength: { value: 3, message: 'Too short' }
                                                        })}
                                                        isInvalid={!!errors.cvv}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {typeof errors.cvv?.message === 'string' ? errors.cvv.message : null}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={5}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <div className="bg-dark text-white text-center rounded mb-3 py-4">
                                    <FaPlane size={32} />
                                </div>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span className="text-muted"><FaMapMarkerAlt className="me-1" /> Route:</span>
                                    <span>{tripDetails?.from} to {tripDetails?.to}</span>
                                </div>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span className="text-muted"><FaCalendarAlt className="me-1" /> Date:</span>
                                    <span>{new Date(tripDetails?.date).toLocaleDateString()}</span>
                                </div>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span className="text-muted"><FaClock className="me-1" /> Time:</span>
                                    <span>{moment(tripDetails?.departureTime, 'HH:mm').format('hh:mm A')}</span>
                                </div>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span className="text-muted"><FaBus className="me-1" /> Transport:</span>
                                    <span>Flight</span>
                                </div>

                                <div className="mb-4 d-flex justify-content-between">
                                    <span className="text-muted"><FaChair className="me-1" /> Seats:</span>
                                    <span>E5, E6</span>
                                </div>

                                <div className="border-top pt-3 d-flex justify-content-between">
                                    <span className="fw-bold">Total Fare:</span>
                                    <span className="text-primary fw-bold">${tripDetails?.price}</span>
                                </div>

                                <div className="mt-4">
                                    <Button variant="primary" type="submit" className="w-100">Complete Payment</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default PaymentPage;
