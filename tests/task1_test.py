import pytest
import task1


def test_is_prime_pass():
    assert task1.is_prime(2) == True
    assert task1.is_prime(3) == True
    assert task1.is_prime(5) == True
    assert task1.is_prime(4) == False
    assert task1.is_prime(1) == False


def test_is_prime_fails():
    with pytest.raises(Exception) as e_info:
        task1.is_prime(-1)


def test_find_primes():
    assert task1.find_primes(1, 10) == [2, 3, 5, 7]
    assert task1.find_primes(1, 100) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73,
                                         79, 83, 89, 97]


def test_print_primes(capfd):
    task1.print_primes(1, 10)
    out, err = capfd.readouterr()
    assert out == "2\n3\n5\n7\n"
