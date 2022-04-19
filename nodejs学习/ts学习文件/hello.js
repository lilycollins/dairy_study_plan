function sayHello(name) {
    return 'hello ' + name;
}
var person = 'peter';
sayHello('peter');
var isDone = false;
var haha;
var hahaha = 'Tom';
var sentence = "hello,my name is " + hahaha + ".";
var x = { a: 12 };
var h = x;
console.log(x);
var ps = {
    name: 'jerry',
    gender: '女',
    fksdf: 8
};
console.log(ps);
function buildName(firstName, lastName) {
    if (firstName === void 0) { firstName = 'Tom2'; }
    return firstName + ' ' + lastName;
}
var tomcat = buildName('Tom', 'Cat');
var cat = buildName(undefined, 'Cat');
console.log(tomcat, cat);
