import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Container from '../components/Container';
import { BlogPostType } from '../types';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog({ posts }: BlogPostType) {
  return (
    <Container title="Blog">
      <article className="[ wrapper ] [ margin-block-start-700 margin-block-end-800 ]">
        <div className="margin-block-start-700">
          <ol className="auto-grid" role="list">
            {posts.map((post) => {
              return (
                <li className="card" key={post.frontmatter.title} tabIndex={0}>
                  <article className="flow">
                    <Image
                      src={post.frontmatter.banner}
                      width={500}
                      height={500}
                      alt=""
                      layout="responsive"
                      className="card__image"
                    />
                    <h3 className="fs-600">{post.frontmatter.title}</h3>
                    <p className="fs-300">{post.frontmatter.description}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="button">Read More</a>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </article>
    </Container>
  );
}

export async function getStaticProps() {
  const files = readdirSync(join('posts'));
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = readFileSync(join('posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });
  return {
    props: {
      posts: posts
    }
  };
}
