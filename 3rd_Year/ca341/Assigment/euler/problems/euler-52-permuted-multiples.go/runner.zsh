set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t


#small numbers used due to performance
for v in 1 2 3
do
    go run $TASK $v
done
