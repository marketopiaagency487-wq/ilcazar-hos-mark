"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ══════════════════════════════════════════
   CONFIG — غيّر الرقم والكود هنا فقط
════════════════════════════════════════════ */
const PHONE        = "01055978559";
const PHONE_DISPLAY = "0105 597 8559";
const PHONE_INTL   = "+201055978559";
const WA_NUMBER    = "201055978559";
const WEB3_KEY     = "b72bf3f4-c8a6-455e-8590-d68a50bef850";
const WA_MSG       = "مرحباً، أريد الاستفسار عن مشروع سي نورث رأس الحكمة من الكازار — C North Il Cazar";
const WA_URL       = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

/* ══════════════════════════════════════════
   TRACKING — Google Ads Conversions
════════════════════════════════════════════ */
function trackCall(label = "call") {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "conversion", {
      send_to: "AW-17039137293/vaynCLSHj70cEI208rw_",
      value: 1.0, currency: "USD", event_callback: () => {},
    });
  }
}
function trackWA(label = "whatsapp") {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "conversion", {
      send_to: "AW-17039137293/2wO6CLGHj70cEI208rw_",
      value: 1.0, currency: "USD", event_callback: () => {},
    });
  }
}
function trackLead(label = "form") {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "generate_lead", { event_category: "lead", event_label: label });
  }
}

/* ── C North Images (from EOI Kit PDF) ── */
const HERO_IMG = "/images/hero.jpg";
const VILLA_IMG = "/images/villa-1.jpg";
const VILLA2_IMG = "/images/villa-2.jpg";
const VILLA3_IMG = "/images/villa-3.jpg";
const TOWN_IMG = "/images/townhouse-1.jpg";
const TOWN2_IMG = "/images/townhouse-2.jpg";
const LAGOON_IMG = "/images/lagoon-homes.jpg";
const QVILLA_IMG = "/images/villa-3.jpg";
const MASTERPLAN_IMG = "/images/masterplan.jpg";
const AMENITIES_IMG = "/images/amenities-map.jpg";
const PROMENADE_IMG = "/images/promenade.jpg";
const LAGOON_LIFE_IMG = "/images/lagoon-life.jpg";
const LOCATION_IMG = "/images/location-map.jpg";
const MIMAR_IMG = "/images/mimar.jpg";

type UT = "all" | "villa" | "townhouse" | "qvilla" | "lagoon";
const UNITS = [
  { type: "villa" as UT, typeLabel: "فيلا مستقلة", name: "Standalone Villa", en: "Standalone Villa D", price: "٢٨ مليون", area: "تبدأ من ١٨٠ م²", specs: ["٤ غرف نوم", "حمام سباحة خاص", "EOI ٢٠٠ ألف"], img: VILLA_IMG },
  { type: "townhouse" as UT, typeLabel: "تاون هاوس", name: "Town House", en: "Townhouse", price: "٢٢ مليون", area: "تبدأ من ١٦٥ م²", specs: ["٣ غرف نوم", "إطلالة لاجون", "EOI ١٥٠ ألف"], img: TOWN_IMG },
  { type: "qvilla" as UT, typeLabel: "كيو فيلا", name: "Q Villa", en: "Q Villa", price: "١٨ مليون", area: "تبدأ من ١٥٥ م²", specs: ["٣ غرف نوم", "حديقة خاصة", "EOI ١٥٠ ألف"], img: QVILLA_IMG },
  { type: "lagoon" as UT, typeLabel: "لاجون هومز", name: "Lagoon Homes — ٣ غرف", en: "Lagoon Homes 3BR", price: "١٠.٥ مليون", area: "تبدأ من ١٢٠ م²", specs: ["٣ غرف نوم", "إطلالة لاجون", "EOI ١٠٠ ألف"], img: LAGOON_IMG },
  { type: "lagoon" as UT, typeLabel: "لاجون هومز", name: "Lagoon Homes — غرفتين", en: "Lagoon Homes 2BR", price: "٨.٥ مليون", area: "تبدأ من ٩٥ م²", specs: ["غرفتين نوم", "حديقة خاصة", "EOI ١٠٠ ألف"], img: LAGOON_IMG },
];

