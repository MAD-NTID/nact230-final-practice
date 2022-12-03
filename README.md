# Hands-On Coding Final Exam - Practice

The tasks given in this repository are designed to test your basic knowledge of the course. In each task, you will be asked to write code to solve a problem presented in the task description. You will be given a set of tests to check your code. You will be able to run the tests locally on your computer.

## Tasks

Please complete as many tasks as you can. The tasks are ordered from easiest to hardest. You can complete them in any order. The instructions for each task are in the comments in each file.

The tasks are:

1. Finding and printing prime numbers
2. Generating a list of random numbers and finding the intersection of two sets of random numbers
3. A simple address book to store and retrieve contacts

## Instructions

1. Clone this repository to your computer through GitHub Classroom link provided by your instructor
2. Complete the tasks in the corresponding areas in each file
3. Test your code by running the file and checking the output
4. Continue to the next task
5. After completing all tasks, commit and push your code to your GitHub repository

## Sample Output

### Task 1

```bash
$ python task1.py
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
2
3
5
7
```

### Task 2

```bash
$ python task2.py
[6, 3, 7, 1, 2]
[9, 2, 6, 10, 1]
[1, 2, 6]
```

### Task 3

```bash
$ python task3.py
Welcome to the address book!
Commands:
  a: Add a contact
  e: Edit a contact
  d: Delete a contact
  s: Search for a contact
  p: Print all contacts
  q: Quit
Enter a command: a
Enter a name: Joe
Enter a phone number: 1234567 
Contact added!
Enter a command: p
Number of contacts: 1
Joe 1234567

Enter a command: e
Enter a name: Joe
Enter a phone number: 2345678 
Contact updated!
Enter a command: p
Number of contacts: 1
Joe 2345678

Enter a command: s
Enter a search term: Mary
Number of matching contacts: 0

Enter a command: s
Enter a search term: Joe
Number of matching contacts: 1
Joe 2345678

Enter a command: d
Enter a name: Joe
Contact deleted!
Enter a command: p
Number of contacts: 0

Enter a command: q
Goodbye!
```
