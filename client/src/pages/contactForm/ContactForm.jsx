import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import FormComponent from '../../components/FormComponent/FormComponent.jsx'
import Footer from '../../components/footer/Footer.jsx'

import i18n from '../../i18n';

export default function Form() {
  return (
    <div>
      <NavBar />
      <h1>{i18n.t('navbar.contact')}</h1>
      <FormComponent/>
      <Footer/>
    </div>
  )
}

