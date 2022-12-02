#NMAD/autogradejson

## Overview
This is a standalone application build in typescript allows you to autograde student assignments. The application
is built with decouple designs in mind so that you can use this to validate or run commands
on any type of system. Furthermore, you can also run this application by supply a
.json file with the test cases in an array


# Requirements
1. nodejs
2. npm

# Setting up the project
1. Clone the project from github
2. cd into the project on your system
3. run npm install to install all the dependencies that is needed
4. Create a test case in the format

```typescript

{
    "tests":[
        {
            "name": "<name of test>",
            "run": "<command to execute>",
            "timeout": 10,
            "points": 5,
            "inputs":["optional"],
            "outputs": [
            {
                "expected": "<expected>",
                "comparison": "included",
                
            }
        }
    ]
}

```

#TODO

Finish the rest of the readme... nobody like this lol