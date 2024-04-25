import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
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
            const response = await fetch('http://localhost:3001/getResident', {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apartment),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data);
            alert(data);
            setResidents(data);
            setApartment({
                building: '',
                number: '',
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const handleClick = () => {
      setShowSecondForm(true);
    };


    const handleSecondClick = () => {
        setShowSecondForm(false);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
          }, 3000); // 3 segundos
      };

    const { t } = useTranslation("global");

    return (
        <>
        <Header />
        {/* Page content */}
        
        <Row className=" pt-3 d-flex justify-content-center align-items-center ">
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
                                    <Button className="my-4" color="primary" type="button" onClick={handleClick}>
                                    {t("form.register")}
                                    </Button>
                                </div>
                            </div>
                            )}
                        </Form>
                        <Form role="form">
                            {showSecondForm && (
                            <div>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-satisfied text-primary" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <select className="form-control">
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                        {/* Agrega más opciones aquí si es necesario */}
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
                                                
                                                
                                            />
                                            
                                            <label className="custom-control-label" htmlFor="customCheck6">
                                                {t("form.wsp")}
                                                
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center" >
                                    <Button className="my-4" color="primary" type="button" onClick={handleSecondClick}>
                                    {t("form.register")}
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