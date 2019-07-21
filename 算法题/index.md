## 冒泡排序
核心思想：前一个跟后一个比较，小在前，大在后
```ts
function bubbleSort(data) {
  console.time()
  for (var i = 0, len = data.length; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (data[j] > data[j + 1]) {
        var tmp = data[j + 1]
        data[j + 1] = data[j]
        data[j] = tmp
      }
    }
  }
  console.timeEnd()
  console.log(data)
}
bubbleSort([1, -2, 34, 0, 1, 4, 9, -23, 0, -4])
```
## 选择排序
核心思想：拿出一个数（a）跟剩余所有数比较，如果前一个数比后一个数大，则交换两者位置，
总之小数在前，大数在后，以此类推
```ts
function selectSort(data) {
  console.time()
  var minIdx = 0
  for (var i = 0, len = data.length; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (data[minIdx] > data[j]) {
        minIdx = j
      }
    }
    var tmp = data[minIdx]
    data[minIdx] = data[i]
    data[i] = tmp
  }
  console.timeEnd()
  console.log(data)
}
selectSort([1, -2, 34, 0, 1, 4, 9, -23, 0, -4])
```
