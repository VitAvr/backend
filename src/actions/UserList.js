import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from '../middleware/axios';
import { jwtDecode } from 'jwt-decode';

export default function UsersList() {
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
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
        getUsers();
        getMe();
    }, []);
    //
    const getUsers = async () => {
        const response = await axios.get(`https://git.heroku.com/frontend1k.gitusers/auth/allusers`);
        setUsers(response.data);
    };
    //
    const deleteUser = async (id) => {
        if (window.confirm('Вы действительно хотите удалить #' + id + '?')) {
            await axios.delete(`https://git.heroku.com/frontend1k.gitusers/delete/${id}`);
            getUsers();
        }
    };
    return (
        <Container className="mt-1">
            <h2 className="text-center mt-3">Управление пользователями</h2>
            <Row>
                <Col md={{ span: 9, offset: 2 }}>
                
               <Table striped>
                  <thead>
                     <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th className="text-center">Действия</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((users) => (
                        <tr key={users.id}>
                           <td>
                              {users.id}
                           </td>
                           <td>{users.name}</td>
                           <td className="text-center">
                              {role === 'admin' ? (
                                 <>
                                    <Link
                                       to={`/edituser/${users.id}`}
                                       className="me-1"
                                    >
                                       <Button variant="primary" size="sm">
                                          Редактировать
                                       </Button>
                                    </Link>
                                    <Button
                                       onClick={() =>
                                          deleteUser(users.id)
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
