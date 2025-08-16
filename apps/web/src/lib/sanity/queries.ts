import { defineQuery } from 'next-sanity';

export const BLOG_POSTS = defineQuery(`
  *[_type == "blog"] {
    _id,
    title,
    slug,
    image,
    publishedAt,
    content,
  }
`);
