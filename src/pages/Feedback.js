import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export default function AddPost() {
    //------------category select
    const [role, setRole] = useState('');//user
    const [text, setText] = useState('');//category
    const [userId, setUserId] = useState('');
    const getMe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setRole(decoded.role)
                setUserId(decoded.userId)
            }
        } catch (error) {
            if (error.response) {
                // Handle error.response here if needed
            }
        }
    };

    useEffect(() => {
        getMe();
    }, []);
    //-------
    const navigate = useNavigate();
    //------------
    const createFeedback = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/feedback/create`, {
                text: text,
                userId: userId,
            });
            navigate(`/`);
        } catch (error) {
            navigate(`/`);
        }
    };

    return (
        <Container className="mt-1">
            {role === 'admin' || 'user' ? (
            <>
               <h2 className="text-center">Напишите нам!</h2>
               <Row>
                  <Col md={{ span: 7, offset: 2 }}>
                     <Form onSubmit={createFeedback}>
                        <Form.Group controlId="formControlText">
                           <Form.Label>Напишите здесь то, чем вы хотите поделиться с нами.</Form.Label>
                           <Form.Control
                              className="input"
                              type="text"
                              placeholder="отзыв"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                           />

<Form.Control
                              className="input"
                              type="hidden"
                              readOnly
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
                           />
                        </Form.Group>

                        

                        <Button
                           variant="primary"
                           type="submit"
                           className="mt-3"
                        >
                           Отправить Отзыв
                        </Button>
                        <Button
                           variant="primary"
                           className="mt-3 ms-3"
                           href="/"
                        >
                           Главная Страница
                        </Button>
                        </Form>
                  </Col>
               </Row>
            </>
         ) : (
            <>
               <h2>Не найдено прав доступа!</h2>
            </>
         )}
        </Container>
    );
}
