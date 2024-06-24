
import { Card, CardBody, CardTitle, Container, Row, Col, Alert } from "reactstrap";
import { useTranslation } from "react-i18next";
import React, {useEffect, useState} from "react";

const Header = () => {
  const { t } = useTranslation("global");
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkNotifications = () => {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const currentTime = new Date().getTime();

      notifications.forEach(notification => {
        // Ajusta esta condición según sea necesario
        if (currentTime >= notification.notificationTime - (15 * 60 * 1000)) { // 15 minutos antes
          setShowAlert(true); // Mostrar la alerta
          setAlertMessage(`15 minutos para el siguiente vehiculo: ${notification.id}`); // Establecer el mensaje de la alerta
        }
      });
    };

    const intervalId = setInterval(checkNotifications, 60000); // Revisar cada minuto

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
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



  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {t("header.title1")}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          143
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">{t("header.desc1")}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {t("header.title2")}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">23</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">{t("header.desc1")}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {t("header.title3")}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">6</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">{t("header.desc1")}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {t("header.title4")}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">12</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">{t("header.desc1")}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {showAlert && (
              <Alert color="danger" className="mt-3"> 
                {alertMessage}
              </Alert>
              )}
          </div>
        </Container>
      </div>

      
    </>
  );
};

export default Header;
