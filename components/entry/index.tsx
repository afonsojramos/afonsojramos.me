import cn from 'classnames';
import Image from 'next/image';

import styles from './entry.module.scss';

const Entry = ({
  title,
  description,
  image,
  href,
  index
}: {
  title: string;
  description: string;
  image: string;
  href?: string;
  index?: number;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(styles.link, { [styles.active]: !image })}
      title={`${title} - ${description}`}
    >
      <section>
        <Image
          src={image}
          alt={`${title} - ${description}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(min-width: 66em) 33vw,(min-width: 44em) 50vw,100vw"
          quality={60}
          priority={index === 0}
        />
        <div>
          <p className={cn(styles.title, 'clamp')}>{title}</p>
          <p className={cn(styles.description, 'clamp')}>{description}</p>
        </div>
      </section>
    </a>
  );
};

export default Entry;
