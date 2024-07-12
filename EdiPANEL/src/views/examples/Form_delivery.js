import { useTranslation } from "react-i18next";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
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
} from "reactstrap";

import Select from 'react-select';

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
    const [checkbox3, setCheckbox3] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState([]);
    const [selectedWhatsApp, setSelectedWhatsApp] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [apartments, setApartments] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
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
    
    // alamacenar los datos  de Apartments
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

    const handleChange = (e) => {
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
        const exists = apartments.find(apa =>
            
            apa.apartment === apartment.apa &&
            apa.building === apartment.building.toUpperCase()
           
        );
        if (!exists) {
            showAlertWithTimeout(t('alert.alert11'), 'warning');
            return;
        }
        
        try {
            const response = await fetch(`https://edipanelvercel.vercel.app/api/residents/${apartment.building}/${apartment.apa}`, {
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
            
            setResidents(data);
            
            setOptions(data.map(resident => ({
                value: `${resident.email}|${resident.whatsapp}`,
                label: resident.resident_name,
            })));
            
            
  
           
            
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        };
         // 3 segundos
        
        setShowSecondForm(true);
    };

    const handleSendEmail = async (email) => {
        console.log('Enviando correo a la API:', email);
        try {
            const emailData = {
                selectedEmail: email // Aquí se incluye el correo seleccionado
            };
    
            const response = await fetch('https://edipanelvercel.vercel.app/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });
    
            if (response.ok) {
                console.log('Correo enviado con éxito a la API.');
            } else {
                console.error('Error al enviar el correo a la API.');
            }
        } catch (error) {
            console.error('Error al enviar el correo a la API:', error);
        }
    };
    

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        if (selectedOptions.length === 0) {
            showAlertWithTimeout(t('alert.alert15'), 'warning');
            return;
        }


    
        const url = 'https://graph.facebook.com/v19.0/389458660914206/messages';

        // Headers para la solicitud
        const headers = {
        'Authorization': 'Bearer EAB5O1sMLkkIBO817ddmHO9zG7ZCuAX7lB1F3LZC3NhDdRkrTgWED282kJh02HL6dQ3f0bpP9jwLu3BGyTqQW9nLTybdrXRkOZA3DZBjCUxmfdH7QCp4vAbXMZBG5kzoOiuXzOljDfzHKhGDEkjzmW670WoipiKc4SJqw1TwyQvY8H809Rp7cw4rSnZChBRs8VdjUXwqo6IAz1wRm4weYEZD',
        'Content-Type': 'application/json'
        };

        // Datos para la solicitud
        const data = {
        messaging_product: "whatsapp",
        to: "56982076323",
        type: "template",
        template: {
            name: "edipalnel",
            language: {
            code: "es"
            }
        }
        };
        const emails = [];
        const whatsApps = [];

        // Recorrer cada objeto en selectedOptions
        selectedOptions.forEach(option => {
        // Dividir el valor en correo electrónico y número de WhatsApp
        const [email, whatsApp] = option.value.split('|');
        
        // Almacenar el correo electrónico y el número de WhatsApp en sus respectivas listas
        emails.push(email);
        whatsApps.push(whatsApp);
        });
        // Asignar los valores a selectedEmail y selectedWhatsApp
        setSelectedEmail(emails);
        setSelectedWhatsApp(whatsApps);
        console.log("emails",emails);
        console.log("wsp",whatsApps);
    
        if (!checkbox1 && !checkbox2) {
            showAlertWithTimeout(t('alert.alert5'), 'warning');
            return;
        
        
        } else if (checkbox1 && !checkbox2) {
            emails.forEach(email => {
                console.log('Enviando correo a:', email);
                handleSendEmail(email);
            });
            showAlertWithTimeout(`${t('alert.alert6')}`, 'success');
        } else if (checkbox2 && !checkbox1) {
            showAlertWithTimeout(`${t('alert.alert8')}`, 'success');
    
          
            try {
                const response = await axios.post(url, data, { headers });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
    
        } else if (checkbox1 && checkbox2) {
            emails.forEach(email => {
                console.log('Enviando correo a:', email);
                handleSendEmail(email);
            });
            showAlertWithTimeout(`${t('alert.alert6')} ${t('alert.alert7')} ${selectedWhatsApp}`, 'success');
    
            try {
                const response = await axios.post(url, data, { headers });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        setSelectedEmail([]);
        setSelectedWhatsApp([]);
        setSelectedOptions([]);
        setCheckbox1(false);
        setCheckbox2(false);
        setCheckbox3(false);
        setShowSecondForm(false);
        setShowAlert(true);
        
    };
      
    
    const handleSelectChange = (selectedOptions) => {
        
        setSelectedOptions(selectedOptions);
        if (selectedOptions.length === options.length) {
            setCheckbox3(true);
          } else {
            setCheckbox3(false);
          }
        console.log('holas',selectedOptions);
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
                                            value={apartment.building.toUpperCase()}
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
                                        <Select
                                            isMulti
                                            placeholder={t('form.residents')}
                                            name="residents"
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="residents"
                                            onChange={handleSelectChange}
                                            value={selectedOptions}
                                            styles={{ 
                                                container: (base) => ({ ...base, width: '100%' }),
                                                menu: (base) => ({ ...base, backgroundColor: 'white', zIndex: 9999 }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    
                                                    color: state.isSelected ? '#8898aa' : '#8898aa', // Cambia el color del texto de las opciones aquí
                                                    backgroundColor: state.isSelected ? '#8898aa' : '#fff',
                                                    ':hover': {
                                                        backgroundColor: '#5e72e4',
                                                        color: '#fff',
                                                    },
                                                }),
                                                placeholder: (defaultStyles) => {
                                                    return {
                                                        ...defaultStyles,
                                                        color: '#8898aa', // Cambia el color del texto del placeholder aquí
                                                    };
                                                },
                                                
                                            }}

                                        />   
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
                                        <div className="col custom-control custom-control-alternative custom-checkbox mb-3  ">
                                            <input
                                                className="custom-control-input"
                                                id="customCheck7"
                                                type="checkbox"
                                                checked={checkbox3}
                                                onChange={e => {
                                                    setCheckbox3(e.target.checked)
                                                    if (e.target.checked) {
                                                        // Cuando el checkbox está marcado, selecciona todas las opciones
                                                        setSelectedOptions(options);
                                                    } else {
                                                        // Cuando el checkbox está desmarcado, limpia la selección
                                                        setSelectedOptions([]);
                                                    }

                                                }}
                                                
                                                
                                            />
                                            
                                            <label className="custom-control-label" htmlFor="customCheck7">
                                               {t("form.all")}
                                                
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