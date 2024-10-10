set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

job="./${TASK%.hs}"

#small numbers used due to performance
for v in 0 1 2 
do
    $job $v
done