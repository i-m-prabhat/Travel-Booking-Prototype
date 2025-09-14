import moment from 'moment';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDoorOpen, FaChair } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

const TicketDetails: React.FC = () =>
{
    const ticketRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    const { state } = useLocation();
    const { bookingDetails } = state || { bookingDetails: null };
    const toast = useToast();

    const handleDownload = async () =>
    {
        if (!ticketRef.current) return;
        const canvas = await html2canvas(ticketRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0)
        {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("boarding-pass.pdf");
        toast.success("Success", "Ticket downloaded successfully");
    };
    return (
        <Container className="my-5">
            <div className="ticket-container my-5">
                <Row className="align-items-center justify-content-between mb-4">
                    <Col md={8}>
                        <h5 className="fw-bold">Emirates A380 Airbus</h5>
                        <p className="text-muted mb-0">
                            <FaMapMarkerAlt className="me-2" />
                            Gümüssuyu Mah. İnönü Cad. No:8, Istanbul 34437
                        </p>
                    </Col>
                    <Col md={4} className="text-end">
                        <h4 className="fw-bold text-success">${bookingDetails?.tripDetails?.price}</h4>
                        <Button variant="primary" onClick={handleDownload}>Download</Button>
                    </Col>
                </Row>
                <div className="ticket-card d-flex flex-column flex-md-row" ref={ticketRef}>
                    <div className="ticket-time">
                        <h3 className="fw-bold">{moment(bookingDetails?.tripDetails?.departureTime, 'HH:mm').format('hh:mm A')}</h3>
                        <p className="text-muted small">{bookingDetails?.tripDetails?.from}</p>
                        <div className="ticket-plane-icon my-3" />
                        <h4 className="fw-bold">{moment(bookingDetails?.tripDetails?.arrivalTime, 'HH:mm').format('hh:mm A')}</h4>
                        <p className="text-muted small">{bookingDetails?.tripDetails?.to}</p>
                    </div>
                    <div className="ticket-middle px-4 py-3">
                        <div className="ticket-header d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt="profile"
                                    className="ticket-avatar me-3"
                                />
                                <div>
                                    <div className="fw-bold">{bookingDetails?.userDetails?.name}</div>
                                    <div className="small text-muted">Boarding Pass N’123</div>
                                </div>
                            </div>
                            <span className="text-muted">Business Class</span>
                        </div>

                        <div className="ticket-details mt-3 d-flex flex-wrap justify-content-between text-center">
                            <div className="ticket-info">
                                <FaCalendarAlt className="icon" />
                                <div className="label">Date</div>
                                <div className="value">{new Date(bookingDetails?.tripDetails?.date).toLocaleDateString()}</div>
                            </div>
                            <div className="ticket-info">
                                <FaClock className="icon" />
                                <div className="label">Flight time</div>
                                <div className="value">{moment(bookingDetails?.tripDetails?.departureTime, 'HH:mm').format('hh:mm A')}</div>
                            </div>
                            <div className="ticket-info">
                                <FaDoorOpen className="icon" />
                                <div className="label">Gate</div>
                                <div className="value">A12</div>
                            </div>
                            <div className="ticket-info">
                                <MdEventSeat className="icon" />
                                <div className="label">Seat</div>
                                <div className="value">12B</div>
                            </div>
                        </div>

                        <div className="ticket-footer mt-4 d-flex justify-content-between align-items-end">
                            <div>
                                <div className="fw-bold fs-5">EK</div>
                                <div className="text-muted small">ABC12345</div>
                            </div>
                            <img
                                src="https://barcode.tec-it.com/barcode.ashx?data=ABC12345&code=Code128&translate-esc=false"
                                alt="barcode"
                                className="barcode-img"
                            />
                        </div>
                    </div>
                    <div className="ticket-map text-center">
                        <img
                            src="https://via.placeholder.com/200x120?text=Flight+Map"
                            alt="flight map"
                            className="map-img"
                        />
                    </div>
                </div>
            </div>
            <h5 className="fw-bold mb-3">Terms and Conditions</h5>

            <div className="mb-4">
                <h6 className="fw-bold">Payments</h6>
                <ul className="text-muted small">
                    <li>
                        If you are purchasing your ticket using a debit or credit card via the Website, we will process these
                        payments via the automated secure common payment gateway which will be subject to fraud screening
                        purposes.
                    </li>
                    <li>
                        If you do not supply the correct card billing address and/or cardholder information, your booking will not
                        be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is
                        declined for any reason or if you have supplied incorrect card information. If we become aware of, or are
                        notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be
                        cancelled and you will be liable for all costs and expenses.
                    </li>
                    <li>
                        Argo may require the card holder to provide additional payment verification upon request. Argo reserves the
                        right to deny boarding or to collect a guarantee payment at the time of check-in.
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Contact Us</h6>
                <p className="text-muted small mb-1">Argo Group Q.S.C.</p>
                <p className="text-muted small mb-1">Argo Tower</p>
                <p className="text-muted small mb-1">P.O. Box 22550</p>
                <p className="text-muted small mb-1">Doha, State of Qatar</p>
                <p className="text-muted small">
                    Further contact details can be found at <a href="#">argo.com/help</a>
                </p>
            </div>
        </Container>
    );
};

export default TicketDetails;
