import React from 'react';
import axios from "axios"
import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submit = data => {
        axios
            .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res => {
                navigate("/")
                localStorage.setItem("token", res.data.data.token);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("Credenciales Incorrectas");
                }
                console.log(error.reponse);
            });
        reset({
            email: "",
            password: ""
        });
    };

    return (
        <div style={{height: "80vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
           <div style={{width:"30%"}}>
           <h1>Login </h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
           </div>
        </div>
    );
};

export default Login;