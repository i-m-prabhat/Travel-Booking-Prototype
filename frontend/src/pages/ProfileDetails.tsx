import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';

const ProfileDetails = () =>
{
    return (
        <Container className="mt-5">
            {/* Profile Picture */}
            <div className="text-center mb-4">
                <div className="profile-pic-wrapper position-relative d-inline-block">
                    <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        alt="Profile"
                        className="rounded-circle profile-pic"
                    />
                    <div className="edit-icon">
                        <FaEdit color="white" />
                    </div>
                </div>
                <h5 className="mt-3 mb-1 fw-bold">Alex Johnson</h5>
                <p className="text-muted mb-4">alex.johnson@email.com</p>
            </div>

            {/* Account Details */}
            <Card className="account-card p-4">
                <h6 className="fw-semibold mb-4">Account</h6>

                <Row className="mb-3 align-items-center">
                    <Col md={3}><span className="text-muted">Name</span></Col>
                    <Col md={6}>Alex Johnson</Col>
                    <Col md={3} className="text-end">
                        <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" /> Change
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                    <Col md={3}><span className="text-muted">Email</span></Col>
                    <Col md={6}>john.doe@gmail.com</Col>
                    <Col md={3} className="text-end d-flex flex-column gap-2">
                        <Button variant="outline-primary" size="sm">
                            <FaPlusCircle className="me-1" /> Add another email
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                    <Col md={3}><span className="text-muted">Password</span></Col>
                    <Col md={6}>************</Col>
                    <Col md={3} className="text-end">
                        <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" /> Change
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                    <Col md={3}><span className="text-muted">Phone number</span></Col>
                    <Col md={6}>+1 000-000-0000</Col>
                    <Col md={3} className="text-end">
                        <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" /> Change
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                    <Col md={3}><span className="text-muted">Address</span></Col>
                    <Col md={6}>St 32 main downtown, Los Angeles, California, USA</Col>
                    <Col md={3} className="text-end">
                        <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" /> Change
                        </Button>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col md={3}><span className="text-muted">Date of birth</span></Col>
                    <Col md={9}>01-01-1992</Col>
                </Row>
            </Card>
        </Container>
    );
};

export default ProfileDetails;
