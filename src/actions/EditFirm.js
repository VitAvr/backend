import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../middleware/axios';
import { useNavigate, useParams, } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DEFAULT_LOGO_URL = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

export default function EditFirm() {
    //----------
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [logoUrl, setLogoUrl] = React.useState('');
    const [link, setlink] = React.useState('');
    const [cities, setCities] = React.useState('');
    const [languages, setLanguages] = React.useState('');

    //------------
    const [image, setImage] = React.useState({ preview: '', data: '' });
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img); //for upload
    };
    //-----------
    const navigate = useNavigate();
    const { id } = useParams();
    //----------
    React.useEffect(() => {
        //------post by id
        const getFirmById = async () => {
            const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/firms/${id}`);
            setName(response.data.name);
            setDescription(response.data.description);
            setLogoUrl(response.data.logoUrl);
            setlink(response.data.link);
            setCities(response.data.cities);
            setLanguages(response.data.languages);
        };
        getFirmById();
    }, [id]);
    //-------
    const updateFirm = async (e) => {
        e.preventDefault();
        const updatedLogoUrl = image.data ? URL.createObjectURL(image.data) : DEFAULT_LOGO_URL;
        
        await axios.patch(`https://backend1k-36eab103aeb1.herokuapp.com/firms/edit/${id}`, {
             name,
            description,
            link,
            logoUrl: updatedLogoUrl,
            cities,
            languages,
        });
        //----------upload image server
        // let formData = new FormData();
        // formData.append('file', image.data);
        // await fetch(`https://git.heroku.com/frontend1k.gitimage`, {
        //     method: 'POST',
        //     body: formData,
        // });
        //----------end upload
        navigate(`/firmslist`);
    };

    const [role, setRole] = React.useState('');
    // eslint-disable-next-line no-unused-vars
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
    return (
        <Container className="mt-1">
            {/* {role === 'admin' ? ( */}
            <>
            <h2 className="text-center">Редактировать фирму "{name}"</h2>
            <Row>
                <Col md={{ span: 7, offset: 2 }}>
                    <Form onSubmit={updateFirm}>
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
                            className="input"
                            type="text"
                            placeholder="Ссылка"
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
                            Подтвердить изменения
                        </Button>
                        <Button variant="primary" className="mt-3 ms-3" href="/firmslist">
                            Список фирм
                        </Button>
                    </Form>
                </Col>
            </Row>
            </>
         {/* ) : (
            <>
               <h2>Не найдено прав доступа!</h2>
            </>
         )} */}
        </Container>
    );
}
