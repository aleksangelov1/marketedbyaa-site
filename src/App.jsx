import { useState } from "react";

// --- Multi-step Apply Form ---
const steps = [
  {
    label: "What's your full name?",
    name: "name",
    type: "text",
    placeholder: "Full name",
  },
  {
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    label: "Phone number",
    name: "phone",
    type: "tel",
    placeholder: "Phone",
  },
  {
    label: "Which service interests you most?",
    name: "service",
    type: "select",
    options: [
      "Paid Social Ads",
      "TikTok Ads",
      "Google Ads",
      "Creative Content",
      "Not Sure",
    ],
  },
  {
    label: "What's your monthly ad budget?",
    name: "budget",
    type: "select",
    options: [
      "Under £1,000",
      "£1,000–£5,000",
      "£5,000–£20,000",
      "£20,000+",
    ],
  },
  {
    label: "Describe your business (optional)",
    name: "about",
    type: "textarea",
    placeholder: "Niche, goals, current marketing, etc.",
  },
];

function ApplyNowForm({ onBackHome }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [steps[step].name]: e.target.value });
  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };
  const handlePrev = () => (step > 0 ? setStep(step - 1) : onBackHome());

  if (submitted)
    return (
      <div className="form-card centered">
        <h2>Thank you for applying!</h2>
        <p>We’ll be in touch within 24 hours.<br />
          <button onClick={onBackHome} className="form-btn blue">Back to Home</button>
        </p>
      </div>
    );

  const s = steps[step];
  return (
    <form className="form-card centered" onSubmit={handleNext}>
      <label>
        {s.label}
        {s.type === "select" ? (
          <select
            required
            value={form[s.name] || ""}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select</option>
            {s.options.map((opt) => <option key={opt}>{opt}</option>)}
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
        <button type="button" onClick={handlePrev} className="form-btn">Back</button>
        <button type="submit" className="form-btn blue">
          {step === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
      <div className="progress-bar"><div style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
    </form>
  );
}

// --- Main Sections ---
function Section({ id, title, children, dark, wide }) {
  return (
    <section className={`section${dark ? " dark" : ""}${wide ? " wide" : ""}`} id={id}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

// --- Reviews Data ---
const reviews = [
  {
    name: "Sophia B.",
    quote: "Marketed by AA literally changed our business. Within two months, our leads doubled and our ROI went up by 300%. Couldn’t ask for a better team.",
  },
  {
    name: "Jack H.",
    quote: "Aleks and the team don’t just run ads – they act like a true partner. Transparent, responsive, and the results speak for themselves.",
  },
  {
    name: "Ella D.",
    quote: "Our last agency wasted so much budget. AA’s hands-on approach & constant testing got us real customers, not just clicks.",
  },
];

export default function App() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) return <ApplyNowForm onBackHome={() => setShowForm(false)} />;

  return (
    <div>
      {/* NAV */}
      <nav className="navbar">
        <div className="logo-img big-logo">
          <img src="/logo.png" alt="Marketed by AA Logo" />
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#why">Why Us</a>
          <a href="#services">Services</a>
          <a href="#how">How It Works</a>
          <a href="#reviews">Reviews</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <button className="apply-btn" onClick={() => setShowForm(true)}>
            Apply Now
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero centered">
        <div className="logo-img big-hero-logo">
          <img src="/logo.png" alt="Marketed by AA Logo" />
        </div>
        <h1>
          <span className="blue">Marketed by AA</span>
        </h1>
        <p>
          Performance marketing that scales <span className="blue">ambitious brands</span>.<br />
          Facebook, TikTok & Google Ads—the bold, proven way.
        </p>
        <button className="hero-cta" onClick={() => setShowForm(true)}>
          Apply Now
        </button>
      </header>

      {/* ABOUT */}
      <Section id="about" title="About Us" wide>
        <p>
          <b>We’re not just an agency—we’re your partner in growth.</b><br /><br />
          At Marketed by AA, we know how tough it is to cut through the noise online. That’s why we blend creative, scroll-stopping content with data-driven media buying, built to turn strangers into loyal fans.<br /><br />
          Our founder Aleks worked inside real brands and saw what works—and what’s just fluff. We believe in radical transparency, real results, and outworking every other agency out there.<br /><br />
          Whether you’re a startup looking for traction, or an established business ready to scale, we deliver the energy, strategy, and hands-on care you’d expect from an in-house team—without the overheads. <span className="blue">Your wins are our wins.</span>
        </p>
        <ul className="about-list">
          <li>• Creative-first ad strategies built to stop thumbs.</li>
          <li>• Daily reporting. Weekly strategy calls.</li>
          <li>• Paid social, TikTok, Google & creative: all in one place.</li>
        </ul>
      </Section>

      {/* WHY WORK WITH US */}
      <Section id="why" title="Why Work With Us?" dark>
        <div className="why-cards">
          <div className="why-card">
            <h3>🚀 Proven Results</h3>
            <p>
              Consistent 2–5x ROAS for our clients. We show you the numbers, not just the “reach”.
            </p>
          </div>
          <div className="why-card">
            <h3>🤝 Hands-On Approach</h3>
            <p>
              You deal direct with Aleks and the real team—not account managers or chatbots.
            </p>
          </div>
          <div className="why-card">
            <h3>🛠️ Tailored Gameplan</h3>
            <p>
              Every brand is unique. Your strategy, creatives, and budget are built from scratch.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" title="What We Do">
        <ul className="services-list">
          <li><b>Paid Social Ads:</b> Facebook & Instagram. Laser-targeted, tested, and tweaked.</li>
          <li><b>TikTok Ads:</b> Capture the next generation with authentic creative and UGC.</li>
          <li><b>Google Ads:</b> Be where buyers search. High-intent, bottom-funnel focus.</li>
          <li><b>Creative Packages:</b> Scroll-stopping videos & content built for paid media.</li>
        </ul>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how" title="How It Works" dark>
        <div className="steps-row">
          <div className="step-card">
            <span>1</span>
            <b>Discovery Call</b>
            <p>We listen to your vision & goals.</p>
          </div>
          <div className="step-card">
            <span>2</span>
            <b>Custom Plan</b>
            <p>Your strategy, creative & ad plan mapped out.</p>
          </div>
          <div className="step-card">
            <span>3</span>
            <b>Launch & Optimise</b>
            <p>Relentless testing, daily feedback.</p>
          </div>
          <div className="step-card">
            <span>4</span>
            <b>Scale Up</b>
            <p>Double down on what’s working. Cut waste. Grow fast.</p>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" title="What Clients Say">
        <div className="reviews-row">
          {reviews.map(({ name, quote }) => (
            <div key={name} className="review-card">
              <p>"{quote}"</p>
              <span>- {name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" title="Pricing" dark>
        <ul className="pricing-list">
          <li><b>Essentials:</b> from <span className="blue">£500/mo</span></li>
          <li><b>Full Service Growth:</b> from <span className="blue">£1,000/mo</span> + % of ad spend</li>
          <li><b>Creative Packs:</b> from <span className="blue">£250/mo</span></li>
          <li>
            Need something bespoke? <span className="blue">Get in touch.</span>
          </li>
        </ul>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ">
        <details>
          <summary>What makes Marketed by AA different?</summary>
          <p>Radical transparency. No bloat. Real results—delivered by real people, not just dashboards.</p>
        </details>
        <details>
          <summary>What niches do you work with?</summary>
          <p>Ecom, info products, local business, SaaS—if it can scale, we can run ads for it.</p>
        </details>
        <details>
          <summary>How fast do you launch?</summary>
          <p>Most brands launch in 3–5 days after onboarding.</p>
        </details>
      </Section>

      <footer>
        &copy; {new Date().getFullYear()} Marketed by AA. Website by AA.
      </footer>
    </div>
  );
}
