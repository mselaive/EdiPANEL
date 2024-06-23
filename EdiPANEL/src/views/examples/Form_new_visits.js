
import { useTranslation } from "react-i18next";
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
    Label
} from "reactstrap";
import Header from "components/Headers/Header.js";
import React, {useEffect, useState } from 'react';
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
    const [frequentVisits, setFrequentVisits] = useState([]);
    const [apartments, setApartments] = useState([]);
    // Estado para controlar la visibilidad del segundo formulario
    const [showSecondForm, setShowSecondForm] = useState(false);
    // Función para capitalizar las palabras
    function capitalizeWords(str) {
        return str.split(" ").map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(" ");
    }
    

    // Cargar las visitas frecuentes al cargar la página
    useEffect(() => {
        fetch('https://edipanelvercel.vercel.app/api/getfrequentvisits')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            
            setFrequentVisits(data);
            
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);
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
    
    // Función para mostrar una alerta con un mensaje y un color específico
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

    async function sendVisitorData(visitor) {
        const url = 'https://edipanelvercel.vercel.app/api/addVisitor';
        try {
            const response = await fetch(url, {
                method: 'POST', // Method itself
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...visitor,
                    name: visitor.name,
                    rut: visitor.rut,
                    building: visitor.building,
                    apartment: visitor.apartment,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
                }), // body data type must match "Content-Type" header
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); // Parse JSON response
            console.log(data); // Handle success
        } catch (error) {
            console.error("Error sending visitor data:", error); // Handle errors
        }
    }
    
    const [shouldSendData, setShouldSendData] = useState(false);

    useEffect(() => {
        if (shouldSendData) {
            sendVisitorData(visitor);
            setVisitor({
                name: '',
                rut: '',
                building: '',
                apartment: '',
                time: '',
            });
            setShouldSendData(false);
            // Restablecer el interruptor
        }
        }, [visitor, shouldSendData]);

    // Función para manejar imagen
    const handleImageChange = (e) => {
        e.preventDefault();
        if (!e.target.files[0]) {
            console.log('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image',  e.target.files[0]);

        
        axios.post('https://edipanelvercel.vercel.app/api/getID', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            
        }).then(response => {
            // Verificar si el rut ingresado está en FrequentVisits
            const visitFound = frequentVisits.find(visit => visit.rut === response.data.rut);
            if (visitFound) {
                // Si se encuentra el rut, puedes acceder a su id
                const {  name, rut, building, apartment } = visitFound;
                // Mostrar una alerta o realizar alguna acción específica con los detalles encontrados
                showAlertWithTimeout(`${t('alert.alert10')}${name}. ${t('alert.alert9')}`, "success");
                
                setVisitor({
                    ...visitor,
                    name: name,
                    rut: rut,
                    building: building,
                    apartment: apartment,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
                
                });
                setShouldSendData(true);
                
                return; // Detener la ejecución si se encuentra el rut
            }else{
                setVisitor({
                    ...visitor,
                    name: response.data.name,
                    rut: response.data.rut,
                    
                    
                });
                setShowSecondForm(true);
             }
        }).catch(error => {
            console.log(error);
        });

        
    };
    // Función para manejar los cambios en los inputs
    const handleChange = (e) => {
        
        setVisitor({
            ...visitor,
            [e.target.name]: e.target.value,
        });
    };

   
    

   // Función para manejar el envío del primer formulario
    const handleFirstFormSubmit = (e) => {
        e.preventDefault();
        // Verificar que el campo rut no esté vacío
        if (!visitor.rut) {
            showAlertWithTimeout(t('alert.alert2'), 'warning');
            return;
        }
        // Verificar si el rut ingresado está en FrequentVisits
        const visitFound = frequentVisits.find(visit => visit.rut === visitor.rut);
        if (visitFound) {
            // Si se encuentra el rut, puedes acceder a su id
            const {  name, rut, building, apartment } = visitFound;
            // Mostrar una alerta o realizar alguna acción específica con los detalles encontrados
            showAlertWithTimeout(`${t('alert.alert10')}${name}. ${t('alert.alert9')}`, "success");
            
            setVisitor({
                ...visitor,
                name: name,
                rut: rut,
                building: building,
                apartment: apartment,
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
            
            });
            setShouldSendData(true);
            
            return; // Detener la ejecución si se encuentra el rut
        }

        // Mostrar el segundo formulario
        setShowSecondForm(true);
    };
    // Función para manejar el envío del segundo formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar que los campos obligatorios no estén vacíos
        if (!visitor.name || !visitor.rut || !visitor.building || !visitor.apartment) {
            showAlertWithTimeout(t('alert.alert2'), 'warning');
            return;
        }
        const exists = apartments.find(apa =>
            
            apa.apartment === visitor.apartment &&
            apa.building === visitor.building.toUpperCase()
           
        );
        if (!exists) {
            showAlertWithTimeout(t('alert.alert11'), 'warning');
            return;
        }
        
        /*console.log(visitor.rut);
        if (!Fn.validaRut(visitor.rut)) {
            showAlertWithTimeout(t('alert.alert1') , 'warning');
            return;
        }*/
        
    
        setVisitor({       
            ...visitor,
            name: capitalizeWords(visitor.name),
            building: visitor.building.toUpperCase(),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
        });
        setShouldSendData(true);
        setShowSecondForm(false);
        showAlertWithTimeout(t('alert.alert9'), 'success');
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
                        {!showSecondForm && (
                            <Form role="form" onSubmit={handleFirstFormSubmit}>
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
                                <Button className="my-4" color="primary" type="submit">
                                    {t("form.register")}
                                </Button>
                                
                                <Label for="image" color="primary" style={{ visibility: 'hidden' }}>Image</Label>
                                <Input type="file" name="image" id="image" onChange={handleImageChange} style={{ visibility: 'hidden', position: 'absolute', width: '1px', height: '1px' }}/>
                                <Button type="button" color="primary" onClick={() => document.getElementById('image').click()}>{t('form.image')}</Button>
                                </FormGroup>    
                                {showAlert && (
                                        <Alert color={alertColor}>
                                        {alertMessage}
                                        </Alert>
                                    )}
                            </Form>
                        )}

                        {showSecondForm && (
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
                                            value={capitalizeWords(visitor.name)}
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
                                            value={visitor.building.toUpperCase()}
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
                        )}
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>
        </>
    );
}

export default Form_new_visits;