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
import { Eye, EyeSlash, Envelope, Person } from "react-bootstrap-icons";
import { register as registerApi } from "../api/auth";
import { useToast } from "../hooks/useToast";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormInputs = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () =>
{
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>();

    const onSubmit = async (data: RegisterFormInputs) =>
    {
        try
        {
            await registerApi({
                name: data.fullName,
                email: data.email,
                password: data.password,
            });
            toast.success("Success", "Account created successfully.");
            navigate("/login");
        } catch (error)
        {
            toast.error("Error", "Failed to create account.");
            console.error("Register failed:", error);
        }
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center vh-100"
        >
            <Card
                style={{
                    width: "420px",
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
                            <img
                                src="/vite.svg"
                                alt="logo"
                                style={{ fontSize: "28px", color: "white" }}
                            />
                        </div>
                        <h4 className="mt-3 fw-bold heading-font">Create Your Account</h4>
                        <p className="text-muted mb-0">
                            Join us today and get started
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("fullName", {
                                        required: "Full name is required",
                                    })}
                                    isInvalid={!!errors.fullName}
                                />
                                <InputGroup.Text>
                                    <Person size={18} />
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="email"
                                    placeholder="john.doe@example.com"
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
                                    placeholder="Choose a strong password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
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
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value) =>
                                            value === watch("password") ||
                                            "Passwords do not match",
                                    })}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <InputGroup.Text
                                    role="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlash size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword?.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 py-2 fw-semibold"
                            disabled={isSubmitting}
                            style={{ borderRadius: "10px" }}
                        >
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>

                        <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary fw-semibold">
                                Log In
                            </Link>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
