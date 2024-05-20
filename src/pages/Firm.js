import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, FormControl, Form } from 'react-bootstrap';
import FirmPost from './FirmPost';

export default function Firm() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    // for search
    const [searchValue, setSearchValue] = React.useState('');
    return (
        <div>
            <Container className="mt-1">
                <h2>Фирмы</h2>
                <Row>
                    <Col md={{ span: 5, offset: 7 }}>
                        <h5 className="text-center mt-3">Найти фирму</h5>
                        <Form className="d-flex ps-1">
                            <FormControl
                            type="text"
                            placeholder="поиск"
                            className="me-sm-2"
                            id="input"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            />
                            <Button variant="outline-info" onClick={() => setSearchValue('')}>
                                Очистить
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <h5>Список фирм</h5>
                        <FirmPost 
                        cityId={activeIndex}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                         />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}