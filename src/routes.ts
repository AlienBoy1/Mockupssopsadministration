import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

// SOP 1
import SOP1Overview from "./components/sops/SOP1Overview";
import SOP1Cotizaciones from "./components/sops/SOP1Cotizaciones";
import SOP1Detail from "./components/sops/SOP1Detail";
import SOP1KPIs from "./components/sops/SOP1KPIs";

// SOP 2
import SOP2Overview from "./components/sops/SOP2Overview";
import SOP2Requisiciones from "./components/sops/SOP2Requisiciones";
import SOP2Detail from "./components/sops/SOP2Detail";
import SOP2KPIs from "./components/sops/SOP2KPIs";

// SOP 3
import SOP3Overview from "./components/sops/SOP3Overview";
import SOP3ControlMaterial from "./components/sops/SOP3ControlMaterial";
import SOP3Detail from "./components/sops/SOP3Detail";
import SOP3KPIs from "./components/sops/SOP3KPIs";

// SOP 4
import SOP4Overview from "./components/sops/SOP4Overview";
import SOP4PrestamoDemo from "./components/sops/SOP4PrestamoDemo";
import SOP4Detail from "./components/sops/SOP4Detail";
import SOP4KPIs from "./components/sops/SOP4KPIs";

// SOP 5
import SOP5Overview from "./components/sops/SOP5Overview";
import SOP5Soporte from "./components/sops/SOP5Soporte";
import SOP5Detail from "./components/sops/SOP5Detail";
import SOP5KPIs from "./components/sops/SOP5KPIs";

import AdminPanel from "./components/admin/AdminPanel";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      
      // SOP 1 Routes
      { path: "sop1-cotizaciones", Component: SOP1Overview },
      { path: "sop1-cotizaciones/slas", Component: SOP1Cotizaciones },
      { path: "sop1-cotizaciones/slas/:id", Component: SOP1Detail },
      { path: "sop1-cotizaciones/kpis", Component: SOP1KPIs },
      
      // SOP 2 Routes
      { path: "sop2-requisiciones", Component: SOP2Overview },
      { path: "sop2-requisiciones/slas", Component: SOP2Requisiciones },
      { path: "sop2-requisiciones/slas/:id", Component: SOP2Detail },
      { path: "sop2-requisiciones/kpis", Component: SOP2KPIs },
      
      // SOP 3 Routes
      { path: "sop3-control-material", Component: SOP3Overview },
      { path: "sop3-control-material/slas", Component: SOP3ControlMaterial },
      { path: "sop3-control-material/slas/:id", Component: SOP3Detail },
      { path: "sop3-control-material/kpis", Component: SOP3KPIs },
      
      // SOP 4 Routes
      { path: "sop4-prestamo-demo", Component: SOP4Overview },
      { path: "sop4-prestamo-demo/slas", Component: SOP4PrestamoDemo },
      { path: "sop4-prestamo-demo/slas/:id", Component: SOP4Detail },
      { path: "sop4-prestamo-demo/kpis", Component: SOP4KPIs },
      
      // SOP 5 Routes
      { path: "sop5-soporte", Component: SOP5Overview },
      { path: "sop5-soporte/slas", Component: SOP5Soporte },
      { path: "sop5-soporte/slas/:id", Component: SOP5Detail },
      { path: "sop5-soporte/kpis", Component: SOP5KPIs },
      
      { path: "admin", Component: AdminPanel },
      { path: "*", Component: NotFound },
    ],
  },
]);