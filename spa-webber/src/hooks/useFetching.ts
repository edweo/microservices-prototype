import {useEffect, useState} from "react";
import fetchWrapper from "../functions/fetchWrapper.ts";

/**
 * For use best in GET methods or methods that do not create new data (side-effects)
 * @param fetchFn async fetch() function
 * @param cbSuccess callback on successful fetch
 * @param cbError callback on error
 * @param fetchOnInit TRUW by default - fetch instantly on init, FALSE - manually call refresh() to fetch
 */
export function useFetching<T>(
    fetchFn: () => Promise<T>,
    cbSuccess?: (data: T) => void,
    cbError?: (e: Error) => void,
    fetchOnInit: boolean = true,
): [boolean, string|null, T|null, () => void] {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [isFetchOnInit, setIsFetchOnInit] = useState<boolean>(fetchOnInit)

  function refreshFetch() {
    if (refresh) return
    setIsFetchOnInit(true)
    setRefresh(true)
  }

  useEffect(() => {
    if (!isFetchOnInit) return
    console.log("Started fetching")
    setError(null)
    setIsLoading(true)
    fetchWrapper<T>(
        fetchFn,
        (data: T) => {
            setData(data)
            setIsLoading(false)
            setRefresh(false)
            if (cbSuccess !== undefined) cbSuccess(data)
        },
        (e: Error) => {
            setIsLoading(false)
            setRefresh(false)
            setError(e.message)
            if (cbError !== undefined) cbError(e)
        },
        (loading: boolean) => setIsLoading(loading)
    )
  }, [refresh]);

  return [isLoading, error, data, refreshFetch]
}