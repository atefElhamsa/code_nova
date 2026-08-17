---
sidebar_position: 2
---

# State & Events

## 🎯 Learning Objectives
- استخدام المصفوفات لتخزين حالة التطبيق (State).
- التقاط الأحداث وإضافة عناصر جديدة للـ DOM ديناميكياً.
- ربط المنطق بالواجهة.

---

## 1. إدارة الحالة (State)

نحتاج لمكان نحفظ فيه المهام التي يكتبها المستخدم. سنستخدم مصفوفة (Array).

```javascript
// مصفوفة فارغة لحفظ المهام
let tasks = [];
```

> 💡 **مقارنة بـ Dart:**
> هذا يماثل تعريف متغير `List<String> tasks = [];` في كلاس الـ State في Flutter.

## 2. وظيفة الإضافة والـ Event Listener

سنقوم بكتابة وظيفة تقوم بقراءة النص من الـ `input`، وتضيفه للمصفوفة، ثم تحدث الـ DOM.

```javascript
// الاستماع لحدث الضغط على زر الإضافة
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  // التحقق من أن النص غير فارغ
  if (taskText !== "") {
    // 1. إنشاء كائن للمهمة
    const newTask = {
      id: Date.now(), // ID فريد للمهمة
      text: taskText,
      completed: false
    };

    // 2. إضافتها لحالة التطبيق (State)
    tasks.push(newTask);

    // 3. مسح حقل الإدخال
    taskInput.value = "";

    // 4. تحديث واجهة المستخدم
    renderTasks();
  }
});
```

## 3. تحديث واجهة المستخدم (Render)

نحتاج دالة لتقوم بمسح القائمة الحالية ورسمها من جديد بناءً على المصفوفة (مثل `setState`).

```javascript
function renderTasks() {
  // تفريغ القائمة أولاً
  taskList.innerHTML = "";

  // المرور على المصفوفة وإنشاء عناصر HTML
  tasks.forEach((task) => {
    const li = document.createElement("li");
    
    // إذا كانت مكتملة أضف الكلاس
    if (task.completed) {
      li.classList.add("completed");
    }

    // محتوى الـ li (اسم المهمة + زر الحذف)
    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})" style="color:red; border:none; background:none;">X</button>
    `;

    taskList.appendChild(li);
  });
}
```

## 4. الإكمال والحذف (Toggle & Delete)

لنكتب الوظيفتين اللتين استدعيناهما داخل الـ HTML (`toggleTask` و `deleteTask`).

```javascript
// تبديل حالة الاكتمال
function toggleTask(id) {
  // البحث عن المهمة وتعديلها
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  
  renderTasks(); // إعادة الرسم
}

// حذف المهمة
function deleteTask(id) {
  // التصفية لإزالة المهمة المطلوبة
  tasks = tasks.filter(task => task.id !== id);
  
  renderTasks(); // إعادة الرسم
}
```

---

## 💻 جرب بنفسك (Hands-on)
1. انسخ الأكواد أعلاه إلى ملف `app.js` الخاص بك.
2. جرب إضافة مهام من المتصفح.
3. جرب الضغط على اسم المهمة لجعلها مكتملة (سيتغير شكلها بسبب الـ CSS المضاف في الدرس السابق).
4. اضغط على زر الحذف (X) وتأكد أنها تختفي.

---

حتى الآن تطبيقنا يعمل! ولكن بمجرد تحديث الصفحة، يختفي كل شيء. في الدرس القادم سنستخدم الـ LocalStorage لحل هذه المشكلة.
