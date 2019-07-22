# 关于innereye的报表接入指南
<!-- TOC -->autoauto- [关于innereye的报表接入指南](#关于innereye的报表接入指南)auto  - [一、服务介绍](#一服务介绍)auto    - [1.1 场景介绍](#11-场景介绍)auto    - [1.2 产品流程](#12-产品流程)auto  - [二、接入指引](#二接入指引)auto    - [2.1 通过https接口获取accessToken](#21-通过https接口获取accesstoken)auto    - [2.2 获取报表嵌入信息](#22-获取报表嵌入信息)auto    - [2.3 前端引用示例](#23-前端引用示例)autoauto<!-- /TOC -->
## 一、服务介绍

innereye提供的iframe报表服务目的是支持报表制作者将制作好且具备接入权限的报表页面，嵌入至自身的业务系统后台中，使自身的业务系统后台具备数据可视化的能力。

### 1.1 场景介绍

适用于业务方将innerEye后台创建好的报表，以页面的形式，嵌入至业务方自身的系统后台页面中进行展示。

### 1.2 产品流程

产品交互流程如下：

步骤1：在innerEye 后台完成报表的创建；

![1563348199755](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1563348199755.png)

步骤2：业务方向innerEye申请一个业务角色，并将嵌入的目标报表查看权限分配给该角色；



步骤3：通过innerEye的看板页获取需要嵌入至业务后台的链接信息及代码信息，并告知业务开发人员；

![1563348469988](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1563348469988.png)

步骤4：业务方开发人员通过嵌入信息在业务系统嵌入报表页面



步骤5：业务方登陆业务系统后台查看已对接的报表页面

![1563348361103](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1563348361103.png)



## 二、接入指引

### 2.1 通过https接口获取accessToken

说明：通过该接口进行公共账号认证

地址：/api/token/

方法：post

参数：

| 参数     | 类型   | 必填 | 描述     | 默认值 | 参考值 |
| :------- | :----- | :--- | :------- | :----- | :----- |
| username | string | 是   | 公共账号 | null   |        |
| password | string | 是   | 密码     | null   |        |


返回：

```
{
    "access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ",
    "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ"
}
```

access - 资源访问凭证，5分钟失效

refresh - 刷新凭证

请在需要认证的其他接口请求的头部加上access信息

```
"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ"
```

### 2.2 获取报表嵌入信息

如下图，在innereye看板页-左侧目录树，选择需要嵌入的目标报表看板，点击站外推广，获取嵌入链接和代码

![1563346889191](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1563346889191.png)

复制报表嵌入信息

![1563346999785](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1563346999785.png)

### 2.3 前端引用示例

 URL示例：

 http://10.17.252.33:8080/#/DashboardIframe?menuId=123&dashboardId=123&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ

参数：

menuId: innerEye报表id

dashboardId：innerEye目录id

token：通过https接口获取accessToken - 资源访问凭证 access

注：menuId、dashboardId 以提供

代码块示例：

```
 <iframe src="http://10.17.252.33:8080/#/DashboardIframe?menuId=123&dashboardId=123&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ" 
width="100%" height="800px" name="topFrame" scrolling="No" noresize="noresize" frameborder="0" id="topFrame">
</iframe>
```

iframe src地址参照链接复制功能

