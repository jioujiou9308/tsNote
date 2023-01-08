// -----------------基本類型------------

let str:string = 'wei'
let str1:string;
str1 = 'wei2'

let num:number= 1000
let boo:boolean = true
let n:null = null
let un:undefined = undefined

let test:any = true
test = 65
test = 'hi'

// 陣列
let arr:string[] = ['a','b']
let arr2:string[][] = [['aa','bb']]

// 元祖
// 指定陣列中第幾個位置的特定type
let tuple:[number,string,boolean] = [1, 'a',true]
let tuple2:[string,string][]=[['a','b']]

// -------------------Enum 枚舉-----------------

// ex 開直播api -> 獲取直播狀態
// 成功  失敗 直播中
//  0    -1     1

enum LiveStatus {
    SUCCESS = 0,
    FAIL = -1,
    LIVER=1,
}

const staus = LiveStatus.LIVER
console.log(staus);

// -------------------Union -----------------

// 可以明確的標示出我變數可以存在的類別
let aaa: number | string 
aaa = 6516
aaa = 'hellow'

// -------------------type -----------------

// 可以自訂規則已union的方式
type A = number | string
type B = boolean |string

let a1:A 
a1 = 999
a1 = 'word'

let b1:B
b1 = true
b1 = 'word'

// -------------------interface ---------------

interface test {
    name:string,
    age:number,
}

// -------------------object  (type vs interface)-------------
// 1. type 是不能擴充的，不能使用type 再重複宣告同一個 
// 2. interface 是可以在而外多寫，可以擴充的
// 3. interface 的屬性後面可以加入 ? ，代表這個個是可用或不用，不會是必要的
type Card = {
    name:string,
    desc:string
}

interface Card2 {
    name:string,
    desc:string
}
interface Card2{
    age?:number
}

const obj:Card = {
    name:'wei',
    desc:'...'
}

const obj2:Card2 = {
    name:'steve',
    desc:'...'
    // age:25
}

// ----------------function---------------------

// 參數
// 這樣很明顯我們回傳的就是string
function hello(a:string,b:string){
    return a+b
}

function hello2(a:string,b:string):number{
    console.log(a,b);
    return 999
}

function hello3 (a: number, b: boolean, c: string){
    return 100
}

// undefined


// ? 的屬性要放在最後面
// 因為age 的參數是可傳也可以不傳入，傳入就會是number類型，不傳入就會undefined類型
// 所以當我們寫成以下範例的時候就會報錯

function hello4 (name: string, age?: number){
    let a: number
    // a = age // age為 number | undefined 不可指派特定類型
}

// 解決方法就是下一個判斷式
// 這個就是typescript的好處，如果是寫javascript的話就如果沒注意到，可能在運行的時候就會出錯，但typescript會先行告訴你哪裡有問題
function test2(a:number){
    console.log(a);
}
function hello5 (name: string, age?: number) {
    if(age === undefined) return -1
    test2(age)
    return
}

// 箭頭函式
// 會自動推導出什麼類型

// 推導出為void類型
const func = () => {

}

// 有血return typescript 會自動推導出為數字類型
const func2 = () => {
    return 1
}

// -------------斷言  unknown----------------------

// 主要是用在接 api 的資料時，因為沒辦法判斷回傳回來的是什麼類型，所以要用此方式
// 用一個假的api來測試 https://jsonplaceholder.typicode.com/
// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }

type Data = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }

async function getDate(){
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    // 回傳拿到的data資料 應該要長成Data裡面的樣子
    const data = await res.json() as Data
}

// 設定一個data1 類行為Data
const data1: Data =  {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      }

type Beta = {
    name:string
}

// 假設data1是動態的，我們告訴typescript 不用去推導了，照我們寫的類型對照就可以
// 先將資料ad unknown 再變成我們想要的類型

// beta = data1一開始就會推導為Data的類型
const beta = data1 as unknown as Beta

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
    roomName: string
    private id: string
    protected name: string
    
    constructor(roomName1:string , id1:string,name1:string){
        console.log('建立直播中');
        this.roomName = roomName1
        this.id = id1
        this.name = name1
    }
    start(){
        // 只有在本身的class 才能使用privare的值
        this.id
        this.name
    }
}

class CarLive extends Live{
    constructor(roomName1:string , id1:string, name1:string){
        super(roomName1,id1,name1)
    }

    start(){
        super.roomName
        // name雖然是被保護但是在class的繼承中還是可以被訪問
        super.name
        // super.id //無法被訪問
    }
    
}

// 外面
const live = new Live('食物直播','0001','Chen-Wei')
// 編譯後打開f12還是看的到roomName,id,name的值
// console.log(live);// roomName1:'食物直播' , id1:'0001', name1:'Chen-Wei'
// console.log(live.id);//無法訪問的值

// 外面
const carLive = new CarLive('car room', '0002','Steve-Huang')
// console.log(carLive.name);//name受保護也無法使用


// javascript 原生私有變數
// 只有這種方式才能真正的隱藏起來
class Live2{
    // 私有的變數
    #name
    constructor(name:string){
        this.#name = name
    }
}
const live2 = new Live2('live2')
console.log(live2);
// console.log(live2.#name);

// ---------------使用interface 實作 class

// 是可以被export出去也可以被引用的
interface CarProps {
    name:string,
    age:number,
    start:()=> void

}
// 建立了一個interface也要在class中再將其輸入一次
// 且class 中不可以private的成員存在
class Car implements CarProps {
    name:string
    age:number

    constructor(name:string,age:number){
        this.name = name,
        this.age = age
    }
    start(){}
}


// --------------泛型--------------

// 假設有一個function hello3 (a: number, b: boolean, c: string){
//     return 100
// }
// 想將b屬性設定除了boolean同時也要有number類型，是可以在創建一個function使其b:number 但這非常沒有效率，所以就有了泛型的應用

function print<T> (data:T){
    console.log('data',data);
}

print<number>(9999)
print<string>('Wei')
print<boolean>(true)

class Print<T>{
    data:T
    constructor(d:T){
        this.data = d
    }
}
const p = new Print<number>(999)
const p1 = new Print<string>('Wei')
console.log('p',p);
console.log('p1',p1);

// -------------------utility----------------
// 已經寫好的可以直接拿來用

//      Record
interface CatInfo {
    age: number;
    breed: string;
  }
  type CatName = "miffy" | "boris" | "mordred";
// 自己定義key 和 value 應該要有什麼樣的內容
// key
// value
  const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
  };
    

//      Pick 選擇
// 如果這個Todo 是可以被重複共用的，只需要挑選裡面其特定屬性，不需要全部就可以使用pick，製作出全新的type

interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
  type TodoPreview = Pick<Todo, "title" | "completed">;
   
  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };


//         Omit 過濾
interface TodoOmit {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
  }
   
  type TodoPreviewOmit = Omit<TodoOmit, "description">;
   
  const todoOmit: TodoPreviewOmit = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
  };
  console.log(todoOmit);
  
   
