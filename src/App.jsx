import { useState } from "react";

const steps = [
  {
    label: "What's your name?",
    name: "name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "What's your email address?",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "What service are you interested in?",
    name: "service",
    type: "text",
    placeholder: "e.g. Facebook Ads, TikTok Ads, Google Ads",
  },
  {
    label: "Tell us a bit about your business",
    name: "about",
    type: "textarea",
    placeholder: "Describe your business...",
  },
];

function ApplyNowForm({ onBackHome }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [steps[step].name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
    else onBackHome();
  };

  if (submitted)
    return (
      <div className="form-card">
        <h2>Thank you for applying!</h2>
        <p>We’ll be in touch soon.</p>
        <button onClick={onBackHome}>Back to Home</button>
      </div>
    );

  return (
    <form className="form-card" onSubmit={handleNext}>
      <label>
        {steps[step].label}
        {steps[step].type === "textarea" ? (
          <textarea
            required
            value={form[steps[step].name] || ""}
            onChange={handleChange}
            placeholder={steps[step].placeholder}
          />
        ) : (
          <input
            type={steps[step].type}
            required
            value={form[steps[step].name] || ""}
            onChange={handleChange}
            placeholder={steps[step].placeholder}
          />
        )}
      </label>
      <div className="form-actions">
        <button type="button" onClick={handlePrev}>
          {step === 0 ? "Back to Home" : "Back"}
        </button>
        <button type="submit">{step === steps.length - 1 ? "Submit" : "Next"}</button>
      </div>
      <div className="progress-bar">
        <div style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
    </form>
  );
}

function Section({ title, children, id, dark }) {
  return (
    <section className={`section${dark ? " dark" : ""}`} id={id}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function App() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <ApplyNowForm onBackHome={() => setShowForm(false)} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="blue">AA</span> Marketing
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <button className="apply-btn" onClick={() => setShowForm(true)}>
            Apply Now
          </button>
        </div>
      </nav>

      <header className="hero">
        <h1>
          Scale Your Brand with <span className="blue">Marketed by AA</span>
        </h1>
        <p>
          Results-driven Facebook, TikTok, and Google Ads for bold brands.
        </p>
        <button className="hero-cta" onClick={() => setShowForm(true)}>
          Apply Now
        </button>
      </header>

      <Section title="About Us" id="about">
        <p>
          Marketed by AA is your dedicated growth partner—combining world-class creative, 
          relentless execution, and transparent reporting. We scale brands profitably, 
          no matter the niche.
        </p>
      </Section>

      <Section title="Our Services" id="services" dark>
        <ul>
          <li>
            <b>Facebook & Instagram Ads:</b> Advanced targeting for scalable ROI.
          </li>
          <li>
            <b>TikTok Ads:</b> Captivate Gen Z and Millennials on the world’s fastest-growing platform.
          </li>
          <li>
            <b>Google Ads:</b> Dominate search with high-intent buyers ready to convert.
          </li>
          <li>
            <b>Creative Strategy:</b> Stand out with scroll-stopping UGC and high-conversion creative.
          </li>
        </ul>
      </Section>

      <Section title="How It Works" id="how">
        <ol>
          <li>
            <b>Discovery Call:</b> We dive into your brand, goals, and what makes you different.
          </li>
          <li>
            <b>Launch:</b> We create and run bold, data-driven ad campaigns.
          </li>
          <li>
            <b>Scale:</b> You get clear results, regular reports, and reliable growth.
          </li>
        </ol>
      </Section>

      <Section title="Pricing" id="pricing" dark>
        <p>
          We keep it simple:
          <br />
          <b>Ad Management:</b> from £500/mo
          <br />
          <b>Creative Packages:</b> from £300/mo
          <br />
          Custom plans for ambitious brands. Book a call for a tailored quote.
        </p>
      </Section>

      <Section title="FAQ" id="faq">
        <details>
          <summary>What makes Marketed by AA different?</summary>
          <p>
            100% personalized, proactive, and data-driven. We act as your in-house team—without the payroll headaches.
          </p>
        </details>
        <details>
          <summary>Do you guarantee results?</summary>
          <p>
            We guarantee hustle, radical honesty, and transparent reporting. No agency can ethically guarantee sales, but we do guarantee relentless effort and strategic testing.
          </p>
        </details>
        <details>
          <summary>How soon can I get started?</summary>
          <p>
            Most brands launch within 1 week of signing up.
          </p>
        </details>
      </Section>

      <footer>
        <span>
          &copy; {new Date().getFullYear()} Marketed by AA. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
