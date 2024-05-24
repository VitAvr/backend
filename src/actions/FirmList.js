import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from '../middleware/axios';

import { jwtDecode } from 'jwt-decode';

export default function FirmList() {
    const [role, setRole] = useState('');
    const [firms, setFirms] = useState([]);
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
        getFirms();
        getMe();
    }, []);
    //
    const getFirms = async () => {
        const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/firms`);
        setFirms(response.data);
    };
    //
    const deleteFirm = async (id, name) => {
        if (window.confirm('Удалить фирму #' + name + '?')) {
            await axios.delete(`https://backend1k-36eab103aeb1.herokuapp.com/firms/delete/${id}`);
            getFirms();
        }
    };
    return (
        <Container className="mt-1">
            <h2 className="text-ceenter mt-3">Управление фирмами</h2>
            <Row>
                <Col md={{ span: 9, offset: 2 }}>
                <p className="text-end">
                  {role === 'admin' ? (
                     <>
                        <Link to="/addfirm">
                           <Button variant="primary" size="sm">
                              Добавить фирму
                           </Button>
                        </Link>
                     </>
                  ) : (
                     <></>
                  )}
               </p>
               <Table striped>
                  <thead>
                     <tr>
                        <th>No#</th>
                        <th>Название</th>
                        <th className="text-center">Действия</th>
                     </tr>
                  </thead>
                  <tbody>
                     {firms.map((firm, index) => (
                        <tr key={firm.id}>
                           <td>
                              {index + 1}
                           </td>
                           <td>{firm.name}</td>
                           <td className="text-center">
                              {role === 'admin' ? (
                                 <>
                                    <Link
                                       to={`/editfirm/${firm.id}`}
                                       className="me-1"
                                    >
                                       <Button variant="primary" size="sm">
                                          Редактировать
                                       </Button>
                                    </Link>
                                    <Button
                                       onClick={() =>
                                          deleteFirm(firm.id)
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
