import { BLOG_POSTS } from '@/lib/sanity/queries';
import { sanityFetch } from '@/lib/sanity/live';

export default async function Page() {
  const posts = await sanityFetch({
    query: BLOG_POSTS,
  });

  return (
    <div className='flex flex-col gap-4 text-white'>
      {posts.data.map((post) => post.title)}
    </div>
  );
}
