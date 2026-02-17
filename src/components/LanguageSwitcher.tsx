'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/locales';
import Select from '@/components/ui/Select';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  const options = locales.map((loc) => ({
    value: loc,
    label: loc.toUpperCase(),
  }));

  return (
    <Select
      value={locale}
      onChange={handleChange}
      options={options}
      wrapperClassName="min-w-[120px]"
    />
  );
}