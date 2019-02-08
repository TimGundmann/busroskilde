export class ErrorDetails {

    timestamp: Date;
    message: string;
    details: string;

}

export class RequestResult {

    constructor(public errorDetails: ErrorDetails = null) { }

    get okResult(): boolean {
        return this.errorDetails === null;
    }

}
