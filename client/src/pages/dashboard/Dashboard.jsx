import React from 'react'
import Footer from '../../components/footer/Footer.jsx'
import NavBar from '../../components/navBar/NavBar.jsx'
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent.jsx';


export default function Dashboard() {


  return (
    <div>
      <NavBar />
      <DashboardComponent/>
      <Footer />
    </div>
  );
}
