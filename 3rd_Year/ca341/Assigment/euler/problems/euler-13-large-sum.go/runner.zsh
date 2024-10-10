# Fail (exit) immediately if any of the following commands fail.
#
set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t


for v in numbers1.txt numbers2.txt numbers3.txt
do
  go run $TASK $v
done
