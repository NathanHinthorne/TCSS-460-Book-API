export interface IRatings {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
}
export interface IUrlIcon {
    large: string;
    small: string;
}
export interface IBook {
    isbn13: number;
    authors: string;
    publication: number;
    original_title: string;
    title: string;
    ratings: IRatings;
    icons: IUrlIcon;
}
