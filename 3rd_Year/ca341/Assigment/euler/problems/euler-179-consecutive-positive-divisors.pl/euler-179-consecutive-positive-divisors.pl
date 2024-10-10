%Consecutive Positive Divisors
%Qustion number: 179
%Deficulty: 25%
%Logical Approach

% Start counting an integers divisors
countDivisorsStart(N, Divisors) :-
    N > 0,                                                 %Ensire N is Positivr
    SqrtN is integer(sqrt(N)),                             % calculate the square root of N, which is the upper bound for checking divisors.
    countDivisors(N, 2, SqrtN, 1, Count),                  % Start counting divisors, begining from 2
    (N > 1 -> Divisors is Count + 1 ; Divisors is Count).  % If N is greater than 1, add it as a divisor. Otherwise, return the count as is

% Stop condition
countDivisors(_, I, SqrtN, Count, Count) :-
    I > SqrtN, !.                                          %If the current number I exceeds the square root of N

% Calculaing the number of divisors of an integrer
countDivisors(N, I, SqrtN, CurrentCount, Divisors) :-
    I =< SqrtN,                                               %I is in the bounds of divisor checking
    (   N mod I =:= 0 ->                                      %Check if I is a divisor of N.
    (   I * I =:= N ->                                        %If I is a divisor check if its a pefect square root of N
            TempCount is CurrentCount + 1;                    %Increment by 1 and avoid double counting for perfet square
            TempCount is CurrentCount + 2                     %Otherwise count I and N/I
        )
    ;   TempCount is CurrentCount                             %keep current count if not divisor
    ),
    NextI is I + 1,                                           %Increment I by 1
    countDivisors(N, NextI, SqrtN, TempCount, Divisors).      %Recusively call predicate

% Start calculating consecutive dividers
consecutiveDivisorsStart(Limit, Result) :-
    consecutiveDivisors(1, Limit, 0, Result).

% Comparing the number of divisors of N to N+1
consecutiveDivisors(N, Limit, CurrentResult, Result) :-
    N + 1 < Limit,                                            %While N is within the limit
    countDivisorsStart(N, Num1),                              %Calculate the number of divisors of N
    NextN is N + 1,
    countDivisorsStart(NextN, Num2),                          %Calculate the number of divisors of N+1
    (   Num1 =:= Num2 ->
        UpdatedResult is CurrentResult + 1                    %If they are equal incremnt by 1
    ;   UpdatedResult is CurrentResult                        %otherwise keep Current Result
    ),
    consecutiveDivisors(NextN, Limit, UpdatedResult, Result). %Recusively call predicare


% Stop condition
consecutiveDivisors(N, Limit, Result, Result) :-
    N + 1 >= Limit.                                           %N has reached the limit

main(Limit) :-
    consecutiveDivisorsStart(Limit, Result),
    writeln(Result).


