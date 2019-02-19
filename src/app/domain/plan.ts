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

    type: string;

    subCategories: SubCategory[];

}

export interface SubCategory {

    name: string;

}

export function fileToBlob(plan: Plan): File {
    return new File([base64ToArrayBuffer(plan.file.split(',')[1])], plan.fileName, { type: plan.fileType });
}

function base64ToArrayBuffer(data: any) {
    const binaryString = window.atob(data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};


