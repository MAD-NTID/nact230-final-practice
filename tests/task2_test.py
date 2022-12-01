import pytest
import task2
from random import seed


def test_get_random_numbers_pass():
    seed(3)
    assert task2.get_random_numbers(5, 1, 10) == [4, 10, 9, 3, 6]


def test_get_random_numbers_fails():
    with pytest.raises(Exception) as e_info:
        task2.get_random_numbers()
        task2.get_random_numbers(1, 2)


def test_print_sorted_number_pass(capfd):
    task2.print_sorted_numbers([5, 8, 2, 1, 10])
    out, err = capfd.readouterr()
    assert out == "[1, 2, 5, 8, 10]\n"


def test_print_sorted_number_fails():
    with pytest.raises(Exception) as e_info:
        task2.print_sorted_numbers()
        task2.print_sorted_numbers([1, 2], "ASC")


def test_two_sets_intersection_pass():
    a = task2.two_sets_intersection([5, 8, 2, 1, 10], [9, 1, 8, 3, 7])
    assert type(a) == list
    a.sort()
    assert a == [1, 8]
