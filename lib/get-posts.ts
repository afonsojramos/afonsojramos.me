import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { IPostBody, IPostFrontmatter } from 'interfaces';

const getPosts = () => {
  const posts = fs
    .readdirSync('./posts/')
    .filter((file) => path.extname(file) === '.md')
    .reduce((publishedPosts: (IPostFrontmatter & IPostBody)[], post) => {
      const postContent = fs.readFileSync(`./posts/${post}`, 'utf8');
      const { data, content } = matter(postContent);

      if (data.published === 'false') return publishedPosts;
      return [
        ...publishedPosts,
        { ...(data as IPostFrontmatter), body: content }
      ];
    }, [])
    .sort((a, b) => {
      return (
        new Date(b.date || '').valueOf() - new Date(a.date || '').valueOf()
      );
    });

  // Metadata for searching posts
  const meta = posts.map((p) => ({ ...p, body: null }));
  fs.writeFileSync(
    path.resolve(process.cwd(), 'data/blog.json'),
    JSON.stringify(meta)
  );

  return posts;
};

export default getPosts;
