---
sidebar_position: 3
---

# LocalStorage & Polish

## 🎯 Learning Objectives
- حفظ البيانات في المتصفح باستخدام `localStorage`.
- استرجاع البيانات عند إعادة تحميل الصفحة.
- تحويل البيانات من وإلى صيغة JSON.

---

## 1. ما هو الـ LocalStorage؟

هو عبارة عن قاعدة بيانات بسيطة مدمجة داخل المتصفح. تسمح لنا بتخزين بيانات نصية (String) بحجم يصل لعدة ميجابايتات.

> 💡 **مقارنة بـ Dart:**
> الـ `localStorage` في جافاسكريبت يعادل استخدام باقة `shared_preferences` في تطبيق Flutter. كلاهما يعتمد على أزواج (Key-Value) وتخزين نصوص.

## 2. دالة الحفظ (Save)

سننشئ دالة تقوم بتحويل مصفوفة الـ `tasks` إلى نص (String) وحفظها في المتصفح.

```javascript
function saveToLocalStorage() {
  // LocalStorage لا يقبل مصفوفات، لذا نحولها لنص JSON
  const tasksString = JSON.stringify(tasks);
  
  // حفظها بمفتاح "my_tasks"
  localStorage.setItem("my_tasks", tasksString);
}
```

**متى نستدعي هذه الدالة؟**
يجب أن نستدعيها كلما حدث تعديل على مصفوفة المهام. 
أي أننا سنضيف `saveToLocalStorage();` داخل دالة `renderTasks()` في نهايتها لضمان الحفظ مع كل تغيير.

```javascript
function renderTasks() {
  // الكود القديم للرسم ...
  // ...
  
  // إضافة الحفظ هنا
  saveToLocalStorage();
}
```

## 3. دالة الاسترجاع (Load) عند فتح التطبيق

الآن، عندما يفتح المستخدم الصفحة لأول مرة، نريد قراءة الذاكرة وعرض المهام المحفوظة.

```javascript
function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem("my_tasks");
  
  if (savedTasks) {
    // إعادتها من نص JSON إلى مصفوفة جافاسكريبت
    tasks = JSON.parse(savedTasks);
  } else {
    // إذا لم تكن هناك بيانات مسبقة
    tasks = [];
  }
  
  // رسم الواجهة بالبيانات المسترجعة
  renderTasks();
}

// استدعاء التحميل فور فتح الصفحة
loadFromLocalStorage();
```

---

## الكود النهائي بالكامل (app.js)

إليك الكود المجمع بعد كل الإضافات:

```javascript
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

// تحميل البيانات القديمة
loadFromLocalStorage();

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ id: Date.now(), text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})" style="color:red; border:none; background:none;">X</button>
    `;
    taskList.appendChild(li);
  });
  
  // حفظ البيانات بعد كل عملية رسم (إضافة/تعديل/حذف)
  saveToLocalStorage();
}

// جعل الدوال متاحة للـ HTML
window.toggleTask = function(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  renderTasks();
}

window.deleteTask = function(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("my_tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const savedTasks = localStorage.getItem("my_tasks");
  if (savedTasks) tasks = JSON.parse(savedTasks);
  else tasks = [];
}
```

---

## 🎉 مبروك!
لقد أتممت الكورس المصغر "JavaScript from Zero".
الآن لديك أساس قوي للانتقال لتعلم إطارات العمل الحديثة مثل React أو Angular، أو كتابة أكواد خلفية باستخدام Node.js. لقد تعلمت كيف تفكر بعقلية مطور جافاسكريبت مع البقاء متصلاً بأساسياتك في لغة Dart.
