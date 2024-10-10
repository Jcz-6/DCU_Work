[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

# Fail (exit) immediately if any of the following commands fail.

set -e

# The show-exec-command is available in the Einstein execution environment.
# It is also available in the `bin` directory in the project repo.  You can
# install it locally from there for testing.

for v in 1 2 3 4 5 6 7 8 9 10
do
  go run $TASK $v
done

#note that the euler problem asked for the 30th number however
#it takes a long time to calculate (~= 3 hours)