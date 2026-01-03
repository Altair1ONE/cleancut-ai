export function SeoFaq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
  {
    "@type": "Question",
    name: "How do I make an image background transparent?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Upload your image to CleanCut AI, click Process, and download a transparent PNG. It works for product photos, portraits, and marketing images—no design skills needed.",
    },
  },
  {
    "@type": "Question",
    name: "Can I export a transparent PNG with no watermark?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Yes. CleanCut AI exports transparent PNGs without a watermark, including on the free plan. Usage limits apply to keep the service fast and fair for everyone.",
    },
  },
  {
    "@type": "Question",
    name: "What file types do you support (PNG, JPG, WEBP)?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "You can upload common formats like PNG, JPG, and WEBP. After processing, you can download a transparent PNG suitable for design and e-commerce use.",
    },
  },
  {
    "@type": "Question",
    name: "Can I remove backgrounds in bulk (batch processing)?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Yes. CleanCut AI supports batch background removal. Your maximum batch size and monthly credit limits depend on your plan.",
    },
  },
  {
    "@type": "Question",
    name: "Does background removal reduce image quality?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "CleanCut AI is designed to preserve detail and create clean edges. For hair and complex subjects, Quality mode can improve edge accuracy when available on your plan.",
    },
  },
  {
    "@type": "Question",
    name: "Do you store or sell uploaded images?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Images are processed only to provide background removal. CleanCut AI does not sell uploaded images, and we aim to keep processing private and secure.",
    },
  },
  {
    "@type": "Question",
    name: "What are credits and how many credits does one image use?",
    acceptedAnswer: {
      "@type": "Answer",
      text:
        "Credits are the usage units for processing. Fast mode typically costs 1 credit per image, while Quality mode typically costs 2 credits per image (when available).",
    },
  },
],

  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
