import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <span className="eyebrow">Get in touch</span>
      <h1>Contact</h1>
      <p>Questions, feedback, or ideas — reach out anytime.</p>

      <div className="contact-card">
        <div className="contact-row">
          <span className="contact-label">Email</span>
          <span className="contact-value">muhammadus9129@gmail.com</span>
        </div>
      </div>

       <div className="contact-card">
        <div className="contact-row">
          <span className="contact-label">Phone</span>
          <span className="contact-value">+92 3204859265</span>
        </div>
      </div>


    </div>
  );
}

export default Contact;