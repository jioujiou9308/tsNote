"use strict";
// -----------------基本類型------------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Live2_name;
let str = 'wei';
let str1;
str1 = 'wei2';
let num = 1000;
let boo = true;
let n = null;
let un = undefined;
let test = true;
test = 65;
test = 'hi';
// 陣列
let arr = ['a', 'b'];
let arr2 = [['aa', 'bb']];
// 元祖
// 指定陣列中第幾個位置的特定type
let tuple = [1, 'a', true];
let tuple2 = [['a', 'b']];
// -------------------Enum 枚舉-----------------
// ex 開直播api -> 獲取直播狀態
// 成功  失敗 直播中
//  0    -1     1
var LiveStatus;
(function (LiveStatus) {
    LiveStatus[LiveStatus["SUCCESS"] = 0] = "SUCCESS";
    LiveStatus[LiveStatus["FAIL"] = -1] = "FAIL";
    LiveStatus[LiveStatus["LIVER"] = 1] = "LIVER";
})(LiveStatus || (LiveStatus = {}));
const staus = LiveStatus.LIVER;
console.log(staus);
// -------------------Union -----------------
// 可以明確的標示出我變數可以存在的類別
let aaa;
aaa = 6516;
aaa = 'hellow';
let a1;
a1 = 999;
a1 = 'word';
let b1;
b1 = true;
b1 = 'word';
const obj = {
    name: 'wei',
    desc: '...'
};
const obj2 = {
    name: 'steve',
    desc: '...'
    // age:25
};
// ----------------function---------------------
// 參數
// 這樣很明顯我們回傳的就是string
function hello(a, b) {
    return a + b;
}
function hello2(a, b) {
    console.log(a, b);
    return 999;
}
function hello3(a, b, c) {
    return 100;
}
// undefined
// ? 的屬性要放在最後面
// 因為age 的參數是可傳也可以不傳入，傳入就會是number類型，不傳入就會undefined類型
// 所以當我們寫成以下範例的時候就會報錯
function hello4(name, age) {
    let a;
    // a = age // age為 number | undefined 不可指派特定類型
}
// 解決方法就是下一個判斷式
// 這個就是typescript的好處，如果是寫javascript的話就如果沒注意到，可能在運行的時候就會出錯，但typescript會先行告訴你哪裡有問題
function test2(a) {
    console.log(a);
}
function hello5(name, age) {
    if (age === undefined)
        return -1;
    test2(age);
    return;
}
// 箭頭函式
// 會自動推導出什麼類型
// 推導出為void類型
const func = () => {
};
// 有血return typescript 會自動推導出為數字類型
const func2 = () => {
    return 1;
};
function getDate() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
        // 回傳拿到的data資料 應該要長成Data裡面的樣子
        const data = yield res.json();
    });
}
// 設定一個data1 類行為Data
const data1 = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
};
// 假設data1是動態的，我們告訴typescript 不用去推導了，照我們寫的類型對照就可以
// 先將資料ad unknown 再變成我們想要的類型
// beta = data1一開始就會推導為Data的類型
const beta = data1;
// -------------------------class--------------------------------
// 成員
// private 私有
// public 公開
// protected 受保護
// 1. 雖然在typescript裡面寫了private & protected但並不會影響js的內容，打開f12還是看得到roomName,id,name 的值
// 2. private 在typescript中是無法使用的 ，如果console.log(live.id)就會報錯，但是console.log(live)卻可以看到三個屬性的值
// 3. prtected & privated 在外部(使用new的情況下)，是無法被訪問的值
// 4. protected : 只有在本身的class或是被繼承的class內才可使用
// 5. private : 只有在本身自己的class 內才可以使用(this.id) 
// 6. 只有在開發的時候才會用到成員的特性
class Live {
    constructor(roomName1, id1, name1) {
        console.log('建立直播中');
        this.roomName = roomName1;
        this.id = id1;
        this.name = name1;
    }
    start() {
        // 只有在本身的class 才能使用privare的值
        this.id;
        this.name;
    }
}
class CarLive extends Live {
    constructor(roomName1, id1, name1) {
        super(roomName1, id1, name1);
    }
    start() {
        super.roomName;
        // name雖然是被保護但是在class的繼承中還是可以被訪問
        super.name;
        // super.id //無法被訪問
    }
}
// 外面
const live = new Live('食物直播', '0001', 'Chen-Wei');
// 編譯後打開f12還是看的到roomName,id,name的值
// console.log(live);// roomName1:'食物直播' , id1:'0001', name1:'Chen-Wei'
// console.log(live.id);//無法訪問的值
// 外面
const carLive = new CarLive('car room', '0002', 'Steve-Huang');
// console.log(carLive.name);//name受保護也無法使用
// javascript 原生私有變數
// 只有這種方式才能真正的隱藏起來
class Live2 {
    constructor(name) {
        // 私有的變數
        _Live2_name.set(this, void 0);
        __classPrivateFieldSet(this, _Live2_name, name, "f");
    }
}
_Live2_name = new WeakMap();
const live2 = new Live2('live2');
console.log(live2);
// 建立了一個interface也要在class中再將其輸入一次
// 且class 中不可以private的成員存在
class Car {
    constructor(name, age) {
        this.name = name,
            this.age = age;
    }
    start() { }
}
// --------------泛型--------------
// 假設有一個function hello3 (a: number, b: boolean, c: string){
//     return 100
// }
// 想將b屬性設定除了boolean同時也要有number類型，是可以在創建一個function使其b:number 但這非常沒有效率，所以就有了泛型的應用
function print(data) {
    console.log('data', data);
}
print(9999);
print('Wei');
print(true);
class Print {
    constructor(d) {
        this.data = d;
    }
}
const p = new Print(999);
const p1 = new Print('Wei');
console.log('p', p);
console.log('p1', p1);
// 自己定義key 和 value 應該要有什麼樣的內容
// key
// value
const cats = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};
const todo = {
    title: "Clean room",
    completed: false,
};
const todoOmit = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};
console.log(todoOmit);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0NBQW9DOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVwQyxJQUFJLEdBQUcsR0FBVSxLQUFLLENBQUE7QUFDdEIsSUFBSSxJQUFXLENBQUM7QUFDaEIsSUFBSSxHQUFHLE1BQU0sQ0FBQTtBQUViLElBQUksR0FBRyxHQUFTLElBQUksQ0FBQTtBQUNwQixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUE7QUFDdEIsSUFBSSxDQUFDLEdBQVEsSUFBSSxDQUFBO0FBQ2pCLElBQUksRUFBRSxHQUFhLFNBQVMsQ0FBQTtBQUU1QixJQUFJLElBQUksR0FBTyxJQUFJLENBQUE7QUFDbkIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNULElBQUksR0FBRyxJQUFJLENBQUE7QUFFWCxLQUFLO0FBQ0wsSUFBSSxHQUFHLEdBQVksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUE7QUFDNUIsSUFBSSxJQUFJLEdBQWMsQ0FBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBRW5DLEtBQUs7QUFDTCxvQkFBb0I7QUFDcEIsSUFBSSxLQUFLLEdBQTJCLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQTtBQUNqRCxJQUFJLE1BQU0sR0FBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBRXhDLDhDQUE4QztBQUU5QyxzQkFBc0I7QUFDdEIsYUFBYTtBQUNiLGlCQUFpQjtBQUVqQixJQUFLLFVBSUo7QUFKRCxXQUFLLFVBQVU7SUFDWCxpREFBVyxDQUFBO0lBQ1gsNENBQVMsQ0FBQTtJQUNULDZDQUFPLENBQUE7QUFDWCxDQUFDLEVBSkksVUFBVSxLQUFWLFVBQVUsUUFJZDtBQUVELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7QUFDOUIsT0FBTyxDQUFDLEdBQUcs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