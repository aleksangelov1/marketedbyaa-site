import { useState } from "react";
import LearnMore from "./LearnMore";

// Fake brands for Trusted By
const trustedBrands = [
  { name: "BrewTea", result: "+240% ROAS" },
  { name: "NovaSkin", result: "3x sales in 90 days" },
  { name: "UrbanPulse", result: "+175% new customers" },
  { name: "VoltWear", result: "2.4x store conversion" },
];

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
      "Facebook Ads",
      "Creative Content",
      "Not Sure",
    ],
  },
  {
    label: "What's your monthly ad budget?",
    name: "budget",
    type: "radio",
    options: [
      "£0-£500",
      "£500-£2,000",
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
      "Instagram/TikTok",
      "Word of mouth",
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
    <div
      className="form-card"
      style={{
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: "1em" }}>Thank you for applying!</h2>
      <p style={{ margin: "0 0 2em 0", color: "#eaf6fb" }}>
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
      <form className="form-card centered" onSubmit={handleNext}>
        <label>
          {s.label}
          {s.type === "radio" ? (
            <div className="radio-group">
              {s.options.map((opt) => (
                <label key={opt} className="custom-radio">
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

export default function App() {
  const [page, setPage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  if (page === "learn") return <LearnMore onBackHome={() => setPage("")} />;
  if (page === "apply") return <ApplyNowForm onBackHome={() => setPage("")} />;

  return (
    <div>
      {/* Hero background blobs */}
      <div className="hero-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      {/* NAV */}
      <nav className="navbar">
        <div className="logo-img big-logo">
          <img src="/logo.png" alt="Marketed by AA Logo" />
        </div>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why Us</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <button
            className="apply-btn pulse-btn"
            onClick={() => {
              setPage("apply");
              setMenuOpen(false);
            }}
          >
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
          <span className="blue">Empower Your Brand</span>
        </h1>
        <p>
          Achieve sustainable growth with data-driven strategies.<br />
          Unlock the full potential of your brand with insights and powerful tools.<br />
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

      {/* TRUSTED */}
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

      {/* ————— RESULT PROOF ————— */}
      <Section title="Client Results">
        <p className="result-desc">
          Generating an extra $15.5k in tracked revenue - see for yourself!
        </p>
        <div className="result-proof">
          <img src="/result-proof.png" alt="Client results" />
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
          <li> Creative ads and scroll-stopping content built for conversions.</li>
          <li> Real-time feedback and optimizations.</li>
          <li> You work directly with me, not a random account manager.</li>
        </ul>
      </Section>

      {/* WHY WORK WITH US */}
      <Section id="why" title="Why Work With Me?" dark>
        <div className="why-cards">
          <div className="why-card">
            <div className="why-symbol">⭐️</div>
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

      {/* SERVICES */}
      <Section id="services" title="What I Do">
        <ul className="services-list">
          <li> Paid Social Ads: Facebook & Instagram - targeting, scaling, creative.</li>
          <li> TikTok Ads: Authentic, platform-native, and viral.</li>
          <li> Google Ads: Dominate search and retarget ready-to-buy customers.</li>
          <li> Creative Packages: UGC, video, and ad content built for conversions.</li>
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
      <Section id="pricing" title="Our Pricing Approach" dark>
        <div className="pricing-list">
          <p>Every business is unique — so our pricing is built around you.</p>
          <p>
            At Marketed by AA, we believe in flexibility. Instead of locking you
            into a one-size-fits-all package, we offer tailored models that
            adapt to your goals, budget, and growth stage.
          </p>

          <p>⸻</p>

          <h3>💼 Retainer Based (Flat Monthly Fee)</h3>
          <ul>
            <li>Fixed monthly cost for peace of mind.</li>
            <li>You’ll always know exactly what you’re billed.</li>
            <li>
              Even if results scale massively, you only pay the agreed amount.
            </li>
          </ul>
          <p>👉 Perfect if you want predictable, stable growth.</p>

          <p>⸻</p>

          <h3>📈 Results Based (Pay for Performance)</h3>
          <ul>
            <li>You only pay based on the results we deliver.</li>
            <li>Minimal risk on your end — we carry the responsibility.</li>
            <li>Easier to say “yes” since ROI is clear from day one.</li>
          </ul>
          <p>👉 Perfect if you want risk-free scaling.</p>

          <p>⸻</p>

          <h3>🎯 Free Trial Periods (Case-by-Case)</h3>
          <ul>
            <li>In some cases, we offer trial periods or discounted first months.</li>
            <li>Gives you the chance to see how we work before fully committing.</li>
          </ul>
          <p>👉 Perfect if you want to test drive our system before scaling up.</p>

          <p>⸻</p>

          <h3>Our Promise</h3>
          <p>
            Whether you prefer stability, flexibility, or a trial to start,
            we’ll structure pricing around what makes you comfortable.
          </p>

          <p>⸻</p>

          <button
            className="hero-cta"
            onClick={() => setPage("apply")}
            style={{ marginTop: "1em" }}
          >
            Book Your Free Strategy Call →
          </button>
        </div>
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
        <span>
          &copy; {new Date().getFullYear()} Marketed by AA. Website by AA.
        </span>
        <a
          href="https://www.instagram.com/aamarketingg/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="instagram-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}
