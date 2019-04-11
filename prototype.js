var person = {
  age: 23,
  log: function() {
    console.log(this.age)
  }
}
function myObject (o) {
  function Fn () {}
  Fn.prototype = o
  return new Fn()
}

var o1 = myObject(person)
o1.age = 34
var o2 = myObject(person)
o1.log()
o2.log()
console.log(person)