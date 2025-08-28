import { useEffect } from 'react';

export const usePageTitle = (pageTitle: string) => {
  useEffect(() => {
    const baseTitle = 'Tư vấn tâm lý';
    document.title = pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle;

    return () => {
      document.title = baseTitle;
    };
  }, [pageTitle]);
};
