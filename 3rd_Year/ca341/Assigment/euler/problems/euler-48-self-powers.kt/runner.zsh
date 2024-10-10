# Fail (exit) immediately if any of the following commands fail.
#
set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

jar="${TASK%.kt}.jar"

kotlinc $TASK -include-runtime -d $jar < /dev/null

for v in 0 10 50 100 1000
do
  java -jar $jar $v
done
