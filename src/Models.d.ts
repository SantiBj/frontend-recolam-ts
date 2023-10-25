export type Method = "GET" | "POST" | "PUT" | "DELETE"

export type Body<B> = B | null

export interface Headers {
    method: Method
    body: string | null
    headers: {
        "Content-type": string
        Authorization: string
    }
}

export interface DataPagination {
    next: string | null | undefined;
    previous: string | null | undefined;
}

export interface ListPaginate<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results : Array<T>,
}