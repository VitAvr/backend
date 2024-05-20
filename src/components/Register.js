import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function Register() {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confPassword, setConfPassword] = useState('');
    const[msg, setMsg] = useState('');
    const navigate = useNavigate();

    const RegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://git.heroku.com/frontend1k.gitusers/auth/register`, {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
            });
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setMsg('No register');
            }
        }
    };
    return (
        <Container className="px-5 mt-3" style={{ width: '50%' }}>
            <h2>Регистрация</h2>
            <Form onSubmit={RegisterSubmit}>
                <p className="has-text-centered">{msg}</p>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Имя:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Подтвердите пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="******"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
    );
}
