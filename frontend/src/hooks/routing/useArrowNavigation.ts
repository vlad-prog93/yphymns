import { useAppSelector } from "@redux/hooks";
import { Path_of_Routes } from "@utils/routes";
import { useCallback, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export const useArrowNavigation = () => {
  const hymns = useAppSelector(s => s.hymn.hymns);
  const navigate = useNavigate();
  const hymn = useMatch(Path_of_Routes.hymn(':id'))

  const index = hymns.findIndex(h => h._id === hymn?.params.id);

  const hasPrev = index > 0;
  const hasNext = index < hymns.length - 1;

  const goPrev = useCallback(() => {
    if (!hasPrev) return;
    navigate(Path_of_Routes.hymn(hymns[index - 1]._id));
  }, [index, hasPrev, hymns, navigate]);

  const goNext = useCallback(() => {
    if (!hasNext) return;
    navigate(Path_of_Routes.hymn(hymns[index + 1]._id));
  }, [index, hasNext, hymns, navigate]);

  useEffect(() => {
    if (index === -1) {
      return
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handler);


    return () => document.removeEventListener('keydown', handler)
  }, [goPrev, goNext]);

  return { goPrev, goNext, hasPrev, hasNext };
};
