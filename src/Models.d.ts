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

export interface ListPaginate<T> {
    results : Array<T>,
    count: number;
    next: string | null;
    previous: string | null;
}