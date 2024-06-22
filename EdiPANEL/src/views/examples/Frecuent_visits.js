import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react';
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
    Alert,
    Label

} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";



const Frecuent_visit = () => {
    const { t } = useTranslation("global");

    const [frequentVisits, setFrequentVisits] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [frequentVisit, setFrequentVisit] = useState({
        name: "",
        rut: "",
        building: "",
        apartment: "",
        patent: ""
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);


    useEffect(() => {
        fetch('https://edipanelvercel.vercel.app/api/getfrequentvisits',)
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
            
            setFrequentVisits(data);
            console.log(data);
            
            })
            .catch(error => {
            console.error('There was an error!', error);
            });
    }, []);
    useEffect(() => {
        fetch('https://edipanelvercel.vercel.app/api/getapartments')
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
            
            setApartments(data);
            console.log(data);
            })
            .catch(error => {
            console.error('There was an error!', error);
            });
    }, []);

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


    const handleChange = (e) => {
        setFrequentVisit({
            ...frequentVisit,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        if (frequentVisit.name === "" || frequentVisit.rut === "" || frequentVisit.building === "" || frequentVisit.apartment === "" || frequentVisit.patent === "") {
            showAlertWithTimeout(t('alert.alert2'), 'warning');
            return;
        }
        console.log(frequentVisit);
        const visitfound =frequentVisits.find(visit => visit.rut === frequentVisit.rut);
        if (visitfound) {
            showAlertWithTimeout(t('alert.alert14'), 'warning');
            return;
        }
        const exists = apartments.find(apa =>
            
            apa.apartment === frequentVisit.apartment &&
            apa.building === frequentVisit.building.toUpperCase()
           
        );  
        if (!exists) {
            showAlertWithTimeout(t('alert.alert11'), 'warning');
            return;
        }
       
        fetch('https://edipanelvercel.vercel.app/api/addfrequentvisit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...frequentVisit,
                building: frequentVisit.building.toUpperCase(),
                patent: frequentVisit.patent.toUpperCase()
            })
        })
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
            })
            .then(data => {
            console.log(data);
            
            setFrequentVisit({
                ...frequentVisit,
                name: "",
                rut: "",
                building: "",
                apartment: "",
                patent: ""
            });
            showAlertWithTimeout(t('alert.alert12'), 'success');
            setFrequentVisits([...frequentVisits, data]);
            })
            .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            showAlertWithTimeout(t('alert.alert13'), 'danger');
            });
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
                            <big>{t('form.form-title3')}</big>
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
                                        value={frequentVisit.name}
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
                                        placeholder="12345678-9"
                                        type="text"
                                        name="rut"
                                        value={frequentVisit.rut}
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
                                        value={frequentVisit.building.toUpperCase()}
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
                                        value={frequentVisit.apartment}
                                        onChange={handleChange}
                                        
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                        <i className="ni ni-cart text-primary" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder={t('form.patent')}
                                        type="text"
                                        name="patent"
                                        value={frequentVisit.patent.toUpperCase()}
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
                                <Alert color={alertColor} >
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
export default Frecuent_visit;