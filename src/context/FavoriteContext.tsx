import { createContext, useContext, useMemo, useState } from 'react';

type FavoriteContextType = {
  deletedFavoriteIds: string[];
  setDeletedFavoriteIds: (ids: string[]) => void;
}
const FavoriteContext = createContext<FavoriteContextType>({
  deletedFavoriteIds: [],
  setDeletedFavoriteIds: () => {},
});

export const FavoriteContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [deletedFavoriteIds, setDeletedFavoriteIds] = useState<string[]>([]);

  const values = useMemo(() => ({
    deletedFavoriteIds,
    setDeletedFavoriteIds,
  }), [deletedFavoriteIds, setDeletedFavoriteIds]);

  return <FavoriteContext.Provider value={values}>{children}</FavoriteContext.Provider>;
};

export const useFavoriteContext = () => useContext(FavoriteContext);
