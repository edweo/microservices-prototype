export default function fetchWrapper<T>(
    fetchFn: () => Promise<T>,
    cbSuccess: (data: T) => void,
    cbError: (e: Error) => void,
    setIsLoading?: (loading: boolean) => void,
) {
  if (setIsLoading) setIsLoading(true)
  fetchFn()
      .then(data => {
        if (setIsLoading) setIsLoading(false)
        cbSuccess(data)
      })
      .catch((e: Error) => {
        if (setIsLoading) setIsLoading(false)
        cbError(e)
      })
}