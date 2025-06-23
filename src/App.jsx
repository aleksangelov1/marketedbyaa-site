import { useState } from "react";

const steps = [
  {
    label: "What's your name?",
    name: "name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Your email address",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Phone number",
    name: "phone",
    type: "tel",
    placeholder: "Enter your phone",
  },
  {
    label: "Which service are you interested in?",
    name: "service",
    type: "select",
    options: [
      "Facebook & Instagram Ads",
      "TikTok Ads",
      "Google Ads",
      "Creative Content",
      "Not Sure / Need Advice",
    ],
  },
  {
    label: "Monthly marketing budget",
    name: "budget",
    type: "select",
    options: [
      "Under £1,000",
      "£1,000 - £5,000",
      "£5,000 - £20,000",
      "£20,000+",
    ],
  },
  {
    label: "Tell us about your business (optional)",
    name: "about",
    type: "textarea",
    placeholder: "E.g. your niche, goals, current marketing...",
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
        <h2>Thanks for applying!</h2>
        <p>
          We'll get back to you within 24 hours. <br />
          <button onClick={onBackHome} className="form-btn">
            Back to Home
          </button>
        </p>
      </div>
    );

  const s = steps[step];
  return (
    <form className="form-card" onSubmit={handleNext}>
      <label>
        {s.label}
        {s.type === "select" ? (
          <select
            required
            value={form[s.name] || ""}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select an option</option>
            {s.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : s.type === "textarea" ? (
          <textarea
            value={form[s.name] || ""}
            onChange={handleChange}
            placeholder={s.placeholder}
            className="form-input"
            rows={4}
          />
        ) : (
          <input
            required={step !== steps.length - 1}
            value={form[s.name] || ""}
            onChange={handleChange}
            placeholder={s.placeholder}
            className="form-input"
            type={s.type}
          />
        )}
      </label>
      <div className="form-actions">
        <button type="button" onClick={handlePrev} className="form-btn">
          {step === 0 ? "Back to Home" : "Back"}
        </button>
        <button type="submit" className="form-btn blue">
          {step === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
      <div className="progress-bar">
        <div style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
    </form>
  );
}

function Section({ id, title, dark, children }) {
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
    <div>
      <nav className="navbar">
        <div className="logo-img">
          <img src="/logo.png" alt="Marketed by AA Logo" />
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
          <span className="blue">Marketed by AA</span>
        </h1>
        <p>
          Performance marketing that scales ambitious brands. <br />
          Facebook, TikTok & Google Ads done the <span className="blue">bold</span> way.
        </p>
        <button className="hero-cta" onClick={() => setShowForm(true)}>
          Apply Now
        </button>
      </header>
      <Section id="about" title="About Us">
        <p>
          Marketed by AA is your growth engine. We use creative, data-led ads to get brands seen, trusted, and scaling. Get the impact of an in-house team, minus the overheads.
        </p>
      </Section>
      <Section id="services" title="What We Do" dark>
        <ul>
          <li>
            <b>Paid Social Ads:</b> Facebook & Instagram. Laser-targeted, tested, and tweaked.
          </li>
          <li>
            <b>TikTok Ads:</b> Capture the next generation with authentic creative and UGC.
          </li>
          <li>
            <b>Google Ads:</b> Be where buyers search. High-intent, bottom-funnel focus.
          </li>
          <li>
            <b>Creative Packages:</b> Scroll-stopping videos & content built for paid media.
          </li>
        </ul>
      </Section>
      <Section id="how" title="How It Works">
        <ol>
          <li>
            <b>Discovery Call:</b> We learn your vision and pain points.
          </li>
          <li>
            <b>Blueprint:</b> Custom strategy, creative, and media plan.
          </li>
          <li>
            <b>Launch & Optimise:</b> Relentless testing, daily reporting.
          </li>
          <li>
            <b>Scale:</b> Double down on what works, cut the noise.
          </li>
        </ol>
      </Section>
      <Section id="pricing" title="Pricing" dark>
        <ul>
          <li>
            <b>Essentials (Self-serve):</b> from £500/mo
          </li>
          <li>
            <b>Full Service Growth:</b> from £1,000/mo + % of ad spend
          </li>
          <li>
            <b>Creative Packs:</b> from £250/mo
          </li>
          <li>
            Need something bespoke? <span className="blue">Get in touch.</span>
          </li>
        </ul>
      </Section>
      <Section id="faq" title="FAQ">
        <details>
          <summary>What makes Marketed by AA different?</summary>
          <p>
            Real partnership, not just reporting. No bloat, no nonsense, just real, honest scaling.
          </p>
        </details>
        <details>
          <summary>What niches do you work with?</summary>
          <p>
            Ecom, info products, local business, SaaS—if it can scale, we can run ads for it.
          </p>
        </details>
        <details>
          <summary>How fast do you launch?</summary>
          <p>
            Most brands launch in 3–5 days after onboarding.
          </p>
        </details>
      </Section>
      <footer>
        &copy; {new Date().getFullYear()} Marketed by AA. Website by AA.
      </footer>
    </div>
  );
}
