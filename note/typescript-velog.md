# **TypeScript**

타입스크립트는 기존의 자바스크립트에서 문제가 되었던 타입을 제대로 표기해주는 식으로 사용할 수 있다. `Type` 표기의 종류는 다음과 같다.

### **기본 자료형**

- `string`
- `boolean`
- `number`
- `null: 값이 의도적으로 비어 있는 상태`
- `undefined: 아무 값이 할당되지 않은 상태`
- `symbol: ES6에서 추가된 문법`

다른 언어를 많이 접하다보니 이러한 타입에 대해서 익숙하긴 하다. 임의의 코드를 만들어 예시를 들어보겠다.

```js
// js
function f1(val) {
  result = 1;
  return result + val;
}

console.log(f1("1")); // 결과값: 11
console.log(f1(1)); // 결과값: 2
```

다음과 같은 코드를 작성하게 되면 들어가는 `value`의 자료형에 따라 결과값을 다른 형태로 배출하게 되는 모습을 볼 수 있다. 의도적으로 이렇게 만들수도 있지만, 정확한 디버깅이나 가독성 및 유지보수를 위해서는 타입을 지정하는 형식으로 사용한다.

```ts
// ts
function f1(val: number): number {
  result = 1;
  return result + val;
}

console.log(f1("1")); // 결과값: error
console.log(f1(1)); // 결과값: 2
```

위와 같은 방법으로 작성하게 되면 나타날 수 있는 오류를 방지할 수 있다는 장점이 있다. 추가적으로 메모리에 값을 주소로 저장하고, 출력 시 메모리 주소와 일치하는 값을 출력하는 참조 자료형과 개발자의 편의를 위해 추가로 제공하는 자료형들 또한 더 있다.

### 참조 자료형

- `object`
- `array`
- `function`

### 추가 제공 자료형

- `tuple: 길이와 각 요소의 타입이 정해진 배열을 저장하는 타입`
- `enum: 특정 값의 집합을 저장하는 타입`
- `any, void, never`

```ts
let arr: [string, number] = ["Hi", 6];

enum Car {
  BUS = 1,
  TAXI = 2,
  SUBWAY = 3,
}

let bus: Car = Car.BUS; // 인덱스 번호로도 접근 가능
let subway: string = Car[3];
```

## Utility Types

사실 이 개념을 많이 안써봐서 직관적으로 어떻게 써야겠다라는 감이 안오기는 하지만, 우선 각 타입이 어떠한 것을 의미하는지는 알아두면 좋을 것 같아서 이에 관해서 정리해두고 나중에 시도해보려고 한다.

- Partial<T>
  - 프로퍼티를 선택적으로 만드는 타입을 구성
  - 주어진 타입의 모든 하위 타입 집합을 나타내는 타입을 반환
  - T에 `interface`가 들어가면 인터페이스 내의 값을 선택적으로 사용할 수 있음
- `Readonly<T>`
  - 프로퍼티를 읽기 전용으로 설정한 타입
- `Record<T>`
  - 프로퍼티의 집합 K로 타입을 구성
  - 타입의 프로퍼티들을 다른 타입에 매핑시키는 데 사용
- `Pick<T, K>`
  - 프로퍼티 K의 집합을 선택해 타입을 구성한다.
- `Omit<T, K>`
  - 모든 프로퍼티를 선택한 다음 K를 제거한 타입을 구성한다.
- `Exclude<T, U>`
  - T에서 U에 할당할 수 있는 모든 속성을 제외한 타입을 구성
- `Extract<T, U>`
  - T에서 U에 할당 할 수 있는 모든 속성을 추출하여 타입을 구성한다.
- `NonNullable<T>`
  - null과 undefined를 제외한 타입
- `Parameters<T>`
  - 함수 타입 T의 매개변수 타입들의 튜플 타입을 구성한다.
- `ConstructorParameters<T>`
  - 생성자 함수 타입의 모든 매개변수 타입을 추출
  - 모든 매개변수 타입을 가지는 튜플 타입을 생성한다
- `ReturnType<T>`
  - 함수 T의 반환 타입으로 구성된 타입을 생성
- `Required<T>`
  - T의 모든 프로퍼티가 필수로 설정된 타입을 구성

```ts
// 실사용 예제

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;
type TodoPreview = Pick<Todo, "title">;

const todo: TodoPreview = {
  title: "Go to the market",
  completed: false,
};

const todo: TodoPreview = {
  title: "Wash face",
};
```

## **TypeScript의 함수 사용**

자바스크립트와 타입스크립트의 함수는 일급 객체이다. 일급 객체의 조건은 다음과 같다.

- 다른 함수에 매개변수로 제공할 수 있다.
- 함수에서 반환 가능하다.
- 변수에 할당 가능하다.

타입스크립트 함수 작성 시 반환 타입을 추론하도록 하는 것을 권장하고, 함수의 매개 변수와 인수의 타입이 호환 가능하게 작성하여야 하며, 인수의 타입을 잘못 전달하면 에러가 발생하도록 해야 한다.

```ts
// 선택적 매개변수
function f1(val1: number, val2?: number): number {
  if (val2) return val1 + val2;
  else return val1;
}

f1(2, 3); // 5
f1(2); // 2
```

위와 같은 형식으로 사용한다면 두 번째 인자를 받든 안받든 간에 그에 따른 결과를 출력할 수 있다.

## OOP - 객체 지향 프로그래밍

정보처리기사를 준비하면서 봐왔던 객체 지향 프로그래밍에 대한 개념과 거의 유사했다. 객체들은 서로 메세지를 주고 받을 수 있으며, 데이터를 처리할 수 있다는 특징을 가진다.

### 클래스의 요소

- 멤버
- 필드
- 생성자
- 메소드

`public, private`와 같은 키워드들로 명시적 타입 표시가 가능하다.
