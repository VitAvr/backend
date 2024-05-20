import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';


export default function DetailFirm() {
    const [firm, setFirm] = React.useState('');
    const [user, setUser] = React.useState('');
    const [name, setName] = React.useState('');
    const [comments, setComments] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [newComment, setNewComment] = React.useState('');
    const { id } = useParams();

    const getMe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setName(decoded.name);
                setUserId(decoded.userId);
            }
        } catch (error) {
            if (error.response) {
                console.error('Ошибка проверки данных пользователя:',error.message);
            }
        }
    };

    const getFirmById = async () => {
        try {
            const response = await axios.get(`https://git.heroku.com/frontend1k.gitfirms/${id}`);
            console.log('Response data:', response.data);
            setFirm(response.data);
            setUser(response.data.user);
        } catch (error) {
            console.error('Ошибка чтения данных:', error.message);
        }
    };

    const getCommentByFirmId = async () => {
        try {
            const response = await axios.get(`https://git.heroku.com/frontend1k.gitcomments/${id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Ошибка чтения комментариев:', error.message);
        }
    };
    React.useEffect(() => {
        getMe();
        getFirmById();
        getCommentByFirmId();
    }, [id]);

    const saveComment = async (e) => {
        e.preventDefault();
        // Проверяем, что содержание комментария не пустое
      if (!newComment.trim()) {
        alert('Комментарий не может быть пустым');
        return;
      }
  
      // Проверяем, что комментарий не содержит ссылок
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      if (urlRegex.test(newComment)) {
        alert('Комментарий не может содержать ссылки');
        return;
      }
        // Выводим данные перед отправкой запроса
        //console.log("Данные для отправки:", {
        //  body_text: newComment,
        //  postId: id,
        //  userId: userId,
      // });
        try {
            await axios.post(`https://git.heroku.com/frontend1k.gitcomments`, {
                text: newComment,
                firmId: id,
                userId: userId,
            });
            
        } catch (error) {
          console.log()
            console.error('Ошибка в добавлении комментария:', error.message);
        }
    };
    //удалить комментарий
    const deleteComment = async (id) => {
      if (window.confirm('Вы действительно хотите удалить комментарий?')) {
        try {
          await axios.delete(`https://git.heroku.com/frontend1k.gitcomments/${id}`);
          getCommentByFirmId();
        } catch (error) {
          console.error('Error deleting comment:', error.message);
        }
      }
    };

    return (
        <Container className="mt-1">
            <h2 className="text-center m-4"> Фирма "{firm.name}"</h2>
            <Row className="m-2" key={firm.id}>
                <Col md="3">
                    <img className="mr-3 img-thumbnail" 
                    src={firm.logoUrl} 
                    alt="Логотип" />
                </Col>
                <Col md="9">
                        <p>{firm.description}</p>
                        <p>
                            <span className="fst-italic">Ссылка на сайт: </span> 
                            <a href={firm.link} target='_blank'>{firm.link}</a>                            
                        </p>
                        <p>Города: {firm.cities}</p>
                        <p>Изучаемые языки: {firm.languages}</p>                        
                    <Link to={`/firms`} className="me-1">
                        Вернуться к списку фирм
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}