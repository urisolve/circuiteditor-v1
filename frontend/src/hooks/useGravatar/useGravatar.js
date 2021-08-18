import { useMemo } from 'react';
import CryptoJS from 'crypto-js';
import lodash from 'lodash';

export const useGravatar = (email) => {
  const gravatar = useMemo(() => {
    const trimmedEmail = lodash.trim(email);
    const lowercaseEmail = trimmedEmail.toLowerCase();
    const hash = CryptoJS.MD5(lowercaseEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

    return url;
  }, [email]);

  return gravatar;
};
