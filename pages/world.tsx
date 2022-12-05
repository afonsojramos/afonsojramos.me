import Page from '@components/page';
import Globe from '@components/globe';
import Labels from '@components/label';
import { ILabel } from '../interfaces';

const labels: ILabel[] = [
  {
    label: "Where I've been",
    color: 'green'
  },
  {
    label: "Where I've lived",
    color: 'blue'
  }
];

const Travels = () => {
  return (
    <Page
      title="World Travels"
      description="Register of places I've visited so far."
    >
      <Globe />
      <Labels labels={labels} />
    </Page>
  );
};

export default Travels;
