import type { Metadata } from "next";
import { BLOG_POSTS, getPostBySlug } from "../../../lib/blogPosts";
import ClientPost from "./ClientPost";

export const dynamicParams = false;

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

import { getBlogOgImage } from "../../../lib/og";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params?.slug);

  if (!post) {
    return {
      title: "Blog",
      description: "CleanCut AI blog",
    };
  }

  const canonical = `https://xevora.org/cleancut${post.canonicalPath}`;
  const ogImage = getBlogOgImage(post.slug);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}


export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // ✅ If Next fails to pass params on some builds, client component still resolves it via useParams()
  return <ClientPost initialSlug={params?.slug} />;
}
