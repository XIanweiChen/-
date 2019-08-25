可选参数必须放在最后面

静态方法只能调用静态属性

### 配置vscode自动编译ts

1.

```bash
tsc --init
```

2.更改tsconfig.json的输出目录

```json
"outDir": "./js",                        /* Redirect output structure to the directory. */
```

3.

终端—>运行任务—>监视tsconfig.json

### 在react-react-app中使用typescript

刚刚创建:

`npx create-react-app my-app --typescript`

TypeScript 添加到**现有的 Create React App 项目**:

`npm install --save typescript @types/node @types/react @types/react-dom @types/jest1`



### 重载

```js
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

注意，`function pickCard(x): any`并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 `pickCard`会产生错误。





### 抽象类

```ts
abstract class Animal{  //抽象类无法被实例化
    say(){   //可以有正常的方法
        console.log('hello')
    }
    abstract eat():string;   //派生类必须实现这个抽象方法
}
```

