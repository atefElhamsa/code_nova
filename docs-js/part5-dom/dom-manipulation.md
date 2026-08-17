---
sidebar_position: 1
---

# DOM Manipulation

## 🎯 Learning Objectives
- فهم ما هو الـ Document Object Model (DOM).
- تحديد العناصر (Selecting Elements) في المتصفح.
- تعديل خصائص ومحتوى العناصر (Manipulating Elements).

---

## 1. ما هو الـ DOM؟

الـ DOM باختصار هو شجرة تمثل هيكل صفحة الـ HTML. عندما يقرأ المتصفح ملف الـ HTML، يقوم بتحويل كل وسم (Tag) إلى كائن (Object) داخل الـ DOM، لكي تتمكن جافاسكريبت من الوصول إليه وتعديله.

> 💡 **مقارنة بـ Dart/Flutter:**
> شجرة الـ DOM تشبه جداً شجرة الـ Widget Tree في Flutter. كل وسم `<div>` أو `<p>` يعادل ويدجت `Container` أو `Text`. وجافاسكريبت تُستخدم لتحديث هذه الشجرة (مثلما تفعل `setState`).

## 2. اختيار العناصر (Selecting Elements)

لكي نعدل على عنصر، يجب أن نمسك به أولاً! المتصفح يوفر لنا الكائن العام `document` للبحث داخل الصفحة.

### أ. باستخدام الـ ID أو الكلاس
```javascript
// يجلب عنصراً واحداً بناءً على الـ ID
const title = document.getElementById("main-title");

// يجلب كل العناصر التي تحمل هذا الكلاس (يرجع ما يشبه المصفوفة)
const buttons = document.getElementsByClassName("btn");
```

### ب. باستخدام Query Selector (الطريقة الأحدث والأفضل)
تسمح لك باستخدام محددات CSS لاختيار العناصر!

```javascript
// يجلب أول عنصر يطابق المحدد
const firstButton = document.querySelector(".btn-primary");

// يجلب جميع العناصر التي تطابق المحدد
const allLinks = document.querySelectorAll("a.nav-link");
```

## 3. تعديل العناصر (Manipulation)

بعد الإمساك بالعنصر، يمكننا تغيير محتواه، لونه، أو أي خاصية فيه.

### تغيير النصوص والـ HTML
```javascript
const title = document.querySelector("#title");

// تغيير النص العادي فقط (آمن)
title.textContent = "Welcome to DevPath Academy!";

// تغيير المحتوى كـ HTML (يمكن إدخال وسوم جديدة)
title.innerHTML = "Welcome to <span>DevPath Academy!</span>";
```

### تغيير التنسيقات (Styles)
```javascript
const box = document.querySelector(".box");

// تعديل CSS مباشرة عبر خاصية style (لاحظ استخدام CamelCase بدلاً من dash)
box.style.backgroundColor = "blue"; // بدلاً من background-color
box.style.fontSize = "20px";
box.style.display = "none"; // إخفاء العنصر
```

### تغيير الفئات (Classes)
بدون تعديل الـ Style مباشرة، من الأفضل تبديل فئات الـ CSS.
```javascript
const menu = document.querySelector(".menu");

menu.classList.add("active");    // إضافة كلاس
menu.classList.remove("hidden"); // إزالة كلاس
menu.classList.toggle("open");   // إذا كان موجوداً يحذفه، والعكس صحيح!
```

---

## 💻 جرب بنفسك (Hands-on)
قم بإنشاء ملف `index.html` واكتب فيه عنصر بسيط:
```html
<h1 id="heading">Hello World</h1>
<script src="script.js"></script>
```
وفي ملف `script.js`:
1. استخدم `querySelector` للامساك بالعنصر `h1`.
2. غيّر النص ليصبح "DOM is Awesome!".
3. غيّر لونه إلى اللون الأحمر باستخدام `style.color`.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الـ <code>DOM</code> هو الواجهة بين كود الـ HTML وجافاسكريبت.</li>
    <li><code>querySelector</code> هي أفضل طريقة لتحديد العناصر لأنها تستخدم قواعد CSS.</li>
    <li>يمكنك تعديل أي شيء في الصفحة: النصوص <code>textContent</code>، الألوان <code>style</code>، والكلاسات <code>classList</code>.</li>
  </ul>
</div>
