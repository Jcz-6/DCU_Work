set -e

[[ -z $TASK ]] && [[ -f $PWD:t ]] && TASK=$PWD:t
[[ -z $TASK ]] && [[ -f $PWD:h:t ]] && TASK=$PWD:h:t

jar="${TASK%.kt}.jar"

#kotlinc $TASK -include-runtime -d $jar < /dev/null
#commenting out for run time

for v in 2 5 10 12
do
  java -jar $jar $v
done