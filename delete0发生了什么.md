delete运算符尝试删除数据时，会返回true，表示没有错误
delete 0中的这个0是一个表达式求值，本质是删除一个表达式的值
delete x中的这个x是一个引用
delete obj.x中的obj.x是一组表达式连续运算的结果
delete其实只能删除一种引用，即对象的成员（property）
所以，只有在delete x 等价与delete obj.x时 delete才会有执行意义
