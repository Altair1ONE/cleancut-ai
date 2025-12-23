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
    title: "Shopify Product Photos: Remove Background for Clean, Consistent Listings",
    description:
      "Create consistent Shopify product images faster. Remove the background, export a transparent PNG, then place your product on white or brand colors for listings, ads, and catalogs.",
    h1: "Remove Background for Shopify Product Photos",
    intro:
      "Shopify stores look more trustworthy when every product photo feels consistent. With CleanCut AI, you can remove backgrounds quickly, export a transparent PNG, and build a clean, repeatable style across your store—without spending hours masking in an editor.",
    bullets: [
      "Export transparent PNG cutouts for clean product placement",
      "Great for listings, collections, ads, and catalog images",
      "Batch processing for multiple photos (plan-based limits)",
      "Fast mode for speed, Quality mode for tougher edges (paid plans)",
    ],
    faq: [
      {
        q: "How do I get a pure white background for Shopify images?",
        a: "Remove the background, download the transparent PNG, then place it onto a pure white canvas in your editor (Canva, Photoshop, Photopea, etc.). This gives you full control and consistent results.",
      },
      {
        q: "Will background removal damage image quality?",
        a: "CleanCut AI is designed to keep your subject sharp. For complex edges and fine details, Quality mode typically produces cleaner cutouts (paid plans).",
      },
      {
        q: "How do I keep product thumbnails consistent?",
        a: "Use the same crop/spacing for every product and place cutouts on the same background color. Consistency improves brand perception and conversion.",
      },
    ],
  },

  {
    slug: "amazon-listing-images",
    title: "Amazon Listing Images: Remove Background and Prepare for White Background",
    description:
      "Make Amazon listings look more professional. Remove the background, export a transparent PNG, then place it on white for a clean marketplace-ready look.",
    h1: "Remove Background for Amazon Listing Images",
    intro:
      "Amazon shoppers scan fast—clean listing images help your product stand out. CleanCut AI isolates your product so you can place it on a white background and create polished main images, secondary angles, and infographic layouts.",
    bullets: [
      "Clean subject isolation for professional listing visuals",
      "Batch processing for catalogs and bulk workflows (plan-based)",
      "Fast mode for quick edits",
      "Quality mode for tricky edges and fine details (paid plans)",
    ],
    faq: [
      {
        q: "Does Amazon require a white background?",
        a: "Many categories prefer or require white backgrounds for main images. A common workflow is: remove background → export PNG → place on pure white → export final JPG/PNG.",
      },
      {
        q: "Can I process multiple images at once?",
        a: "Yes. Batch processing is supported, with limits depending on your plan.",
      },
      {
        q: "What format should I use for editing listing images?",
        a: "Use transparent PNG while editing so you can place the subject anywhere without recutting. Export the final image in the format Amazon requires.",
      },
    ],
  },

  {
    slug: "etsy-product-photos",
    title: "Etsy Product Photos: Remove Background for Cleaner Thumbnails & Branding",
    description:
      "Make Etsy listings feel more premium. Remove backgrounds for product photos, then create consistent thumbnails and marketing visuals using transparent PNG cutouts.",
    h1: "Remove Background for Etsy Product Photos",
    intro:
      "On Etsy, strong visuals are the difference between a scroll and a click. CleanCut AI helps you create clean product cutouts so you can build consistent thumbnails, banners, and seasonal promo graphics without a design-heavy workflow.",
    bullets: [
      "Transparent PNG export for flexible design",
      "Perfect for thumbnails, banners, and listing visuals",
      "Fast workflow for daily shop updates",
      "Batch processing available depending on your plan",
    ],
    faq: [
      {
        q: "Can I use transparent PNGs for Etsy thumbnails?",
        a: "Yes. Download the transparent PNG and place it on a consistent background color to create a branded shop look.",
      },
      {
        q: "Is it free to try?",
        a: "Yes. Start on the free plan and upgrade only when you need bigger batches and higher monthly limits.",
      },
      {
        q: "What’s the fastest way to make my Etsy photos consistent?",
        a: "Use the same crop/spacing and background style for every product. Transparent cutouts make that consistency much easier.",
      },
    ],
  },

  {
    slug: "youtube-thumbnails",
    title: "YouTube Thumbnails: Remove Background for Clean Cutouts That Pop",
    description:
      "Boost thumbnail clarity with clean cutouts. Remove backgrounds from faces or objects, export transparent PNG, then add outlines, shadows, and bold colors in your editor.",
    h1: "Remove Background for YouTube Thumbnails",
    intro:
      "High-performing thumbnails often have one thing in common: a clear subject that pops. CleanCut AI removes the background so you can drop your cutout into Canva/Photoshop/CapCut, add a stroke outline, and build attention-grabbing designs faster.",
    bullets: [
      "Great for faces, portraits, and cutout effects",
      "Transparent PNG export for easy editing",
      "Fast mode for quick thumbnail workflows",
      "Quality mode improves hair edges (paid plans)",
    ],
    faq: [
      {
        q: "How do I use a transparent PNG in a thumbnail?",
        a: "Download the PNG and place it into Canva, Photoshop, CapCut, or any editor. Then add text, outlines, and effects without recutting the subject.",
      },
      {
        q: "Do exports include a watermark?",
        a: "No. CleanCut AI does not add watermarks (including on the free tier).",
      },
      {
        q: "What kind of photos cut out best?",
        a: "Sharp, well-lit photos with clear contrast between subject and background usually produce the cleanest edges.",
      },
    ],
  },

  {
    slug: "logo-to-transparent-png",
    title: "Logo to Transparent PNG: Remove Background for Clean Branding Assets",
    description:
      "Turn a logo into a transparent PNG in seconds. Remove the background and reuse your logo on websites, packaging, social posts, and documents.",
    h1: "Convert a Logo to Transparent PNG",
    intro:
      "If your logo is stuck on a white or colored background, you lose flexibility. CleanCut AI helps you remove that background so your logo can be placed cleanly anywhere—websites, banners, packaging mockups, and more.",
    bullets: [
      "Transparent PNG export for branding and websites",
      "Works for JPG/PNG/WEBP uploads",
      "Fast workflow for quick results",
      "Clean edges for typical logo shapes",
    ],
    faq: [
      {
        q: "Will it work on low-resolution logos?",
        a: "It can, but higher-resolution logos usually produce cleaner edges. If the original logo is blurry or pixelated, the cutout may look softer.",
      },
      {
        q: "Can I upscale to true HD?",
        a: "True HD upscaling is a separate process from background removal. If HD export is marked “coming soon,” it can be enabled later when dedicated processing is added.",
      },
      {
        q: "What’s the best format for logos after background removal?",
        a: "Transparent PNG is typically best because it preserves edges and supports transparency for reuse across designs.",
      },
    ],
  },

  {
    slug: "passport-photo-background",
    title: "Passport-Style Photos: Remove Background for Clean Portrait Cutouts",
    description:
      "Need a clean portrait cutout? Remove the background and export a transparent PNG, then place it on the exact solid background color required by your workflow.",
    h1: "Remove Background for Passport-Style Photos",
    intro:
      "If you need a clean portrait cutout for official-style photos, CleanCut AI removes the background quickly. Then you can place your transparent PNG onto the correct solid background color using any editor.",
    bullets: [
      "Clean portrait cutouts with transparent PNG export",
      "Fast mode for quick results",
      "Quality mode helps hair edges (paid plans)",
      "Works with common formats (PNG/JPG/WEBP)",
    ],
    faq: [
      {
        q: "Does CleanCut AI guarantee official passport compliance?",
        a: "No tool can guarantee compliance for every country. Use background removal as one step, then verify your final image meets the official requirements for your region.",
      },
      {
        q: "Can I choose a specific background color?",
        a: "Yes. Export the transparent PNG and place it over the exact background color in your editor.",
      },
      {
        q: "What improves portrait results?",
        a: "Good lighting, sharp focus, and a clean separation between subject and background usually produces cleaner edges.",
      },
    ],
  },

  {
    slug: "remove-background-for-canva",
    title: "Canva Designs: Remove Background and Export Transparent PNG Cutouts",
    description:
      "Create cleaner Canva designs faster. Remove backgrounds, export transparent PNG cutouts, then drag-and-drop into Canva for posters, ads, and social content.",
    h1: "Remove Background for Canva",
    intro:
      "Canva is fast—cutouts should be fast too. CleanCut AI exports transparent PNGs so you can drop your subject into Canva and build marketing visuals, thumbnails, and promos without manual masking.",
    bullets: [
      "Transparent PNG for Canva drag & drop",
      "Fast workflow for marketing assets",
      "No watermark on exports",
      "Batch processing for multiple images (plan-based)",
    ],
    faq: [
      {
        q: "How do I use the PNG in Canva?",
        a: "Download the transparent PNG and upload it to Canva. Then place it on any template, background, or scene you want.",
      },
      {
        q: "Does it work well on product photos?",
        a: "Yes. Product cutouts are one of the most common workflows—especially for ads and promo graphics.",
      },
      {
        q: "What should I export from Canva after editing?",
        a: "Export PNG for crisp quality (and transparency if needed). Export JPG for smaller file size when you don’t need transparency.",
      },
    ],
  },

  {
    slug: "real-estate-photo-cutouts",
    title: "Real Estate Headshots: Remove Background for Team Photos & Branding",
    description:
      "Make team photos look consistent. Remove backgrounds from headshots, export transparent PNG cutouts, and place them on branded layouts for brochures and websites.",
    h1: "Remove Background for Real Estate Photos",
    intro:
      "Real estate teams often need consistent headshots for banners, listing pages, and brochures. CleanCut AI removes backgrounds so you can place people on the same branded style for a polished, professional look.",
    bullets: [
      "Consistent headshot cutouts for teams",
      "Transparent PNG export for brochures and websites",
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
        a: "Common formats are supported (PNG/JPG/WEBP).",
      },
      {
        q: "How do I keep everyone’s headshot style consistent?",
        a: "Use the same crop/zoom and place all cutouts on the same brand background color or template.",
      },
    ],
  },

  {
    slug: "tiktok-reels-content",
    title: "TikTok & Reels: Remove Background for Creator Thumbnails & Overlays",
    description:
      "Make creator visuals faster. Remove backgrounds from portraits or products, export transparent PNG, then build overlays, effects, and thumbnails for Reels and TikTok.",
    h1: "Remove Background for TikTok & Reels Content",
    intro:
      "Creators need speed and consistency. CleanCut AI removes backgrounds so you can build bold thumbnails, overlays, and promo graphics without spending time on manual cutouts.",
    bullets: [
      "Perfect for creator thumbnails and overlays",
      "Transparent PNG export for editing",
      "Fast mode for rapid workflows",
      "Quality mode improves edges (paid plans)",
    ],
    faq: [
      {
        q: "Can I use it for product cutouts too?",
        a: "Yes. It works for portraits and product photos—whichever your content needs.",
      },
      {
        q: "Do you watermark exports?",
        a: "No. CleanCut AI does not add watermarks.",
      },
      {
        q: "How do I make the subject stand out after cutout?",
        a: "Add a bold background color, a soft shadow, or a stroke outline in your editor. Transparent PNG makes this simple.",
      },
    ],
  },

  {
    slug: "resume-linkedin-headshot",
    title: "LinkedIn & Resume Headshots: Remove Background for a Cleaner Look",
    description:
      "Upgrade your profile photo. Remove the background, export a transparent PNG cutout, and place it on a clean neutral background for a professional headshot.",
    h1: "Remove Background for Resume & LinkedIn Headshots",
    intro:
      "A clean headshot looks more professional instantly. CleanCut AI removes backgrounds so you can use a neutral or branded background across LinkedIn, resumes, and team pages—without re-editing every time.",
    bullets: [
      "Professional-looking headshot cutouts",
      "Transparent PNG export",
      "Fast mode for quick updates",
      "Quality mode for hair edges (paid plans)",
    ],
    faq: [
      {
        q: "Do I need an editor after exporting PNG?",
        a: "Only if you want a specific solid background. Place the PNG over your chosen background color in any editor and export your final image.",
      },
      {
        q: "Will it work with low-light photos?",
        a: "It can, but better lighting and higher resolution usually improves edge quality and separation.",
      },
      {
        q: "What background color looks best for professional headshots?",
        a: "Neutral colors like white, light gray, or a soft brand color usually look clean and professional across platforms.",
      },
    ],
  },
];

export function normalizeUseCaseSlug(input: string) {
  const raw = decodeURIComponent(String(input || "")).trim();

  // remove query/hash
  const noQuery = raw.split("?")[0].split("#")[0];

  // remove trailing slashes
  const noSlash = noQuery.replace(/\/+$/, "");

  // keep last segment only
  const parts = noSlash.split("/").filter(Boolean);
  const last = parts.length ? parts[parts.length - 1] : noSlash;

  // handle static hosts that append ".html"
  const noHtml = last.replace(/\.html$/i, "");

  return noHtml.toLowerCase();
}

export function getUseCaseBySlug(slug: string) {
  const normalized = normalizeUseCaseSlug(slug);
  return useCases.find((u) => u.slug.toLowerCase() === normalized) || null;
}
