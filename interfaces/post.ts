interface IPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
}

interface IPostContent extends IPostFrontmatter {
  html: string;
  hidden: boolean;
  og: string;
}

interface IPostNavigation {
  previous: IPost;
  next: IPost;
}

type IPost = IPostContent & IPostNavigation;

export type { IPostFrontmatter, IPostContent, IPostNavigation, IPost };
