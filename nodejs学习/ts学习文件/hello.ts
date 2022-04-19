function sayHello(name:string) {
    return 'hello '+name
}
let person = 'peter'
sayHello('peter')
let isDone:boolean=false
let haha:boolean
let hahaha:string='Tom'
let sentence:string=`hello,my name is ${hahaha}.`
let x:any={a:12}
let h:any=x
console.log(x)

interface basePerson {
    name:string,
    age?:number,
    gender:string,
    [propname:string]:any
}
let ps:basePerson = {
    name:'jerry',
    gender:'女',
    fksdf:8
}
console.log(ps)

function buildName(firstName: string = 'Tom2', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
console.log(tomcat, cat)