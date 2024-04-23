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

  const Form_delivery = () => {
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
                        <Form role="form">
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
                                        placeholder={t('form.delivery')}
                                        type="text"
                                        
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
                                <Button className="my-4" color="primary" type="button" >
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
  export default Form_delivery;