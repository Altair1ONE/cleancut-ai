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
    title: "Remove Background for Shopify Product Photos (Transparent PNG)",
    description:
      "Remove background from Shopify product photos in seconds. Export transparent PNG with no watermark. Perfect for clean catalogs, ads, and consistent product listings.",
    h1: "Remove Background for Shopify Product Photos",
    intro:
      "CleanCut AI helps Shopify sellers create clean, professional product images by removing backgrounds instantly. Export a transparent PNG, then place your product on pure white or branded colors for a consistent store look.",
    bullets: [
      "Export transparent PNG (no watermark)",
      "Great for Shopify product listings, collections, and ads",
      "Batch processing for multiple product photos",
      "Fast mode for speed, Quality mode for cleaner edges (paid plans)",
    ],
    faq: [
      {
        q: "Can I create a pure white background for Shopify?",
        a: "Yes. Remove the background, then place the PNG on a pure white background in any editor (or use your app’s white mode if enabled).",
      },
      {
        q: "Will CleanCut AI reduce image quality?",
        a: "CleanCut AI preserves quality as much as possible. For complex edges like hair/fur, Quality mode produces cleaner cutouts (paid plans).",
      },
    ],
  },
  {
    slug: "amazon-listing-images",
    title: "Remove Background for Amazon Listing Images (White Background Ready)",
    description:
      "Create clean Amazon listing images by removing backgrounds fast. Export transparent PNG with no watermark and place on white for compliant listing photos.",
    h1: "Remove Background for Amazon Listing Images",
    intro:
      "Amazon listings look more professional with clean subject isolation. Use CleanCut AI to remove backgrounds in seconds, then place your product on a clean white background for a polished, marketplace-ready look.",
    bullets: [
      "Batch background removal for catalogs and bulk uploads",
      "No watermark on exports",
      "Fast mode for quick workflows",
      "Quality mode for cleaner edges (paid plans)",
    ],
    faq: [
      {
        q: "Does Amazon require a white background?",
        a: "Many categories prefer or require white backgrounds. Remove the background, then place the subject on pure white for best results.",
      },
      {
        q: "Can I process multiple images at once?",
        a: "Yes. CleanCut AI supports batch processing depending on your plan limits.",
      },
    ],
  },
  {
    slug: "etsy-product-photos",
    title: "Remove Background for Etsy Product Photos (No Watermark)",
    description:
      "Remove background from Etsy product photos quickly. Export transparent PNG with no watermark and build consistent thumbnails, banners, and shop visuals.",
    h1: "Remove Background for Etsy Product Photos",
    intro:
      "Etsy shops win with consistent visuals. CleanCut AI removes backgrounds so your products stand out in thumbnails, listing photos, and marketing graphics—without watermarks.",
    bullets: [
      "Transparent PNG export (no watermark)",
      "Perfect for thumbnails, banners, and listing visuals",
      "Fast, simple workflow for daily use",
      "Batch processing available depending on your plan",
    ],
    faq: [
      {
        q: "Can I use transparent PNGs for Etsy thumbnails?",
        a: "Yes. Download the transparent PNG and place it on a consistent background color for a branded look.",
      },
      {
        q: "Is it free to try?",
        a: "Yes. You can start on the free plan and upgrade when you need bigger batches and more usage.",
      },
    ],
  },
  {
    slug: "youtube-thumbnails",
    title: "Remove Background for YouTube Thumbnails (Make Subjects Pop)",
    description:
      "Make eye-catching YouTube thumbnails by removing backgrounds from portraits and objects. Export transparent PNG with no watermark and edit in Canva/Photoshop.",
    h1: "Remove Background for YouTube Thumbnails",
    intro:
      "Thumbnails convert better when the subject pops. CleanCut AI removes backgrounds from portraits and objects so you can add bold colors, outlines, and effects in any editor.",
    bullets: [
      "Great for faces, portraits, and cutout effects",
      "Transparent PNG export for easy editing",
      "Fast mode for quick thumbnail workflows",
      "Quality mode improves hair edges (paid plans)",
    ],
    faq: [
      {
        q: "How do I use the PNG in a thumbnail?",
        a: "Download the transparent PNG and place it into Canva, Photoshop, CapCut, or any editor, then add text and effects.",
      },
      {
        q: "Does CleanCut AI add watermarks?",
        a: "No. CleanCut AI does not add watermarks (including on the free tier).",
      },
    ],
  },
  {
    slug: "logo-to-transparent-png",
    title: "Convert Logo to Transparent PNG (Clean Edges, No Watermark)",
    description:
      "Remove background from a logo and export a transparent PNG instantly. Perfect for websites, branding kits, and social media graphics—no watermark.",
    h1: "Convert a Logo to Transparent PNG (No Watermark)",
    intro:
      "If you have a logo on white or colored background, CleanCut AI converts it into a transparent PNG so you can place it on websites, presentations, and branding materials cleanly.",
    bullets: [
      "Transparent PNG export for branding",
      "Works for JPG/PNG/WEBP uploads",
      "Fast workflow for quick results",
      "No watermark on exports",
    ],
    faq: [
      {
        q: "Will it work on low-resolution logos?",
        a: "It can, but higher-resolution source images usually produce cleaner edges. If your logo is blurry, results may be softer.",
      },
      {
        q: "Can I upscale to true HD?",
        a: "True HD upscaling requires dedicated processing. If your HD export is marked “coming soon,” it will be enabled later for the Lifetime plan when GPU processing is available.",
      },
    ],
  },

  // ✅ Additional SEO use cases (high intent)
  {
    slug: "passport-photo-background",
    title: "Remove Background for Passport Photos (Clean Cutout for Editing)",
    description:
      "Remove background from passport-style photos and export transparent PNG without watermark. Then place on required background color using any editor.",
    h1: "Remove Background for Passport-Style Photos",
    intro:
      "If you need a clean cutout from a portrait photo, CleanCut AI can remove the background fast. You can then place the subject onto the required solid background color in a photo editor.",
    bullets: [
      "Clean cutouts for portrait photos",
      "Transparent PNG export with no watermark",
      "Fast mode for quick results",
      "Quality mode helps hair edges (paid plans)",
    ],
    faq: [
      {
        q: "Does CleanCut AI guarantee official passport compliance?",
        a: "No tool can guarantee compliance for every country. Use CleanCut AI to remove the background, then verify your final image meets official requirements.",
      },
      {
        q: "Can I choose a specific background color?",
        a: "Yes. Export the transparent PNG and place it over the exact background color in your editor.",
      },
    ],
  },
  {
    slug: "remove-background-for-canva",
    title: "Remove Background for Canva Designs (Transparent PNG Export)",
    description:
      "Remove backgrounds from images and export transparent PNGs for Canva. No watermark, fast results—perfect for posters, ads, and social posts.",
    h1: "Remove Background for Canva",
    intro:
      "Want quick cutouts for Canva? CleanCut AI exports transparent PNGs so you can drag-and-drop your subject into Canva and build clean marketing visuals.",
    bullets: [
      "Transparent PNG for Canva drag & drop",
      "No watermark on exports",
      "Fast workflow for social and marketing assets",
      "Batch processing for multiple images (plan-based)",
    ],
    faq: [
      {
        q: "How do I use it in Canva?",
        a: "Download the PNG after background removal and upload it into Canva. Then place it on any design.",
      },
      {
        q: "Does it work on product photos?",
        a: "Yes. It works great for e-commerce product cutouts and promo designs.",
      },
    ],
  },
  {
    slug: "real-estate-photo-cutouts",
    title: "Remove Background for Real Estate Headshots & Team Photos",
    description:
      "Remove backgrounds from real estate headshots and team photos. Export transparent PNG with no watermark for brochures, websites, and listings.",
    h1: "Remove Background for Real Estate Photos",
    intro:
      "Real estate teams often need consistent headshots and cutouts. CleanCut AI removes backgrounds so you can place people on branded backgrounds for brochures and websites.",
    bullets: [
      "Consistent headshot cutouts for teams",
      "Transparent PNG export (no watermark)",
      "Fast processing for quick updates",
      "Quality mode for hair edges (paid plans)",
    ],
    faq: [
      {
        q: "Can I use this for team brochures?",
        a: "Yes. Transparent PNG exports are perfect for brochures, flyers, and websites.",
      },
      {
        q: "What image types are supported?",
        a: "Most common image formats are supported (PNG/JPG/WEBP).",
      },
    ],
  },
  {
    slug: "tiktok-reels-content",
    title: "Remove Background for TikTok & Reels Content (Creator Workflow)",
    description:
      "Remove background from creator photos for TikTok and Instagram Reels thumbnails. Export transparent PNG with no watermark and edit quickly.",
    h1: "Remove Background for TikTok & Reels Content",
    intro:
      "Creators need speed. CleanCut AI removes backgrounds for portraits and products so you can build bold thumbnails, overlays, and effects for TikTok and Reels.",
    bullets: [
      "Perfect for creator thumbnails and overlays",
      "Transparent PNG export",
      "Fast mode for rapid workflows",
      "Quality mode improves edges (paid plans)",
    ],
    faq: [
      {
        q: "Can I use it for product cutouts?",
        a: "Yes. It works for both portraits and product photos.",
      },
      {
        q: "Does it watermark my exports?",
        a: "No. CleanCut AI does not add watermarks.",
      },
    ],
  },
  {
    slug: "resume-linkedin-headshot",
    title: "Remove Background for Resume & LinkedIn Headshots",
    description:
      "Remove background from professional headshots for resume and LinkedIn. Export transparent PNG with no watermark and place on clean backgrounds.",
    h1: "Remove Background for Resume & LinkedIn Headshots",
    intro:
      "A clean headshot looks more professional. CleanCut AI removes backgrounds so you can use a neutral or branded background for LinkedIn and resume profiles.",
    bullets: [
      "Professional-looking cutouts",
      "Transparent PNG export (no watermark)",
      "Fast mode for quick updates",
      "Quality mode for hair edges (paid plans)",
    ],
    faq: [
      {
        q: "Do I need an editor after exporting PNG?",
        a: "If you want a specific solid background, yes—place the PNG over that background color in your editor.",
      },
      {
        q: "Will it work with low-light photos?",
        a: "It can, but better lighting and higher resolution improves edge quality.",
      },
    ],
  },
];
