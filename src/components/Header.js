import React, { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Content from './Content.js';
import logo from './logo192.png';
import UserContext from './usercontext.js';
//import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header() {
   const [state, setState] = useState(false);
   const [user, setUser] = useState(null);
   const [name, setName] = useState('');
   const [role, setRole] = useState('');
   const [avatar, setAvatar] = useState('');
   useEffect(() => {
       getMe();
     // fetchData();

      
     
   }, []);

   const getMe = async () => {
      try {
         const token = localStorage.getItem('token');
         if(token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role);
            setUser(decoded.userId);
            setName(decoded.name);
            setAvatar(decoded.avatarUrl);
            setState(true);
         } else {
            setState(false);
         }
      } catch (error) {
         if (error.response) {

         }
      }
   };
  /* const fetchData = async () => {
      try {
         const token = localStorage.getItem('token');
         const response = await axios.get(
            'http://localhost:5000/users/auth/me',
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setUser(response.data);
      } catch (error) {
         console.error('Ошибка при получении данных пользователя:', error);
      }
   };*/


   const userContextValue = useContext(UserContext);
   if (userContextValue) {
      userContextValue.setUser(user);
   }



   return (
      <>
         <header>
            <Navbar
               sticky="top"
               collapseOnSelect
               expand="md"
               bg="danger"
               variant="dark"
            >
               <Container>
                  <Navbar.Brand>
                     <img
                        src={logo}
                        height="30"
                        width="35"
                        className="d-inline-block align-top"
                        alt="Logo"
                     />{' '}
                     LFA
                  </Navbar.Brand>
                  <NavbarToggle aria-controls="responsive-navbar-nav" />
                  <NavbarCollapse id="responsive-navbar-nav">
                     
                     <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/firms">Фирмы</Nav.Link>
                        <Nav.Link href="/about">О нас</Nav.Link>
                        {state && (role === 'user' || role === 'admin') ? (
                        <Nav.Link href="/feedback">Написать админу</Nav.Link>
                        
                        ) : (
                           <></>
                        )}
                     </Nav>
                     <Nav className="me-auto">
                        {state && role === 'admin' ? (
                           <>
                           <Dropdown>
                              <Dropdown.Toggle>
                              Функционал Админа
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                              <Dropdown.Item href="/firmslist">Фирмы</Dropdown.Item>
                              <Dropdown.Item href="/userslist">Пользователи</Dropdown.Item>
                              <Dropdown.Item href="/feedbacklist">Написать админу</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        
                           
                           </>
                        ) : (
                           <></>
                        )}
                     </Nav>
                     <Nav className="justify-content-end flex-grow-1 pe-3">
                        {state ? (
                           <>
                              {user && (
                                 <>
                                    <Image
                                       src={avatar || 'https://static.thenounproject.com/png/55393-200.png'}
                                       style={{
                                          width: 30,
                                          height: 30,
                                          marginRight: 5,
                                          marginTop: 5,
                                       }}
                                       alt="Аватар пользователя"
                                       roundedCircle
                                    />
                                    <span
                                       style={{
                                          color: 'white',
                                          marginRight: 5,
                                          marginTop: 8,
                                       }}
                                    >
                                       Привет, {name} !
                                    </span>
                                 </>
                              )}
                              {''}
                              <Dropdown>
                              <Dropdown.Toggle>
                              Профиль
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                              <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
                              <Dropdown.Item href="/logout">Выйти</Dropdown.Item>
                              
                              </Dropdown.Menu>
                              </Dropdown>
                           </>
                        ) : (
                           <>
                              <Dropdown>
                              <Dropdown.Toggle>
                              Войти
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                              <Dropdown.Item href="/login">Войти</Dropdown.Item>
                              <Dropdown.Item href="/register">Зарегистрироваться</Dropdown.Item>
                              
                              </Dropdown.Menu>
                              </Dropdown>
                           </>
                        )}
                     </Nav>
                  </NavbarCollapse>
               </Container>
            </Navbar>
         </header>
         <Content />
      </>
   );
}

