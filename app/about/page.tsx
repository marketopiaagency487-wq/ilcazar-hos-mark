import type { Metadata } from "next";
export const metadata: Metadata = { title: "عن الموقع — C North Il Cazar" };

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", fontFamily: "'IBM Plex Sans Arabic', sans-serif", direction: "rtl", padding: "60px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <a href="/" style={{ color: "#0e8a8a", fontSize: 13, textDecoration: "none" }}>← العودة للرئيسية</a>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 600, margin: "20px 0 16px", color: "#0d1b2a" }}>عن هذا الموقع</h1>
        <div style={{ fontSize: 14, lineHeight: 2, color: "#555" }}>
          <p style={{ marginBottom: 14 }}>هذا الموقع يدار بواسطة فريق مبيعات معتمد لمشروع C North (سي نورث) من الكازار Il Cazar في رأس الحكمة بالساحل الشمالي.</p>
          <p style={{ marginBottom: 14 }}>نحن لسنا الموقع الرسمي لشركة الكازار للتطوير العقاري. نقدم خدمات الاستشارات العقارية والمبيعات كوكيل معتمد لمساعدة العملاء في الحصول على أفضل الوحدات والعروض.</p>
          <p style={{ marginBottom: 14 }}>جميع الأسعار المعروضة استرشادية وقابلة للتغيير من قبل المطور. للحصول على أحدث الأسعار والمعلومات، يرجى التواصل معنا مباشرة.</p>
          <p>للتواصل: <a href="tel:+201055978559" style={{ color: "#0e8a8a" }}>0105 597 8559</a></p>
        </div>
      </div>
    </div>
  );
}
