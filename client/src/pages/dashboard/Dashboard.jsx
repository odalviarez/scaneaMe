import React from 'react'
import Footer from '../../components/footer/Footer.jsx'
import NavBar from '../../components/navBar/NavBar.jsx'
import CreateComponent from "../../components/createComponent/createComponent";

import i18n from '../../i18n'

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <h1>{i18n.t("navbar.dashboard")}</h1>
      <CreateComponent />
      <Footer />
    </div>
  );
}
