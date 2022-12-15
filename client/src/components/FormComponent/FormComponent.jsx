import React from "react";
import { useState } from "react";
import { Row, Container } from "react-bootstrap";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import emailjs from "@emailjs/browser";




export default function Contact() {
  const [values, setValues] = useState({
    from_name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_4awspmm",
        "template_ll1g194",
        e.target,
        "kI0d_Ad7od4cni90h"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          setValues({
            from_name: "",
            email: "",
            message: "",
          });
          setStatus ('Su consulta fue enviada con exito!')
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    
     <Container fluid className="contact">
      <Row style={{ justifyContent: "center", padding: "20px" }}></Row>
      {status}
      <form onSubmit={handleSubmit}>
        <h3 className="text-info"> Nombre Completo </h3>
        <InputField
          value={values.from_name}
          handleChange={handleChange}
          name="from_name"
          type="text"
          placeholder="John Doe"
        />
        <h3 className="text-info"> Email </h3>
        <InputField
          value={values.email}
          handleChange={handleChange}
          name="email"
          type="email"
          placeholder="jphn@example.com"
        />{" "}
        <h3 className="text-info"> ¿En que podemos ayudarle? </h3>
        <TextareaField
          value={values.message}
          handleChange={handleChange}
          name="message"
        />
        <button type="submit" class="btn btn-outline-success">Enviar</button>
        
        
        <br></br>
        <br></br>

        <a class="btn btn-primary" href="/home" role="button">Volver</a>
      </form>
    </Container>
    
  );
}
