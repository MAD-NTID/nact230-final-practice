import { TestComparision } from "../types/typeComparision";

export interface Output {
    readonly expected: string
    readonly comparison: TestComparision
    readonly caseInSensitive?: boolean
}