function Parent (name) {
  this.animals = ['dog', 'cat', 'sheep']
  this.name = name
  this.log = function() {
    console.log(this.animals)
    console.log(this.name)
  }
}
Parent.prototype.log1 = function() {
  console.log(this.animals)
}
function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent()
Child.prototype.log2 = function() {
  console.log(this.age)
}

var c1 = new Child('king', 23)
console.log(c1)
c1.animals.push('duck')
c1.log()


var c2 = new Child('yang', 26)
console.log(c2)
c2.log()