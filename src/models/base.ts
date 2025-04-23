//基础响应数据格式
export type BaseResponse<T> = {
  code: string,
  msg: string,
  data: T,
}

// 基础分页数据格式
export type BasePaginatorResponse<T> = BaseResponse<{
  list: Array<T>,
  paginator: {
    current_page: number,
    total_page: number,
    total_record: number,
    page_size: number,
  },
}>

