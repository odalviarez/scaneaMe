import React from 'react'
import Footer from '../../components/footer/Footer.jsx'
import NavBar from '../../components/navBar/NavBar.jsx'
import CreateComponent from "../../components/createComponent/createComponent";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      <CreateComponent />
      <Footer />
    </div>
  );
}
