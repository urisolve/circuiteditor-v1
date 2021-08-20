import { useMemo } from 'react';
import CryptoJS from 'crypto-js';
import lodash from 'lodash';

export const useGravatar = (email, size = 256) => {
  const gravatar = useMemo(() => {
    const trimmedEmail = lodash.trim(email);
    const lowercaseEmail = trimmedEmail.toLowerCase();
    const hash = CryptoJS.MD5(lowercaseEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;

    return url;
  }, [email, size]);

  return gravatar;
};
