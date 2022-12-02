import {spawn,ChildProcess} from 'child_process';
import { TimedOutError } from './errors/timedout.error';
import kill from 'tree-kill'
import { TestOutputError } from './errors/test.output.error';
import os from 'os';
import {Test} from "./interfaces/test.interface";
import {Output} from "./interfaces/output.interface";
import {TestCaseError} from "./errors/test.case.error";
import {v4 as uuidv4} from 'uuid';
import chalk from 'chalk';
import * as core from '@actions/core';
const SUCCESS_EXIT = 0;

const color = new chalk.Instance({level: 1})

let pointsReport = "";

let failedTestCases:string[] = [];

/**
 *
 * @param child the running process
 * @param timeout the timeout in seconds
 * @param timedOutMessage
 */
export const waitForProcessToExit = async(child:ChildProcess, timeout:number, timedOutMessage:string):Promise<void>=>{
    return new Promise((resolve, reject)=>
    {
        let timedOut = false;

        //convert the timeout to ms
        timeout = timeout * 1000;

        /**
         * create a setTimeout function where we set the timedout
         * to true and kill the child process and reject with the
         * timeout error
         */
        const terminatedTimeout = setTimeout(()=>{
            timedOut = true;
            reject(new TimedOutError(timedOutMessage + ' in millseconds'))
            if(child.pid)
                kill(child.pid);
        }, timeout);


        //listening for exit event from the child process
        child.once('exit',(code:number, signal:string)=>
        {
            if(timedOut) return;

            //cancel the previously timeout as the program ends before the timedout occurred
            clearTimeout(terminatedTimeout);

            //the process exit with no error
            if(code == SUCCESS_EXIT)
                resolve(undefined);
            else
                reject(new TestCaseError(`Error: Exit with code: ${code} and signal: ${signal}`));

        });

        //listening for error event from the child process
        child.once('error', (error:Error)=>
        {
            if(timedOut) return;

            clearTimeout(terminatedTimeout);
            reject(error);
        });

    })
}

export const spawnProcess = (cmd:string,cwd?:string):ChildProcess=>{
    //by default, we run the process in the current directory
    if(!cwd)
        cwd = '.';

    let environments = {
        PATH: process.env['PATH'],
            FORCE_COLOR: 'true',
    };


    //we dont want to setup dontnet cli home and set the child process to have the same env as the parentclear

    if(process.platform === 'win32'){
        cmd = cmd.replace('DOTNET_CLI_HOME=/tmp/', '');

        // @ts-ignore
        environments = process.env;
        environments.FORCE_COLOR = 'true';
    }

    return spawn(cmd, {
        cwd,
        shell: true,
        env: environments,
    });
}

export const log = (text: string): void => {
    process.stdout.write(text + os.EOL)
}

export const normalizeLineEndings = (text: string): string => {
    return text.replace(/\r\n/gi, '\n').trim()
}

export const indent = (text: any): string => {
    let str = String(text);
    str = str.replace(/\r\n/gim, '\n').replace(/\n/gim, '\n  ')
    return str
}
export const runProcess = async(command:string, timeout:number,timedOutMessage:string,inputs?:Array<string>,cwd?:string):Promise<string>=>{
    const child = spawnProcess(command, cwd);
    let output = '';
    let index = 0;

    // Start with a single new line
    process.stdout.write(indent('\n'))

    // @ts-ignore
    child.stdout.on('data', chunk => {
        process.stdout.write(indent(chunk))
        output+=chunk;

        //do we need to write the inputs to the stdin?
        if(inputs && index < inputs.length)
        {


            let input = inputs[index] + os.EOL;
            // @ts-ignore
            child.stdin.write(input);

            //write on the process what we input
            process.stdout.write(indent(input))
            index++;

        }

    })

    // @ts-ignore
    child.stderr.on('data', chunk => {
        process.stderr.write(indent(chunk))
    })


    await waitForProcessToExit(child, timeout, timedOutMessage);

    return output;
}



export const testOutput = async (test:string, actual:string, output:Output):Promise<void>=>{
    return new Promise((resolve, reject) => {


        actual = normalizeLineEndings(actual);
        let expected = output.expected;


        //do we need to lowercase?
        if(output.caseInSensitive){
            actual = actual.toLowerCase();
        }

        if(output.comparison!=='regex'){
            //we will normalize the expected line if it is not regex
            expected = normalizeLineEndings(expected);
            if(output.caseInSensitive){
                expected = expected.toLowerCase();
            }
        }

        //check the match
        switch(output.comparison)
        {
            case 'exact':
                if(expected!=actual)
                    reject(new TestOutputError(`The output for test ${test} didn't match `, expected, actual, output.comparison, output.caseInSensitive))
            break;

            case 'regex':

                let regex = new RegExp(output.expected || '');
                if(!actual.match(regex))
                    reject(new TestOutputError(`The output for test ${test} didn't match the regex`, output.expected, actual, output.comparison, output.caseInSensitive))
                break;

            case 'included':
                if(!actual.includes(expected))
                    reject(new TestOutputError(`The output for test ${test} didn't match`, expected, actual , output.comparison, output.caseInSensitive))
                break;

            //The default comparison mode is 'notIncluded'
            default:
                if(actual.includes(expected))
                    reject(new TestOutputError(`The output for test ${test} didn't match `, `expected to not included ${expected}`, actual,output.comparison, output.caseInSensitive))
                break;
        }

        //the test passed so we resolve
        resolve();
    })
}

