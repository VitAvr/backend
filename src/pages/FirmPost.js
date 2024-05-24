import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const DEFAULT_IMAGE_URL = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

export default function FirmPost({ cityId, searchValue }) {
    const [firms, setFirms] = useState([]);
    const [firmCount, setFirmCount] = useState(0);
    useEffect(() => {
        //
        
        const getFirms = async () => {
            const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/firms`);
            setFirms(response.data);
            setFirmCount(response.data.length)
        };
        getFirms();
    }, [cityId]);

    firms.forEach((firm) => {
        const formatDate = moment(firm.createdAt).locale('en-US').format('LL');
        firm.createdAt = formatDate;
    });
    return (
        <>
            <div>
                <h5>Количество фирм: { firmCount }</h5>
            </div>
            {firms
            .filter((data) => {
                if (data.name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return true;
                }
                return false;
            })
            .map((data) => (
                <Row className="m-2" key={data.id}>
                    <Col md="3">
                        <img className="mr-3 img-thumbnail" src={data.logoUrl || DEFAULT_IMAGE_URL} alt="Logo" />
                    </Col>
                    <Col md="9">
                        <h5>{data.name}</h5>
                        <p>{data.description}</p>
                        <p>
                            <span className="fst-italic">Ссылка на сайт: </span> 
                            <a href={data.link} target='_blank'>{data.link}</a>
                            
                        </p>
                        <Link to={`/detailfirm/${data.id}`} className="me-1">
                            Подробнее
                        </Link>
                    </Col>
                    <hr />
                </Row>
            ))}
        </>
    );
}
