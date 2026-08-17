---
sidebar_position: 2
---

# Template Literals & Modern Operators

## 🎯 Learning Objectives
- استخدام Template Literals لدمج النصوص بشكل أنظف.
- فهم Optional Chaining `?.` لحماية الكود من أخطاء `null`.
- استخدام Nullish Coalescing `??` لتعيين قيم افتراضية.

---

## 1. دمج النصوص (Template Literals)

قديماً، لدمج النصوص والمتغيرات كنا نستخدم علامة `+`، وهو ما كان يجعل الكود الطويل مزعجاً. في ES6، تم تقديم `Template Literals` باستخدام علامة `\`` (Backtick) وعلامة `${}`.

```javascript
const name = "Ahmed";
const age = 30;

// الطريقة القديمة
console.log("My name is " + name + " and I am " + age + " years old.");

// باستخدام Template Literals (الطريقة الحديثة)
console.log(`My name is ${name} and I am ${age} years old.`);
```

> 💡 **مقارنة بـ Dart:**
> هذه الميزة متطابقة تماماً مع طريقة الـ String Interpolation في Dart! (باستثناء أن Dart تستخدم اقتباسات عادية مع علامة `$`).

## 2. المعامل الآمن (Optional Chaining `?.`)

في كثير من الأحيان تحاول قراءة قيمة متداخلة من كائن (Object)، ولكن إذا كانت القيمة الأب غير موجودة (null أو undefined)، سيتوقف تطبيقك بالكامل (Crash).

```javascript
const user = {
  name: "Ali",
  // لا يوجد هنا كائن address
};

// ❌ الطريقة القديمة (Crash! Cannot read properties of undefined)
// console.log(user.address.street); 

// ✅ باستخدام Optional Chaining
console.log(user.address?.street); // يطبع undefined بكل أمان ولا ينهار التطبيق!
```

> 💡 **مقارنة بـ Dart:**
> هذا يطابق تماماً الـ Null-aware operator `?.` في لغة Dart.

## 3. المعامل الافتراضي (Nullish Coalescing `??`)

يُستخدم لإعطاء "قيمة افتراضية" (Fallback Value) إذا كان المتغير الفعلي يحتوي على `null` أو `undefined`.

```javascript
let savedScore = null;

// إذا كانت savedScore فارغة (null/undefined)، ضع 0
let finalScore = savedScore ?? 0;

console.log(finalScore); // 0
```

> ⚠️ **ما الفرق بين `??` و `||`؟**
> المعامل `||` (OR) يعتبر أي قيمة "كاذبة" (Falsy) مثل الصفر أو النص الفارغ وكأنها غير موجودة. 
> أما `??` فهو دقيق جداً: لا يعطي القيمة الافتراضية إلا إذا كان المتغير **معدوماً تماماً** (null أو undefined). وهذا ما يجعله آمناً مع الأرقام (كالرقم 0).

---

## 💻 جرب بنفسك (Hands-on)
1. قم بإنشاء كائن `profile` يحتوي على `username` وقيمة `theme` فارغة `null`.
2. اطبع رسالة ترحيبية باستخدام `Template Literals` (`${}`).
3. استخدم `??` لتعيين اللون الافتراضي `"dark"` إذا لم يكن هناك `theme` في الـ `profile`.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الـ <code>Template Literals</code> تجعل قراءة وكتابة النصوص المدمجة سهلة جداً (تشبه Dart).</li>
    <li>الـ <code>Optional Chaining (?.)</code> يحميك من الأخطاء القاتلة عند البحث في بيانات غير مكتملة.</li>
    <li>الـ <code>Nullish Coalescing (??)</code> هو الخيار الآمن لإعطاء قيم افتراضية بدلاً من معامل <code>||</code>.</li>
  </ul>
</div>
