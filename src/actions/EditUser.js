import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios';
import { useNavigate, useParams, } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

export default function EditUser() {
   const [role, setRole] = useState('');
   const [name, setName] = React.useState('');
   
   
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

useEffect(() => {
    getMe();
}, []);
    //----------
    
    const navigate = useNavigate();
    const { id } = useParams();
    //----------
    React.useEffect(() => {
        //------post by id
        const getUserById = async () => {
            const response = await axios.get(`https://git.heroku.com/frontend1k.gitusers/auth/${id}`);
            setName(response.data.name);
            
        };
        getUserById();
    }, [id]);
    //-------
    const updateUserById = async (e) => {
        e.preventDefault();
        await axios.patch(`https://git.heroku.com/frontend1k.gitusers/auth/edit/${id}`, {
            name: name,
            id: id,
        });
        navigate(`/userslist`);
    };

    return (
        <Container className="mt-1">
            {role === 'admin' ? (
            <>
               <h2 className="text-center">Изменить id пользователя #{id}</h2>
               <Row>
                  <Col md={{ span: 7, offset: 2 }}>
                     <Form onSubmit={updateUserById}>
                        <Form.Group controlId="formControlText">
                           <Form.Label>id пользователя</Form.Label>
                           <Form.Control
                              className="input"
                              type="text"
                              placeholder="id"
                              value={id}
                             readOnly
                           />
                        </Form.Group> 

                        <Form.Group controlId="formControlText">
                           <Form.Label>Имя пользователя</Form.Label>
                           <Form.Control
                              className="input"
                              type="text"
                              placeholder="Имя"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                           />
                        </Form.Group>
                        <hr></hr>
                        <Button
                           variant="primary"
                           type="submit"
                           className="mt-3"
                        >
                           Редактировать пользователя
                        </Button>
                        <Button
                           variant="primary"
                           className="mt-3 ms-3"
                           href="/userslist"
                        >
                           Список пользователей
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
