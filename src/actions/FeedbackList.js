import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from '../middleware/axios';
import { jwtDecode } from 'jwt-decode';

export default function FeedbackList() {
    const [role, setRole] = useState('');
    const [feedback, setFeedback] = useState([]);
    const getMe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            }
        } catch (error) {
            if (error.response) {
                // Handle error.response here if needed
            }
        }
    };
    //-----------------------
    useEffect(() => {
        getAllFeedback();
        getMe();
    }, []);
    //
    const getAllFeedback = async () => {
        const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/feedback/auth/allfeedback`);
        setFeedback(response.data);
    };
    //
    const deleteFeedback = async (id) => {
        if (window.confirm('Delete record #' + id + '?')) {
            await axios.delete(`https://backend1k-36eab103aeb1.herokuapp.com/feedback/delete/${id}`);
            getAllFeedback();
        }
    };
    return (
        <Container className="mt-1">
            <h2 className="text-center mt-3">Управление сообщениями админу</h2>
            <Row>
                <Col md={{ span: 9, offset: 2 }}>
                
               <Table striped>
                  <thead>
                     <tr>
                     <th>№</th>
                        <th>Сообщение</th>
                        <th>Пользователь</th>
                        <th className="text-center">Действия</th>
                     </tr>
                  </thead>
                  <tbody>
                     {feedback.map((feedback) => (
                        <tr key={feedback.id}>
                           <td>
                              {feedback.id}
                           </td>
                           <td>{feedback.text}</td>
                           <td>{feedback.user.name}</td>
                           <td className="text-center">
                              {role === 'admin' ? (
                                 <>
                                    
                                    <Button
                                       onClick={() =>
                                          deleteFeedback(feedback.id)
                                       }
                                       variant="danger"
                                       size="sm"
                                    >
                                       Удалить
                                    </Button>
                                 </>
                              ) : (
                                 <>
                                    <p>Не найдено прав доступа!</p>
                                 </>
                              )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
