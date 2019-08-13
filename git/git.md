https://www.liaoxuefeng.com/wiki/896043488029600



### 集中式vs分布式

SVN是集中式版本控制系统，版本库是集中放在中央服务器的，而干活的时候，用的都是自己的电脑，所以首先要从中央服务器哪里得到最新的版本，然后干活，干完后，需要把自己做完的活推送到中央服务器。集中式版本控制系统是必须联网才能工作，如果在局域网还可以，带宽够大，速度够快，如果在互联网下，如果网速慢的话，就纳闷了。

Git是分布式版本控制系统，那么它就没有中央服务器的，每个人的电脑就是一个完整的版本库，这样，工作的时候就不需要联网了，因为版本都是在自己的电脑上。既然每个人的电脑都有一个完整的版本库，那多个人如何协作呢？比如说自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了(分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已)

### git init` :

#### 初始化一个本地仓库

#### 添加文件到Git仓库，分两步：

1. 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
2. 使用命令`git commit -m <message>`，完成。

### `git status`:

#### 如果没有文件修改时：

```
On branch master
nothing to commit, working tree clean
```

#### 有文件修改时：

###### 修改在工作区

```js
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   src/index.js

no changes added to commit (use "git add" and/or "git commit -a")
```

###### 修改在暂存区（已经add）

```js
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   src/index.js

```



### `git diff`:

查看文件的改变内容

用`git diff HEAD `命令可以查看工作区和版本库里面最新版本的区别



### `git log`

查看各种版本

```bash
chenxianweideMacBook-Pro:redux-demo knj$ git log
commit bdf4ff61f355ce2a6b3c208d179291217384a98e (HEAD -> master)
Author: XianWei Chen <cxw63377312@gmail.com>
Date:   Mon Aug 12 10:53:31 2019 +0800

    test commit

commit 8bb54084b49a4ebbd64f717372285b16387d04e3
Author: XianWei Chen <cxw63377312@gmail.com>
Date:   Mon Aug 12 10:36:47 2019 +0800

    save before redux use in react
```

如果嫌输出信息太多，看得眼花缭乱的，可以试试加上`--pretty=oneline`参数



###  `git reset`

#### 回到上一版本

```bash
 git reset --hard HEAD^
```

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的`HEAD`指针，当你回退版本的时候，Git仅仅是把HEAD从指向`append GPL`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   └──> ○ append GPL
        │
        ○ add distributed
        │
        ○ wrote a readme file
```

改为指向`add distributed`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   │    ○ append GPL
   │    │
   └──> ○ add distributed
        │
        ○ wrote a readme file
```

#### 返回新版本

git reset --hard 版本号 

### `git reflog`

查看命令历史，以便确定要回到未来的哪个版本

### 工作区和暂存区

所以，`git add`命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行`git commit`就可以一次性把暂存区的所有修改提交到分支。

![git-stage](https://www.liaoxuefeng.com/files/attachments/919020074026336/0)



一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的

![git-stage-after-commit](https://www.liaoxuefeng.com/files/attachments/919020100829536/0)



### 撤销修改

#### 丢弃工作区的修改

`git checkout -- file`可以丢弃工作区的修改

`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到`git checkout`命令。

#### 丢弃暂存区的修改

   git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage）



### 创建与合并分支

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点



首先，我们创建`dev`分支，然后切换到`dev`分支：

```bash
$ git checkout -b dev
Switched to a new branch 'dev'
```

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

```bash
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```

`git branch`命令查看当前分支

`git merge`命令用于合并指定分支到当前分支

合并完成后，就可以放心地删除`dev`分支了



#### 小结

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`