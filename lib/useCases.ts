export type UseCase = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  bullets: string[];
  faq: { q: string; a: string }[];
};

export const useCases: UseCase[] = [
  {
    slug: "shopify-product-photos",
    title: "Remove Background for Shopify Product Photos",
    description:
      "Remove background from Shopify product images in seconds. Export transparent PNG, no watermark, clean edges.",
    h1: "Remove Background for Shopify Product Photos",
    intro:
      "CleanCut AI helps Shopify sellers create clean product photos with transparent backgrounds. Perfect for white backgrounds, catalogs, and ads.",
    bullets: [
      "Transparent PNG export (no watermark)",
      "Great for product listings and catalogs",
      "Batch processing for multiple photos",
      "Fast mode for speed, Quality mode for details",
    ],
    faq: [
      {
        q: "Can I make a white background for Shopify?",
        a: "Yes. Remove the background, then choose a white background option in the app (or export PNG and place on white).",
      },
      {
        q: "Will it reduce image quality?",
        a: "CleanCut AI aims to preserve quality. Use Quality mode for hair or complex edges.",
      },
    ],
  },
  {
    slug: "amazon-listing-images",
    title: "Remove Background for Amazon Listing Images",
    description:
      "Create clean Amazon listing images by removing backgrounds. Export transparent PNG and use white background for compliance.",
    h1: "Remove Background for Amazon Listing Images",
    intro:
      "Amazon listings look more professional with clean subject isolation. Use CleanCut AI to remove backgrounds quickly and prepare listing-ready images.",
    bullets: [
      "Batch background removal for catalog uploads",
      "No watermark on exports",
      "Fast mode for speed",
      "Quality mode for better edges",
    ],
    faq: [
      {
        q: "Does Amazon require white backgrounds?",
        a: "Many categories prefer or require white backgrounds. Remove the background, then place your subject on pure white.",
      },
      {
        q: "Can I process multiple images at once?",
        a: "Yes. CleanCut AI supports batch processing depending on your plan.",
      },
    ],
  },
  {
    slug: "etsy-product-photos",
    title: "Remove Background for Etsy Product Photos",
    description:
      "Remove background from Etsy product photos quickly. Transparent PNG export, no watermark, and batch processing.",
    h1: "Remove Background for Etsy Product Photos",
    intro:
      "Etsy shops benefit from consistent, clean visuals. CleanCut AI helps you create professional product photos for listings and marketing.",
    bullets: [
      "Transparent PNG export",
      "No watermark even on free plan",
      "Great for thumbnails and banners",
      "Batch processing available",
    ],
    faq: [
      {
        q: "Can I use this for listing thumbnails?",
        a: "Yes. Remove the background, then place your product on a consistent brand background.",
      },
      {
        q: "Is it free to try?",
        a: "Yes. You can start on the free plan with monthly limits.",
      },
    ],
  },
  {
    slug: "youtube-thumbnails",
    title: "Remove Background for YouTube Thumbnails",
    description:
      "Make eye-catching YouTube thumbnails by removing backgrounds from portraits and objects. No watermark.",
    h1: "Remove Background for YouTube Thumbnails",
    intro:
      "Thumbnails convert better when the subject pops. CleanCut AI removes backgrounds so you can add bold colors, outlines, and effects.",
    bullets: [
      "Great for faces and portraits",
      "Transparent PNG for easy editing",
      "Fast mode for quick workflows",
      "Quality mode for hair detail",
    ],
    faq: [
      {
        q: "How do I use the PNG in a thumbnail?",
        a: "Download the transparent PNG and place it into Canva/Photoshop or any editor.",
      },
      {
        q: "Does it add a watermark?",
        a: "No. CleanCut AI does not add watermarks.",
      },
    ],
  },
  {
    slug: "logo-to-transparent-png",
    title: "Convert Logo to Transparent PNG",
    description:
      "Remove background from a logo and export a transparent PNG instantly. No watermark.",
    h1: "Convert a Logo to Transparent PNG (No Watermark)",
    intro:
      "If you have a logo on a white or colored background, CleanCut AI helps convert it into a clean transparent PNG for websites and branding.",
    bullets: [
      "Transparent PNG export",
      "Works for PNG/JPG/WEBP",
      "Fast & simple workflow",
      "No watermark",
    ],
    faq: [
      {
        q: "Will it work on low-resolution logos?",
        a: "It can, but higher-quality source images usually produce cleaner edges.",
      },
      {
        q: "Can I upscale?",
        a: "Yes. Use HD/Upscale options if enabled in your app.",
      },
    ],
  },
];
