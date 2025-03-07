import React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { Toast } from 'react-bootstrap';

import emailjs from '@emailjs/browser';

function Contact(props) {
  
  const form = useRef();
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [showToastEmpty, setShowToastEmpty] = useState(false);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [formError, setFormError] = useState({
    nameError: '',
    emailError: '',
    messageError: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      nameError: '',
      emailError: '',
      messageError: ''
    };

    if (!formData.user_name.trim()) {
      errors.nameError = 'Por favor, ingrese su nombre.';
      isValid = false;
    }

    if (!formData.user_email.trim()) {
      errors.emailError = 'Por favor, ingrese su correo electrónico.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.messageError = 'Por favor, ingrese un mensaje.';
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowToastEmpty(true);
      return;
    }

    emailjs.sendForm('service_7hz1xkd', 'template_i8i8mt4', form.current, 'FdoqHujR1iZdgJZpM')
      .then((result) => {
          console.log(result.text);
          console.log("Enviado correctamente");
          setShowToastSuccess(true);
      }, (error) => {
          console.log(error.text);
          console.log("Error al enviar");
          setShowToastError(true);
      });
  };

  return (
    <div className="">
      <h2 className="color-transition mb-5 mt-5">CONTACTO</h2>
      <div className="row gy-5">
        <div class="card col-lg-3 me-3 bg-dark text-white hover-zoom shadow-box p-0">
          <div className="card-img-wrapper">
            <img src="/images/Liana_2021.JPG" alt="Liana" className="border-rounded img-fluid" style={{opacity: 0.5}} />
          </div>
          <div class="card-img-overlay d-flex flex-column justify-content-between">
            <h3 className="mt-4"><i className="fas fa-map-marker-alt"></i> Madrid, 28006, España</h3>
            <h3 className=""><a href="tel:+34646155309" className="link-light"><i class='fas fa-phone-square'></i> 646 155 309</a></h3>
          </div>
        </div>
        
        <div class="col-lg-3 me-3 img-zoom shadow-box p-0 contact-custom position-relative">
          <a href="https://www.instagram.com/liaanaa8/">
            <img src="/images/Liana_Instagram.JPG" alt="Liana" className="border-rounded img-fluid" style={{opacity: 0.5}} />
            <h4 class="text-center color-transition-insta position-absolute top-50 start-50 translate-middle m-0"><i class='fab fa-instagram'></i> Abrir mi Instagram</h4>
          </a>
        </div>
      
        <div className="col-lg-5 bg-form form-custom border border-danger border-rounded shadow-box">
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <h3 className="text-light mt-2">Envíame un correo</h3>
              <label className="form-label text-light custom-text-left">
                Nombre del remitente
              </label>
              <input type="text" className="form-control" placeholder="Nombre" name="user_name" value={formData.user_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">
                Email del remitente
              </label>
              <input type="email" className="form-control" placeholder="name@example.com" name="user_email" value={formData.user_email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">
                Mensaje de texto
              </label>
              <textarea className="form-control" placeholder="Texto" name="message" value={formData.message} onChange={handleChange} style={{ maxHeight: '150px' }}></textarea>
            </div>
            <button type="submit" value="Send" className="btn btn-danger mb-1">
              Enviar
            </button>
          </form>
        </div>
      </div>
      
      <div aria-live="polite" aria-atomic="true" class="position-relative">
        <div class="toast-container position-absolute top-0 end-0 p-3">
          <div className={`toast toast-custom align-items-center text-white bg-success border-0 ${showToastSuccess ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">
                ¡Email Enviado correctamente! Se le contestará lo antes posible.
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToastSuccess(false)}></button>
            </div>
          </div>
          <div className={`toast align-items-center text-white bg-danger border-0 ${showToastError ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">
                ¡Error al enviar el correo! Intente enviar otra vez en un rato después de haber refrescado la página.
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToastError(false)}></button>
            </div>
          </div>
          <div className={`toast align-items-center text-white bg-danger border-0 ${showToastEmpty ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">
                Complete todos los campos, por favor.
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToastEmpty(false)}></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;