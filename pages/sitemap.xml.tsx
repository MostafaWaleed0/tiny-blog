import { readdirSync } from 'fs';
import { join } from 'path';

const createSitemap = (slugs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9>
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://website.com/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;

export async function getServerSideProps({ res }) {
  const allPosts = readdirSync(join(process.cwd(), 'posts'));
  const allPages = [
    ...allPosts.map((slug) => `blog/${slug.replace('.mdx', '')}`),
    ...['', 'blog']
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}
