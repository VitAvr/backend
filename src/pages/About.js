import React from "react";
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from 'moment';



export default function About() {
    return (
        <Container fluid className="mt-5 bg-light">
            <Row>
            
                <Col>
                <h1 className="text-center">О нас</h1>
                <p className="mt-5 text-center">Наш сайт был создан специально для людей, которые проживают в Эстонии и хотят выучить новый язык.</p>
                <p className="text-center">
                На нашем сайте мы собираем информацию об фирмах, которые предоставляют языковые курсы.</p>
                <p className="text-center">
                Здесь можно найти все актуальные на данный момент языковые курсы и сразу перейти на сайт фирм для регистрации на них</p>
                
            </Col>
            </Row>
            
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h2 className="mt-5 text-center">Наши преимущества:</h2>
                    <Row xs={1} md={2} className="g-4">
                        <h3 className="text-center">Быстрый поиск фирм</h3>
                        <h3 className="text-center">Актуальная информация</h3>
                        <h3 className="text-center">Открытый доступ всем</h3>
                        <h3 className="text-center">Простота</h3>
                        

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}