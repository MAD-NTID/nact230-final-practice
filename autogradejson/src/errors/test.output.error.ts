import {TestComparision} from "../types/typeComparision";

export class TestOutputError extends Error
{
    expected: string
    actual: string

    constructor(message: string, expected: string, actual: string, comparision:TestComparision,sensitivity?: boolean) {
        super(`${message}\nExpected:\n${expected}\nActual:\n${actual}\nCase Insensitive:\n${sensitivity || 'NA'}\nComparison:\n${comparision}`)
        this.expected = expected
        this.actual = actual

        Error.captureStackTrace(this, TestOutputError);
    }
}