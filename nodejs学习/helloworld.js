// exports.world = function () {
//   console.log('hello world')
// }
function hello() {
  var name
  this.setName = function(tName) {
    name = tName
  }
  this.sayHello = function() {
    console.log('hello-' + name)
  }
}
module.exports = hello;