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
    title: "Remove Background for Shopify Product Photos (Clean Listings & PNG)",
    description:
      "Remove backgrounds from Shopify product photos and export transparent PNG (no watermark). Create consistent listings, catalogs, ads, and thumbnails fast.",
    h1: "Remove Background for Shopify Product Photos",
    intro:
      "CleanCut AI helps Shopify sellers remove backgrounds from product photos in seconds. Export a transparent PNG, then place your product on pure white or brand colors for consistent listings and ads.",
    bullets: [
      "Export transparent PNG with clean edges (no watermark)",
      "Great for Shopify listings, collections, ads, and catalogs",
      "Batch processing for multiple product photos (plan-based limits)",
      "Fast mode for speed, Quality mode for tougher edges (paid plans)",
    ],
    faq: [
      {
        q: "Can I create a pure white background for Shopify product images?",
        a: "Yes. Remove the background, then place the PNG on a pure white background in any editor (or use a white mode if your workflow supports it).",
      },
      {
        q: "Will background removal reduce image quality?",
        a: "CleanCut AI is designed to preserve quality. For complex edges (hair/fur, fine details), Quality mode typically looks cleaner (paid plans).",
      },
      {
        q: "How do I keep my Shopify thumbnails consistent?",
        a: "Use the same crop/spacing for every product and place cutouts on the same background color. Consistency improves trust and store aesthetics.",
      },
    ],
  },

  {
    slug: "amazon-listing-images",
    title: "Remove Background for Amazon Listing Images (White Background Ready)",
    description:
      "Create clean Amazon listing images by removing backgrounds fast. Export a transparent PNG (no watermark), then place it on white for a marketplace-ready look.",
    h1: "Remove Background for Amazon Listing Images",
    intro:
      "Amazon listings look more professional with clean subject isolation. Use CleanCut AI to remove backgrounds, export a transparent PNG, then place it on a clean white background for a polished listing image.",
    bullets: [
      "Batch background removal for catalogs and bulk uploads",
      "No watermark on exports",
      "Fast mode for quick workflows",
      "Quality mode for cleaner edges on tricky subjects (paid plans)",
    ],
    faq: [
      {
        q: "Does Amazon require a white background?",
        a: "Many categories prefer (or require) white backgrounds. A common workflow is: remove background → export PNG → place on pure white.",
      },
      {
        q: "Can I process multiple images at once?",
        a: "Yes. Batch processing is supported depending on your plan limits.",
      },
      {
        q: "What’s the best export format for editing Amazon images?",
        a: "Transparent PNG is best for placing the subject on a new background without re-cutting it again.",
      },
    ],
  },

  {
    slug: "etsy-product-photos",
    title: "Remove Background for Etsy Product Photos (No Watermark PNG)",
    description:
      "Remove backgrounds from Etsy product photos quickly. Export transparent PNG (no watermark) and build consistent thumbnails, banners, and listing visuals.",
    h1: "Remove Background for Etsy Product Photos",
    intro:
      "Etsy shops win with consistent visuals. CleanCut AI removes backgrounds so your products stand out in thumbnails, listing photos, and marketing graphics — without watermarks.",
    bullets: [
      "Transparent PNG export (no watermark)",
      "Perfect for thumbnails, banners, and listing visuals",
      "Fast, simple workflow for daily shop updates",
      "Batch processing available depending on your plan",
    ],
    faq: [
      {
        q: "Can I use transparent PNGs for Etsy thumbnails?",
        a: "Yes. Download the transparent PNG and place it on a consistent background color for a branded shop look.",
      },
      {
        q: "Is it free to try?",
        a: "Yes. Start on the free plan and upgrade only when you need bigger batches and more usage.",
      },
      {
        q: "How do I make my Etsy photos look more consistent?",
        a: "Keep crop/spacing consistent and use the same background color or theme across products. Transparent PNGs make this easy.",
      },
    ],
  },

  {
    slug: "youtube-thumbnails",
    title: "Remove Background for YouTube Thumbnails (Transparent PNG Cutouts)",
    description:
      "Make thumbnails pop by removing backgrounds from faces and objects. Export transparent PNG (no watermark) and edit in Canva, Photoshop, or any editor.",
    h1: "Remove Background for YouTube Thumbnails",
    intro:
      "Thumbnails convert better when the subject pops. CleanCut AI removes backgrounds from portraits and objects so you can add bold colors, outlines, and effects in your favorite editor.",
    bullets: [
      "Great for faces, portraits, and cutout effects",
      "Transparent PNG export for easy editing",
      "Fast mode for quick thumbnail workflows",
      "Quality mode improves hair edges (paid plans)",
    ],
    faq: [
      {
        q: "How do I use the transparent PNG in a thumbnail?",
        a: "Download the transparent PNG and place it into Canva, Photoshop, CapCut, or any editor. Then add text, stroke outlines, and effects.",
      },
      {
        q: "Does CleanCut AI add watermarks?",
        a: "No. CleanCut AI does not add watermarks (including on the free tier).",
      },
      {
        q: "What kind of photos work best for thumbnail cutouts?",
        a: "Sharp, well-lit portraits with strong contrast usually produce the cleanest edges and best subject separation.",
      },
    ],
  },

  {
    slug: "logo-to-transparent-png",
    title: "Convert Logo to Transparent PNG (Clean Cutout, No Watermark)",
    description:
      "Convert a logo to a transparent PNG in seconds. Remove the background, export clean edges (no watermark), and use it on websites and branding assets.",
    h1: "Convert a Logo to Transparent PNG (No Watermark)",
    intro:
      "If your logo is on a white or colored background, CleanCut AI can remove that background and export a transparent PNG so you can place the logo cleanly anywhere.",
    bullets: [
      "Transparent PNG export for branding and websites",
      "Works for JPG/PNG/WEBP uploads",
      "Fast workflow for quick results",
      "No watermark on exports",
    ],
    faq: [
      {
        q: "Will it work on low-resolution logos?",
        a: "It can, but higher-resolution logos usually produce cleaner edges. If the source is blurry, the cutout may look softer.",
      },
      {
        q: "Can I upscale to true HD?",
        a: "True HD upscaling requires dedicated processing. If your HD export is marked “coming soon,” it can be enabled later when GPU processing is added.",
      },
      {
        q: "What’s the best format for logos after background removal?",
        a: "Transparent PNG is usually best because it keeps sharp edges and supports transparency for reuse across designs.",
      },
    ],
  },

  // ✅ Additional SEO use cases (high intent)
  {
    slug: "passport-photo-background",
    title: "Remove Background for Passport Photos (Clean Cutout for Editing)",
    description:
      "Remove background from passport-style portraits and export a transparent PNG (no watermark). Then place it on the required solid background color.",
    h1: "Remove Background for Passport-Style Photos",
    intro:
      "If you need a clean portrait cutout, CleanCut AI removes the background quickly. Export a transparent PNG and place it onto the exact background color required using any editor.",
    bullets: [
      "Clean cutouts for portrait photos",
      "Transparent PNG export with no watermark",
      "Fast mode for quick results",
      "Quality mode helps hair edges (paid plans)",
    ],
    faq: [
      {
        q: "Does CleanCut AI guarantee official passport compliance?",
        a: "No tool can guarantee compliance for every country. Use background removal as a step, then verify your final image meets official requirements.",
      },
      {
        q: "Can I choose a specific background color?",
        a: "Yes. Export the transparent PNG and place it over the exact background color in your editor.",
      },
      {
        q: "What improves results on portraits?",
        a: "Good lighting, sharp focus, and a clear separation between face/hair and background will usually produce cleaner edges.",
      },
    ],
  },

  {
    slug: "remove-background-for-canva",
    title: "Remove Background for Canva (Transparent PNG Export, No Watermark)",
    description:
      "Remove backgrounds and export transparent PNGs for Canva designs. No watermark, fast results—ideal for posters, ads, social posts, and thumbnails.",
    h1: "Remove Background for Canva",
    intro:
      "Need quick cutouts for Canva? CleanCut AI exports transparent PNGs so you can drag-and-drop your subject into Canva and build clean marketing visuals faster.",
    bullets: [
      "Transparent PNG for Canva drag & drop",
      "No watermark on exports",
      "Fast workflow for marketing assets",
      "Batch processing for multiple images (plan-based)",
    ],
    faq: [
      {
        q: "How do I use it in Canva?",
        a: "Download the PNG after background removal and upload it into Canva. Then place it on any template or background you want.",
      },
      {
        q: "Does it work on product photos?",
        a: "Yes. It works great for e-commerce cutouts and promo designs.",
      },
      {
        q: "What should I export from Canva after editing?",
        a: "Export PNG if you want crisp quality and support for transparency. Export JPG if you want a smaller file and don’t need transparency.",
      },
    ],
  },

  {
    slug: "real-estate-photo-cutouts",
    title: "Remove Background for Real Estate Headshots & Team Photos",
    description:
      "Remove backgrounds from real estate headshots and team photos. Export transparent PNG (no watermark) for brochures, websites, listing pages, and banners.",
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
        a: "Yes. Transparent PNG exports are perfect for brochures, flyers, and website layouts.",
      },
      {
        q: "What image types are supported?",
        a: "Most common image formats are supported (PNG/JPG/WEBP).",
      },
      {
        q: "How do I keep everyone’s headshot style consistent?",
        a: "Use the same crop/zoom and place cutouts on the same brand background color. Consistency makes teams look more professional.",
      },
    ],
  },

  {
    slug: "tiktok-reels-content",
    title: "Remove Background for TikTok & Reels (Creator Workflow PNG Cutouts)",
    description:
      "Remove backgrounds from creator photos for TikTok and Reels thumbnails. Export transparent PNG (no watermark) and build overlays and effects fast.",
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
        q: "Can I use it for product cutouts too?",
        a: "Yes. It works for both portraits and product photos.",
      },
      {
        q: "Does it watermark my exports?",
        a: "No. CleanCut AI does not add watermarks.",
      },
      {
        q: "How do I make the subject stand out more after cutout?",
        a: "Add a bold background color, a soft drop shadow, or a stroke outline in your editor. Transparent PNG makes this easy.",
      },
    ],
  },

  {
    slug: "resume-linkedin-headshot",
    title: "Remove Background for Resume & LinkedIn Headshots (Clean PNG Cutouts)",
    description:
      "Remove background from professional headshots for resume and LinkedIn. Export transparent PNG (no watermark) and place on a clean neutral background.",
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
        a: "Only if you want a specific solid background. Place the PNG over the background color in any editor and export the final image.",
      },
      {
        q: "Will it work with low-light photos?",
        a: "It can, but better lighting and higher resolution usually improves edge quality.",
      },
      {
        q: "What background color is best for professional headshots?",
        a: "Neutral colors (white, light gray, or a soft brand color) usually look clean and professional across platforms.",
      },
    ],
  },

];

export function normalizeUseCaseSlug(input: string) {
  const s = decodeURIComponent(String(input || "")).trim();
  const cleaned = s.replace(/^\/+/, "");
  const parts = cleaned.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : cleaned;
}

export function getUseCaseBySlug(slug: string) {
  const normalized = normalizeUseCaseSlug(slug);
  return useCases.find((u) => u.slug === normalized) || null;
}