const FAQS = [
  { q: "أين يقع مشروع C North من الكازار؟", a: "سي نورث C North يقع في رأس الحكمة بالساحل الشمالي عند الكيلو ١٨٨ طريق إسكندرية — مرسى مطروح. موقع مميز بجوار مشاريع Soul Emaar وLVLS Mountain View وKatameya Coast." },
  { q: "ما أنواع الوحدات المتاحة في C North؟", a: "سي نورث يضم فيلات مستقلة (Standalone) وتاون هاوس وQ Villa ولاجون هومز (شقق). المشروع ٦٠٪ فيلات و٨٠٪ من الوحدات بإطلالة بحر." },
  { q: "ما نظام السداد في سي نورث C North؟", a: "مقدم ٢.٥٪ فقط وتقسيط حتى ١٠ سنوات. أقساط شهرية تبدأ من ٤٢,٥٠٠ جنيه للشاليهات و٩٠,٠٠٠ جنيه للفيلات." },
  { q: "ما مساحة مشروع C North رأس الحكمة؟", a: "C North على مساحة ١١٤ فدان بنسبة بناء ١٤٪ فقط. شاطئ ٤٠٠ متر، بروميناد ٧٠٠ متر، ولاجونز ١٨ فدان." },
  { q: "من المطور العقاري والمخطط لمشروع C North؟", a: "C North من تطوير الكازار Il Cazar والتخطيط العمراني من MIMAR Architecture & Engineering — شركة دولية تأسست عام ١٩٩٧ وتعمل في الإمارات وقطر والسعودية ومصر." },
];

const NAV = [["#about","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#gallery","المعرض"],["#amenities","المرافق"],["#location","الموقع"],["#contact","سجل الآن"]];

const PhIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const ChvIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

