import task1


def test_task1():
    assert task1.find_primes(1, 10) == [2, 3, 5, 7]
    assert task1.find_primes(1, 100) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
