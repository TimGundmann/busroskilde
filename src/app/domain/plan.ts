export interface Plan {

    id?: string;
    headline: string;
    from: Date;
    to: Date;
    file: any;
    fileType: string;
    fileName: string;
    category: Category;
    subCategory: SubCategory;

}

export interface Category {

    name: string;

    subCategories: SubCategory[];

}

export interface SubCategory {

    name: string;

}
