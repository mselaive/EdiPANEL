import { Navigate } from 'react-router-dom';
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Forms_visits from "views/examples/Form_new_visits.js";
import Form_vehicle from "views/examples/Form_vehicle.js";
import Frecuent_visit from 'views/examples/Frecuent_visits';
import Form_delivery from 'views/examples/Form_delivery';
import i18next from 'i18next';


var routes = [
  
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/panel",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/panel",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  
  {
    path: "/form_new_visits",
    name: "form:form-title1",
    icon: "ni ni-tie-bow text-primary",
    component: <Forms_visits />,
    layout: "/panel",
  },
  {
    path: "/form_vehicle",
    name: "Registro de Vehiculos",
    icon: "ni ni-delivery-fast text-primary",
    component: <Form_vehicle />,
    layout: "/panel",

  },
  {
    path: "/frecuent_visits",
    name: "Registro de Visitas Frecuentes",
    icon: "ni ni-tie-bow text-primary",
    component: <Frecuent_visit />,
    layout: "/panel",
  },
  {
    path:"/form_delivery",
    name:"Registro de Entrega",
    icon:"ni ni-delivery-fast text-primary",
    component:<Form_delivery />,
    layout:"/panel"
  }
];

export const routes_admin = [

  {
    path: "/index",
    name: "sidebar.home",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/panel",
  },
  {
    path: "/user-profile",
    name: "sidebar.userprofile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/panel",
  },
  {
    path: "/form_new_visits",
    name: "form.form-title1",
    icon: "ni ni-tie-bow text-primary",
    component: <Forms_visits />,
    layout: "/panel",
  },
  {
    path: "/form_vehicle",
    name: "form.form-title2",
    icon: "ni ni-delivery-fast text-primary",
    component: <Form_vehicle />,
    layout: "/panel",

  },
  {
    path:"/form_delivery",
    name:"form.form-title4",
    icon:"ni ni-box-2 text-primary",
    component:<Form_delivery />,
    layout:"/panel"
  }

 
];
export const routes2 = [
  {
    path: "/frecuent_visits",
    name: "form.form-title3",
    icon: "ni ni-tie-bow text-primary",
    component: <Frecuent_visit />,
    layout: "/panel",
  }
  
];

export default routes;