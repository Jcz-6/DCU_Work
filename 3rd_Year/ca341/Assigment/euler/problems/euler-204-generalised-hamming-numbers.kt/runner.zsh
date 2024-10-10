set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

jar="${TASK%.kt}.jar"

kotlinc $TASK -include-runtime -d $jar < /dev/null

for v k in 6 5 6 13 5 30
do
  java -jar $jar $v $k
done