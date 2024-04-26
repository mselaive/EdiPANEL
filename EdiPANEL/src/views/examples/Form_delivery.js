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
    Alert

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
   
    const handleChange = (e) => {
    
        const { name, value } = e.target;
        
        setApartment({
            ...apartment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
            setSelectedEmail(data[0].email);
            setSelectedWhatsApp(data[0].whatsapp)
            setResidents(data);
            console.log(selectedEmail);
            console.log(selectedWhatsApp);
  
           
            if (data.length === 0) {
                alert('No data returned from API');
                return;
            }
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        }
        ;
        
        setShowSecondForm(true);
    };

    const handleSubmit2 = async (e) => {
            e.preventDefault();
        
            if (!checkbox1 && !checkbox2) {
                alert('Please select at least one checkbox');
                return;
            }
            if (checkbox1&& !checkbox2) {
                alert(`Sending email to ${selectedEmail}`);
            }
            if (checkbox2 && !checkbox1) {
                alert(`Sending WhatsApp message to ${selectedWhatsApp}`);
            }
            if (checkbox1 && checkbox2) {   
                alert(`Sending email to ${selectedEmail} and WhatsApp message to ${selectedWhatsApp}`);
            }
            setShowSecondForm(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000); // 3 segundos
        };
            // Rest of your code...
    
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
                                    {t("form.register")}
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
                                    {t("form.register")}
                                    </Button>
                                    <Button
                                        color="primary"
                                        href="#pablo"
                                        onClick={e => {
                                            e.preventDefault();
                                            setShowSecondForm(false);
                                        }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </div>
                            )}
                            {showAlert && (
                                <Alert color="success">
                                {t("alert.alert3")}
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