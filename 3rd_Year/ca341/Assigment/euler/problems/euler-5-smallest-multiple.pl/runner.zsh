#!/usr/bin/env zsh

set -e

# Check if the TASK environment variable is set
[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

for argv in 1 2 3 4 5 6 7 8 9 10;
do
    show-exec-command  swipl -s $TASK -g "main($argv)" -t halt
done
