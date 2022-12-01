"""
Task 2: Get n numbers of random numbers between a and b

Part 1:

Write a function called get_random_numbers that takes three parameters, n, a,
and b, and return a list of n random integers between a and b, inclusive.

Example:

print(get_random_numbers(5, 1, 10))

Output (the numbers may be different):

[5, 8, 2, 1, 10]

Part 2:

Write a function called print_sorted_number that takes two parameters, list_numbers
and sort_order ("ASC" or "DESC") with ASC as a default, and print the numbers in
list_numbers in the order specified by sort_order.

Example:

print_sorted_number(get_random_numbers(5, 1, 10), sort_order="ASC")

Output (the output may be different each time it runs):
[1, 2, 5, 8, 10]

Part 3:

Write a function called two_sets_intersection that takes two lists of random numbers,
list_a and list_b, and return a list of numbers that are in both list_a and list_b
by using set intersection.

Example:
list_a = get_random_numbers(5, 1, 10)
list_b = get_random_numbers(5, 1, 10)
print(list_a)
print(list_b)
print(two_sets_intersection(list_a, list_b))

Output (the output may be different each time it runs):
[5, 8, 2, 1, 10]
[9, 1, 8, 3, 7]
[1, 8]
"""

from random import randint, seed

# random is a built-in random number generator library that provides a function
# called randint(a, b) that returns a random integer between a and b, inclusive.
#
# Example:
# print(randint(1, 10))
#
# Output (the output may be different each time it runs):
# 5

# Seed the random number generator so that the random numbers are the same
# each time the program runs. This is for testing purposes only. You should
# remove this line when you are done testing.

seed(7)

# Student Name:

# Part 1: Write a function called get_random_numbers that takes three parameters,
# n, a, and b, and return a list of n random numbers between a and b, inclusive.
#
# Bonus points: Use list comprehension to generate the list of random numbers.

# Write your function here

# Part 2: Write a function called print_sorted_number that takes two parameters,
# list_numbers and sort_order ("ASC" or "DESC") with ASC as a default, and print
# the numbers in list_numbers in the order specified by sort_order.

# Write your function here

# Part 3: Write a function called two_sets_intersection that takes two lists of
# random numbers, list_a and list_b, and return a list of numbers that are in
# both list_a and list_b by using set intersection.

# Write your function here

# The following code is used to test your functions. You can add more function calls
# to test your functions.

list_a = get_random_numbers(5, 1, 10)
list_b = get_random_numbers(5, 1, 10)
print(list_a)
print(list_b)
print(two_sets_intersection(list_a, list_b))
