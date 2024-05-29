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
    Table,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Badge,


} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

  const Form_visits = () => {
    const { t } = useTranslation("global");
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
                                        placeholder="12345678-9"
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
                                        placeholder={t('form.building')}
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
                                        placeholder={t('form.patent')}
                                        type="text"
                                        
                                    />
                                </InputGroup>
                            </FormGroup>
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
                                        <tr>
                                            <th scope="row">s</th>
                                            <td>T</td>
                                            <td>d</td>
                                            <td>s</td>
                                            <td>s</td>
                                            <td>s</td>
                                            <td>
                                                <Badge color="" className="badge-dot">
                                                <i className="bg-success" />
                                                Available
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
                                                    Editar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    >
                                                    Eliminar
                                                    </DropdownItem>
                                                    <DropdownItem
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    >
                                                    Aplazar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                             </td>
                                        </tr>
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