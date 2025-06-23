import { useState } from "react";

// Fake brands for Trusted By
const trustedBrands = [
  { name: "BrewTea", result: "+240% ROAS" },
  { name: "NovaSkin", result: "3x sales in 90 days" },
  { name: "UrbanPulse", result: "+175% new customers" },
  { name: "VoltWear", result: "2.4x store conversion" },
];

// Reviews
const reviews = [
  {
    name: "Sophia B., BrewTea",
    quote: "Aleks took our ad account from flat to on fire! Revenue up, stress down.",
  },
  {
    name: "Jack H., NovaSkin",
    quote: "I finally understand where my money’s going. Relentless testing and honest feedback.",
  },
  {
    name: "Ella D., VoltWear",
    quote: "The only marketer who cared about results, not just spend. My go-to growth partner.",
  },
];

// Steps for multi-step form
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
    type: "radio",
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
    type: "radio",
    options: [
      "£0–£1,000",
      "£1,000–£2,000",
      "£2,000–£5,000",
      "£5,000+",
    ],
  },
  {
    label: "Timeline for launch",
    name: "timeline",
    type: "radio",
    options: [
      "ASAP",
      "Within a month",
      "1-3 months",
      "3+ months",
    ],
  },
  {
    label: "How did you hear about us?",
    name: "referral",
    type: "radio",
    options: [
      "Google search",
      "Referral",
      "Instagram/TikTok",
      "Other",
    ],
  },
  {
    label: "Tell us about your business (optional)",
    name: "about",
    type: "textarea",
    placeholder: "Niche, goals, current marketing, etc.",
  },
];

// Section wrapper
function Section({ id, title, children, dark, wide }) {
  return (
    <section className={`section${dark ? " dark" : ""}${wide ? " wide" : ""}`} id={id}>
      {title && (
        <div className="section-heading">
          <h2>{title}</h2>
          <div className="heading-underline"></div>
        </div>
      )}
      {children}
    </section>
  );
}

