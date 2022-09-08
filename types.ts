export interface PostPageType {
  frontmatter: {
    title: string | number;
    image: string | number | boolean;
    description: string | number | boolean;
    date: number;
  };
  content: any;
}

export interface BlogPostType {
  [key: string]: Array<PostPageType>;
}