export const testOutputs = async(test:string, actual:string, outputs:Array<Output>, points?:number):Promise<number>=> {

    let correctness = 0;
    let showFailHeader = true;
    let showSuccessHeader = true;
    let failed = false;



    //loop through each output and compare
    for (const output of outputs) {
        try {
            await testOutput(test, actual, output);
            correctness++;

            //show success outputs
            log('')
            if (showSuccessHeader) {
                log(color.green.bold(`✅ ${test}`));
                showSuccessHeader = false;
                log('\n')
            }
            let caseSensitive = true;
            if(output.caseInSensitive && output.caseInSensitive){
                caseSensitive = false;
            }
            log(`Expected:${output.expected} \nComparison:${output.comparison} \nCase Sensitive: ${caseSensitive}`);
        } catch (error) {
            failed = true;
            log('')
            if (showFailHeader) {
                log(color.bold.red(`❌ ${test}`))
                failedTestCases.push(test);
                showFailHeader = false;
            }

            // @ts-ignore
            log(error.message + '\n');
        }

    }

    //we will distribute the points
    if(points){
        let earned = (points / outputs.length) * correctness
        log(color.yellow(`${test} - Max possible points: ${points}`));
        log(color.magentaBright(`${test} - Points Earned:${earned}`));
        return earned;
    }

    return correctness;
}

export const runTest = async(test:Test, cwd?:string):Promise<string>=>{
    const start = process.hrtime();
    let setupTimeoutMessage = 'Setup timed out';
    let timeout = test.timeout;
    if(test.setup){
        let input = undefined;
        await runProcess(test.setup, test.timeout, setupTimeoutMessage,input, cwd);
    }
    const elapsed = process.hrtime(start)
    timeout -= Math.floor(elapsed[0]  + elapsed[1] / 1000000);
    let commandTimedOutMessage = `The test ${test.name} timed out`;
    return await runProcess(test.run, timeout, commandTimedOutMessage, test.inputs, cwd);
}

export const runAll = async (tests:Array<Test>, cwd?:string):Promise<boolean>=>{
    let points = 0;
    let availablePoints = 0;
    let extraPoints = 0;
    let hasPoints = false;
    let failed = false;

    const token = uuidv4();
    log('')
    log(`::stop-commands::${token}`)
    log('')

    //loop through each test cases
    for(const test of tests){
        try
        {
            //this is a point based test so we need to dd it up
            if(test.points){
                //dont count the extra credit tests against the student
                if(!test.extraCredit)
                    availablePoints+=test.points;
                hasPoints = true;
            }

            //let the user know what test is being run
            log(color.bold.cyan(`\n📝 ${test.name}`))
            log('')
            //run the test
            let actual = await runTest(test,cwd);
            //compare the outputs if supplied
            if(test.outputs){
                let correct = await testOutputs(test.name, actual, test.outputs, test.points);
                failed = correct !== test.outputs.length;
                if(test.points)
                {
                    points+= correct;
                    failed = correct!=test.points;
                }



                if(test.extraCredit)
                    extraPoints+= correct;
            } else {
                log(color.green.bold(`✅ ${test.name}`));
                if(test.points)
                {

                    points+=test.points;
                    if(test.extraCredit)
                        extraPoints+=test.points;
                }
            }


        }
        catch(error)
        {
            failed = true;
            log('')
            log(color.bold.red(`❌ ${test.name}`))
            failedTestCases.push(test.name);
            // @ts-ignore
            log(error.message + '\n');
        }
    } //end of running all tests

    if(!failed){
        log('')
        log('✨🌟💖💎🦄💎💖🌟✨🌟💖💎🦄💎💖🌟✨')
        log(color.bold.green('All tests passed'))
        log('')
        log('✨🌟💖💎🦄💎💖🌟✨🌟💖💎🦄💎💖🌟✨')
        log('')
    }

    if (extraPoints > 0) {
        log(color.bgBlack(`\n💪💪💪 You earned ${extraPoints} extra credit points`));
        core.setOutput('Extra credit points:', extraPoints);
    }

    // Set the number of points
    if (hasPoints) {
        const text = `Total Points ${points}/${availablePoints}`
        log('\n\n');
        pointsReport = text;
        log(color.bgGreenBright(color.bold.white(text)));

        core.setOutput('Points', `${points}/${availablePoints}`)
    }

    if(failed)
    {
        log(color.bold.red(`Failed test cases:`));
        for(let i = 0; i < failedTestCases.length; i++)
        {
            log(color.bold.red(`❌ ${failedTestCases[i]}`));
            core.setFailed(failedTestCases[i]);
        }

    }

    return !failed;


}

export const getPointsReport = ()=>{
    return pointsReport;
}
