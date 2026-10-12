"use client";

import { useState } from "react";
import { ArrowRight, Check, Coffee, Copy, Plane, Sparkles, Sun, Waves } from "lucide-react";
import confetti from "canvas-confetti";

type Pace = "slow" | "wander";

const plans = {
  slow: [
    { number: "01", title: "Flight aur fresh start", detail: "Window seat, clouds, aur thodi si duniya se chhutti.", icon: Plane },
    { number: "02", title: "Slow mornings", detail: "Late breakfast, beach ke paas coffee, aur bilkul koi jaldi nahi.", icon: Coffee },
    { number: "03", title: "Sunset wali shaam", detail: "Nange paanv, samundar ki hawa, aur bas ek acchi si shaam.", icon: Sun },
  ],
  wander: [
    { number: "01", title: "Goa, here we come", detail: "Ek flight, ek nayi jagah, aur thoda sa lighter feel karne ka chance.", icon: Plane },
    { number: "02", title: "Beach hopping", detail: "Jo cafe cute lage, wahin rukenge. Koi strict plan nahi.", icon: Waves },
    { number: "03", title: "Golden hour", detail: "Sunset dekhenge, silly photos lenge, aur ek nayi memory banayenge.", icon: Sun },
  ],
};

const yesReply = "Haan, Goa trip ka idea cute hai! Dates aur plans aaram se saath mein decide karte hain.";

