// lib/blogPosts.ts

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  canonicalPath: string; // e.g. /blog/slug
  category: string;
  keywords: string[];
  faq: { q: string; a: string }[];
  content: string; // markdown-ish string used by your renderer
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "remove-background-online-no-watermark",
    title: "Remove Background Online (No Watermark) — Transparent PNG in Seconds",
    description:
      "Remove image backgrounds online with no watermark. Export a clean transparent PNG fast for product photos, thumbnails, ads, and design workflows.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/remove-background-online-no-watermark",
    category: "Guides",
    keywords: [
      "remove background online",
      "no watermark background remover",
      "transparent png",
      "remove background from image",
      "background remover free",
      "product photo background removal",
      "youtube thumbnail cutout",
    ],
    faq: [
      {
        q: "Can I remove a background online without a watermark?",
        a: "Yes. Some tools export clean cutouts without watermarks. CleanCut AI is designed to keep exports usable and professional.",
      },
      {
        q: "What file format should I download after background removal?",
        a: "Transparent PNG is best because it preserves the cutout (alpha channel), so you can place the subject on any background later.",
      },
      {
        q: "Why do some tools look worse on hair or fur?",
        a: "Hair and fur require refined transparency edges. A slower “quality” mode usually improves results on complex details.",
      },
      {
        q: "Do I need Photoshop after removing the background?",
        a: "Not necessarily. If you only need a transparent PNG, you're done. If you want a specific background color (like pure white), you can place the PNG on it using any editor.",
      },
    ],
    content: `
## Why background removal matters
A clean cutout instantly makes images look more professional and more clickable. Background removal is widely used for:
- Product photos (Shopify, Amazon, Etsy)
- YouTube thumbnails and creator graphics
- Ads, banners, and social posts
- Logos and branding assets

## Step-by-step: remove background online (simple workflow)
Here’s the fastest workflow for most images:
- Upload your image (PNG/JPG/WEBP)
- Choose **Fast** mode for speed
- Use **Quality** mode for hair/fur edges (paid plans)
- Download the transparent PNG

## When to use transparent PNG vs white background
- Use **transparent PNG** if you want to reuse the cutout across many designs later.
- Use a **white background** if you need marketplace-ready listing images or a clean catalog look.

## Tips for cleaner edges (quick wins)
Better input gives better output:
- Use higher resolution images
- Prefer clear lighting and strong contrast
- Crop closer to the subject for best results
- Avoid heavy motion blur (edges become fuzzy)

---
### Try it now
Open the app, upload your image, and export a transparent PNG in seconds.
`,
  },

  {
    slug: "shopify-product-photo-background-removal",
    title: "Shopify Product Photos: Remove Background for Clean Listings & Ads",
    description:
      "Remove backgrounds from Shopify product photos fast. Export transparent PNG (no watermark), build consistent listings, and create clean catalog images.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/shopify-product-photo-background-removal",
    category: "E-commerce",
    keywords: [
      "shopify product photos",
      "remove background for shopify",
      "white background product image",
      "transparent png for shopify",
      "ecommerce image editing",
      "product listing images",
    ],
    faq: [
      {
        q: "Do Shopify product images need a white background?",
        a: "Not always, but white backgrounds are popular because they look clean, consistent, and premium across the entire store.",
      },
      {
        q: "What’s the fastest way to create consistent Shopify thumbnails?",
        a: "Remove the background, export a transparent PNG, then place it on a consistent background (white or brand color). Keep the product scale consistent too.",
      },
      {
        q: "Can I process multiple product photos at once?",
        a: "Yes. Batch processing helps when you’re preparing a catalog or updating many listings at the same time (plan limits may apply).",
      },
    ],
    content: `
## Why consistent product photos convert better
Consistency improves trust and makes your store look premium. Clean product images help customers focus on the product, not the background.

## Best background styles for Shopify
Many sellers use:
- **White background** for main listing images
- **Lifestyle images** as secondary photos
- **Transparent PNG cutouts** for ads, banners, and collection graphics

## A repeatable workflow (fast + clean)
Use this process for every product:
- Remove background
- Export transparent PNG
- Place on white background (if needed)
- Upload to Shopify and keep framing consistent

## Extra tips for a premium store look
- Use the same spacing and crop for all thumbnails
- Keep shadows soft and consistent (don’t overdo)
- Avoid noisy backgrounds in the original photo to get cleaner edges

---
### Pro tip
Batch processing is best for stores with many products — prepare images in groups to save time.
`,
  },

  {
    slug: "fast-vs-quality-background-removal",
    title: "Fast vs Quality Background Removal: Which One Should You Use?",
    description:
      "Fast vs Quality background removal explained. Learn when Fast mode is enough and when Quality gives cleaner edges for hair, fur, and complex images.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/fast-vs-quality-background-removal",
    category: "Guides",
    keywords: [
      "fast vs quality background removal",
      "quality mode background remover",
      "hair edge background removal",
      "fur cutout",
      "transparent png",
      "clean edges",
    ],
    faq: [
      {
        q: "Why does Quality mode look better on hair and fur?",
        a: "Quality mode usually applies extra refinement to transparency edges, which helps preserve strands and semi-transparent details.",
      },
      {
        q: "When is Fast mode enough?",
        a: "Fast mode is great for product photos on simple backgrounds, images with strong contrast, and high-volume workflows where speed matters most.",
      },
      {
        q: "Does Quality mode always look better?",
        a: "Not always. On simple images, Fast mode may look identical. Quality matters most on complex edges and busy backgrounds.",
      },
    ],
    content: `
## Fast mode (best for speed)
Fast mode is ideal for:
- Products on simple backgrounds
- Clear contrast images
- Bulk processing where speed matters

## Quality mode (best for complex edges)
Quality mode is best for:
- Hair and fur
- Semi-transparent details (like veils or fine edges)
- Busy backgrounds where edges are harder

## Which one should you use? (simple rule)
A simple rule:
- Use **Fast** for most product photos
- Use **Quality** when edges matter (portraits, hair, complex objects)

## How to improve results in either mode
- Start with higher resolution images
- Avoid motion blur
- Crop closer to the subject if it’s small in the frame

---
### Credit systems (common model)
Many apps price compute like:
- Fast = 1 credit/image
- Quality = 2 credits/image
`,
  },

  {
    slug: "best-image-types-for-background-removal",
    title: "Best Images for Background Removal (Cleaner Cutouts, Better Edges)",
    description:
      "Get cleaner background removal results with simple photo tips. Learn what image types work best, plus lighting, contrast, and cropping tricks.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/best-image-types-for-background-removal",
    category: "Tips",
    keywords: [
      "best images for background removal",
      "clean cutout tips",
      "improve background remover results",
      "transparent png export",
      "photo lighting tips",
      "high contrast photos",
    ],
    faq: [
      {
        q: "Do blurry photos work for background removal?",
        a: "Sometimes, but edge quality often degrades. Sharper photos usually produce cleaner cutouts.",
      },
      {
        q: "What helps most for clean edges?",
        a: "Higher resolution, good lighting, and clear separation between subject and background are the biggest wins.",
      },
      {
        q: "Does a plain background always matter?",
        a: "Plain backgrounds help, but great results are still possible if the subject is clear and well-lit with strong contrast.",
      },
    ],
    content: `
## Use high resolution when possible
Higher resolution gives the model more detail for edges. Low-res images often produce softer cutouts.

## Lighting makes a huge difference
Even lighting reduces harsh shadows and improves subject separation from the background.

## Use strong contrast (subject vs background)
If the subject blends into the background (same color), edges become less accurate.

## Crop closer to your subject
If your subject is small in the frame, crop closer before processing. This improves accuracy and speeds up results.

---
### Quick checklist
- Sharp focus
- Bright, even lighting
- Good contrast between subject and background
- Minimal motion blur
`,
  },

  {
    slug: "transparent-png-what-it-is",
    title: "Transparent PNG Explained: What It Is and When to Use It",
    description:
      "Transparent PNG lets you place a cutout on any background. Learn PNG vs JPG, why transparency matters, and when to export a transparent background.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/transparent-png-what-it-is",
    category: "Basics",
    keywords: [
      "transparent png",
      "png vs jpg",
      "what is transparent background",
      "remove background png",
      "alpha transparency",
      "transparent background image",
    ],
    faq: [
      {
        q: "Does PNG always mean transparent?",
        a: "No. PNG supports transparency, but the file must be exported with transparency enabled (alpha channel).",
      },
      {
        q: "Why do designers prefer transparent PNGs?",
        a: "Because you can reuse the same cutout across many backgrounds without re-editing the subject again.",
      },
      {
        q: "Should I use JPG after background removal?",
        a: "Use JPG only if you don’t need transparency (for example, if you place the subject on a solid background and export a final flat image).",
      },
    ],
    content: `
## PNG vs JPG (simple explanation)
- **JPG** does NOT support transparency.
- **PNG** supports transparency (alpha channel).

## What “transparent background” means
A transparent background means the pixels behind your subject are removed, so whatever you place the image on will show through.

## When you should use a transparent PNG
Transparent PNGs are perfect for:
- Thumbnails and ads
- Product cutouts
- Logos and icons
- Website graphics and overlays

## The benefit (why it’s worth it)
Once you have a transparent PNG, you can place your subject on:
- White background
- Brand colors
- Gradients
- Lifestyle mockups

---
### Summary
If you need a cutout you can reuse anywhere, transparent PNG is the best export format.
`,
  },
];

function normalizeSlug(input: string) {
  // Handles cases like:
  // "remove-background-online-no-watermark"
  // "/blog/remove-background-online-no-watermark"
  // "blog/remove-background-online-no-watermark"
  // "/cleancut/blog/remove-background-online-no-watermark" (if it ever happens)
  const s = decodeURIComponent(String(input || "")).trim();
  const cleaned = s.replace(/^\/+/, "");
  const parts = cleaned.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : cleaned;
}

export function getPostBySlug(slug: string) {
  const normalized = normalizeSlug(slug);
  return BLOG_POSTS.find((p) => p.slug === normalized) || null;
}
