import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Container from 'components/Container';
import { mdxToHtml } from 'lib/mdx';
import { MDXRemote } from 'next-mdx-remote';
import { PostPageType } from 'types';

export default function PostPage({
  frontmatter: { title },
  content
}: PostPageType) {
  return (
    <Container>
      <article className="[ wrapper ] [ region ] [ margin-block-start-300 ]">
        <div className="[ post ] [ flow ]">
          <h1>{title}</h1>
          <hr />
          <MDXRemote {...content} />
        </div>
      </article>
    </Container>
  );
}

export async function getStaticPaths() {
  const files = readdirSync(join('posts'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.mdx', '') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = readFileSync(join('posts', slug + '.mdx'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const { html, readingTime } = await mdxToHtml(content);
  return {
    props: { frontmatter, slug, content: html, readingTime }
  };
}