export default function Home() {
  const router = useRouter();
  const [uFilter, setUFilter] = useState<UT>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [popup, setPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [showCookie, setShowCookie] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const popupShown = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const popupRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fin").forEach(el => obs.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    try { if (!localStorage.getItem("cn_ck")) setShowCookie(true); } catch { setShowCookie(true); }
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (popupShown.current) return;
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.55) openPopup();
    };
    const timer = setTimeout(() => openPopup(), 18000);
    window.addEventListener("scroll", onScroll, { passive: true });
    function openPopup() {
      if (popupShown.current) return;
      popupShown.current = true;
      setPopup(true);
      document.body.classList.add("p-on");
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    }
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  function closePopup() { setPopup(false); document.body.classList.remove("p-on"); }

  async function submitForm(ref: React.RefObject<HTMLFormElement | null>, setStatus: (s: any) => void, source: string) {
    if (!ref.current) return;
    setStatus("sending");
    const fd = new FormData(ref.current);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => (payload[k] = v.toString()));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        trackLead(source);
        ref.current.reset();
        if (source === "main_form") {
          setTimeout(() => router.push("/thank-you"), 800);
        }
      } else throw new Error();
    } catch { setStatus("error"); }
  }

  const filtered = uFilter === "all" ? UNITS : UNITS.filter(u => u.type === uFilter);

  return (
    <>
      {/* ── HEADER ── */}
      <header className={`hd ${scrolled ? "scr" : ""}`}>
        <div className="hd-in">
          <a className="hd-logo" href="#hero">
            <div><div className="hd-logo-t">C NORTH</div><div className="hd-logo-s">Il Cazar · الكازار</div></div>
          </a>
          <nav className="hd-nav">
            {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <div className="hd-acts">
            <a className="hd-call" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("header")}><PhIcon /><span>{PHONE_DISPLAY}</span></a>
            <a className="hd-book" href="#contact">سجل اهتمامك</a>
            <button className="hd-mob" onClick={() => setMobileNav(!mobileNav)}>☰</button>
          </div>
        </div>
        {mobileNav && (
          <div style={{ background: "var(--color-dark2)", padding: "10px 20px" }}>
            {NAV.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMobileNav(false)}
                style={{ display: "block", padding: "10px 0", color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                {l}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={HERO_IMG} alt="سي نورث رأس الحكمة الساحل الشمالي — C North Il Cazar Ras El Hekma" />
          <div className="hero-ov" />
        </div>
        <div className="hero-ct">
          <span className="hero-tag">🏖️ إطلاق C North — رأس الحكمة · الكازار</span>
          <h1 className="hero-h">
            C North <em>رأس الحكمة</em>
            <br />سي نورث <em>الكازار</em>
          </h1>
          <p className="hero-p">
            C North من الكازار — تجربة شاطئية بوتيك في قلب رأس الحكمة بالساحل الشمالي.
            ١١٤ فدان، ٨٠٪ إطلالة بحر، لاجونز ١٨ فدان، وتصميم MIMAR العالمي.
          </p>
          <p className="hero-kw">C North · سي نورث · C North رأس الحكمة · الكازار · Il Cazar Ras El Hekma · North Coast</p>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-v">١١٤ فدان</div><div className="hero-stat-l">مساحة المشروع</div></div>
            <div className="hero-stat"><div className="hero-stat-v">٢.٥٪ مقدم</div><div className="hero-stat-l">أقل مقدم</div></div>
            <div className="hero-stat"><div className="hero-stat-v">١٠ سنوات</div><div className="hero-stat-l">تقسيط مريح</div></div>
            <div className="hero-stat"><div className="hero-stat-v">٨٠٪</div><div className="hero-stat-l">إطلالة بحر</div></div>
          </div>
          <div className="hero-btns">
            <a className="b-orange" href="#contact">سجل اهتمامك الآن</a>
            <a className="b-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("hero")}>💬 واتساب</a>
            <a className="b-ghost" href="#units">استكشف الوحدات</a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-band">
        <div className="trust-in">
          <div className="trust-item"><strong>١١٤</strong> فدان</div>
          <div className="trust-item"><strong>١٤٪</strong> نسبة بناء فقط</div>
          <div className="trust-item"><strong>١٨</strong> فدان لاجونز</div>
          <div className="trust-item"><strong>٤٠٠</strong> متر شاطئ</div>
          <div className="trust-item"><strong>٨٠٪</strong> إطلالة بحر</div>
          <div className="trust-item"><strong>KM 188</strong> رأس الحكمة</div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="sec about" id="about"><div className="sec-in">
        <div className="fin" style={{ textAlign: "center" }}>
          <span className="sec-tag">C North الكازار · Boutique Beachfront</span>
          <h2 className="sec-h" style={{ textAlign: "center" }}>تجربة شاطئية بوتيك في <em>C North</em></h2>
          <p className="sec-p c">
            سي نورث C North من الكازار Il Cazar — مجتمع شاطئي فريد في رأس الحكمة بالساحل الشمالي.
            ١١٤ فدان بنسبة بناء ١٤٪ فقط، ١٣٠٠ وحدة، ٦٠٪ فيلات، و٨٠٪ إطلالة بحر مباشرة.
            تخطيط عمراني بتوقيع MIMAR Architects الدولية.
          </p>
        </div>
        <div className="about-grid fin">
          <div className="about-img">
            <img src={PROMENADE_IMG} alt="شاطئ سي نورث رأس الحكمة — C North Beach" />
          </div>
          <div className="about-pts">
            {[
              { i: "🏖️", t: "شاطئ ٤٠٠ متر وبروميناد ٧٠٠ متر", d: "واجهة بحرية واسعة مع ممشى شاطئي في C North رأس الحكمة" },
              { i: "🌊", t: "١٨ فدان لاجونز + Infinity Lagoon", d: "بحيرات صناعية وأيلاند لاجونز محاطة بالوحدات في سي نورث" },
              { i: "🏨", t: "فندق بوتيك + Beach Clubhouse", d: "C North يضم فندق بوتيك وكلوب هاوس شاطئي وكبائن على البحر" },
              { i: "📐", t: "تخطيط MIMAR العالمي", d: "سي نورث مصمم بتوقيع MIMAR Architecture — خبرة دولية منذ ١٩٩٧" },
            ].map((x, i) => (
              <div key={i} className="about-pt">
                <div className="about-pt-i">{x.i}</div>
                <div><h3>{x.t}</h3><p>{x.d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-stats fin">
          {[
            { v: "114", u: "فدان", l: "مساحة C North" },
            { v: "1,300", u: "وحدة", l: "إجمالي الوحدات" },
            { v: "14%", u: "فقط", l: "نسبة البناء" },
            { v: "1,100", u: "متر", l: "عمق المشروع" },
          ].map((s, i) => (
            <div key={i} className="about-stat">
              <div className="about-stat-v">{s.v}<span> {s.u}</span></div>
              <div className="about-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div></section>

      {/* ── MID CTA ── */}
      <div className="midcta">
        <h3>احجز وحدتك في C North — سي نورث رأس الحكمة</h3>
        <p>مقدم ٢.٥٪ فقط — تقسيط حتى ١٠ سنوات — ٨٠٪ إطلالة بحر</p>
        <div className="midcta-btns">
          <a className="b-orange" href="#contact">سجل اهتمامك الآن</a>
          <a className="b-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("midcta")}>💬 واتساب</a>
          <a className="b-ghost" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("midcta")}><PhIcon /> اتصل بنا</a>
        </div>
      </div>

      {/* ── UNITS ── */}
      <section className="sec units" id="units"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">وحدات C North · Unit Types</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          وحدات متنوعة في <em>سي نورث الكازار</em>
        </h2>
        <p className="sec-p c">
          فيلات مستقلة وتاون هاوس وQ Villa ولاجون هومز — ٦٠٪ فيلات و٨٠٪ إطلالة بحر في C North رأس الحكمة
        </p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", margin: "20px 0" }}>
          {([["all","الكل"],["villa","فيلا مستقلة"],["townhouse","تاون هاوس"],["qvilla","كيو فيلا"],["lagoon","لاجون هومز"]] as [UT,string][]).map(([k,l]) => (
            <button key={k} onClick={() => setUFilter(k)}
              style={{ padding: "7px 18px", borderRadius: "50px", border: `2px solid ${uFilter===k?"var(--color-teal)":"rgba(14,138,138,.1)"}`, background: uFilter===k?"var(--color-teal)":"transparent", color: uFilter===k?"#fff":"var(--color-dark)", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", transition: ".2s" }}>
              {l}
            </button>
          ))}
        </div>
        <div className="u-grid">
          {filtered.map((u, i) => (
            <div key={i} className="u-card">
              <div className="u-img"><img src={u.img} alt={`${u.name} — C North الكازار`} /></div>
              <div className="u-body">
                <span className="u-type">{u.typeLabel} · C North</span>
                <div className="u-name">{u.name}</div>
                <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 3 }}>يبدأ من (١٠ سنوات)</div>
                <div className="u-price">{u.price}</div>
                <div style={{ fontSize: 10, color: "var(--color-teal)", marginBottom: 8 }}>📐 {u.area}</div>
                <div className="u-specs">
                  {u.specs.map((s, j) => <span key={j} className="u-spec">{s}</span>)}
                </div>
                <a href={WA_URL} target="_blank" rel="noopener" className="u-btn" onClick={() => trackWA(`unit_${u.type}`)}>
                  استفسر على واتساب
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="u-note">
          أسعار C North الكازار — سي نورث رأس الحكمة استرشادية وقابلة للتغيير. تواصل معنا للحصول على آخر الأسعار والتوافر.
        </p>
      </div></section>

      {/* ── PAYMENT + PRICE TABLE ── */}
      <section className="sec pay" id="payment"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">خطة السداد · Payment Plan</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>أسعار وسداد <em>C North</em></h2>

        {/* Price Table */}
        <table className="ptable">
          <thead>
            <tr>
              <th>النوع</th>
              <th>المساحة</th>
              <th>الغرف</th>
              <th>٦ سنوات</th>
              <th>٨ سنوات</th>
              <th>١٠ سنوات</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="pt-type">Standalone Villa D</td><td>١٨٠ م²</td><td>٤ غرف</td><td>٢٣.٥ مليون</td><td>٢٥.٧٥ مليون</td><td className="pt-price">٢٨ مليون</td></tr>
            <tr><td className="pt-type">Town House</td><td>١٦٠ م²</td><td>٣ غرف</td><td>١٨.٥ مليون</td><td>٢٠ مليون</td><td className="pt-price">٢٢ مليون</td></tr>
            <tr><td className="pt-type">Q Villa</td><td>١٥٥ م²</td><td>٣ غرف</td><td>١٥ مليون</td><td>١٦.٥ مليون</td><td className="pt-price">١٨ مليون</td></tr>
            <tr><td className="pt-type">Lagoon Homes 3BR</td><td>١٢٠ م²</td><td>٣ غرف</td><td>٨.٨ مليون</td><td>٩.٦ مليون</td><td className="pt-price">١٠.٥ مليون</td></tr>
            <tr><td className="pt-type">Lagoon Homes 2BR</td><td>٩٥ م²</td><td>غرفتين</td><td>٧.٢ مليون</td><td>٧.٨ مليون</td><td className="pt-price">٨.٥ مليون</td></tr>
          </tbody>
        </table>

        <div className="pay-grid" style={{ textAlign: "right", marginTop: 28 }}>
          <div className="pay-c">
            <h3>نظام التقسيط</h3>
            <ul className="pay-list">
              <li>مقدم ٢.٥٪ فقط</li>
              <li>تقسيط مريح حتى ١٠ سنوات</li>
              <li>قسط شهري الشاليهات: ٤٢,٥٠٠ جنيه</li>
              <li>قسط شهري الفيلات: ٩٠,٠٠٠ جنيه</li>
              <li>حافز وكيل المبيعات: ١٪</li>
            </ul>
            <div style={{ marginTop: 16 }}>
              <a className="b-teal" href={WA_URL} target="_blank" rel="noopener"
                style={{ width: "100%", justifyContent: "center" }} onClick={() => trackWA("payment")}>
                اطلب تفاصيل السداد
              </a>
            </div>
          </div>
          <div className="pay-c">
            <h3>جدية الحجز EOI — شيكات غير مسحوبة</h3>
            {[
              ["Lagoon Homes (شاليهات)","100,000 جنيه"],
              ["Q Villa & Town House","150,000 جنيه"],
              ["Standalone Villa","200,000 جنيه"],
            ].map(([t,v],i) => (
              <div key={i} className="eoi-r"><span className="eoi-t">{t}</span><span className="eoi-v">{v}</span></div>
            ))}
            <p style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 14, lineHeight: 1.6 }}>
              شيكات EOI غير مسحوبة — C North الكازار رأس الحكمة
            </p>
          </div>
        </div>
      </div></section>

      {/* ── GALLERY ── */}
      <section className="sec gal" id="gallery"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">معرض C North · Gallery</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          <em>سي نورث</em> — Boutique Beachfront Living
        </h2>
        <div className="gal-grid">
          <div className="gal-it big">
            <img src={HERO_IMG} alt="C North رأس الحكمة — المنظر الرئيسي" />
            <div className="gal-cap">C North — إطلالة بحرية ساحرة</div>
          </div>
          <div className="gal-it">
            <img src={MASTERPLAN_IMG} alt="ماستر بلان سي نورث — C North Master Plan" />
            <div className="gal-cap">ماستر بلان C North</div>
          </div>
          <div className="gal-it">
            <img src={PROMENADE_IMG} alt="بروميناد سي نورث الشاطئي" />
            <div className="gal-cap">البروميناد الشاطئي</div>
          </div>
          <div className="gal-it">
            <img src={VILLA_IMG} alt="فيلا مستقلة سي نورث الكازار" />
            <div className="gal-cap">Standalone Villa</div>
          </div>
          <div className="gal-it">
            <img src={LAGOON_LIFE_IMG} alt="لاجون سي نورث — حياة شاطئية" />
            <div className="gal-cap">Island Lagoons</div>
          </div>
          <div className="gal-it">
            <img src={TOWN_IMG} alt="تاون هاوس سي نورث C North" />
            <div className="gal-cap">Town House</div>
          </div>
        </div>
      </div></section>

      {/* ── AMENITIES ── */}
      <section className="am" id="amenities"><div className="am-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag" style={{ color: "var(--color-orange)" }}>مرافق C North · Amenities</span>
        <h2 className="sec-h" style={{ color: "#fff", textAlign: "center" }}>
          مرافق <em style={{ color: "var(--color-orange)" }}>سي نورث الكازار</em>
        </h2>
        <div className="am-grid">
          {[
            { i: "🌊", n: "Island Lagoons" }, { i: "♾️", n: "Infinity Lagoon" },
            { i: "🏖️", n: "Beach Cabanas" }, { i: "🏨", n: "Boutique Hotel" },
            { i: "🚶", n: "Beach Promenade ٧٠٠م" }, { i: "🎪", n: "Beach Clubhouse" },
            { i: "💪", n: "Sports & Wellness Zone" }, { i: "🛍️", n: "Commercial Zone" },
            { i: "🏊", n: "حمامات سباحة متعددة" }, { i: "🚪", n: "بوابتان رئيسيتان" },
            { i: "📐", n: "تصميم MIMAR" }, { i: "🌴", n: "١٤٪ نسبة بناء فقط" },
          ].map((x, i) => (
            <div key={i} className="am-c"><div className="am-c-i">{x.i}</div><div className="am-c-n">{x.n}</div></div>
          ))}
        </div>
      </div></section>

      {/* ── LOCATION ── */}
      <section className="sec loc" id="location"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">موقع C North · Location</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          موقع <em>سي نورث</em> في رأس الحكمة
        </h2>
        <div className="loc-grid" style={{ textAlign: "right" }}>
          <div className="loc-img">
            <img src={LOCATION_IMG} alt="موقع C North رأس الحكمة الساحل الشمالي — C North Location Map" />
          </div>
          <div className="loc-facts">
            {[
              { t: "KM 188 — رأس الحكمة", d: "على طريق إسكندرية — مرسى مطروح، في أرقى منطقة بالساحل الشمالي" },
              { t: "بجوار أكبر المشاريع", d: "بجوار Soul Emaar وLVLS Mountain View وKatameya Coast وSafia Il Cazar" },
              { t: "الكازار — Il Cazar", d: "C North هو أحدث مشاريع الكازار في رأس الحكمة بالساحل الشمالي" },
              { t: "Boutique Beachfront Experience", d: "تجربة شاطئية فريدة تجمع الاسترخاء والفخامة بتصميم متوسطي" },
            ].map((x, i) => (
              <div key={i} className="loc-f"><h4>{x.t}</h4><p>{x.d}</p></div>
            ))}
          </div>
        </div>
      </div></section>

      {/* ── FAQ ── */}
      <section className="sec faq"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          أسئلة عن <em>C North</em> — سي نورث FAQ
        </h2>
        <div className="faq-list">
          {FAQS.map((x, i) => (
            <div key={i} className="faq-i">
              <button className={`faq-q ${openFaq===i?"op":""}`} onClick={() => setOpenFaq(openFaq===i?null:i)}>
                <span>{x.q}</span><span className="arr"><ChvIcon /></span>
              </button>
              <div className={`faq-a ${openFaq===i?"op":""}`}><p>{x.a}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      {/* ── CONTACT ── */}
      <section className="ct" id="contact"><div className="sec-in fin">
        <div style={{ textAlign: "center" }}>
          <span className="sec-tag" style={{ color: "var(--color-orange)" }}>سجل اهتمامك · Register</span>
          <h2 className="sec-h" style={{ color: "#fff", textAlign: "center" }}>
            احجز في <em style={{ color: "var(--color-orange)" }}>C North الكازار</em>
          </h2>
        </div>
        <div className="ct-wrap">
          <div className="ct-left">
            <p>
              سجّل اهتمامك في C North رأس الحكمة من الكازار — سي نورث —
              وفريق المبيعات هيتواصل معك لتفاصيل الأسعار والوحدات المتاحة في رأس الحكمة.
            </p>
            <div className="ct-info">
              <a className="ct-row" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("contact_section")}>
                <PhIcon /> <span>{PHONE_DISPLAY}</span> <span style={{ marginRight: "auto", fontSize: 10, color: "rgba(255,255,255,.4)" }}>اتصل مباشرة</span>
              </a>
              <a className="ct-row" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("contact_section")}>
                <span>💬</span> <span>واتساب — C North</span> <span style={{ marginRight: "auto", fontSize: 10, color: "rgba(255,255,255,.4)" }}>رد سريع</span>
              </a>
              <div className="ct-row" style={{ cursor: "default" }}>
                <span>📍</span> <span style={{ fontSize: 11 }}>KM 188، رأس الحكمة، الساحل الشمالي</span>
              </div>
            </div>
          </div>
          <div className="ct-form">
            <div className="cf-title">سجل في C North — سي نورث الكازار</div>
            <form ref={formRef} onSubmit={(e: FormEvent) => { e.preventDefault(); submitForm(formRef, setFormStatus, "main_form"); }} style={{ textAlign: "right" }}>
              <input type="hidden" name="access_key" value={WEB3_KEY} />
              <input type="hidden" name="subject" value="Lead — C North الكازار Ras El Hekma" />
              <input type="hidden" name="from_name" value="C North Landing" />
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />
              <div className="cf-row">
                <div className="cf-f"><label>الاسم الكامل *</label><input name="name" placeholder="أدخل اسمك" required /></div>
                <div className="cf-f"><label>رقم الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required /></div>
              </div>
              <div className="cf-row">
                <div className="cf-f"><label>البريد الإلكتروني</label><input name="email" type="email" dir="ltr" placeholder="email@example.com" /></div>
                <div className="cf-f"><label>نوع الوحدة</label>
                  <select name="unit_type">
                    <option value="غير محدد">اختر نوع الوحدة</option>
                    <option value="Lagoon Homes 2BR">Lagoon Homes — غرفتين</option>
                    <option value="Lagoon Homes 3BR">Lagoon Homes — ٣ غرف</option>
                    <option value="Q Villa">Q Villa</option>
                    <option value="Town House">Town House</option>
                    <option value="Standalone Villa">Standalone Villa</option>
                  </select>
                </div>
              </div>
              {formStatus === "sent" ? (
                <div style={{ textAlign: "center", padding: "18px 0" }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>✓</div>
                  <p style={{ color: "var(--color-orange)", fontSize: 16, fontWeight: 700 }}>تم الاستلام — جاري التحويل...</p>
                </div>
              ) : (
                <button type="submit" className="cf-sub" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "جاري الإرسال..." : "إرسال — سجل في C North"}
                </button>
              )}
              {formStatus === "error" && (
                <p style={{ color: "#ef4444", fontSize: 11, textAlign: "center", marginTop: 8 }}>
                  حدث خطأ — <a href={WA_URL} target="_blank" rel="noopener" style={{ color: "var(--color-orange)" }}>واتساب</a>
                </p>
              )}
              <p className="cf-prv">
                بإرسال النموذج توافق على{" "}
                <button onClick={() => setShowPrivacy(true)} type="button"
                  style={{ background: "none", border: "none", color: "var(--color-orange)", textDecoration: "underline", cursor: "pointer", fontSize: 9, fontFamily: "var(--font-body)" }}>
                  سياسة الخصوصية
                </button>
              </p>
            </form>
          </div>
        </div>
      </div></section>

      {/* ── FOOTER ── */}
      <footer className="ft"><div className="sec-in">
        <div className="ft-in">
          <div className="ft-brand">
            <div className="ft-brand-name">C North</div>
            <div className="ft-brand-sub">by IL CAZAR · رأس الحكمة</div>
            <p>
              سي نورث C North — مجتمع شاطئي بوتيك على ١١٤ فدان في رأس الحكمة بالساحل الشمالي.
              أسعار استرشادية. هذا الموقع يدار بواسطة فريق مبيعات معتمد وليس الموقع الرسمي للمطور.
            </p>
          </div>
          <div>
            <div className="ft-h">روابط سريعة</div>
            <div className="ft-links">
              {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
              <a href="/about">عن الموقع</a>
              <a href="/privacy">سياسة الخصوصية</a>
              <a href="/disclaimer">إخلاء مسؤولية</a>
            </div>
          </div>
          <div>
            <div className="ft-h">تواصل معنا</div>
            <div className="ft-links">
              <a href={`tel:${PHONE_INTL}`} onClick={() => trackCall("footer")}>📞 {PHONE_DISPLAY}</a>
              <a href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("footer")}>💬 واتساب</a>
              <span style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>📍 KM 188 رأس الحكمة، الساحل الشمالي</span>
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <p className="ft-cr">© 2026 C North by Il Cazar · الكازار · فريق مبيعات معتمد · جميع الأسعار استرشادية</p>
          <div className="ft-legal">
            <button onClick={() => setShowPrivacy(true)}>سياسة الخصوصية</button>
            <a href="/about">عن الموقع</a>
            <a href="/disclaimer">إخلاء مسؤولية</a>
          </div>
        </div>
      </div></footer>

      {/* ── POPUP ── */}
      <div className={`p-bk ${popup?"on":""}`} onClick={closePopup} />
      <div className={`p-dlg ${popup?"on":""}`} role="dialog">
        <button className="p-x" onClick={closePopup}>✕</button>
        <span className="p-tag">🏖️ C North — سي نورث رأس الحكمة</span>
        <h2 className="p-h">احجز وحدتك في C North الكازار</h2>
        <p className="p-desc">
          سجّل دلوقتي في C North واحصل على أولوية اختيار الوحدة في رأس الحكمة — مقدم ٢.٥٪ فقط
        </p>
        <ul className="p-perks">
          <li>أولوية اختيار الوحدة والموقع في C North</li>
          <li>مقدم ٢.٥٪ فقط — تبدأ من ٨.٥ مليون</li>
          <li>فريق سي نورث الكازار يرد في دقايق</li>
        </ul>
        {popupStatus === "sent" ? (
          <div style={{ textAlign: "center", padding: "14px 0" }}>
            <div style={{ fontSize: 40 }}>✓</div>
            <p style={{ color: "var(--color-orange)", fontWeight: 700, marginTop: 6 }}>تم استلام طلبك</p>
          </div>
        ) : (
          <form className="p-form" ref={popupRef}
            onSubmit={(e: FormEvent) => { e.preventDefault(); submitForm(popupRef, setPopupStatus, "popup").then(() => setTimeout(closePopup, 2500)); }}>
            <input type="hidden" name="access_key" value={WEB3_KEY} />
            <input type="hidden" name="subject" value="Popup — C North الكازار Ras El Hekma" />
            <input type="hidden" name="from_name" value="C North Popup" />
            <input type="checkbox" name="botcheck" style={{ display: "none" }} />
            <div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required /></div>
            <div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required /></div>
            <div className="cf-f"><label>نوع الوحدة</label>
              <select name="unit_type">
                <option value="غير محدد">اختر</option>
                <option value="Lagoon Homes">Lagoon Homes</option>
                <option value="Q Villa">Q Villa</option>
                <option value="Town House">Town House</option>
                <option value="Standalone Villa">Standalone Villa</option>
              </select>
            </div>
            <button type="submit" className="p-sub" disabled={popupStatus === "sending"}>
              {popupStatus === "sending" ? "جاري..." : "احجز في C North الآن"}
            </button>
            <a className="p-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("popup")}>
              💬 واتساب C North الكازار
            </a>
          </form>
        )}
      </div>

      {/* ── PRIVACY MODAL ── */}
      {showPrivacy && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,.6)" }} onClick={() => setShowPrivacy(false)} />
          <div style={{ position: "fixed", zIndex: 301, top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(560px,92vw)", maxHeight: "85vh", overflowY: "auto", background: "#fff", borderRadius: 18, padding: "30px 26px", color: "var(--color-dark)" }}>
            <button onClick={() => setShowPrivacy(false)} style={{ position: "absolute", top: 12, left: 12, background: "var(--color-sand)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 600, marginBottom: 14 }}>سياسة الخصوصية</h2>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: "var(--color-muted)" }}>
              <p style={{ marginBottom: 10 }}><strong>١. البيانات:</strong> نجمع الاسم والهاتف والإيميل فقط عند تعبئة النموذج، للتواصل بخصوص C North — سي نورث الكازار.</p>
              <p style={{ marginBottom: 10 }}><strong>٢. الاستخدام:</strong> حصرياً لتقديم معلومات عن C North Il Cazar وترتيب التواصل مع فريق المبيعات المعتمد.</p>
              <p style={{ marginBottom: 10 }}><strong>٣. الحماية:</strong> اتصال مشفر HTTPS + Web3Forms. لا نبيع أو نشارك بياناتك مع أطراف ثالثة.</p>
              <p style={{ marginBottom: 10 }}><strong>٤. حقوقك:</strong> يحق لك الاطلاع على بياناتك أو تصحيحها أو حذفها في أي وقت.</p>
              <p style={{ marginBottom: 10 }}><strong>٥. الإفصاح:</strong> هذا الموقع يدار بواسطة فريق مبيعات معتمد وليس الموقع الرسمي لشركة الكازار للتطوير العقاري.</p>
              <p><strong>٦. تواصل:</strong> <a href={`tel:${PHONE_INTL}`} style={{ color: "var(--color-teal)" }}>{PHONE_DISPLAY}</a></p>
            </div>
            <p style={{ fontSize: 9, color: "#aaa", marginTop: 14 }}>آخر تحديث: يوليو 2026 · C North — سي نورث الكازار</p>
          </div>
        </>
      )}

      {/* ── COOKIE ── */}
      {showCookie && (
        <div className="ck">
          <p>نستخدم cookies لتحسين تجربتك في C North. <button onClick={() => setShowPrivacy(true)} style={{ background: "none", border: "none", color: "var(--color-orange)", textDecoration: "underline", cursor: "pointer", fontSize: 10, fontFamily: "var(--font-body)" }}>سياسة الخصوصية</button></p>
          <div className="ck-btns">
            <button className="ck-ok" onClick={() => { setShowCookie(false); try { localStorage.setItem("cn_ck", "1"); } catch {} }}>موافق</button>
            <button className="ck-no" onClick={() => setShowCookie(false)}>رفض</button>
          </div>
        </div>
      )}

      {/* ── MOBILE BAR ── */}
      <nav className="mbar"><div className="mbar-in">
        <a className="m-call" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("mobile_bar")}><PhIcon />{PHONE_DISPLAY}</a>
        <a className="m-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("mobile_bar")}>💬</a>
        <a className="m-book" href="#contact">سجل</a>
      </div></nav>
    </>
  );
}
