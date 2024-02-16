# [시:작](https://i10b310.p.ssafy.io/app)
## 시점으로 보는 작품

## 팀 컨벤션


## Git 커밋 컨벤션

- 커밋 유형은 영어 대문자로 작성하기
    
    
    | 커밋 유형 | 의미 |
    | --- | --- |
    | Feat | 새로운 기능 추가 |
    | Fix | 버그 수정 |
    | Docs | 문서 수정 |
    | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
    | Refactor | 코드 리팩토링 |
    | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
    | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
    | Design | CSS 등 사용자 UI 디자인 변경 |
    | Comment | 필요한 주석 추가 및 변경 |
    | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
    | Remove | 파일을 삭제하는 작업만 수행한 경우 |
    | !BREAKING CHANGE | 커다란 API 변경의 경우 |
    | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

### 4. 제목은 영문 기준 50자 이내로 할 것

### 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

### 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

```
- 변경 내용 1
- 변경 내용 2
- 변경 내용 3
```

</aside>

### 🖤 규칙에 맞는 좋은 커밋메시지를 작성해야 하는 이유

- 팀원과의 소통
- 편리하게 과거 추적 가능
- 나중에 실무에서 익숙해지기 위해


### 🖤 한 커밋에는 한 가지 문제만!

- 추적 가능하게 유지해주기
- 너무 많은 문제를 한 커밋에 담으면 추적하기 어렵다.

### 🖤 CLI에서 커밋 메시지 여러 줄로 작성하는 방법

<aside>
✅ **쌍따옴표를 닫지 말고 개행하며 작성 → 다 작성한 후에 쌍따옴표를 닫으면 작성 완료**

```bash
git commit -m "FEAT: 회원가입 기능 추가

- 회원가입 기능 추가"
```

</aside>


## Java 코드 컨벤션

<aside>
<img src="https://cdn-icons-png.flaticon.com/512/7350/7350737.png" alt="https://cdn-icons-png.flaticon.com/512/7350/7350737.png" width="40px" />

**식별자에는 영문/숫자/언더스코어만 허용합니다.**

</aside>

<aside>

🅰️ **식별자의 이름을 한국어 발음대로 영어로 옮겨 표기하지 않는다.**

```java
1. 나쁜 예: kirin(기린)
2. 좋은 예: giraffe(기린)
```

</aside>

<aside>

🐫 **함수명, 변수명은 카멜케이스로 작성합니다.**

</aside>

<aside>

☝🏻 **가독성을 위해 한 줄에 하나의 문장만 작성합니다.**

</aside>

<aside>

<img src="https://cdn-icons-png.flaticon.com/512/3602/3602241.png" alt="https://cdn-icons-png.flaticon.com/512/3602/3602241.png" width="40px" /> 테스트 클래스는 “TEST”로 끝낸다.

```java
public class ValidatorTest{
	//blrblr
}
```

</aside>

<aside>

<img src="https://cdn-icons-png.flaticon.com/512/3978/3978575.png" alt="https://cdn-icons-png.flaticon.com/512/3978/3978575.png" width="40px" /> **연산자 사이에는 공백을 추가하여 가독성을 높입니다.**

```jsx
a + b + c + d; // bad
a + b + c + d; // good
```

</aside>

<aside>
☝🏻  메서드의 선언이 끝난 후 다음 메서드 선언이 시작되기 전에 빈줄을 삽입한다.

```java
public void setId(int id) {
    this.id = id;
}

public void setName(String name) {
    this.name = name;
}
```

</aside>

<aside>
🔠 클래스/메서드/멤버변수의 제한자는 Java Language Specification에서 명시한 아래의 순서대로 쓴다.

```java
public
protected
private
abstract
static
final
transient
volatile
synchronized
native
strictfp
```

</aside>

<aside>
☝🏻 조건문, 반복문에 중괄호를 필수로 사용한다.

