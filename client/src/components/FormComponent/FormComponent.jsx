import React from 'react'
import { useState } from "react";
import { Row, Container } from "react-bootstrap";
import InputField from "./InputField"
import TextareaField from "./TextareaField";


export default function Contact () {
  const [values, setValues] = useState({
    from_name: '',
    email: '',
    role: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
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

  const handleChange = (e) => {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <Container fluid className="contact">
      <Row style={{ justifyContent: "center", padding: "20px" }}></Row>
      {status}
      <form onSubmit={handleSubmit}>
        <h4 className="text-info">Nombre Completo</h4>
          <InputField value={values.from_name} handleChange={handleChange} name="from_name" type="text" placeholder="John Doe" />
        <h4 className="text-info">E-Mail</h4>
          <InputField value={values.email} handleChange={handleChange}  name="email" type="email" placeholder="jphn@example.com" />
        <h4 className="text-info">Tu mensaje aqui</h4>
          <TextareaField value={values.message} handleChange={handleChange} name="message"/>
        <button type="submit" className="fork-btn-inner bg-primary">Enviar</button>
      </form>
    </Container>
   
  )
  
}


