export interface ServerPaginationMeta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
}

export interface ServerPagination<T = any> {
    meta: ServerPaginationMeta;
    data: T[];
}
