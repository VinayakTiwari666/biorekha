import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>
          About <span className="highlight">BioRekha</span>
        </h1>

        <p className="about-subtext">
          BioRekha is a digital healthcare platform designed to help individuals
          securely manage, access, and understand their health records —
          all in one place.
        </p>
      </section>

      {/* What We Do */}
      <section className="about-section">
        <h2>Why BioRekha?</h2>
        <p>
          Managing health records is often fragmented, confusing, and insecure.
          BioRekha aims to simplify this by providing a centralized and
          patient-first system where your medical data remains under your control.
        </p>
      </section>

      {/* Values / Trust Section */}
      <section className="about-values">
        <div className="value-card">
          <h3>🔒 Secure by Design</h3>
          <p>
            Your health data is sensitive. BioRekha is built with security
            as a priority, ensuring privacy and protection at every step.
          </p>
        </div>

        <div className="value-card">
          <h3>📁 Centralized Records</h3>
          <p>
            All your important health information, accessible anytime,
            without relying on scattered documents or platforms.
          </p>
        </div>

        <div className="value-card">
          <h3>🧑‍⚕️ Patient First</h3>
          <p>
            BioRekha is designed around the user, giving patients clarity,
            control, and confidence over their own health data.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <p>Ready to take control of your health records?</p>
        <button className="get-started-btn">
          Continue to Login
        </button>
        <br />
        <Link to="/">
  <button className="get-started-btn">
    BACK TO HOME
  </button>
</Link>
      </section>

    </div>
  )
  
}

export default AboutPage