```java
- 나쁜 예
if (exp == null) return false;

for (char ch : exp.toCharArray()) if (ch == 0) return false;

- 좋은 예
if (exp == null) {
    return false;
}

for (char ch : exp.toCharArray()) {
    if (ch == 0) {
        return false;
    }
}
```

</aside>

---

### ☑️ 코드 컨벤션이 필요한 이유

- 팀원끼리 코드를 공유하기 때문에 일관성있는 코드를 작성하면 서로 이해하기 쉽다.

### 참고

[자바 코딩 컨벤션(Java Code Conventions)](https://hstory0208.tistory.com/entry/Java자바-코딩-컨벤션Code-Conventions)

<br/>

## **React 코드 컨벤션**

### **1. NAMING CONVENTIONS**

1. components 이름은 **`Pascal case`**로 작성해라.
2. Non-components 이름, 속성명, inline 스타일은 **`Camel case`**로 작성해라.
3. 상수는 영문 대문자 스네이크 표기법(Snake case)를 사용.

### **2. BUG AVOIDANCE**

1. **`null`** 또는 **`undefined`**일 수 있는 값은 optional chaining 연산자 (?.)를 사용한다.
2. side-effects를 피하기 위해 외부 데이터를 props로 받아서 사용한다.
3. console.log()를 모두 지운다.
4. props는 읽기 전용으로 사용하며, 직접 수정하지 않는다.

### **3. ARCHITECTURE & CLEAN CODE**

1. JS, test, css로 파일을 분리한다.
2. 하나의 파일에 하나의 React component만 만든다.
3. 가능하다면 컴포넌트 안에서 함수를 생성하지 않는다.
4. 부모 컴포넌트가 아닌 다른 컴포넌트의 함수를 사용하지 않는다. (의존성 역전을 피한다.)
5. 불필요한 주석을 사용하지 않는다.
6. 현재 화면보다 긴 코드는 더 작은 단위의 코드로 리팩토링 한다.
7. 주석 처리된 코드는 커밋하지 말고 삭제한다.

### **4. ES6**

1. spread 연산자를 사용한다.
2. 구조 분해 할당을 사용한다.
3. let과 const만 사용한다. (var 사용금지)
4. 되도록 화살표 함수를 사용한다.
5. 직접 null을 체크하기 보다 optional chaining 연산자 (?.)를 사용한다.

### **6. CSS**

1. inline css를 사용하지 않는다.


## 팀원

| 📌 **유재건 (👑팀장)**                 | 📌 **강건**                                                    | 📌 **권수지**                                |
| -------------------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| <img src="./img/유재건.jpg" width=100> | <img src="./img/강건.jpg" width=100>                           | <img src="./img/권수지.jpg" width=100>       |
| 백엔드                                 | 백엔드                                                         | 프론트엔드                                   |
| yjk9805@naver.com                                 | gun4329@gmail.com                                              | gkdrhd6788@gmail.com                         |
| [yjk9805@naver.com](https://github.com/JaegeonYu)           | [kanggeonnim](https://github.com/kanggeonnim) | [gkdrhd6788](https://github.com/gkdrhd6788/) |
| 왜 ? 항상 생각하기                          | 1 등 하 자!                                                    | 겸손히 배우겠습니다.                         |

| 📌 **심지연**                                     | 📌 **우재하**                               | 📌 **임서정**                           |
| ------------------------------------------------- | ------------------------------------------- | --------------------------------------- |
| <img src="./img/심지연.jpg" width=100>            | <img src="./img/우재하.jpg" width=100>      | <img src="./img/임서정.jpeg" width=100> |
| 백엔드                                            | 프론트엔드                                  | 프론트엔드                              |
| sim.yyeon@gmail.com                               | questional777@gmail.com                     | sjytis14@gmail.com                      |
| [inthedownpour](https://github.com/inthedownpour) | [fleemarket](https://github.com/fleemarket) | [sjytis14](https://github.com/sjytis14) |
| 기술에 기죽지 말자!                               | 열심히 살겠습니다                           | 사용자 중심에서 생각하기                          |

<br/>
