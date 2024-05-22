import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function DetailFirm() {
    const [firm, setFirm] = React.useState('');
    const [user, setUser] = React.useState('');
    const [name, setName] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const { id } = useParams();

    useEffect(() => {
        getMe();
        getFirmById();
    }, []);
    
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
            const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/firms/${id}`);
            const firmData = response.data.map.data;
            console.log('Response data:', firmData);
            setFirm(firmData);
            setUser(firmData.user);
        } catch (error) {
            console.error('Ошибка чтения данных:', error.message);
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
