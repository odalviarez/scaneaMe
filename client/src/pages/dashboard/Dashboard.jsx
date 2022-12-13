import React from 'react'
import Footer from '../../components/footer/Footer.jsx'
import NavBar from '../../components/navBar/NavBar.jsx'
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";
import i18n from '../../i18n'
import Pestana from '../../components/pestana/Pestana.jsx';

export default function Dashboard() {


  return (
    <div>
      <NavBar />
      <div>
      <Button as={Link} title="Español" href="/dashboard/?lng=es">ES</Button>
      <Button as={Link} title="English" href="/dashboard/?lng=en">EN</Button>
      <br /> <br />
      </div>
      <h1>{i18n.t("navbar.dashboard")}</h1>
      <Pestana />
      <Footer />
    </div>
  );
}
