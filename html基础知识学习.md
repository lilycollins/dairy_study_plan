1.块级格式化上下文BFC  block fomat context
定义：一个隔离的容器，盒子在垂直方向一个接一个放置，相邻的两个盒子margin会交叠，浮动参与计算，BFC区域不会与float-box发生交叠，每个元素的margin-box的左边与
border-box的左边接触，浮动元素也是如此
怎么生成：1.position不为static和relative，2.overflow不为visible，3.浮动元素，4.display：inline-block，flex，inline-flex，grid，inline-grid，table-cell等
特性：自适应两栏布局，防止Margin交叠，清除内部浮动，父元素容纳子元素