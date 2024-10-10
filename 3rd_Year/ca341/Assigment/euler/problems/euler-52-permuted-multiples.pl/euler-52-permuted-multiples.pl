% Predicate to check if two numbers have the same digits
same_digits(Number1, Number2) :-
    number_chars(Number1, Digits1),
    number_chars(Number2, Digits2),
    msort(Digits1, SortedDigits1),
    msort(Digits2, SortedDigits2),
    SortedDigits1 = SortedDigits2.

% Predicate to check if a number and its multiples up to 6 have the same digits
is_same_digits_multiple(I) :-
    Num2 is I * 2,
    Num3 is I * 3,
    Num4 is I * 4,
    Num5 is I * 5,
    Num6 is I * 6,
    same_digits(I, Num2),
    same_digits(I, Num3),
    same_digits(I, Num4),
    same_digits(I, Num5),
    same_digits(I, Num6).

% Predicate to find the smallest multiple meeting the conditions
find_smallest_multiple(0, I, I).
find_smallest_multiple(Limit, I, Result) :-
    is_same_digits_multiple(I),
    NewLimit is Limit - 1,
    NewI is I + 1,
    find_smallest_multiple(NewLimit, NewI, Result).
find_smallest_multiple(Limit, I, Result) :-
    \+ is_same_digits_multiple(I),
    NewI is I + 1,
    find_smallest_multiple(Limit, NewI, Result).

% Main predicate to handle command-line argument and print result
main(LimitNum) :-
    find_smallest_multiple(LimitNum, 1, Result),
    writeln(Result).
