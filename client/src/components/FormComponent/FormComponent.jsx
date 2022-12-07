import React from "react";
import { useState } from "react";
import { Row, Container } from "react-bootstrap";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import i18n from '../../i18n';

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
          setStatus (i18n.t('contact.your-message-was-sent-successfully'))
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
      <div>
    <Button as={Link} title="Español" href="/contact/?lng=es">ES</Button>
    <Button as={Link} title="English" href="/contact/?lng=en">EN</Button>
    <br /> <br />
    </div>
      <Row style={{ justifyContent: "center", padding: "20px" }}></Row>
      {status}
      <form onSubmit={handleSubmit}>
        <h4 className="text-info">{i18n.t('contact.full-name')}</h4>
        <InputField
          value={values.from_name}
          handleChange={handleChange}
          name="from_name"
          type="text"
          placeholder="John Doe"
        />
        <h4 className="text-info">{i18n.t('contact.e-mail')}</h4>
        <InputField
          value={values.email}
          handleChange={handleChange}
          name="email"
          type="email"
          placeholder="jphn@example.com"
        />{" "}
        <h4 className="text-info">{i18n.t('contact.your-message-here')}</h4>
        <TextareaField
          value={values.message}
          handleChange={handleChange}
          name="message"
        />
        <button type="submit" className="fork-btn-inner bg-primary">
        {i18n.t('dashboard.submit')}
        </button>
        <Link to="/home">BACK HOME</Link>
      </form>
    </Container>
  );
}
