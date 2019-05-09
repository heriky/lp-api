# lp-api

## 安装使用

0. 安装mysql 5.7, 安装node 10.15.3
1.将mysql的用户名设置成root，密码设置成1234
2. 安装node，在项目根目录下执行 `npm install`
3. 程序运行在3000端口




router.prefix('/lp/v1/user')

router.get('/', async (ctx, next) => {
    ctx.body = 'hello world!!!'
});

router.post('/login', userController.login);

router.post('/register', userController.register);

router.put('/:userId', userController.reviseUserDetail);

router.get('/:userId', userController.getUserById);


## 接口列表

1. 注册
```javascript

// 示例
post('/lp/v1/user/register', {
  username: 'aaa',
  password: 'bbb'
  phone: '130000000', 
  department: '计算机工程学院', 
  gender: '男'
})

```

2. 登陆

```javascript
post('/lp/v1/user/login', {
  username: 111,
  password: 222
})

```

3. 查询指定用户信息
```javascript
get('/lp/v1/user/:userId')

```


4. 修改指定用户信息, **需要注意的是，如果某一字段不填，则表示该字段不做修改**
```javascript
put('/lp/v1/user/:userId', {
  username: 'aaa',
  password: 'bbb'
  phone: '130000000', 
  department: '计算机工程学院', 
  gender: '男'
})

```


5. 获取所有商品
```javascript

get('/lp/v1/goods')

```

6. 获取指定用户发布的所有商品

```javascript

get('/lp/v1/goods?userId=1')

```

7. 按关键字搜索商品

```javascript

get('/lp/v1/goods?keyword=测试啦啦啦')

```

8. 查询指定商品

```javascript

get('/lp/v1/goods?goodsId=2')

```

9. 发布商品

```javascript

post('/lp/v1/goods', {
  userId： 1， // 标志是谁发布的商品 
  name: '测试商品'，
  faceUrl: [这是一个文件流],
  price: 112,
  description: '这是一个描述'
})

```

10. 修改商品, **需要注意的是，如果某一字段不填，则表示该字段不做修改**

```javascript

put('/lp/v1/goods/:goodsId', {
  userId： 1， // 标志是谁发布的商品 
  name: '测试商品'，
  faceUrl: [这是一个文件流],
  price: 112,
  description: '这是一个描述'
})

```

11. 删除商品
```javascript

delete('/lp/v1/goods/:goodsId')

```

