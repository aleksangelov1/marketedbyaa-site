export default function LearnMore({ onBackHome }) {
  return (
    <div className="learn-more-page">
      <div className="learn-more-card">
        <h1>Learn More About Marketed by AA</h1>
        <p>
          At Marketed by AA, I use data, creative, and relentless testing to help brands break through growth plateaus. Whether you need full-funnel paid media, creative strategy, or just want to talk about scaling - I’ve got you.
        </p>
        <ul>
          <li>- 100% transparency & real-time results.</li>
          <li>- Solo founder, no fluff, no handoffs.</li>
          <li>- Partnerships with brands like BrewTea, NovaSkin, UrbanPulse, and more.</li>
        </ul>
        <button className="hero-cta" onClick={onBackHome}>Back to Home</button>
      </div>
    </div>
  );
}
