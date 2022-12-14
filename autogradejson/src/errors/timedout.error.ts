export class TimedOutError extends Error
{
    constructor(message:string){
        super(`${message}`);
        Error.captureStackTrace(this, TimedOutError);
    }
}