---
sidebar_position: 2
---

# Events & Event Listeners

## 🎯 Learning Objectives
- فهم كيفية التفاعل مع المستخدم عبر الأحداث (Events).
- إضافة مستمعات الأحداث `addEventListener`.
- تمرير دالة كـ Callback للتفاعل مع الحدث.

---

## 1. ما هي الأحداث (Events)؟

الحدث هو أي شيء يفعله المستخدم على الصفحة: الضغط على زر (Click)، تمرير الفأرة (Hover)، الكتابة في حقل نصي (Typing)، أو حتى التمرير (Scrolling).

> 💡 **مقارنة بـ Dart/Flutter:**
> الحدث `click` في المتصفح يعادل استخدام `GestureDetector` أو `onPressed` الخاصة بالأزرار في Flutter!

## 2. إضافة مستمع للحدث (Event Listener)

لكي نجعل جافاسكريبت تستجيب لحدث معين، يجب أن "نستمع" له باستخدام دالة `addEventListener`.

### الصيغة العامة:
```javascript
element.addEventListener('نوع الحدث', دالة الرد (Callback));
```

### مثال: الضغط على زر
```javascript
const btn = document.querySelector("#submit-btn");

btn.addEventListener("click", () => {
  console.log("Button was clicked!");
  btn.textContent = "Clicked!"; // تغيير النص بعد الضغط
});
```

## 3. كائن الحدث (The Event Object)

دالة الرد (Callback) التي نمررها، يمكنها استقبال "معامل" افتراضي، نرمز له غالباً بـ `e` أو `event`. 
هذا الكائن يحتوي على جميع التفاصيل حول الحدث الذي وقع!

```javascript
const inputField = document.querySelector("#username-input");

// الاستماع لحدث الكتابة (كلما ضغط المستخدم على زر في الكيبورد)
inputField.addEventListener("input", (e) => {
  // e.target يشير للعنصر الذي وقع عليه الحدث (الـ input)
  // .value تجلب النص المكتوب بداخله
  console.log("User is typing:", e.target.value);
});
```

> 💡 **مقارنة بـ Dart:** في Flutter، الدالة المُمررة لـ `onChanged` في حقل النص `TextField` تستقبل قيمة الـ `String` المكتوبة. في جافاسكريبت نصل إليها عبر كائن الحدث `e.target.value`.

### إيقاف السلوك الافتراضي (Prevent Default)
أحياناً نريد منع المتصفح من القيام بردة فعله الافتراضية. على سبيل المثال، إرسال الـ Form يؤدي لتحديث الصفحة. لمنع ذلك:

```javascript
const form = document.querySelector("#login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // إيقاف تحديث الصفحة!
  console.log("Form submitted via JS!");
});
```

---

## 💻 جرب بنفسك (Hands-on)
1. في ملف HTML، أضف زراً `<button id="my-btn">Click Me</button>`.
2. في ملف جافاسكريبت، امسك الزر عبر `querySelector`.
3. أضف `addEventListener` لنوع `click`.
4. اجعل الدالة تقوم بتغيير لون خلفية الصفحة بالكامل (يمكن الوصول إليها عبر `document.body.style.backgroundColor`).

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>نستخدم <code>addEventListener</code> لربط الأكواد بأفعال المستخدم (Clicks, Keypresses...).</li>
    <li>كائن الحدث <code>e</code> مفيد جداً لمعرفة تفاصيل الحدث (مثل ما الزر الذي تم ضغطه، أو ما النص المكتوب).</li>
    <li>استخدم <code>e.preventDefault()</code> لإيقاف التحديث التلقائي للصفحة عند إرسال النماذج (Forms).</li>
  </ul>
</div>
