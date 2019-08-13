### 运行 MongoDB

mongDB数据存储默认路径为`/data/db `

所以要自己新建一个

1、首先我们创建一个数据库存储目录 /data/db：

```
sudo mkdir -p /data/db
```

启动 mongodb，默认数据库目录即为 /data/db：

如果要修改默认路径

```shell
mongod  —dbpath=路径
```



### 连接本地数据库

连接

```shell
mongo
```

退出

```bash
exit
```

### 基本命令

1. `db`：

   显示当前操作的数据库

2. `use 数据库名称`:

   切换到指定数据库（没有会新建）

3. `show dbs`：

   显示所有数据库

4. `show collections`:

   显示集合

5. `db.XXX.find()`:

   显示集合中的键值对

6. 

### 理解

集合—————表

文档—————表记录

