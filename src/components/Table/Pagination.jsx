import {useMemo} from "react";

export const Pagination = (
  {
    page = 1,
    setPage = (page = 1) => {},
    pageSize = 10,
    setPageSize = (size = 10) => {},
    total = 0
  }
) => {
  const maxPages = useMemo(() => Math.ceil(total / pageSize), [pageSize, total])

  return <div className="row"></div>
}