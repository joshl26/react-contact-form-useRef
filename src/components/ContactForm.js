import Container from "react-bootstrap/Container";
import ReCAPTCHA from "react-google-recaptcha";
import env from "react-dotenv";

import { useCallback, useRef, useState } from "react";

const ContactForm = () => {
  const [captcha, setCaptcha] = useState(null);

  function onChange(value) {
    setCaptcha(value);
    console.log("Captcha value:", value);
    console.log(value);
  }

  const nameInput = useRef();
  const emailInput = useRef();
  const messageInput = useRef();

  const formSubmitHandler = useCallback((event) => {
    const templateId = env.EMAIL_JS_TEMPLATEID;

    event.preventDefault();

    const data = {
      name: nameInput.current?.value,
      email: emailInput.current?.value,
      message: messageInput.current?.value,
    };

    sendFeedback(templateId, data);

    console.log("Form submit handler");
    console.log(data);
  });

  function sendFeedback(templateId, variables) {
    window.emailjs
      .send(env.EMAIL_JS_SERVICEID, templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

  return (
    <Container>
      <form id="contact-form" onSubmit={formSubmitHandler} method="POST">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Enter your Name here"
            type="text"
            className="form-control"
            id="name"
            ref={nameInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            placeholder="Enter your Email address"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            ref={emailInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            ref={messageInput}
            className="form-control"
            rows="5"
          ></textarea>
        </div>
        {captcha ? (
          <button
            type="submit"
            className="g-recaptcha"
            data-sitekey="reCAPTCHA_site_key"
            data-callback="onSubmit"
            data-action="submit"
          >
            Submit
          </button>
        ) : (
          ""
        )}

        <ReCAPTCHA sitekey={env.REACT_APP_SITE_KEY} onChange={onChange} />
      </form>
    </Container>
  );
};

export default ContactForm;
