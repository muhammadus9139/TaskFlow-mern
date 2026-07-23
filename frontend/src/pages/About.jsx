import "./About.css";

function About() {
    return (
        <div className="about-page">

            <section className="about-hero">
                <span className="eyebrow">About us</span>
                <h1>Built to keep you moving.</h1>
                <p>
                    TaskFlow is a simple, fast way to plan your day and see
                    real progress — no clutter, no distractions.
                </p>
            </section>

            <section className="stack-section">
                <h2>What powers this</h2>
                <div className="stack-grid">
                    <div className="stack-card">MongoDB</div>
                    <div className="stack-card">Express</div>
                    <div className="stack-card">React</div>
                    <div className="stack-card">Node.js</div>
                </div>
            </section>

            <section className="founder-section">
                <div className="founder-card">
                    <div className="founder-avatar">U</div>
                    <div>
                        <span className="eyebrow">Founder</span>
                        <h3>Usama</h3>
                        <p>
                            Software Engineering student and builder —
                            designed and developed this project end to end.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default About;