export class TestCaseError extends Error{
    constructor(message:string){
        super(message);
        Error.captureStackTrace(this, TestCaseError);
    }
}