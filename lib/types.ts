export type Filter =
    | "this-month"
    | "last-month"
    | "last-3-months"
    | "all-time";

export type SearchParams = Promise<{
    filter?: Filter;
}>;