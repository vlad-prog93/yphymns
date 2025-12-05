import { useAppSelector } from "@redux/hooks";

export const useArrowNavigation = () => {
  const hymns = useAppSelector(s => s.hymnReducer.hymns);
  const current = useAppSelector(s => s.hymnReducer.currentHymn);

  if (!current) return { next: null, prev: null };

  const index = hymns.findIndex(h => h._id === current._id);

  return {
    prev: hymns[(index - 1 + hymns.length) % hymns.length],
    next: hymns[(index + 1) % hymns.length],
  };
};
