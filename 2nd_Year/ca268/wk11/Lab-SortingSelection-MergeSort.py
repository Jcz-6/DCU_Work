def merge_sort(unsorted_array):
    if len(unsorted_array) > 1:
        mid = len(unsorted_array) // 2  # Finding the mid of the array
        left = unsorted_array[:mid]
        right = unsorted_array[mid:]

        merge_sort(left)
        merge_sort(right)

        i = j = k = 0

        #  data to temp arrays L[] and R[]
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                unsorted_array[k] = left[i]
                i += 1
            else:
                unsorted_array[k] = right[j]
                j += 1
            k += 1

        # Checking if any element was left
        while i < len(left):
            unsorted_array[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            unsorted_array[k] = right[j]
            j += 1
            k += 1


# driver code to test the above code
array = [12, 11, 13, 5, 6, 7]
print("Given array is", end="\n")
print(array)
merge_sort(array)
print("Sorted array is: ", end="\n")
print(array)