import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import RSS from 'rss';

export async function getServerSideProps({ res }) {
  const files = readdirSync(join(process.cwd(), 'posts'));
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = readFileSync(
      join(process.cwd(), 'posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });

  const feed = new RSS({
    title: '',
    site_url: 'https://website.com',
    feed_url: 'https://website.com/feed.xml'
  });

  posts.map((post) => {
    feed.item({
      title: post.frontmatter.title,
      url: `https://website.com/blog/${post.slug}`,
      date: post.frontmatter.date,
      description: post.frontmatter.description
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {}
  };
}

export default function RSSFeed() {
  return null;
}
