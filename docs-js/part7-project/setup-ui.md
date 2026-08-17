---
sidebar_position: 1
---

# Project Setup & UI

## 🎯 Learning Objectives
- تطبيق كل ما تعلمناه في تطبيق حقيقي (To-Do List).
- إعداد بيئة المشروع وبناء واجهة المستخدم (HTML & CSS).
- ربط ملف الجافاسكريبت بالـ HTML.

---

## 1. فكرة المشروع

سنقوم بإنشاء تطبيق قائمة مهام (To-Do List) باستخدام جافاسكريبت نقية (Vanilla JS).
التطبيق سيسمح للمستخدم بـ:
1. إضافة مهمة جديدة.
2. حذف مهمة.
3. تحديد المهمة كمكتملة.
4. حفظ المهام في المتصفح حتى لا تضيع عند التحديث (LocalStorage).

> 💡 **لماذا Vanilla JS؟**
> كمطور Flutter، أنت معتاد على بناء الواجهات والمنطق معاً باستخدام لغة واحدة. هنا سنتعلم كيف نفصل الواجهة (HTML) عن المنطق (JS) قبل الانتقال لأطر العمل مثل React التي تعيد دمجهم!

## 2. إعداد هيكل الـ HTML (index.html)

قم بإنشاء مجلد جديد للمشروع وضع بداخله ملف `index.html`. هذا الملف سيمثل هيكل التطبيق الخاص بنا.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JS To-Do List</title>
  <style>
    /* CSS بسيط للتنسيق */
    body { font-family: Arial; text-align: center; background: #f4f4f4; padding: 50px; }
    .container { background: white; padding: 20px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    input { padding: 10px; width: 70%; margin-right: 5px; }
    button { padding: 10px; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd; }
    .completed { text-decoration: line-through; color: gray; }
  </style>
</head>
<body>

  <div class="container">
    <h2>My Tasks</h2>
    
    <!-- حقل الإدخال وزر الإضافة -->
    <div style="margin-bottom: 20px;">
      <input type="text" id="task-input" placeholder="What needs to be done?">
      <button id="add-btn">Add</button>
    </div>

    <!-- قائمة المهام الفارغة (التي سنملؤها بالجافاسكريبت) -->
    <ul id="task-list"></ul>
  </div>

  <!-- ربط ملف الجافاسكريبت في نهاية الـ Body -->
  <script src="app.js"></script>
</body>
</html>
```

## 3. ربط ملف الجافاسكريبت

في السطر الأخير من الـ HTML، قمنا بكتابة `<script src="app.js"></script>`. 
قم بإنشاء ملف `app.js` في نفس المجلد.

للتأكد من أن كل شيء يعمل، اكتب الكود التالي داخل `app.js`:

```javascript
console.log("App is running!");

// اختيار العناصر الأساسية لنستخدمها في الدرس القادم
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
```

---

## 💻 جرب بنفسك (Hands-on)
1. قم بإنشاء الملفات المطلوبة وتشغيل الـ `index.html` في متصفحك.
2. تأكد من ظهور التصميم الأساسي.
3. افتح الـ Developer Tools (Console) وتأكد من طباعة كلمة `App is running!`.

---

في الدرس القادم، سنبدأ بكتابة المنطق (State) وإضافة الأحداث للزر.
