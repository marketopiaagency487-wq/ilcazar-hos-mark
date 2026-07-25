import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "C North رأس الحكمة — الكازار | C North Ras El Hekma by Il Cazar",
  description:
    "سي نورث الكازار C North by Il Cazar في رأس الحكمة — الساحل الشمالي. ١١٤ فدان، ١٣٠٠ وحدة، ٦٠٪ فيلات، شاطئ ٤٠٠ متر. مقدم ٢.٥٪ وتقسيط حتى ١٠ سنوات. Lagoon Homes تبدأ من ٨.٥ مليون.",
  keywords:
    "C North,سي نورث,C North الكازار,C North Ras El Hekma,C North Il Cazar,الكازار,رأس الحكمة,الساحل الشمالي,سي نورث رأس الحكمة,فيلات رأس الحكمة",
  openGraph: {
    title: "C North — الكازار | سي نورث رأس الحكمة Il Cazar",
    description:
      "C North الكازار: مجتمع شاطئي بوتيك على ١١٤ فدان في رأس الحكمة. ٨٠٪ إطلالة بحر، لاجونز ١٨ فدان، تسليم قريب.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        {/* ── Google Ads Tag ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17039137293" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17039137293');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
