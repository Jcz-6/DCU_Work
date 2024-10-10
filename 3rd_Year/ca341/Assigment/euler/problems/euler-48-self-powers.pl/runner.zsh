#!/usr/bin/env zsh

set -e

# Check if the TASK environment variable is set
[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

for argv in  50 100 1000;
do
    command  swipl -s $TASK -g "main($argv)" -t halt
done