---
sidebar_position: 3
---

# The `this` Keyword

## 🎯 Learning Objectives
- فهم الكلمة المفتاحية `this` في جافاسكريبت والتي تعتبر من أعقد المفاهيم للمبتدئين.
- معرفة الاختلاف الجوهري بين `this` في Dart وفي JavaScript.
- حل مشاكل الـ Scope باستخدام الدوال السهمية (Arrow Functions).

---

## 1. المشكلة (The Problem with `this`)

في لغة Dart ومُعظم اللغات المعتمدة على الـ Classes (Java, C#)، كلمة `this` تشير دائماً وابداً إلى الـ Instance (الكائن الحالي) بغض النظر عن المكان الذي يتم استدعاء الدالة منه.

أما في **جافاسكريبت**، قيمة `this` **تتغير بناءً على كيفية استدعاء الدالة!** (يُطلق على هذا اسم `Execution Context`).

### مثال يوضح المشكلة
```javascript
const user = {
  name: "Ali",
  printName: function() {
    console.log(this.name);
  }
};

// هنا تعمل بشكل سليم
user.printName(); // Ali

// لكن ماذا لو خزنّا الدالة في متغير وقمنا باستدعائها لاحقاً؟
const detachedFunction = user.printName;

// هنا ستفشل! لأن this فقدت ارتباطها بكائن الـ user
detachedFunction(); // Output: undefined
```

---

## 2. السلوك الافتراضي لـ `this`

- **داخل Object Method:** تشير `this` إلى الكائن (Object) نفسه.
- **داخل دالة عادية (Function Declaration):** تشير `this` إلى المتصفح (الكائن العام `window`)، وفي وضع الـ Strict Mode تكون `undefined`.
- **داخل Event Listener:** تشير `this` إلى عنصر הـ DOM الذي تم الضغط عليه.

## 3. الحل: الدوال السهمية (Arrow Functions)

الدوال السهمية ليس لها `this` خاص بها (Lexical `this`)، بل ترث قيمة `this` من النطاق (Scope) المحيط بها مباشرة لحظة كتابتها، وهو تماماً السلوك الذي يتوقعه مطورو Dart!

### مثال للمشكلة والحل مع `setTimeout`:

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  // ❌ الطريقة الخاطئة باستخدام دالة عادية
  startBad() {
    setTimeout(function() {
      // this هنا تشير لكائن المتصفح Window وليست كلاس Counter!
      this.count++; 
      console.log("Bad:", this.count); // NaN
    }, 1000);
  }

  // ✅ الطريقة الصحيحة باستخدام Arrow Function
  startGood() {
    setTimeout(() => {
      // Arrow Function لا تملك this، فتأخذ this من الدالة الأب (startGood)
      this.count++;
      console.log("Good:", this.count); // 1
    }, 1000);
  }
}

const myCounter = new Counter();
myCounter.startBad();
myCounter.startGood();
```

---

## 💻 جرب بنفسك (Hands-on)
1. أنشئ كائناً يمتلك مصفوفة من الأسماء `names` ودالة `printAll`.
2. داخل `printAll`، استخدم `this.names.forEach(...)` لطباعة الأسماء مع إضافة كلمة معينة قبلهم مخزنة في الكائن `this.prefix`.
3. جرب تمرير `function` عادية داخل الـ `forEach` ولاحظ كيف ستفقد الـ `this`.
4. غيّرها إلى `Arrow Function` ولاحظ أن المشكلة انحلت.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>كلمة <code>this</code> في جافاسكريبت لا ترتبط دائماً بالكائن، بل بطريقة <strong>استدعاء</strong> الدالة.</li>
    <li>الدوال السهمية <code>Arrow Functions</code> هي أفضل صديق لك إذا كنت تريد الحفاظ على قيمة <code>this</code> لأنها لا تملك <code>this</code> خاصاً بها وتأخذه من البيئة المحيطة.</li>
    <li>هذا هو الاختلاف الأكبر الذي يربك مطوري Dart عند كتابة جافاسكريبت. تذكر دائماً استخدام الـ Arrow Functions في الـ Callbacks لتجنب ضياع الـ context.</li>
  </ul>
</div>
