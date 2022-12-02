import {should, assert} from 'chai';
import { Output } from '../src/interfaces/output.interface';


describe('outputInterface' , function() {

    describe('Testing valid setup', ()=>{
        it('should pass as all setup are valid for include test case', ()=>{
            let output:Output = {
                expected:"Hello World",
                comparison:'included',
                caseInSensitive: true
            }

            assert.equal(output.expected, 'Hello World');
            assert.equal(output.comparison, 'included');
            assert.equal(output.caseInSensitive, true);

        });

        it('should pass as all setup are valid for regex test case', ()=>{
            let output:Output = {
                expected:"Hello World",
                comparison:'regex',
                caseInSensitive: true
            }

            assert.equal(output.expected, 'Hello World');
            assert.equal(output.comparison, 'regex');
            assert.equal(output.caseInSensitive, true);

        });

        it('should pass as all setup are valid for not included test case', ()=>{
            let output:Output = {
                expected:"Hello World",
                comparison:'notIncluded',
                caseInSensitive: true
            }

            assert.equal(output.expected, 'Hello World');
            assert.equal(output.comparison, 'notIncluded');
            assert.equal(output.caseInSensitive, true);

        });


        it('should pass as all setup are valid for exact test case', ()=>{
            let output:Output = {
                expected:"Hello World",
                comparison:'exact',
                caseInSensitive: true
            }

            assert.equal(output.expected, 'Hello World');
            assert.equal(output.comparison, 'exact');
            assert.equal(output.caseInSensitive, true);
        });

        it('should pass as the caseInSensitive parameter is not required', ()=>{
            let output:Output = {
                expected:"Hello World",
                comparison:'exact'
            }


            assert.equal(output.expected, 'Hello World');
            assert.equal(output.comparison, 'exact');
            //typescript have optional parameter valid as null or undefined... At least that is the way mocha perform the checks
            assert.equal(output.caseInSensitive, null);
            assert.equal(output.caseInSensitive, undefined)
        })
    });//end of valid setups

});