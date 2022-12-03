import React from 'react'
import { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import InputField from "./InputField"
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import emailjs from 'emailjs-com';

// Extraido de la documentacion de emailjs https://www.emailjs.com

const Contact = () => {
  const [values, setValues] = useState({
    from_name: '',
    email: '',
    role: '',
    message: ''
  });

  
  const [status, setStatus] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(process.env.REACT_APP_SERVICE, process.env.REACT_APP_TEMPLATE, values, process.env.REACT_APP_VALUES) 
      .then(response => {
        console.log('SUCCESS!', response);
        setValues({
          from_name: '',
          email: '',
          message: ''
        });
        setStatus('SUCCESS');
      }, error => {
        console.log('FAILED...', error);
      });
  }

  useEffect(() => {
    if(status === 'SUCCESS') {
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  }, [status]);

  const handleChange = (e) => {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Container fluid className="contact">
      <Row style={{ justifyContent: "center", padding: "20px" }}></Row>
      {status && renderAlert()}
      <form onSubmit={handleSubmit}>
        <h2 className="text-info">¡Envienos su mensaje!</h2>
        <h6 className="text-info">Nombre completo</h6>
          <InputField value={values.from_name} handleChange={handleChange} name="from_name" type="text" placeholder="John Doe" />
        <h6 className="text-info">E-Mail</h6>
          <InputField value={values.email} handleChange={handleChange}  name="email" type="email" placeholder="jphn@example.com" />
        <h6 className="text-info">Motivo</h6>
          <SelectField handleChange={handleChange} name="role"/>
        <h6 className="text-info">Escriba aquí su mensaje</h6>
          <TextareaField value={values.message} handleChange={handleChange} name="message"/>
        <button type="submit" className="fork-btn-inner bg-primary">Enviar</button>
      </form>
    </Container>
   
  )
  
}


const renderAlert = () => (
  
    <Container fluid className="contact-section" style={{ justifyContent: "center", padding: "150px" }}>
      <p className="text-info"><h2>¡Su mensaje a sido enviado con éxito!</h2></p>
    </Container>
  )

  export default Contact;

