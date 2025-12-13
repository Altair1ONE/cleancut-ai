export function SeoFaq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is CleanCut AI really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. CleanCut AI offers a free background remover with no watermark. Usage limits apply to keep the service fast and fair.",
        },
      },
      {
        "@type": "Question",
        "name": "Does CleanCut AI reduce image quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "No. CleanCut AI preserves image quality and allows transparent PNG export. Quality mode improves edge accuracy for complex images.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I remove backgrounds in bulk?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. CleanCut AI supports batch background removal. Batch size depends on your selected plan.",
        },
      },
      {
        "@type": "Question",
        "name": "Is there a watermark on free images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "No. CleanCut AI never adds watermarks, even on the free plan.",
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
