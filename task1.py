"""
Task 1: Printing a list of prime numbers from a to b

Write a function called find_primes that takes two parameters, a and b,
and return a list of all the prime numbers between a and b, inclusive.

For example, find_primes(1, 10) should return [2, 3, 5, 7].

Write a function called print_primes that takes two parameters, a and b,
and prints all the prime numbers between a and b, inclusive.

is_prime(n) is a function given to you so that you can use to check if a number is prime.

You can assume that a and b are both positive integers.

Example:

print_primes(1, 10)

Output:

2
3
5
7

"""

# Student Name:


def is_prime(n):
    """
    Return True if n is prime, and False otherwise.
    """
    if n == 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Write a function called find_primes that takes two parameters, a and b,
# and return a list of all the prime numbers between a and b, inclusive.

# Write your function here

# Write a function called print_primes that takes two parameters, a and b,
# inclusive and get a list of all the prime numbers by calling find_primes
# and print them.

# Write your function here

# Print a list of all the prime numbers between 1 and 100 using find_primes

# Write your code here

# Print all the prime numbers between 1 and 10 using print_primes()

# Write your code here
