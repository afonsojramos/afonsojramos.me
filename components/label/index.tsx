import { ILabel } from '../../interfaces';
import styles from './label.module.scss';

const Label = ({ color, label }: ILabel) => {
  return (
    <div className={styles.label}>
      <div style={{ background: color }}></div>
      <span>{label}</span>
    </div>
  );
};

const Labels = ({ labels }: { labels: ILabel[] }) => {
  return (
    <div className={styles.labels}>
      {labels.map((label, index) => (
        <Label key={index} {...label} />
      ))}
    </div>
  );
};

export default Labels;
