import React, { useState, useEffect } from 'react';
import { Container, Image, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Profile() {
   const [user, setUser] = useState(null);
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [avatarUrl, setAvatarUrl] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
               'https://backend1k-36eab103aeb1.herokuapp.com/users/auth/me',
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            setUser(response.data);
         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      };

      fetchData();
   }, []);

   const handleUpdateProfile = async (e) => {
      e.preventDefault();

      try {
         const token = localStorage.getItem('token');
         const response = await axios.patch(
            `https://backend1k-36eab103aeb1.herokuapp.com/users/update/${user.userId}`,
            {
               name,
               password,
               avatarUrl,
               email: user.email, // Добавляем email
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         setUser(response.data);
         window.location.reload();
      } catch (error) {
         console.error('Error updating profile:', error);
         console.error('Response data:', error.response.data);
      }
   };

   return (
      <Container className="px-5 mt-3" style={{ width: '50%' }}>
         {user ? (
            <>
               <h1>
                  С возвращением:{' '}
                  <Image
                     src={
                        user.avatar ||
                        'https://static.thenounproject.com/png/55393-200.png'
                     }
                     style={{ width: 50, height: 50 }}
                     alt="Аватар"
                     roundedCircle
                  />{' '}
                  {user.name}{' '}
               </h1>

               <Form onSubmit={handleUpdateProfile}>
                  <Form.Group controlId="formName">
                     <Form.Label>Имя</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Введите свое имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                     <Form.Label>Новый пароль</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Введите новый пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </Form.Group>

                  <Form.Group controlId="formAvatar">
                     <Form.Label>Аватар URL</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Введите новый аватар URL"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                     />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                     Обновить профиль
                  </Button>
               </Form>

               <table className="table">
                  <thead>
                     <tr>
                        <th># ID пользователя</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>{user.userId}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                     </tr>
                  </tbody>
               </table>
            </>
         ) : (
            <p>Загрузка...</p>
         )}
      </Container>
   );
}
