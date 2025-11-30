import React from "react";
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LOGO_PATH = '/';

const Error404Screen = () => {

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/')
    };
    return (
        <div className="not-found-wrapper">
            <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center py-5">
                <Row className="mb-4">
                    <Col>
                        <Image
                            src={LOGO_PATH}
                            alt="Logo de Wavv"
                            className="wavv-logo-404"
                            fluid
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Error404Screen;