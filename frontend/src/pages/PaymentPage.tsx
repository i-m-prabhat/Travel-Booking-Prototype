import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { FaPlane, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBus, FaChair, FaCreditCard, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () =>
{
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <Container className="my-5">
            <h4 className="fw-bold mb-4">Checkout & Payment</h4>
            <Row>
                <Col md={7}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <h6 className="fw-bold">Your Information</h6>
                            <p className="text-muted small mb-3">Please provide your contact details for this booking</p>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your Name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Your Email Address" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" placeholder="Your Phone Number" />
                                </Form.Group>
                            </Form>
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
                                    label={
                                        <span><FaCreditCard className="me-2" /> Credit or Debit Card</span>
                                    }
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
                                    label={
                                        <span><FaWallet className="me-2" /> Digital Wallet (e.g., PayPal, Apple Pay)</span>
                                    }
                                    checked={paymentMethod === 'wallet'}
                                    onChange={() => setPaymentMethod('wallet')}
                                    className="bg-light p-2 rounded"
                                />
                            </div>
                            {paymentMethod === 'card' && (
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="text" placeholder="**** **** **** ****" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Cardholder Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Expiry Date</Form.Label>
                                                <Form.Control type="text" placeholder="MM/YY" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control type="text" placeholder="***" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
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
                                <span>New York to Boston</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <span className="text-muted"><FaCalendarAlt className="me-1" /> Date:</span>
                                <span>2024-05-15</span>
                            </div>

                            <div className="mb-2 d-flex justify-content-between">
                                <span className="text-muted"><FaClock className="me-1" /> Time:</span>
                                <span>10:30 AM</span>
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
                                <span className="text-primary fw-bold">USD 96.00</span>
                            </div>

                            <div className="mt-4">
                                <Button variant="primary" className="w-100" onClick={() => navigate("/verify-payment/:id")}>Complete Payment</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
