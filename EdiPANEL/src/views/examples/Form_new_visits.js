import { useTranslation } from "react-i18next";
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

} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

  const Form_new_visits = () => {
    const { t } = useTranslation("global");
    return (
        <>
        <Header />
        {/* Page content */}
        
        <Row className="d-flex justify-content-center align-items-center ">
        <Col lg="6" md="10"> 
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <div className="text-center text-muted mb-4">
                            <big>{t('form.form-title1')}</big>
                        </div>
                        <Form role="form">
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
                                        placeholder="invitados"
                                        type="text"
                                        
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
                                        placeholder='edificio'
                                        type="number"
                                        
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
                                <span className="text-muted">{t("form.visit_type")}</span>
                                </label>
                            </div>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button">
                                {t("form.register")}
                                </Button>
                            </div>
                            
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