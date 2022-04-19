var fs = require("fs");
// var data = fs.readFileSync("helloworld.js");
// console.log(data.toString())
// console.log('程序执行结束')
// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();
// // 创建事件处理程序
// var connectHandler = function connected() {
//    console.log('连接成功。'); 
//    // 触发 data_received 事件 
//    eventEmitter.emit('data_received');
// }
// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
// });
// // 触发 connection 事件 
// eventEmitter.emit('connection');
// console.log("程序执行完毕。");

// // EventEmitter事件的核心就是事件触发和事件监听器功能的回调
// var EventEmitter = require('events').EventEmitter; 
// var event = new EventEmitter(); 
// event.on('some_event', function(args1, args2){
//   console.log('some_event事件触发',args1, args2)
// })
// event.on('some_event', function(args1, args2){

// })
// setTimeout(() => {
//   event.emit('some_event','---参数1---','***参数2***')
// }, 2000);

// Buffer
// var buf = Buffer.alloc(26, 1)
// // var len = buf.write('www.runoob.com')
// // console.log('写入字节数', len)
// for (var i = 0 ; i < 26 ; i++) {
//   buf[i] = i + 97;
// }
// console.log(buf.toString('ascii', 0, 5))
// const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
// const json = JSON.stringify(buf);
// console.log(json)
// var buffer1 = Buffer.from(('菜鸟教程'));
// var buffer2 = Buffer.from(('www.runoob.com'));
// var buffer3 = Buffer.concat([buffer1,buffer2]);
// console.log("buffer3 内容: " + buffer3.toString());

// Stream流
// var data = ''
// var readerStream = fs.createReadStream('helloworld.js')
// readerStream.setEncoding('UTF8')
// readerStream.on('data', function(chunk) {
//   data += chunk
// })
// readerStream.on('end', function(){
//   console.log('打印出data', data)
// })
// readerStream.on('error', function(err) {
//   console.log(err.stack)
// })
// var data = 'stream流将内容写入文件'
// var writeStream = fs.createWriteStream('helloworld.js')
// writeStream.write('console.log("hello world nodejs!")\n', 'UTF8')
// writeStream.write(data, 'UTF8')
// writeStream.end()
// writeStream.on('finish', function() {
//   console.log('写入完成')
// })
// // 管道流
// var readStream = fs.createReadStream('helloworld.js')
// var writeStream = fs.createWriteStream('output.txt')
// readStream.pipe(writeStream)
// 链式流
// var zlib = require('zlib')
// // 压缩
// // fs.createReadStream('output.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('output.txt.gz'))
// // 解压
// fs.createReadStream('output.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('output2.txt'))

// nodejs模块系统
// var hello = require('./helloworld')
// hello = new hello()
// hello.setName('bill')
// hello.sayHello()

// nodejs函数
function sayName(name) {
  console.log('my name is '+ name)
}
function exec(fun, name){
  fun(name)
}
// exec(sayName, 'bill')
exec(function (name) {console.log('my name is '+name)}, 'linda')