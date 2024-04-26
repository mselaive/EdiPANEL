import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container,
    Alert,
    UncontrolledAlert

} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

  const Form_delivery = () => {
    const [showSecondForm, setShowSecondForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [apartment, setApartment] = useState({
        building: '',
        apa: '',
    });
    const [residents, setResidents] = useState([]);
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedWhatsApp, setSelectedWhatsApp] = useState('');
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
    
    const handleChange = (e) => {
    
        const { name, value } = e.target;
        
        setApartment({
            ...apartment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!apartment.building || !apartment.apa) {
            showAlertWithTimeout(t('alert.alert2'), 'warning');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3001/residents/${apartment.building}/${apartment.apa}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                showAlertWithTimeout(t('alert.alert4'), 'warning');
                return;
            }
            console.log(data);
            setSelectedEmail(data[0].email);
            setSelectedWhatsApp(data[0].whatsapp);
            setResidents(data);
            
            console.log(selectedEmail);
            console.log(selectedWhatsApp);
  
           
            
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        };
         // 3 segundos
        
        setShowSecondForm(true);
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
    
        const url = 'https://graph.facebook.com/v19.0/296891826840399/messages';
        const headers = {
            'Authorization': 'Bearer EAAZAKFcyZCYIkBO6flzsQB2QcxIW2skHy9ZAZAIcZBJk9BkZC8FYnZCTco3HL8qrD9WxayZAvHETVe4UkLQM8XcGFT26VK8NoOZBCwEBzb9z16ncZAcgbUJ5UGMjIvekL4XvRiSqo4ziQYf5HFyux69i1eJhgRovdZA5aBsOuqpQpBlOofY0kmJbo2959OStcK0sl80',
            'Content-Type': 'application/json'
        };
        const data = {
            "messaging_product": "whatsapp",
            "to": "56974492622",
            "type": "text",
            "text": {
                "preview_url": "false",
                "body":"*Usted ha recibido un paquete/correo* \n\nEstimado/a vecino/a, \n\nLe informamos que ha recibido un paquete/correo en la conserjería. \n\nPor favor, diríjase a la conserjería para poder recibirlo lo antes posible. Gracias por su compromiso \n\n_Saludos, EdiPANEL_"
            }
        };
    
        if (!checkbox1 && !checkbox2) {
            showAlertWithTimeout(t('alert.alert5'), 'warning');
            return;
        } else if (checkbox1 && !checkbox2) {
            showAlertWithTimeout(`${t('alert.alert6')} ${selectedEmail}`, 'success');
        } else if (checkbox2 && !checkbox1) {
            showAlertWithTimeout(`${t('alert.alert8')} ${selectedWhatsApp}`, 'success');
    
            try {
                const response = await axios.post(url, data, { headers });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
    
        } else if (checkbox1 && checkbox2) {
            showAlertWithTimeout(`${t('alert.alert6')} ${selectedEmail} ${t('alert.alert7')} ${selectedWhatsApp}`, 'success');
    
            try {
                const response = await axios.post(url, data, { headers });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        setSelectedEmail('');
        setSelectedWhatsApp('');
    
        setShowSecondForm(false);
        setShowAlert(true);
        
    };
      
    
    const handleSelectChange = (event) => {
        const [email, whatsapp] = event.target.value.split('|');
        setSelectedEmail(email);
        setSelectedWhatsApp(whatsapp);
    
        console.log(selectedEmail);
        console.log(selectedWhatsApp);
    };
   
        

    const { t } = useTranslation("global");

    return (
        <>
        <Header />
        {/* Page content */}
        
        <Row className=" mt--6 d-flex justify-content-center align-items-center ">
        <Col lg="6" md="10"> 
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <div className="text-center text-muted mb-4">
                            <big>{t('form.form-title4')}</big>
                        </div>
                        <Form role="form" onSubmit={handleSubmit}>
                            {!showSecondForm && (
                            <div>  
                            <FormGroup >
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
                                            value={apartment.building}
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
                                            placeholder={t('form.apartment' )}
                                            type="number"
                                            name="apa"
                                            value={apartment.apa}
                                            onChange={handleChange}
                                            
                                        />
                                    </InputGroup>
                                    
                                </FormGroup>
                                

                                
                                <div className="text-center" >
                                    <Button className="my-4" color="primary" type="submit" >
                                    {t("form.search")}
                                    </Button>
                                </div>
                            </div>
                            )}
                        </Form>
                        <Form role="form" onSubmit={handleSubmit2}>
                            {showSecondForm && (
                            <div>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-satisfied text-primary" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <select className="form-control" onChange={handleSelectChange}>
                                            {residents.map((resident, index) => (
                                                <option key={index} value={`${resident.email}|${resident.whatsapp}`}>
                                                    {resident.resident_name}
                                                </option>
                                            ))}
                                        </select>
                                    </InputGroup>
                                </FormGroup>
                                <div className="container content">
                                    <div className="text-left row ml-5">
                                        <div className="col custom-control custom-control-alternative custom-checkbox mb-3">
                                            <input
                                                className=" custom-control-input"
                                                id="customCheck5"
                                                type="checkbox"
                                                checked={checkbox1}
                                                onChange={e => setCheckbox1(e.target.checked)}
                                                
                                            />
                                            
                                            <label className="custom-control-label" htmlFor="customCheck5">
                                                {t("form.mail")}
                                            </label>
                                        </div>
                                        <div className="col custom-control custom-control-alternative custom-checkbox mb-3  ">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck6"
                                                type="checkbox"
                                                checked={checkbox2}
                                                onChange={e => setCheckbox2(e.target.checked)}
                                                
                                                
                                            />
                                            
                                            <label className="custom-control-label" htmlFor="customCheck6">
                                                {t("form.wsp")}
                                                
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center" >
                                    <Button className="my-4" color="primary" type="submit" >
                                    {t("form.send")}
                                    </Button>
                                    <Button
                                        color="primary"
                                        href="#pablo"
                                        onClick={e => {
                                            e.preventDefault();
                                            
                                            setResidents([]);
                                            setShowSecondForm(false);
                                        }}
                                    >
                                    {t("form.back")}
                                    </Button>
                                </div>
                            </div>
                            )}
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
  export default Form_delivery;