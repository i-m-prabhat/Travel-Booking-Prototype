import { useState } from "react";
import { useForm } from "react-hook-form";
import
{
    Form,
    Button,
    Card,
    Container,
    InputGroup,
} from "react-bootstrap";
import { Eye, EyeSlash, Envelope } from "react-bootstrap-icons";
import { login } from "../api/auth";
import { useToast } from "../hooks/useToast";
import { Link, useNavigate } from "react-router-dom";

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login = () =>
{
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) =>
    {
        try
        {
            await login(data);
            window.location.href = "/";
            toast.success("Success", "Login successful.");
        } catch (error)
        {
            toast.error("Error", "Invalid email or password.");
            console.error("Login failed:", error);
        }
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center vh-100"
        >
            <Card
                style={{
                    width: "400px",
                    borderRadius: "20px",
                    boxShadow: "0px 6px 25px rgba(0,0,0,0.1)",
                }}
            >
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <div
                            style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                backgroundColor: "#2563eb",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0 auto",
                            }}
                        >
                            <img src="/vite.svg" style={{ fontSize: "28px", color: "white" }} />
                        </div>
                        <h4 className="mt-3 fw-bold heading-font">
                            Log In to Journey Booking Platform
                        </h4>
                        <p className="text-muted mb-0">
                            Welcome back! Please enter your credentials to continue.
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="email"
                                    placeholder="Johnsmith234@gmail.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    isInvalid={!!errors.email}
                                />
                                <InputGroup.Text>
                                    <Envelope size={18} />
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    isInvalid={!!errors.password}
                                />
                                <InputGroup.Text
                                    role="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-end mb-3">
                            <a
                                href="#"
                                className="text-primary"
                                style={{ fontSize: "0.9rem", textDecoration: "none" }}
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 py-2 fw-semibold"
                            disabled={isSubmitting}
                            style={{ borderRadius: "10px" }}
                        >
                            {isSubmitting ? "Logging in..." : "Log In"}
                        </Button>
                        <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-primary fw-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
