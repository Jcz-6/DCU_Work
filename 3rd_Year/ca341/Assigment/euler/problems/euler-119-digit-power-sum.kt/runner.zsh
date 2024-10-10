set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

jar="${TASK%.kt}.jar"

kotlinc $TASK -include-runtime -d $jar < /dev/null

for v in 1 2 3 4 5 6 7 8 9 10
do
  java -jar $jar $v
done