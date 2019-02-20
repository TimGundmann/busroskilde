export class ErrorDetails {

    timestamp: Date;
    message: string;
    details: string;

}

export class RequestResult<T> {

    private _result: T;

    public static okResultWith<T>(result: T): RequestResult<T> {
        const requestResult = new RequestResult<T>();
        requestResult._result = result;
        return requestResult;
    }

    constructor(public errorDetails: ErrorDetails = null) { }

    get okResult(): boolean {
        return this.errorDetails === null;
    }

    get returnValue(): T {
        return this._result;
    }



}
