"use client";

import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], perPage: number = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data?.length / perPage);

  const currentData = useMemo(() => {
    const start = (page - 1) * perPage;
    return data?.slice(start, start + perPage);
  }, [data, page, perPage]);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return {
    currentData,
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
}
