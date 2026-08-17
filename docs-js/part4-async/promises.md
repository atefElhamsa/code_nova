---
sidebar_position: 2
---

# Promises

## 🎯 Learning Objectives
- فهم ما هو الـ Promise وكيف يحل مشكلة الـ Callback Hell.
- حالات الـ Promise (Pending, Fulfilled, Rejected).
- استخدام `then` و `catch`.

---

## 1. ما هو الـ Promise؟

الـ Promise (الوعد) هو كائن في جافاسكريبت يمثل النتيجة المستقبلية لعملية غير متزامنة. تماماً كما تعد شخصاً بشيء ما، إما أن تفي بوعدك (نجاح) أو تخلفه (فشل).

> 💡 **مقارنة بـ Dart:**
> الـ `Promise` في جافاسكريبت هو **نسخة طبق الأصل** من الـ `Future` في لغة Dart! كل ما تعرفه عن الـ `Future` ينطبق هنا.

### حالات الـ Promise:
1. **Pending (قيد الانتظار):** العملية لم تكتمل بعد.
2. **Fulfilled (مكتمل بنجاح):** نجحت العملية وحصلنا على البيانات.
3. **Rejected (مرفوض/فشل):** فشلت العملية (مثل انقطاع الإنترنت).

## 2. إنشاء Promise

ننادراً ما ستكتب وعداً من الصفر، غالباً ستستخدم دوالاً (مثل `fetch`) ترجع لك وعوداً جاهزة. ولكن هكذا يتم بناؤه:

```javascript
const orderFood = new Promise((resolve, reject) => {
  const isAvailable = true;

  setTimeout(() => {
    if (isAvailable) {
      resolve("Pizza is ready!"); // النجاح
    } else {
      reject("Sorry, out of stock."); // الفشل
    }
  }, 2000);
});
```

## 3. التعامل مع الـ Promise

للتعامل مع النتيجة، نستخدم دالة `then()` للنجاح، ودالة `catch()` لمعالجة الأخطاء.

> 💡 **مقارنة بـ Dart:**
> هذا يطابق استخدام `then()` و `catchError()` مع كائنات الـ `Future`.

```javascript
orderFood
  .then((message) => {
    // تتنفذ عند استدعاء resolve
    console.log("Success:", message); 
  })
  .catch((error) => {
    // تتنفذ عند استدعاء reject
    console.error("Error:", error); 
  })
  .finally(() => {
    // تتنفذ دائماً في النهاية (نفس whenComplete في Dart)
    console.log("Operation finished.");
  });
```

### تسلسل الوعود (Promise Chaining)
بفضل الـ Promises، تخلصنا من الـ Callback Hell، حيث يمكننا تسلسل دوال `then` بشكل نظيف:

```javascript
getUser()
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.log("Something went wrong", error));
```

---

## 💻 جرب بنفسك (Hands-on)
1. قم بإنشاء `Promise` يحاكي جلب بيانات مستخدم، ويقوم بعمل `resolve` بعد ثانية واحدة يُرجع كائناً يحتوي على `name` و `id`.
2. استخدم `then` لطباعة اسم المستخدم، و `catch` لطباعة خطأ افتراضي.
3. قم بتغيير الكود الداخلي ليقوم بعمل `reject` ولاحظ عمل الـ `catch`.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الـ <code>Promise</code> في جافاسكريبت يعادل الـ <code>Future</code> في Dart.</li>
    <li>له ثلاث حالات: Pending, Fulfilled, Rejected.</li>
    <li>نستخدم <code>then</code> للحصول على النتيجة، و <code>catch</code> لاصطياد الأخطاء.</li>
  </ul>
</div>
