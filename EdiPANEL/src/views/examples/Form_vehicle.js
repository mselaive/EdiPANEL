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
    Table,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Badge,
    Alert
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from 'react';
import { compileString } from "sass";

  const Form_visits = () => {
    const { t } = useTranslation("global");

    //definir variables
    const [parking, setParking] = useState([]);
    const [FrequentVisits, setFrequentVisits] = useState([]);
    const [vehicle, setVehicle] = useState({
        name: '',
        rut: '',
        check_in_time: '',
        check_out_time: '',
        vehicle_number: '',
        parking_building: '',
        apartment: '',
        
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    // alamacenar los datos  de Parking
    useEffect(() => {
    fetch('https://edipanelvercel.vercel.app/api/getparking')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        
        setParking(data);
        console.log(data);
        
        })
        .catch(error => {
        console.error('There was an error!', error);
        });
    }, []);

    // alamacenar los datos  de FrequentVisits
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

    const resetParkingAtIndex = async (index) => {
        // Asumiendo que cada objeto de estacionamiento tiene un parking_id
        const parkingId = parking[index].parking_id;
        console.log('Parking ID:', parkingId);
    
        try {
            // Hacer la solicitud a la API
            const response = await fetch(`https://edipanelvercel.vercel.app/api/cleanparking/${parkingId}`, {
                method: 'GET', // Si tu API requiere un método diferente (como POST), cámbialo aquí
            });
            const data =  await response.json();
    
            if (response.ok) {
                // Hacer una copia del arreglo parking
                const updatedParking = [...parking];
    
                // Restablecer los valores del objeto en el índice especificado
                updatedParking[index] = {
                    ...updatedParking[index],
                    parking_name: null,
                    check_in_time: null,
                    check_out_time: null,
                    vehicle_number: null,
                    parking_building: null,
                    parking_apartment: null,
                    parking_available: "0" // Asumiendo que también quieres restablecer esta propiedad
                };
    
                // Actualizar el estado de parking con el nuevo arreglo
                setParking(updatedParking);
    
                console.log('Parking limpiado con éxito:', data);
            } else {
                // Manejar respuestas de error de la API
                console.error('Error al limpiar el parking:', data);
            }
        } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud a la API:', error);
        }
    };
    // Función para aplazar tiempo vehiculos
    const addOneHour = (index, timeString) => {
        if (timeString === null) {
            return; // Retorna inmediatamente si timeString es null
        }
        let [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
    
        if (modifier === 'PM' && hours < 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }
    
        hours += 1;
    
        if (hours >= 24) {
            hours -= 24;
        }
        modifier = hours >= 12 ? 'PM' : 'AM';
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }
        const updatedParking = [...parking];
        updatedParking[index] = {
            ...updatedParking[index],
            
            check_out_time: `${hours}:${minutes.toString().padStart(2, '0')} ${modifier}`,
           
        };
        
        try {
            // Hacer la solicitud a la API
            const response =  fetch(`https://edipanelvercel.vercel.app/api/addonehour/${hours}:${minutes.toString().padStart(2, '0')} ${modifier}/${index+1}`, {
                method: 'GET', // Si tu API requiere un método diferente (como POST), cámbialo aquí
            });
            
        
            
        } catch (error) {
            // Catch and handle any errors that occur during the fetch operation
            console.error('Error en la solicitud a la API:', error);
        }
    
        setParking(updatedParking);

        return `${hours}:${minutes.toString().padStart(2, '0')} ${modifier}`;
    };


    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value,
        });
    };
    const [shouldSubmit, setShouldSubmit] = useState(false);
    useEffect(() => {
        if (shouldSubmit) {
            console.log('Submitting:', vehicle);
            const data = { ...vehicle };
            fetch('https://edipanelvercel.vercel.app/api/addvehicle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
            
        }
        setShouldSubmit(false);
      }, [shouldSubmit, vehicle]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!vehicle.name || !vehicle.rut || !vehicle.parking_building || !vehicle.apartment || !vehicle.vehicle_number) {
            showAlertWithTimeout(t('alert.alert2'), 'danger');
            return;
        }
        
        const checkInTime = new Date();
        const checkOutTime = new Date(checkInTime.getTime() + (60 * 60 * 1000));
        
       

        const lugarDisponible = parking.find(lugar => 
        lugar.parking_name === null && 
        lugar.check_in_time === null && 
        lugar.check_out_time === null && 
        lugar.vehicle_number === null && 
        lugar.parking_building === null && 
        lugar.parking_apartment === null
      );
      if (lugarDisponible) {
        // Asignar los datos de vehicle a lugarDisponible
        lugarDisponible.parking_name = vehicle.name;
        lugarDisponible.check_in_time = checkInTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString();
        lugarDisponible.check_out_time = checkOutTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString();
        lugarDisponible.vehicle_number = vehicle.vehicle_number;
        lugarDisponible.parking_building = vehicle.parking_building;
        lugarDisponible.parking_apartment = vehicle.apartment;
        lugarDisponible.parking_available = '1';
        showAlertWithTimeout(t('vehicles.alert1') + lugarDisponible.parking_id , 'success');
        setVehicle({
            ...vehicle,
            check_in_time: checkInTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
            check_out_time: checkOutTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString(),
            parking_id: lugarDisponible.parking_id,
            parking_available: '1',
        });
        console.log(vehicle);
        
        setShouldSubmit(true);



      }else{
        showAlertWithTimeout(t('vehicles.alert2'), 'warning');
      }
      //console.log(lugarDisponible);
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
                            <big>{t('form.form-title2')}</big>
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
                                        value={vehicle.name}
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
                                        value={vehicle.rut}
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
                                        name="parking_building"
                                        value={vehicle.parking_building}
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
                                        value={vehicle.apartment}
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
                                        name="vehicle_number"
                                        value={vehicle.vehicle_number}
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
    <Row className="mt-4 d-flex justify-content-center align-items-center ">
        <Col lg="8" md="6"> 
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <div className="text-center text-muted mb-4">
                            <big>{t('form.vehicle')}</big>
                        </div>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">{t("vehicles.form-title1")}</th>
                                    <th scope="col">{t("vehicles.form-title8")}</th>
                                    <th scope="col">{t("vehicles.form-title2")}</th>
                                    <th scope="col">{t("vehicles.form-title3")}</th>
                                    <th scope="col">{t("vehicles.form-title6")}</th>
                                    <th scope="col">{t("vehicles.form-title4")}</th>
                                    <th scope="col">{t("vehicles.form-title5")}</th>
                                    <th scope="col">{t("vehicles.form-title7")}</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                                <tbody>
                                    {parking.map((parking, index) => (
                                        <tr key={index}>
                                            <th scope="row">{parking.parking_id}</th>
                                            <td>{parking.parking_name}</td>
                                            <td>{parking.check_in_time}</td>
                                            <td>{parking.check_out_time}</td>
                                            <td>{parking.vehicle_number}</td>
                                            <td>{parking.parking_building}</td>
                                            <td>{parking.parking_apartment}</td>
                                            
                                            <td>
                                                <Badge color="" className="badge-dot">
                                                    <i className={parking.parking_available == 0 ? "bg-success" : "bg-danger"} />
                                                    {parking.parking_available == 0 ? "Available" : "Unavailable"}
                                                </Badge>
                                            </td>
                                            
                                            <td className="text-right">
                                                <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    >
                                                    {t("vehicles.edit")}
                                                    </DropdownItem>
                                                    <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        resetParkingAtIndex(index); // Muestra el índice en consola
                                                      }}
                                                    
                                                    >
                                                    {t("vehicles.delete")}
                                                    </DropdownItem>
                                                    <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        console.log(addOneHour(index, parking.check_out_time));
                                                        
                                                      }}
                                                    >
                                                    {t("vehicles.delay")}
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                             </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>

    
       
        </>
    );
    
    
  }
  export default Form_visits;