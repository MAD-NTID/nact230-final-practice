import {spawn} from 'child_process';
import path from 'path';
import {expect,use} from 'chai';
import chaiAsPromised from 'chai-as-promised';
use(chaiAsPromised);

import {runAll, runProcess, spawnProcess, testOutput, waitForProcessToExit} from "../src/runner";
import {TimedOutError} from "../src/errors/timedout.error";
import {Output} from "../src/interfaces/output.interface";
import {Test} from "../src/interfaces/test.interface";

describe('Testing the waitForProcessToExit function', ()=>
{

    it('should exit after bash process is finish', async ()=>{
        let child = spawn('ls', {shell: true, env: {PATH: process.env['PATH'],},});
        let terminated = waitForProcessToExit(child, 1, 'bash timeout');
        await expect(terminated).to.eventually.be.fulfilled;
    });

    it('should throw a timeout', async ()=>{
        let input = path.resolve(__dirname,'input.sh');
        let child = spawn(`bash ${input}`, {shell: true, env: {PATH: process.env['PATH'],},})
        let terminated = waitForProcessToExit(child, 1, 'bash timeout');
        await expect(terminated).to.eventually.rejectedWith(TimedOutError);
    });

    it('should create a spawn process', ()=>{
    })

});

describe('testing the spawnProcess', ()=>{
    let content = "";
    before((done)=>{
        const child = spawnProcess('ls');

        if(child.stdout)
            child.stdout.on('data', (chunk)=>{
                content+=chunk;
            })

        done();
    })

    it('should show the ls contents', ()=>{
        let res = expect(content);
        res.to.include('src') && res.to.include('tests') && res.to.include('tsconfig.json');
    })

})

describe('testing runProcess', async()=>{
    it('it should show the ls contents', async()=>{
        let output = await runProcess('ls', 1, 'timedout');
        let res = expect(output);
        res.to.include('src') && res.to.include('tests') && res.to.include('tsconfig.json');
    })
})

describe(`testing testOutput = async (test:string, actual:string, output:Output):Promise<void>`, ()=>{
    it('should pass for included with sensitive case', async()=>{
        let actual = 'Hello World';
        let output:Output = {
            expected:'Hello World',
            comparison:'included',
        };

        let test = testOutput('testing for include', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    });

    it('should pass for include with case insensitive', async()=>{
        let actual = 'Hello World';
        let output:Output = {
            expected:'Hello World',
            comparison:'included',
            caseInSensitive:true
        };

        let test = testOutput('testing for include', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    });

    it('should pass for exact match with case sensitive', async ()=>{
        let actual = 'Hello World';
        let output:Output = {
            expected:'Hello World',
            comparison:'exact',
        };

        let test = testOutput('testing for include', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    })

    it('should pass for exact match with case insensitive', async ()=>{
        let actual = 'Hello World';
        let output:Output = {
            expected:'Hello World',
            comparison:'exact',
            caseInSensitive:true
        };

        let test = testOutput('testing for include', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    })

    it('should pass for the matching regex', async ()=>{
        let actual = 'Hello World';
        let output:Output = {
            expected:'Hello World',
            comparison:'regex',
        };

        let test = testOutput('testing for include', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    });

    it('should pass for the not included matching with case sensitive', async()=>{
        let actual = 'hello world';
        let output:Output = {
            expected:'Hello World',
            comparison:'notIncluded',
        };

        let test = testOutput('testing for not included', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    })

    it('should pass for the not included matching with case insensitive', async()=>{
        let actual = 'hello not world';
        let output:Output = {
            expected:'Hello World',
            comparison:'notIncluded',
            caseInSensitive:true
        };

        let test = testOutput('testing for not included', actual, output);
        await expect(test).to.eventually.be.fulfilled;
    })

})

describe('testing runAll', ()=>{
    it('should pass all tests', async()=>{
        let tests:Array<Test> = [
            {
                name: 'Hello World #1',
                points:1,
                timeout:1,
                run:'echo Hello World',
                outputs:[
                    {
                        expected:'Hello World',
                        comparison:'included'
                    },
                    {
                        expected:'Hello World',
                        comparison:'exact'
                    },
                ]
            },
            {
                name: 'Hello World #2',
                points:1,
                timeout:1,
                run:'echo Hello World',
                outputs:[
                    {
                        expected:'Hello World',
                        comparison:'included'
                    },
                    {
                        expected:'World',
                        comparison:'regex'
                    }
                ]
            }
        ]; //end of tests

        let allTest = runAll(tests);
        await expect(allTest).to.eventually.be.true;
    })
})