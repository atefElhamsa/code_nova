---
sidebar_position: 3
---

# Async / Await

## 🎯 Learning Objectives
- استخدام `async` و `await` لكتابة كود غير متزامن يبدو كأنه متزامن.
- التعامل مع الأخطاء باستخدام `try...catch`.

---

## 1. التطور الطبيعي للبرمجة غير المتزامنة

الـ `Promises` حلت مشكلة الـ `Callback Hell`، لكن الكود المليء بـ `.then` لا يزال صعب القراءة أحياناً. لذلك تم إضافة `async/await` في إصدار ES8 لجعل الكود أنظف وأسهل للقراءة.

> 💡 **مقارنة بـ Dart:**
> كلمات `async` و `await` في جافاسكريبت تعمل وتتطابق بشكل تام بنسبة 100% مع نظيراتها في Dart!

## 2. استخدام Async / Await

لجعل الدالة تدعم الانتظار، نضع كلمة `async` قبل تعريفها.
بمجرد فعل ذلك، يمكننا استخدام كلمة `await` بالداخل لإيقاف التنفيذ مؤقتاً حتى يكتمل الـ Promise ويُرجع النتيجة.

```javascript
// دالة تُرجع Promise بعد ثانيتين
function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Ali" });
    }, 2000);
  });
}

// استخدام async / await
async function showUser() {
  console.log("Loading...");
  
  // ينتظر هنا حتى ينتهي الـ Promise ويرجع القيمة
  const user = await fetchUserData(); 
  
  console.log(`Welcome, ${user.name}`);
}

showUser();
```

## 3. التعامل مع الأخطاء (Error Handling)

مع `then/catch` كنا نستخدم `.catch()` لالتقاط الأخطاء. 
بما أن `async/await` تجعل الكود يبدو كأنه متزامن (Synchronous)، فإن أفضل طريقة لاصطياد الأخطاء هي استخدام `try...catch` (تماماً مثل Dart).

```javascript
async function showUserWithErrorHandling() {
  try {
    console.log("Loading...");
    // إذا فشل (Rejected) هذا الـ Promise سينتقل الكود فوراً للـ catch
    const user = await fetchUserData(); 
    console.log(`Welcome, ${user.name}`);
  } catch (error) {
    console.error("Failed to load user data:", error);
  } finally {
    console.log("Hide loading spinner");
  }
}
```

---

## 💻 جرب بنفسك (Hands-on)
1. قم بإنشاء دالة ترجع وعداً `Promise` برقم عشوائي بعد ثانية واحدة.
2. أنشئ دالة سهمية (Arrow Function) تستخدم `async`. مثال: `const getNumber = async () => {...}`.
3. بداخلها، استخدم `await` للحصول على الرقم وطباعته، مع وضع العملية داخل كتلة `try...catch`.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الـ <code>async/await</code> هي طريقة حديثة وأنظف للتعامل مع الـ Promises.</li>
    <li>كلمة <code>await</code> توقف تنفيذ الدالة مؤقتاً حتى يكتمل الوعد (الـ Promise).</li>
    <li>تعمل بشكل متطابق مع طريقة كتابة الكود غير المتزامن في لغة Dart.</li>
    <li>دائماً استخدم <code>try...catch</code> لاصطياد أخطاء الشبكة والعمليات المرفوضة.</li>
  </ul>
</div>
