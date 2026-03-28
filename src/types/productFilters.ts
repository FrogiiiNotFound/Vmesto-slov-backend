export type FilterQuery = {
    page: number;
    category: string;
    priceFrom: number;
    priceTo: number;
    composition: string;
    tags: string;
    q: string;
};

export type FilterParams = {
    category: string;
    priceFrom: number;
    priceTo: number;
    composition: string;
    tags: string;
    q: string;
};
