import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export default function AddFirm() {
    //------------category select
    const [userId, setUserId] = React.useState('');
    const [error, setError] = React.useState('');

    React.useEffect(() => {        
        getProfile();
    }, []);
    //-------
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [logoUrl, setLogoUrl] = React.useState('');
    const [link, setlink] = React.useState('');
    const [cities, setCities] = React.useState('');
    const [languages, setLanguages] = React.useState('');
    //--------idUser
    const getProfile = async () => {
        try {
            const token = window.localStorage.getItem('token');
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        } catch (error) {}
    };
    //-----------
    const [image, setImage] = React.useState({ preview: '', data: '' });
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img); //for upload
    };
    //---------
    const navigate = useNavigate();
    //------------
    const saveFirm = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/firms/add`, {
                name: name,
                description: description,
                link: link,
                logoUrl: logoUrl,
                cities: cities,
                languages: languages,
            });
            //-- upload image server
            // let formData = new FormData();
            // formData.append('file', image.data);
            // await fetch(`http://localhost:5000/image`, {
            //     method: 'POST',
            //     body: formData,
            // });
            //----------------end upload
            navigate(`/firmslist`);
        } catch (error) {
            setError(error.message);
            navigate(`/addfirm`);
        }
    };

    return (
        <Container className="mt-1">
            <h2 className="text-center"> Добавить новую фирму </h2>
            <Row>
                <Col md={{ span: 7, offset: 2 }}>
                    <Form onSubmit={saveFirm}>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Название фирмы</Form.Label>
                            <Form.Control
                            className="input"
                            type="text"
                            placeholder="Название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Ссылка на сайт фирмы</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            className="input"
                            value={link}
                            onChange={(e) => setlink(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Города</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            className="input"
                            value={cities}
                            onChange={(e) => setCities(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Языки</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            className="input"
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                            />
                        </Form.Group>
                        {image.preview && <img src={image.preview} width="100" height="100" alt="" />}
                        <hr></hr>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Введите лого url</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                            className="input"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Сохранить
                        </Button>
                        <Button variant="primary" className="mt-3 ms-3" href="/firmslist">
                            Список фирм
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
