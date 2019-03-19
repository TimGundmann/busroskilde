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
    createdDate?: Date;

}

export interface Category {

    name?: string;

    type?: string;

    subCategories?: SubCategory[];

    alterRoles?: string[];

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

export function deepCopy(obj) {
    let copy;

    if (null === obj || 'object' !== typeof obj) {
        return obj;
    }

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
}


