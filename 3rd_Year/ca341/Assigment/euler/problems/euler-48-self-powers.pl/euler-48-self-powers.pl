% Predicate to calculate a number raised to itself
power(N, Result) :-
    Result is N ** N.

% Predicate to calculate the sum of powers from Start to End
sum_of_powers(Start, End, Sum) :-
    sum_of_powers_helper(Start, End, 0, TSum),
    Sum is TSum mod 10000000000.

sum_of_powers_helper(Start, End, Acc, Sum) :-
    Start =< End,
    power(Start, Power),
    NewAcc is Acc + Power,
    NextStart is Start + 1,
    sum_of_powers_helper(NextStart, End, NewAcc, Sum).

sum_of_powers_helper(Start, End, Sum, Sum) :- 
    Start > End.


main(End) :-
    sum_of_powers(1, End, Result),
    writeln(Result). 
