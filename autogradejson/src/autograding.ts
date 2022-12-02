import fs from 'fs';
import path from "path";
import {log, runAll} from "./runner";
import {Test} from "./interfaces/test.interface";
import * as core from '@actions/core';


const run = async(cwd?:string):Promise<void>=>{
    try{
        //if we are
        if(!cwd)
            cwd = process.env['GITHUB_WORKSPACE']

        if(!cwd)
            throw new Error('cwd not defined');

        const data = fs.readFileSync(path.resolve(cwd, '.github/classroom/autograding.json'))
        const json = JSON.parse(data.toString())

        await runAll(json.tests as Array<Test>, cwd);
    }catch(error){
        // @ts-ignore
        console.error(error.message);
        // @ts-ignore
        core.setFailed(error.message);
    }
}

// Don't auto-execute in the test environment
if (process.env['NODE_ENV'] !== 'test') {
    run('../')
}

export default run