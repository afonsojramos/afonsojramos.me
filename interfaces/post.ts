interface IPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  og?: string;
}

interface IPostBody {
  body: string;
}

interface IPostContent extends IPostFrontmatter {
  html: string;
}

interface IPostNavigation {
  previous: IPostFrontmatter & IPostBody;
  next: IPostFrontmatter & IPostBody;
}

type IPost = IPostContent & IPostNavigation;

export type {
  IPostFrontmatter,
  IPostBody,
  IPostContent,
  IPostNavigation,
  IPost
};
