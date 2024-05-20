import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const onClickLogout = () => {
        if (window.confirm('Are you sure want to log')) {
            //
            window.localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        }
    };
    //
    return (
        <Container className="container mt-5 textAlign">
            <h2>Выйти</h2>
            <Button onClick={onClickLogout} variant="danger">
                Выйти
            </Button>
        </Container>
    );
}
