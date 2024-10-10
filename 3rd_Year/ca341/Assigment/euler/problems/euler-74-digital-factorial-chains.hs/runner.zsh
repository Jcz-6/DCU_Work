# For testing, try to set the TASK environment variable...
#
set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

# Fail (exit) immediately if any of the following commands fail.
#


ghc --make $TASK

job=./${TASK%.hs}

for v k in 1000 3 10000 10 10000 15
do
  $job $v $k
done