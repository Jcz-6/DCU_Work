%Digital Factorial Chain
%Qustion number: 74
%Difficulty: 15%
%Logical Approach

% calculate a factorial
factorial(0, 1). % Base case: factorial of 0 is 1
factorial(N, F) :-
    N > 0,
    N1 is N - 1,
    factorial(N1, F1),  %Itereante for n-1
    F is N * F1.        %calculate factorial

% Turns int into a string of its digits
digits(0, []).
digits(N, [H|T]) :-
    N > 0,
    H is N mod 10,    % Get the last digit
    N1 is N // 10,    % Remove the last digit
    digits(N1, T).    %recursively call function

% Produces the sum of each digit! in a integer
sumFactorialsDigits(N, Sum) :-
    digits(N, Digits),
    sumFactorialsList(Digits, Sum).

% Produces the sum of the elements! of a list
sumFactorialsList([], 0).         %Reach the end of the list
sumFactorialsList([H|T], Sum) :-
    factorial(H, F),              %Calculate Factoria
    sumFactorialsList(T, Sum1),   %Recusively call next element
    Sum is F + Sum1.              %Calculate Sum

% Entry Predicate
digitalFactorialChainStart(X,Count) :-
    digitalFactorialChain(X, [], Count).

% Calculate the length of the cain once an element recured
digitalFactorialChain(X, Y,Count):-
    myElem(X , Y),
    length(Y, Count).

% If next elem is not already part of chain
digitalFactorialChain(X, Y, Count):-
    \+ myElem(X, Y),              % elem is not in the list
    myAppend([X],Y, Z),           % Append elem to chain
    sumFactorialsDigits(X,Sum),   % Calulate next value in Chain
    digitalFactorialChain(Sum, Z, Count).  %Recursively call predicate

% Entry Predicate
digitalFactorialChainCountStart(X, Target, Result) :-
    digitalFactorialChainCount(X, Target, 0, Result).


% Base Case
digitalFactorialChainCount(0, _, Count, Count).

% Iterate from each X -> 1 and restun how many chains of len Target exist
digitalFactorialChainCount(X, Target, CurrentCount, Result) :-
    X > 0,                                                                   %X has to be a positive integer
    digitalFactorialChainStart(X, Y),                                        %Calculate length of factorial chain
    equalTo(Target, Y, Eq),                                                  %Compare if chain is the target length
    UpdatedCount is CurrentCount + Eq,                                       %Update the current count
    NewX is X - 1,                                                           %Iterate to next X value
    digitalFactorialChainCount(NewX, Target, UpdatedCount, Result).          %Recusively call function

%Return 1 if equal
equalTo(X,X,1).

%Return 0 if not equal
equalTo(_,_,0).

% Determine if elem is in a given list
myElem(X, [X | _]).
myElem(X, [_ | T]) :- myElem(X,T).

% Append two lists together
myAppend([],L, L).
myAppend([H | T], L, [H | L3]) :- myAppend(T,L,L3).

main(X, Target) :-
    digitalFactorialChainCountStart(X, Target, Result),
    writeln(Result).
