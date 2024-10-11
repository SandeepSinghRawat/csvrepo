function balancePt(arr) {
  let a = 0;
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
      a = a+ arr[i]
      arr2.push(a)
  }
  console.log(arr2);
  let index = -1;
  for (let j = 0; j< arr2.length ; j++) {
      let lhs = 0
      let rhs = 0
      if (j==0) {
          // console.log("j at 0", j)
          rhs = arr2[arr2.length -1] - arr2[j];
          console.log("rhs", rhs)
      }else if (j == arr2.length -1) {
          // console.log("j at last index", j)
          lhs = arr2[j-1]
      }else {
          // console.log("j at some index", j)
          lhs = arr2[j-1];
          rhs = arr2[arr2.length -1] - arr2[j]
      }
      console.log("rhs and lhs", rhs, lhs, j)
      if (lhs == rhs ) {
          index = j
          return index;
      }
      
  }
  return index;
}