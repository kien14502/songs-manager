"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(
  fetchData: (page: number) => Promise<T[]>
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const newData = await fetchData(page);
      setData((prev) => [...prev, ...newData]);
      setHasMore(newData.length > 0);
      setLoading(false);
    };
    load();
  }, [page, fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, hasMore]);

  return { data, loading, loaderRef, hasMore };
}
