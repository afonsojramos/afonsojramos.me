import { useState } from 'react';

import TextEntry from 'components/entry/text';
import styles from './posts-list.module.css';
import { IPost } from 'interfaces/post';

const Posts = ({ posts, paginate }: { posts: IPost[]; paginate?: boolean }) => {
  const [showMore, setShowMore] = useState(3);

  return (
    <div className={styles.container}>
      {posts.slice(0, paginate ? showMore : undefined).map((post) => {
        const date = new Date(post.date).toLocaleDateString('default', {
          month: 'numeric',
          day: 'numeric'
        });

        return (
          <TextEntry
            key={`post-item-${post.slug}`}
            href="/blog/[slug]"
            as={`/blog/${post.slug}`}
            title={post.title}
            type={date}
            description={post.description}
            slug={post.slug}
          />
        );
      })}
      {paginate && showMore < posts.length && (
        <button
          onClick={() => {
            setShowMore(showMore + 3);
          }}
          className={styles.button}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default Posts;
