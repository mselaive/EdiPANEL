// reactstrap components
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
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const[password, setPassword] = useState("");
  const[username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  
  const [timeoutId, setTimeoutId] = useState(null);
  //  Mostrar una alerta durante un tiempo determinado
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
      }, 5000); // 5 segundos
  
      // Guardar el identificador del nuevo temporizador
      setTimeoutId(newTimeoutId);
  };


  const { t } = useTranslation("global");
  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
  
    // Verificar si el correo electrónico y la contraseña son específicos
    if (data.username === "residente@edipanel.cl" && data.password === "pass1") {
      // Generar un token aleatorio
      const fakeToken = 'residente-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('token', fakeToken);
      // Redirigir directamente a /residentpanel sin llamar a la API
      navigate('/residentpanel');
      return; // Detener la ejecución de la función aquí
    }
  
    fetch('https://edipanelvercel.vercel.app/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.token)
  
        if(result.token){
          localStorage.setItem('token', result.token);
          // Redirigir a /panel para cualquier otro usuario
          navigate('/panel')
        }else{
          console.log("no hay token")
          showAlertWithTimeout(t("auth.alert"), 'danger');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>{t("auth.box-title")}</small>
            </div>
            <Form role="form" 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); 
                    handdleLogin(e); // Asegúrate de que el nombre de la función esté correctamente escrito
                  }
                }}
              tabIndex="0"
            >
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={t('auth.box-email')}
                    type="email"
                    autoComplete="new-email"
                    onChange={(e)=>{setUsername(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={t('auth.box-pass')}
                    type="password"
                    autoComplete="new-password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">{t("auth.box-remember")}</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" onClick={handdleLogin} color="primary" type="button">
                  {t("auth.box-login")}
                </Button>
              </div>
              {showAlert && (
                                    <Alert color={alertColor}>
                                    {alertMessage}
                                    </Alert>
                                )}
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>{t("auth.forgot-auth")}</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>{t("auth.register-auth")}</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login; 
