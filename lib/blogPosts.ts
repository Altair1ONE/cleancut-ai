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
    title: "How to Remove Background from Images Online (No Watermark)",
    description:
      "Learn how to remove backgrounds online without watermarks. Export transparent PNGs for e-commerce, thumbnails, and marketing designs using CleanCut AI.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/remove-background-online-no-watermark",
    category: "Guides",
    keywords: [
      "remove background online",
      "no watermark background remover",
      "transparent png",
      "background removal",
      "clean cutout",
      "product photos",
      "thumbnail cutout",
    ],
    faq: [
      {
        q: "Is watermark-free background removal possible?",
        a: "Yes. Some tools export PNGs without watermarks. CleanCut AI is built to keep exports clean and usable.",
      },
      {
        q: "What format should I download after background removal?",
        a: "Transparent PNG is best if you want to place your subject on different backgrounds later.",
      },
    ],
    content: `
## Why background removal matters
A clean cutout instantly makes images look more professional. It’s widely used for:
- Product photos (Shopify, Amazon, Etsy)
- YouTube thumbnails and creator graphics
- Ads, banners, and social posts
- Logos and branding assets

## Step-by-step: remove background online
Here’s the fastest workflow:
- Upload your image (PNG/JPG/WEBP)
- Choose **Fast** mode for speed
- Use **Quality** mode for hair/fur edges (paid plans)
- Download the transparent PNG

## Tips for cleaner edges
Better input gives better output:
- Use higher resolution images
- Prefer clear lighting and strong contrast
- Crop closer to the subject for best results

---
### Try it now
Open the app, upload your image, and export a transparent PNG in seconds.
`,
  },

  {
    slug: "shopify-product-photo-background-removal",
    title: "Shopify Product Photos: Remove Background and Create Clean Listings",
    description:
      "A practical guide for Shopify sellers to remove backgrounds, create consistent white backgrounds, and export transparent PNGs for ads and catalogs.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/shopify-product-photo-background-removal",
    category: "E-commerce",
    keywords: [
      "shopify product photos",
      "remove background for shopify",
      "transparent png for shopify",
      "white background product image",
      "ecommerce image editing",
    ],
    faq: [
      {
        q: "Do Shopify product images need a white background?",
        a: "Not always, but white backgrounds are common for clean, consistent catalogs and a premium store look.",
      },
      {
        q: "Can I make consistent thumbnails for my Shopify store?",
        a: "Yes. Use transparent PNG cutouts and place them on a consistent background color for a branded look.",
      },
    ],
    content: `
## Why consistent product photos convert better
Consistency improves trust and makes your store look premium. Clean product images help customers focus on the product, not the background.

## Best background style for Shopify
Many sellers use:
- **White background** for main listing images
- **Lifestyle images** as secondary photos
- **Transparent PNG cutouts** for ads and banners

## Fast workflow for sellers
Use this repeatable process:
- Remove background
- Export transparent PNG
- Place on white background (if needed)
- Upload to Shopify

---
### Pro tip
Batch processing is best for stores with many products — prepare images in groups to save time.
`,
  },

  {
    slug: "fast-vs-quality-background-removal",
    title: "Fast vs Quality Background Removal: What’s the Difference?",
    description:
      "Understand Fast vs Quality background removal, when to use each, and why Quality is better for hair, fur, and complex edges.",
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
        a: "Quality mode uses extra processing to refine transparency edges, which helps with complex details like hair strands.",
      },
      {
        q: "Should free users get Quality mode?",
        a: "Most tools reserve it for paid tiers to keep the free tier sustainable and fast for everyone.",
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
- Semi-transparent details
- Busy backgrounds where edges are harder

## Which one should you use?
A simple rule:
- Use **Fast** for most product photos
- Use **Quality** when edges matter (portraits, hair, complex objects)

---
### Credit systems (common model)
Many apps price compute like:
- Fast = 1 credit/image
- Quality = 2 credits/image
`,
  },

  {
    slug: "best-image-types-for-background-removal",
    title: "Best Image Types for Background Removal (Cleaner Results in Seconds)",
    description:
      "Improve background removal results with simple photo tips: lighting, contrast, resolution, and cropping. Get cleaner PNG cutouts for products and portraits.",
    date: "2025-12-14",
    author: "Xevora",
    canonicalPath: "/blog/best-image-types-for-background-removal",
    category: "Tips",
    keywords: [
      "best images for background removal",
      "clean cutout tips",
      "transparent png export",
      "improve background remover results",
      "photo lighting tips",
    ],
    faq: [
      {
        q: "Do blurry photos work for background removal?",
        a: "Sometimes, but edge quality often degrades. Sharper photos typically produce cleaner cutouts.",
      },
      {
        q: "What helps most for clean edges?",
        a: "Higher resolution, good lighting, and clear subject separation are the biggest wins.",
      },
    ],
    content: `
## Use high resolution when possible
Higher resolution gives the model more detail for edges. Low-res images often produce softer cutouts.

## Lighting makes a huge difference
Even lighting reduces harsh shadows and improves subject separation from the background.

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
    title: "What Is a Transparent PNG (And When Should You Use It?)",
    description:
      "Transparent PNGs let you place cutouts on any background. Learn PNG vs JPG, and why transparent exports are best for design, marketing, and product images.",
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
    ],
    faq: [
      {
        q: "Does PNG always mean transparent?",
        a: "No. PNG supports transparency, but the file must be exported with transparency enabled.",
      },
      {
        q: "Why do designers prefer transparent PNGs?",
        a: "Because you can reuse the same cutout across many backgrounds without re-editing.",
      },
    ],
    content: `
## PNG vs JPG (simple explanation)
- **JPG** does NOT support transparency.
- **PNG** supports transparency (alpha channel).

## When you should use a transparent PNG
Transparent PNGs are perfect for:
- Thumbnails and ads
- Product cutouts
- Logos and icons
- Website graphics and overlays

## The benefit
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

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
