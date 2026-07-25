import type { Metadata } from "next";
export const metadata: Metadata = { title: "إخلاء مسؤولية — C North Il Cazar" };

export default function Disclaimer() {
  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", fontFamily: "'IBM Plex Sans Arabic', sans-serif", direction: "rtl", padding: "60px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <a href="/" style={{ color: "#0e8a8a", fontSize: 13, textDecoration: "none" }}>← العودة للرئيسية</a>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 600, margin: "20px 0 16px", color: "#0d1b2a" }}>إخلاء مسؤولية</h1>
        <div style={{ fontSize: 14, lineHeight: 2, color: "#555" }}>
          <p style={{ marginBottom: 14 }}>جميع الأسعار والمساحات والمعلومات المعروضة في هذا الموقع عن مشروع C North (سي نورث) من الكازار Il Cazar هي أسعار استرشادية وقابلة للتغيير من قبل المطور دون إشعار مسبق.</p>
          <p style={{ marginBottom: 14 }}>هذا الموقع يدار بواسطة فريق مبيعات معتمد وليس الموقع الرسمي لشركة الكازار للتطوير العقاري (Il Cazar Developments). جميع العلامات التجارية المذكورة مملوكة لأصحابها.</p>
          <p style={{ marginBottom: 14 }}>الصور والتصميمات المعروضة هي تصورات فنية (renders) قد تختلف عن المنتج النهائي. يرجى مراجعة العقود والمستندات الرسمية قبل اتخاذ أي قرار شراء.</p>
          <p style={{ marginBottom: 14 }}>نوصي بالتحقق من جميع المعلومات والأسعار مع فريق المبيعات قبل الحجز للحصول على أحدث التحديثات.</p>
          <p>للاستفسارات: <a href="tel:+201055978559" style={{ color: "#0e8a8a" }}>0105 597 8559</a></p>
        </div>
        <p style={{ fontSize: 11, color: "#aaa", marginTop: 20 }}>آخر تحديث: يوليو 2026</p>
      </div>
    </div>
  );
}
