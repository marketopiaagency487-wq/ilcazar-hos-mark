import type { Metadata } from "next";
export const metadata: Metadata = { title: "سياسة الخصوصية — C North Il Cazar" };

export default function Privacy() {
  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", fontFamily: "'IBM Plex Sans Arabic', sans-serif", direction: "rtl", padding: "60px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <a href="/" style={{ color: "#0e8a8a", fontSize: 13, textDecoration: "none" }}>← العودة للرئيسية</a>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 600, margin: "20px 0 16px", color: "#0d1b2a" }}>سياسة الخصوصية</h1>
        <div style={{ fontSize: 14, lineHeight: 2, color: "#555" }}>
          <p style={{ marginBottom: 14 }}><strong>١. البيانات المجمعة:</strong> نجمع الاسم ورقم الهاتف والبريد الإلكتروني فقط عند تعبئة نموذج التسجيل، وذلك للتواصل معك بخصوص مشروع C North — سي نورث من الكازار Il Cazar.</p>
          <p style={{ marginBottom: 14 }}><strong>٢. الاستخدام:</strong> بياناتك تُستخدم حصرياً لتقديم معلومات عن C North وترتيب التواصل مع فريق المبيعات المعتمد. لا نستخدم بياناتك لأي غرض آخر.</p>
          <p style={{ marginBottom: 14 }}><strong>٣. الحماية:</strong> نستخدم اتصال مشفر HTTPS ونظام Web3Forms الآمن لاستقبال البيانات. لا نبيع أو نشارك بياناتك مع أي أطراف ثالثة.</p>
          <p style={{ marginBottom: 14 }}><strong>٤. ملفات تعريف الارتباط (Cookies):</strong> نستخدم Google Analytics وGoogle Ads لقياس أداء الموقع وتحسين تجربة المستخدم. يمكنك إدارة إعدادات الكوكيز من متصفحك.</p>
          <p style={{ marginBottom: 14 }}><strong>٥. حقوقك:</strong> يحق لك الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت بالتواصل معنا.</p>
          <p style={{ marginBottom: 14 }}><strong>٦. الإفصاح:</strong> هذا الموقع يدار بواسطة فريق مبيعات معتمد لمشروع C North. نحن لسنا الموقع الرسمي لشركة الكازار للتطوير العقاري.</p>
          <p>للتواصل: <a href="tel:+201055978559" style={{ color: "#0e8a8a" }}>0105 597 8559</a></p>
        </div>
        <p style={{ fontSize: 11, color: "#aaa", marginTop: 20 }}>آخر تحديث: يوليو 2026</p>
      </div>
    </div>
  );
}
