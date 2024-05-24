import React from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from 'moment';
import logo from './logo192.png';


export default function CardBox({ cityId }) {
    const [firms, setFirms] = React.useState([]);


    React.useEffect(() => {
        //
        
        const getFirms = async () => {
            const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/firms`);
            setFirms(response.data);

        };
        getFirms();
    }, [cityId]);

    firms.forEach((firm) => {
        const formatDate = moment(firm.createdAt).locale('en-US').format('LL');
        firm.createdAt = formatDate;
    });
    return (
        <Container fluid className="mt-5 bg-light">
            <Row>
                <Col></Col>
            <Col>
            <img
                        src={logo}
                        height="300"
                        width="400"
                        className="mt-5 text-center"
                        alt="Logo"
                     />
                </Col>
                <Col>
                <h1 className="mt-5 text-center">Хотите выучить язык?</h1>
                <p className="mt-5 text-center">Мы поможем вам найти подходящую для вас фирму с курсами языка, которые вы хотите изучить.</p>
                <p className="mt-5 text-center">На нашем сайте вы сможете найти места проведения курсов максимально близко к вам.</p>
                <p className="mt-5 text-center">Здесь собран список всех возможных и доступных на данный момент фирм предоставляющих курсы по изучению языков.</p>
            </Col>
            <Col></Col>
            </Row>
            
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h2 className="mt-5 text-center">Основные фирмы предоставляющие языковые курсы</h2>
                    <Row xs={1} md={2} className="g-4">

                        {firms.slice(0, 2).map((data) => (
                            <Col>
                                <Card className="m-2" key={data.id}>
                                    <Card.Img className="mr-3 img-thumbnail" src={data.logoUrl} alt="Logo" style={{ height: 204 }} />
                                    <Card.Body>
                                        <Card.Title>{data.name}</Card.Title>
                                        <Link to={`/detailfirm/${data.id}`} className="me-1">
                            Подробнее
                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
