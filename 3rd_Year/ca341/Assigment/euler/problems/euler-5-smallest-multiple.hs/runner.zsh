# For testing, try to set the TASK environment variable...
#
set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

# Fail (exit) immediately if any of the following commands fail.
#


ghc --make $TASK

job=./${TASK%.hs}

for v in 4 5 6 7 8 9 10
do
  $job $v
done