# Fail (exit) immediately if any of the following commands fail.
#

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t


for v in 0 10 50 100 1000
do
  go run $TASK $v
done
