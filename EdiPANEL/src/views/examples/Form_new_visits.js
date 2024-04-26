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
    Alert
} from "reactstrap";
import Header from "components/Headers/Header.js";

// Componente Formulario para agregar visitas
const Form_new_visits = () => {
    const { t } = useTranslation("global");
    const [visitor, setVisitor] = useState({
        name: '',
        rut: '',
        building: '',
        apartment: '',
        time: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const showAlertWithTimeout = (message, color) => {
        setAlertMessage(message);
        setAlertColor(color);
        setShowAlert(true);

        // Cancelar el temporizador anterior
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Iniciar un nuevo temporizador
        const newTimeoutId = setTimeout(() => {
            setShowAlert(false);
        }, 3000); // 3 segundos

        // Guardar el identificador del nuevo temporizador
        setTimeoutId(newTimeoutId);
    };

    // Función para validar el rut
    const Fn = {
        validaRut: function(rutCompleto) {
            if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto))
                return false;
            var tmp = rutCompleto.split('-');
            var digv = tmp[1];
            var rut = tmp[0];
            if (digv == 'K') digv = 'k';
            return (Fn.dv(rut) == digv);
        },
        dv: function(T) {
            var M = 0,
                S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }
    
    const handleChange = (e) => {
        // Obtenemos el name y value del input
        const { name, value } = e.target;

        
        
        setVisitor({
            ...visitor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar que los campos obligatorios no estén vacíos
        if (!visitor.name || !visitor.rut || !visitor.building || !visitor.apartment) {
            showAlertWithTimeout(t('alert.alert2'), 'warning');
            return;
        }
        
        if (!Fn.validaRut(visitor.rut)) {
            showAlertWithTimeout(t('alert.alert1') , 'warning');
            return;
        }
    
        const visitorWithTime = {
            ...visitor,
            building: visitor.building.toUpperCase(),
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
            console.log(data);
            setVisitor({
                name: '',
                rut: '',
                building: '',
                apartment: '',
                
            });
            showAlertWithTimeout(t('alert.alert9'), 'success');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Header />
        {/* Page content */}
        <Row className="mt--6 d-flex justify-content-center align-items-center ">
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
                                        placeholder={t('form.building')}
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
                                        placeholder={t('form.apartment')}
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
                            {showAlert && (
                                    <Alert color={alertColor}>
                                    {alertMessage}
                                    </Alert>
                                )}
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