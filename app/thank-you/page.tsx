"use client";
import { useEffect } from "react";

const PHONE_INTL = "+201055978559";
const PHONE_DISPLAY = "0105 597 8559";
const WA_URL = `https://wa.me/201055978559?text=${encodeURIComponent("مرحباً، لسه سجلت استمارة في C North سي نورث الكازار وعايز أعرف التفاصيل")}`;

export default function ThankYou() {
  useEffect(() => {
    const w = window as any;
    if (w.gtag) {
      w.gtag("event", "conversion", {
        send_to: "AW-17039137293/Ie3iCOmajL0cEI208rw_",
        value: 1.0,
        currency: "USD",
      });
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0d1b2a 0%, #132238 100%)",
      padding: "40px 24px", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textAlign: "center"
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 4 }}>C North</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 2, marginBottom: 24 }}>by IL CAZAR</div>

      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(14,138,138,.15)", border: "2px solid rgba(14,138,138,.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 40, marginBottom: 20,
      }}>✓</div>

      <h1 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 600,
        color: "#fff", marginBottom: 12, lineHeight: 1.2,
      }}>
        شكراً! تم استلام طلبك
      </h1>

      <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", maxWidth: 480, lineHeight: 1.7, marginBottom: 8 }}>
        فريق مبيعات <strong style={{ color: "#e67e22" }}>C North الكازار — سي نورث رأس الحكمة</strong> هيتواصل معاك في أقرب وقت.
        ممكن كمان تكلمنا على الواتساب للرد الأسرع.
      </p>

      <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginBottom: 32 }}>
        C North · سي نورث · رأس الحكمة · الساحل الشمالي · Il Cazar
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
        <a href={WA_URL} target="_blank" rel="noopener" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "14px 28px",
          background: "#25d366", color: "#fff", borderRadius: 12,
          fontSize: 14, fontWeight: 700, textDecoration: "none",
        }}>
          💬 تواصل واتساب الآن
        </a>
        <a href={`tel:${PHONE_INTL}`} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "14px 28px",
          border: "1px solid rgba(14,138,138,.4)", color: "#14a5a5",
          borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", direction: "ltr",
        }}>
          📞 {PHONE_DISPLAY}
        </a>
        <a href="/" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "14px 28px",
          border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)",
          borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: "none",
        }}>
          ← العودة للموقع
        </a>
      </div>

      <div style={{
        display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
        background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 14, padding: "18px 24px", maxWidth: 520,
      }}>
        {[["١١٤ فدان","مساحة المشروع"],["٢.٥٪","مقدم فقط"],["١٠ سنوات","تقسيط"],["٨٠٪","إطلالة بحر"],["KM 188","رأس الحكمة"]].map(([v,l],i) => (
          <div key={i} style={{ textAlign: "center", minWidth: 70 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#e67e22" }}>{v}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 9, color: "rgba(255,255,255,.2)", marginTop: 28 }}>
        © 2026 C North by Il Cazar · سي نورث الكازار · فريق مبيعات معتمد
      </p>
    </div>
  );
}
