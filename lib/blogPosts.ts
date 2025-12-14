// lib/blog.ts
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  category: string;
  keywords: string[];
  canonicalPath: string; // e.g. "/blog/remove-background-online"
  content: string; // markdown-ish (we render safely with simple formatting)
  faq?: { q: string; a: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "remove-background-online",
    title: "How to Remove Background from Images Online (Fast, No Watermark)",
    description:
      "Learn how to remove backgrounds online in seconds using CleanCut AI. Export transparent PNGs with no watermark and keep clean edges for product photos, portraits, and designs.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Guides",
    keywords: [
      "remove background online",
      "background remover",
      "transparent png",
      "remove background from image",
      "no watermark background remover",
    ],
    canonicalPath: "/blog/remove-background-online",
    content: `
Removing a background shouldn’t require Photoshop, paid credits, or watermarks.

CleanCut AI is built to do one thing extremely well: **remove image backgrounds quickly**, then export a **transparent PNG** you can actually use.

## Step-by-step: Remove background in 3 steps
1. Open the app: **/app**
2. Upload a JPG/PNG/WEBP (or a small batch depending on your plan).
3. Click **Process** → download your clean transparent PNG.

## When to use Fast vs Quality
- **Fast mode**: best for most product photos, logos, and clear subjects.
- **Quality mode**: better edges for hair/fur, complex details, and tricky lighting.

> Note: If you’re on the Free plan, some advanced modes may be limited.

## Best results checklist (pro tips)
- Use images with good contrast (subject clearly separated from background).
- Avoid ultra-low resolution screenshots.
- If edges look rough, try **Quality** mode.

## Common use cases
- E-commerce product photos (Shopify, Amazon, Etsy)
- Portraits / profile photos
- Marketing banners and ads
- Design assets (transparent PNG)

✅ Try it now: **/app**  
See plans: **/pricing**
`,
    faq: [
      {
        q: "Does CleanCut AI add a watermark?",
        a: "No. CleanCut AI does not add watermarks to exported images.",
      },
      {
        q: "What file formats are supported?",
        a: "Common formats like PNG, JPG/JPEG, and WEBP are supported.",
      },
      {
        q: "Is transparent PNG supported?",
        a: "Yes. CleanCut AI exports transparent PNGs.",
      },
    ],
  },

  {
    slug: "shopify-product-photos-background-removal",
    title: "Shopify Product Photos: Remove Backgrounds for Higher Conversions",
    description:
      "Clean product photos improve trust and increase conversions. Learn how to remove backgrounds for Shopify product images and keep consistent lighting and clean edges.",
    date: "2025-12-14",
    author: "Xevora",
    category: "E-commerce",
    keywords: [
      "shopify product photos",
      "remove background for product images",
      "ecommerce background remover",
      "white background product photo",
    ],
    canonicalPath: "/blog/shopify-product-photos-background-removal",
    content: `
If you sell online, your product photos are doing the heavy lifting.

A clean background:
- improves clarity,
- builds trust,
- and makes your product look premium.

## Best background style for Shopify
- **White background** is the safest default for most catalogs.
- **Transparent PNG** is perfect if your theme uses colored sections.

## Quick workflow (fast)
1. Upload product images in **/app**
2. Process (Fast is usually enough).
3. Download PNGs and upload to Shopify.

## Consistency tips
- Keep the same crop and scale across products.
- Use the same shadow style (if you add shadows).
- Don’t mix warm and cold lighting across the same category.

## When to use Quality mode
Use Quality for:
- transparent products (glass, bottles),
- furry materials,
- complex shapes (jewelry, chains).

✅ Start removing backgrounds: **/app**  
Compare plans: **/pricing**
`,
    faq: [
      {
        q: "Does background removal improve conversion?",
        a: "Cleaner images reduce friction and improve perceived quality, which often helps conversions.",
      },
      {
        q: "Should I export transparent PNG or white background?",
        a: "Use transparent PNG for flexible layouts, white background for consistent marketplace-style listing images.",
      },
    ],
  },

  {
    slug: "passport-photo-background-remove",
    title: "Passport Photo Background: How to Make a Clean White Background",
    description:
      "Need a clean white background for a passport photo? Learn a fast method to remove the background and export a clean PNG suitable for many ID photo requirements.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Use Cases",
    keywords: [
      "passport photo background",
      "white background photo",
      "remove background from portrait",
      "id photo background remover",
    ],
    canonicalPath: "/blog/passport-photo-background-remove",
    content: `
Many ID and passport photos require a clean, simple background (often white or light).

CleanCut AI helps you remove cluttered backgrounds quickly.

## Quick method
1. Upload your portrait to **/app**
2. Process (try **Quality** if hair edges are tricky)
3. Export PNG and place it on a plain white background in your editor if needed

## Tips for better ID photos
- Face should be evenly lit (avoid harsh shadows).
- Avoid busy backgrounds and extreme angles.
- Keep hair edges clean — **Quality** is better for that.

✅ Remove your background: **/app**
`,
    faq: [
      {
        q: "Is this an official passport photo generator?",
        a: "CleanCut AI removes backgrounds. Always check your country’s exact passport/ID requirements.",
      },
    ],
  },

  {
    slug: "remove-bg-for-youtube-thumbnails",
    title: "YouTube Thumbnails: Remove Background for Cleaner, Clickable Designs",
    description:
      "Learn how creators remove backgrounds from portraits and objects to create clean YouTube thumbnails. Export transparent PNG and layer it over bold colors and text.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Creators",
    keywords: [
      "remove background for youtube thumbnails",
      "thumbnail background remover",
      "transparent png creator workflow",
    ],
    canonicalPath: "/blog/remove-bg-for-youtube-thumbnails",
    content: `
Creators use one simple trick to make thumbnails pop:

**Cut out the subject**, then place it on a clean background with text.

## Thumbnail workflow
1. Export a transparent PNG from **/app**
2. Place it on a bold background color
3. Add big text + a subtle shadow

## Fast vs Quality for thumbnails
- Fast is great when the edges are already clean.
- Quality helps when hair/fur edges look rough.

✅ Try it now: **/app**
`,
  },

  {
    slug: "transparent-logo-png",
    title: "Make a Transparent Logo PNG: Clean Background Removal in Seconds",
    description:
      "Need a transparent logo PNG for your website or brand kit? Remove background from your logo and export a clean transparent PNG with no watermark.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Design",
    keywords: [
      "transparent logo png",
      "remove background from logo",
      "logo background remover",
    ],
    canonicalPath: "/blog/transparent-logo-png",
    content: `
A transparent logo PNG is essential for:
- websites,
- invoices,
- thumbnails,
- brand kits,
- and product packaging.

## How to make your logo transparent
1. Upload your logo to **/app**
2. Process
3. Download transparent PNG

## Pro tip
If your logo has thin edges or gradients, try **Quality** mode.

✅ Make your logo transparent: **/app**
`,
  },

  {
    slug: "real-estate-photos-remove-background",
    title: "Real Estate Marketing: Remove Backgrounds for Cleaner Ads & Posters",
    description:
      "For real estate ads and posters, clean cutouts look more professional. Learn how to remove backgrounds from agent portraits and property objects and export PNGs for design.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Marketing",
    keywords: [
      "real estate marketing images",
      "remove background for ads",
      "transparent png for posters",
    ],
    canonicalPath: "/blog/real-estate-photos-remove-background",
    content: `
Real estate marketing is visual. Clean designs build trust.

## What to remove backgrounds from
- agent portraits
- keys/house icons
- featured property objects
- logos and badges

## Workflow
1. Export transparent PNG from **/app**
2. Add a shadow in your editor
3. Place on posters, listings, and paid ads

✅ Start: **/app**
`,
  },

  {
    slug: "batch-background-removal",
    title: "Batch Background Removal: How to Process Multiple Images Faster",
    description:
      "Learn how to remove backgrounds in bulk using batch processing. Save time for catalogs, marketplaces, and large photo sets with a simple workflow.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Productivity",
    keywords: [
      "batch background removal",
      "remove background in bulk",
      "bulk transparent png",
    ],
    canonicalPath: "/blog/batch-background-removal",
    content: `
If you handle catalogs or listings, batch processing saves hours.

## Best use cases for batch
- product catalogs
- marketplace listings
- team photos
- content batches for social media

## How to do it
1. Upload multiple images to **/app**
2. Process
3. Download PNGs

> Batch limits depend on your plan.

✅ Process images: **/app**  
See limits: **/pricing**
`,
  },

  {
    slug: "remove-bg-vs-removebg-alternatives",
    title: "Remove.bg Alternatives: When You Want No Watermark and Better Value",
    description:
      "Looking for remove.bg alternatives? Compare the common pain points like cost, watermarks, and workflow limits — and learn what to check before choosing a tool.",
    date: "2025-12-14",
    author: "Xevora",
    category: "Comparisons",
    keywords: [
      "remove.bg alternative",
      "background remover cheaper",
      "no watermark background remover",
    ],
    canonicalPath: "/blog/remove-bg-vs-removebg-alternatives",
    content: `
Many people search for alternatives because they want:
- lower cost per image,
- no watermark,
- and simpler batch workflows.

## What to compare in a background remover
- Export quality (clean edges)
- Watermark policy
- Batch limits
- Pricing transparency
- Speed and reliability

✅ Try CleanCut AI: **/app**
`,
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
