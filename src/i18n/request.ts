import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  // You can resolve locale from cookies, headers, etc.
  // For now: hard-code or use middleware negotiation
  const locale = 'en'; // Replace with real resolution logic later

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});