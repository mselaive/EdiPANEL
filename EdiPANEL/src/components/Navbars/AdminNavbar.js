
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  NavItem,
} from "reactstrap";

const AdminNavbar = (props) => {
  const { t, i18n } = useTranslation("global");

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    
    // Borra el token del almacenamiento local
    localStorage.removeItem('token');
    
    // Redirige al usuario a /auth
    navigate('/auth');
  };


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/panel/index"
          >
            {t("navbar.dashboard")}
          </Link>

          
          
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Conserje
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
             
              
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">{t("navbar.message")}</h6>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={() => {
                    const currentLanguage = i18n.language;
                    if (currentLanguage === 'en') {
                        i18n.changeLanguage('es');
                    } else {
                        i18n.changeLanguage('en');
                    }
                }}>
                  <i className="ni ni-world" />
                  <span>{t("navbar.lenguage")}</span>
                </DropdownItem>
                <DropdownItem to="/panel/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>{t("navbar.profile")}</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>{t("navbar.logout")}</span>
                </DropdownItem>
                

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