// Multi-step Apply Now form
function ApplyNowForm({ onBackHome }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [steps[step].name]: e.target.value });
  };
  const handleRadioChange = (value) => {
    setForm({ ...form, [steps[step].name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };
  const handlePrev = () => (step > 0 ? setStep(step - 1) : onBackHome());

  if (submitted)
    return (
      <div className="form-card centered" style={{ minHeight: 400, justifyContent: "center" }}>
        <h2>Thank you for applying!</h2>
        <p style={{ margin: "1.2em 0" }}>
          We’ll be in touch within 24 hours.
        </p>
        <button onClick={onBackHome} className="form-btn blue">
          Back to Home
        </button>
      </div>
    );

  const s = steps[step];

  return (
    <div className="apply-form-outer">
      <form className="form-card centered" onSubmit={handleNext} style={{ minHeight: 340, justifyContent: "center" }}>
        <label style={{ width: "100%" }}>
          {s.label}
          {s.type === "radio" ? (
            <div className="radio-group" style={{ marginTop: 18 }}>
              {s.options.map((opt) => (
                <label key={opt} className="custom-radio" style={{ marginBottom: 4 }}>
                  <input
                    type="radio"
                    name={s.name}
                    value={opt}
                    checked={form[s.name] === opt}
                    onChange={() => handleRadioChange(opt)}
                    required
                  />
                  <span className="radio-indicator" />
                  <span className="radio-label">{opt}</span>
                </label>
              ))}
            </div>
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
            Back
          </button>
          <button type="submit" className="form-btn blue">
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
        <div className="progress-bar">
          <div style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </form>
    </div>
  );
}

// Learn More page
function LearnMore({ onBackHome }) {
  return (
    <div className="learn-more-page">
      <div className="learn-more-card">
        <h1>Learn More About Marketed by AA</h1>
        <p>
          At Marketed by AA, I use data, creative, and relentless testing to help brands break through growth plateaus. Whether you need full-funnel paid media, creative strategy, or just want to talk about scaling - I’ve got you.
        </p>
        <ul>
          <li>100% transparency & real-time results.</li>
          <li>Solo founder, no fluff, no handoffs.</li>
          <li>Partnerships with brands like BrewTea, NovaSkin, UrbanPulse, and more.</li>
        </ul>
        <button className="hero-cta" onClick={onBackHome}>Back to Home</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("");

  if (page === "learn") return <LearnMore onBackHome={() => setPage("")} />;
  if (page === "apply") return <ApplyNowForm onBackHome={() => setPage("")} />;

  return (
    <div>
      {/* Hero blobs */}
      <div className="hero-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-img big-logo">
          <img src="/logo.png" alt="Marketed by AA Logo" style={{ height: "98px" }} />
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#why">Why Us</a>
          <a href="#services">Services</a>
          <a href="#how">How It Works</a>
          <a href="#reviews">Reviews</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <button className="apply-btn pulse-btn" onClick={() => setPage("apply")}>
            Apply Now
          </button>
        </div>
      </nav>
      {/* HERO */}
      <header className="hero centered">
        <div className="logo-img big-hero-logo">
          <img src="/logo.png" alt="Marketed by AA Logo" style={{ height: "122px" }} />
        </div>
        <h1>
          <span className="blue">Empower Your Brand</span>
        </h1>
        <p>
          Achieve sustainable growth with data-driven strategies.<br />
          Unlock the full potential of your brand with insights and powerful tools.
        </p>
        <div className="hero-btn-row">
          <button className="hero-cta pulse-btn" onClick={() => setPage("apply")}>
            Apply Now
          </button>
          <button className="learn-more-btn" onClick={() => setPage("learn")}>
            Learn more →
          </button>
        </div>
      </header>
      {/* RESULTS PROOF CARD */}
      <Section wide>
        <div
          className="card"
          style={{
            maxWidth: 440,
            margin: "0 auto 3rem auto",
            background: "rgba(20, 30, 42, 0.97)",
            boxShadow: "0 8px 64px #aed6f155",
            border: "1px solid #213c4c",
            textAlign: "center"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#AED6F1" }}>
            Generating an extra $15.5k in tracked revenue—see for yourself!
          </div>
          <img
            src="/result-proof.png"
            alt="Client results"
            style={{
              width: "100%",
              borderRadius: "1.3em",
              boxShadow: "0 0 14px #aed6f1bb"
            }}
          />
          <div style={{ marginTop: 16, color: "#eaf6fb", fontSize: 15 }}>
            <b>£1,918.14 spent</b> → <b>£15,505.26 in sales</b> <br />
            <span style={{ color: "#aad" }}>7.54x avg. ROAS | 254 purchases</span>
          </div>
        </div>
      </Section>
      {/* TRUSTED BY */}
      <Section wide>
        <div className="trusted-row">
          <span className="trusted-title">TRUSTED BY</span>
          {trustedBrands.map(b => (
            <div className="trusted-brand" key={b.name}>
              <span>{b.name}</span>
              <span className="brand-result">{b.result}</span>
            </div>
          ))}
        </div>
      </Section>
      {/* ABOUT */}
      <Section id="about" title="About Us" wide>
        <p>
          <b>Marketed by AA is more than an agency - it's your personal growth partner.</b><br /><br />
          Founded by Aleks Angelov, I deliver creative-first, data-obsessed marketing for brands that want real results - not just reports. I’ve scaled brands from zero to 7 figures and everything in between, using relentless testing, radical honesty, and full transparency at every step.<br /><br />
          When you work with me, you get hands-on support, daily reporting, weekly calls, and a proven system built for the platforms that matter: Facebook, TikTok, Google, and UGC. <span className="blue">There’s no copy-paste “strategy” here - just hard work and results.</span>
        </p>
        <ul className="about-list">
          <li>Creative ads and scroll-stopping content built for conversions.</li>
          <li>Real-time feedback and optimizations.</li>
          <li>You work directly with me, not a random account manager.</li>
        </ul>
      </Section>
      {/* WHY WORK WITH ME */}
      <Section id="why" title="Why Work With Me?" dark>
        <div className="why-cards">
          <div className="why-card">
            <div className="why-symbol">⭐</div>
            <h3>Proven Results</h3>
            <p>
              Consistent 2-5x ROAS for clients. The data speaks for itself.
            </p>
          </div>
          <div className="why-card">
            <div className="why-symbol">🤝</div>
            <h3>Hands-On Approach</h3>
            <p>
              You get real attention and support from Aleks - no bots, no runaround.
            </p>
          </div>
          <div className="why-card">
            <div className="why-symbol">⚡</div>
            <h3>Tailored Gameplan</h3>
            <p>
              Every brand is unique. Your plan is built from scratch.
            </p>
          </div>
        </div>
      </Section>
      {/* WHAT I DO */}
      <Section id="services" title="What I Do">
        <ul className="services-list">
          <li>Paid Social Ads: Facebook & Instagram - targeting, scaling, creative.</li>
          <li>TikTok Ads: Authentic, platform-native, and viral.</li>
          <li>Google Ads: Dominate search and retarget ready-to-buy customers.</li>
          <li>Creative Packages: UGC, video, and ad content built for conversions.</li>
        </ul>
      </Section>
      {/* HOW IT WORKS */}
      <Section id="how" title="How It Works" dark>
        <div className="steps-row">
          <div className="step-card">
            <span>1</span>
            <b>Discovery Call</b>
            <p>We talk goals and diagnose your bottlenecks.</p>
          </div>
          <div className="step-card">
            <span>2</span>
            <b>Custom Plan</b>
            <p>Your unique ad, creative, and scaling blueprint.</p>
          </div>
          <div className="step-card">
            <span>3</span>
            <b>Launch & Optimise</b>
            <p>Relentless testing, daily feedback, real growth.</p>
          </div>
          <div className="step-card">
            <span>4</span>
            <b>Scale Up</b>
            <p>Double down on what works - cut the waste.</p>
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
          <li>Essentials: from <span className="blue">£500/mo</span></li>
          <li>Full Service Growth: from <span className="blue">£1,000/mo</span> + % of ad spend</li>
          <li>Creative Packs: from <span className="blue">£250/mo</span></li>
          <li>
            Need something bespoke? <span className="blue">Get in touch.</span>
          </li>
        </ul>
      </Section>
      {/* FAQ */}
      <Section id="faq" title="FAQ">
        <details>
          <summary>What makes Marketed by AA different?</summary>
          <p>Radical transparency. No bloat. Real results delivered by a real partner - not just dashboards.</p>
        </details>
        <details>
          <summary>What niches do you work with?</summary>
          <p>Ecom, info, local business, SaaS - if it can scale, I can run ads for it.</p>
        </details>
        <details>
          <summary>How fast do you launch?</summary>
          <p>Most brands launch in 3-5 days after onboarding.</p>
        </details>
      </Section>
      <footer>
        &copy; {new Date().getFullYear()} Marketed by AA. Website by AA.
      </footer>
    </div>
  );
}
