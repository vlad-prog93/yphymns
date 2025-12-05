import { useEffect } from "react";
import { useAppDispatch } from "@redux/hooks";
import { toGetAllHymns } from "@redux/reducers/hymns/ActionCreatorHymns";
import { toGetAllCols } from "@redux/reducers/collections/ActionCreatorCollections";

export const useInitApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toGetAllHymns());
    dispatch(toGetAllCols());
  }, [dispatch]);
};
