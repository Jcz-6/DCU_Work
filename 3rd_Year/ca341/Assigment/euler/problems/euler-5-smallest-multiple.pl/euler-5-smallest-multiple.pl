%Smallest Multiple
%Qustion number: 5
%Difficulty: 5%
%Logical Approach

%Predicate to check id N is divisable by 1 to Divider
divisible(N, Divider) :-
    Divider > 0,                          %Divider is a positive integer
    N mod Divider =:= 0,                  %N is divisable by divider
    NextDivider is Divider - 1,           %Iterate to next divider
    divisible(N, NextDivider).            %Recusively call predicate

% End case
divisible(_, 0).


% Start predicate for detemining the smallest multiple of 1 t0 limit
smallestMultipleStart(Limit, Result) :-
    smallestMultiple(1, Limit,  Result).


% If N is divisable by 1 - Limit
smallestMultiple(N, Limit, N) :-
        divisible(N, Limit).               %Check if N is divisible by 1 to Limit


% If N is not divisable by 1 - Limit
smallestMultiple(N,  Limit, Result) :-
    \+ divisible(N, Limit),                %Check if N is not divisible by 1 to Limit
    N1 is N +1,                            %Increment N
    smallestMultiple(N1, Limit, Result).   %Recusively call predicate

main(Limit) :-
    smallestMultipleStart(Limit, Result),
    writeln(Result).