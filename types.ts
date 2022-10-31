import { MDXRemoteSerializeResult } from 'next-mdx-remote';
export interface PostPageType {
  slug: string;
  frontmatter: {
    banner: string;
    title: string;
    image: string;
    description: string;
    date: string;
  };
  content: MDXRemoteSerializeResult;
}

export interface BlogPostType {
  [key: string]: Array<PostPageType>;
}