export default function Home() {
  const [step, setStep] = useState(0);
  const [pace, setPace] = useState<Pace>("slow");
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  function goToStep(nextStep: number) {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function celebrateYes() {
    setCopied(false);
    setCopyError(false);
    goToStep(6);
    void confetti({ particleCount: 180, spread: 105, startVelocity: 38, origin: { y: 0.58 }, colors: ["#ffb2d1", "#ffffff", "#f8d183", "#f078a6"], disableForReducedMotion: true });
  }

  async function copyReply() {
    try {
      await Promise.race([
        navigator.clipboard.writeText(yesReply),
        new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error("Clipboard unavailable")), 1500)),
      ]);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
      <main>
        {step === 0 && <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-photo" role="img" aria-label="A peaceful moment beside the blue sea" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="kicker-line" /> SIRF SHWETA KE LIYE</div>
            <h1 id="hero-title">Shweta, thoda sa<br /><em>break lein?</em></h1>
            <p>Life lately thodi heavy lag rahi hai na? Krishna bhi soch rahe hain... ek chhoti si Goa trip kaisi rahegi? Bas tum, main, aur sea breeze.</p>
            <button className="hero-button" type="button" onClick={() => goToStep(1)}>Accha, aage batao <ArrowRight size={17} strokeWidth={1.8} /></button>
          </div>
          <div className="hero-krishna">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/thinking.jpeg" alt="Krishna looking thoughtful" />
            <span>hmm... Goa?</span>
          </div>
          <div className="hero-bottom"><span>EK CUTE SA IDEA, KOI PRESSURE NAHI.</span><span>01 / 06</span></div>
        </section>}

        {step === 1 && <section className="intro section-wrap" aria-labelledby="intro-title">
          <div className="section-index"><span className="tiny-star">✳</span> 02 / PEHLE EK DEEP BREATH</div>
          <div className="intro-main">
            <h2 id="intro-title">Sab kuch figure out karna zaroori nahi. <em>Rest bhi zaroori hai.</em></h2>
            <div className="intro-bottom">
              <div><p>No busy itinerary. No &ldquo;jaldi chalo&rdquo;. Bas aaram, achha khana, aur jo tumhara mann kare. Tumhe kisi ke liye cheerful act karne ki zaroorat nahi.</p><button className="next-button" type="button" onClick={() => goToStep(2)}>Krishna kya kehte hain? <ArrowRight size={18} /></button></div>
              <div className="intro-krishna">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/innocent.jpeg" alt="Krishna smiling innocently" />
                <span className="handwritten">thoda sa smile? <span aria-hidden="true">↝</span></span>
              </div>
            </div>
          </div>
        </section>}

        {step === 2 && <section className="angry-stage" aria-labelledby="angry-title">
          <div className="angry-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/angry.jpeg" alt="Little Krishna folding his arms with a mock-angry face" />
          </div>
          <div className="angry-copy">
            <div className="eyebrow"><Sparkles size={17} strokeWidth={1.6} /> 03 / KRISHNA KA NAKHRA</div>
            <h2 id="angry-title">&ldquo;Mere hote hue tum itni pareshan kyun ho rahi ho? <em>Very bad...</em>&rdquo;</h2>
            <p>&ldquo;Itna mat socho, maine apne Parth Rohit ko planning handle karne ko bol diya hai. Bas tum haan bol do... jab tum ready ho.&rdquo;</p>
            <button className="next-button" type="button" onClick={() => goToStep(3)}>Accha baba, aage? <ArrowRight size={18} /></button>
          </div>
        </section>}

        {step === 3 && <section className="postcard" aria-label="Krishna ka cute sa hint">
          <div className="postcard-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/tasty.jpeg" alt="Krishna making a playful hungry face" className="krishna-image" />
          </div>
          <div className="postcard-copy">
            <div className="eyebrow"><Sparkles size={17} strokeWidth={1.6} /> 04 / KRISHNA KA MOOD</div>
            <blockquote>&ldquo;Goa mein good food bhi milega na?&rdquo;</blockquote>
            <p>Krishna ka yeh expression dekh kar lag raha hai woh snacks ke liye ready hain. Hum? Beach pe kuch tasty, phir sunset. <em>Simple aur sweet.</em></p>
            <button className="next-button" type="button" onClick={() => goToStep(4)}>Trip ka scene dikhao <ArrowRight size={18} /></button>
          </div>
        </section>}

        {step === 4 && <section className="plan section-wrap" id="the-plan" aria-labelledby="plan-title">
          <div className="section-index"><span className="tiny-star">✳</span> 05 / GOA KA LITTLE PLAN</div>
          <div className="plan-heading">
            <div><div className="eyebrow">FLIGHT + BEACH + ZERO RUSH</div><h2 id="plan-title">Imagine <em>karo...</em></h2></div>
            <p>Trip tumhare mood ke hisaab se. Bas ek vibe chuno aur dekho kaisa feel hota hai.</p>
          </div>
          <div className="pace-switch" role="group" aria-label="Trip ka mood chuno">
            <button type="button" className={pace === "slow" ? "active" : ""} onClick={() => setPace("slow")} aria-pressed={pace === "slow"}>Slow & sunny <Sun size={16} /></button>
            <button type="button" className={pace === "wander" ? "active" : ""} onClick={() => setPace("wander")} aria-pressed={pace === "wander"}>Thoda explore <Waves size={16} /></button>
          </div>
          <div className="plan-grid">
            {plans[pace].map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="plan-item" key={item.number}>
                  <div className={`plan-image plan-image-${index + 1}`} role="img" aria-label={["A plane in a warm sunset sky", "A sunny Goa beach", "A relaxing view beside the sea"][index]}>
                    <span className="plan-photo-label">{["THE GETAWAY", "THE GOOD PART", "THE DEEP BREATH"][index]}</span>
                  </div>
                  <div className="plan-item-top"><span>{item.number} / 03</span><Icon size={21} strokeWidth={1.5} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              );
            })}
          </div>
          <p className="plan-footnote">* Dates, budget aur actual plan hum dono milkar decide karenge. Abhi kuch book nahi hua hai.</p>
          <button className="next-button plan-next" type="button" onClick={() => goToStep(5)}>Ek last sawaal... <ArrowRight size={18} /></button>
        </section>}

        {step === 5 && <section className="invitation" id="your-call" aria-labelledby="invite-title">
          <div className="invitation-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="happy-krishna" src="/images/happy.gif" alt="Krishna smiling happily" />
            <div className="eyebrow">06 / AB TUMHARI BAARI</div>
            <h2 id="invite-title">Toh Shweta...<br /><em>Goa chalogi mere saath?</em></h2>
            <p>Krishna toh excited hain, aur main bhi. Par haan sirf tab, jab tumhara mann ho. Tumhari comfort sabse pehle.</p>
            <div className="answer-actions">
              <button className="answer-yes" type="button" onClick={celebrateYes}>Haan, baat karte hain! <ArrowRight size={18} /></button>
              {!dismissed && <button className="answer-later" type="button" onClick={() => setDismissed(true)}>Abhi nahi</button>}
            </div>
            <span className="invitation-footer">JO BHI CHUNO, MAIN TUMHARE SAATH HOON. <span aria-hidden="true">✳</span></span>
          </div>
        </section>}

        {step === 6 && <section className="celebration" aria-labelledby="celebration-title">
          <div className="celebration-photo" role="img" aria-label="Goa beach and palms" />
          <div className="celebration-shade" />
          <div className="celebration-content">
            <div className="eyebrow"><Sparkles size={17} /> YAY, SHWETA!</div>
            <h2 id="celebration-title">Yay! <em>Goa, here we come!</em></h2>
            <p>Abhi toh bas ek cute sa yes hai. Dates, budget aur saari details aaram se saath mein decide karenge.</p>
            <div className="celebration-reply">
              <p className="reply-draft">{yesReply}</p>
              <button type="button" className="copy-button" onClick={copyReply}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copy ho gaya" : "Reply copy karo"}</button>
              {copyError && <span className="copy-error" role="alert">Copy nahi ho paaya. Upar wala message select kar sakti ho.</span>}
            </div>
          </div>
        </section>}

      </main>
  );
}
