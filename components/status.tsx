import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Status = () => {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState('');

  useEffect(() => {
    setClientTheme(theme || 'light');
  }, [theme]);

  return (
    <div>
      {clientTheme === 'light' && (
        <iframe
          src="https://status.afonsojramos.me/badge"
          width="250"
          height="30"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      )}
    </div>
  );
};

export default Status;
