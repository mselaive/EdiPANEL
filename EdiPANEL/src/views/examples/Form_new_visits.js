import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {  
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Form_new_visits = () => {
    const { t } = useTranslation("global");
    const [visitor, setVisitor] = useState({
        name: '',
        rut: '',
        building: '',
        apartment: '',
        time: '',
    });

    const handleChange = (e) => {
        setVisitor({
            ...visitor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar que los campos obligatorios no estén vacíos
        if (!visitor.name || !visitor.rut || !visitor.building || !visitor.apartment) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        const visitorWithTime = {
            ...visitor,
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
        };
        try {
            const response = await fetch('http://localhost:3001/addVisitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visitorWithTime),
            });
            const data = await response.json();
            //console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Header />
        {/* Page content */}
        <Row className="d-flex justify-content-center align-items-center ">
        <Col lg="6" md="10"> 
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <div className="text-center text-muted mb-4">
                            <big>{t('form.form-title1')}</big>
                        </div>
                        <Form role="form" onSubmit={handleSubmit}>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-satisfied text-primary" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder={t('index.commun-title')}
                                        type="text"
                                        name="name"
                                        value={visitor.name}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-credit-card text-primary" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Rut (20204164-6)"
                                        type="text"
                                        name="rut"
                                        value={visitor.rut}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-building text-primary" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder='Edificio (A, B, C)'
                                        type="text"
                                        name="building"
                                        value={visitor.building}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-building text-primary" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder='Apartamento'
                                        type="number"
                                        name="apartment"
                                        value={visitor.apartment}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit">
                                {t("form.register")}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
        </>
    );
}

export default Form_new_visits;