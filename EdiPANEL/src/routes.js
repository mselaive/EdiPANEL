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
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/panel",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
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
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
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
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/form_new_visits",
    name: "Registro de Nuevas visitas",
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

  }
];
export default routes;
