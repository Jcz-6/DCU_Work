import math


def insertionSort(List):
    for i in range(1, len(List)):
        currentNumber = List[i]
        for j in range(i - 1, -1, -1):
            if List[j] > currentNumber :
                <.........>
            else:
                List[j + 1] = currentNumber
                break

    return List


DEFAULT_BUCKET_SIZE = 5


def bucketSort(myList, bucketSize=DEFAULT_BUCKET_SIZE):
    if(len(myList) == 0):
        print('You don\'t have any elements in array!')

    minValue = myList[0]
    maxValue = myList[0]

    # For finding minimum and maximum values
    for i in range(0, len(myList)):
        if myList[i] < minValue:
            minValue = myList[i]
        elif myList[i] > maxValue:
            maxValue = myList[i]

    # Initialize buckets
    bucketCount = <.........>
    buckets = []
    for i in range(0, bucketCount):
        buckets.append([])

    # For putting values in buckets
    for i in range(0, len(myList)):
        < ......... >

    # Sort buckets and place back into input array
    sortedArray = []
    for i in range(0, len(buckets)):
        insertionSort(buckets[i])
        for j in range(0, len(buckets[i])):
            sortedArray.append(buckets[i][j])

    return sortedArray


sortedArray = bucketSort([12, 23, 4, 5, 3, 2, 12, 81, 56, 95])
print(sortedArray)