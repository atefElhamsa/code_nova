---
sidebar_position: 3
---

# Fetch API

## 🎯 Learning Objectives
- استخدام دالة `fetch()` لجلب البيانات من خادم خارجي.
- دمج الـ Fetch مع `async/await` للتعامل مع الـ Promises.
- إرسال البيانات (POST Request).

---

## 1. ما هو الـ Fetch API؟

وظيفة `fetch` هي واجهة برمجة مدمجة في المتصفح تسمح لنا بإجراء طلبات (HTTP Requests) لجلب أو إرسال بيانات إلى خوادم خارجية بدون تحديث الصفحة.

> 💡 **مقارنة بـ Dart:**
> دالة `fetch` هي المقابل المباشر لحزمة `http` أو `dio` في Flutter.

الدالة `fetch()` تُرجع دائماً **Promise**، لذلك نستخدم معها `async/await`.

## 2. جلب البيانات (GET Request)

الطلب الافتراضي لـ `fetch` هو جلب البيانات (GET).

```javascript
async function getUsers() {
  try {
    // 1. طلب البيانات من الرابط
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // 2. تحويل الرد إلى صيغة JSON
    const data = await response.json();
    
    // 3. استخدام البيانات
    console.log("Users fetched:", data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

getUsers();
```

> **ملاحظة:** نستخدم `await` مرتين! المرة الأولى لجلب الرد من الشبكة، والمرة الثانية لتحويل الرد من شكل "تيار بيانات" (Stream) إلى كائن جافاسكريبت مفهوم باستخدام `response.json()`.

## 3. إرسال البيانات (POST Request)

لإرسال بيانات إلى الخادم (مثل إنشاء حساب مستخدم جديد)، نُمرر كائناً ثانياً لدالة `fetch` يحتوي على إعدادات الطلب (Method, Headers, Body).

```javascript
async function createUser() {
  const newUser = {
    name: "Ahmed",
    job: "Flutter Developer"
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST", // تحديد نوع الطلب
      headers: {
        "Content-Type": "application/json" // إخبار الخادم أننا نرسل JSON
      },
      body: JSON.stringify(newUser) // تحويل الكائن إلى نص JSON
    });

    const result = await response.json();
    console.log("User created:", result);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
```

> 💡 **مقارنة بـ Dart:** دالة `JSON.stringify()` في جافاسكريبت تعادل دالة `jsonEncode()` في لغة Dart!

---

## 💻 جرب بنفسك (Hands-on)
1. أنشئ دالة `async` لجلب قائمة بوستات من الرابط: `https://jsonplaceholder.typicode.com/posts`
2. اطبع الـ `title` الخاص بأول بوست في المصفوفة الراجعة.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الـ <code>fetch API</code> يُرجع وعوداً (Promises) لذلك يتم استخدامه عادةً مع <code>async/await</code>.</li>
    <li>لتحويل الرد لـ JSON، نستخدم <code>await response.json()</code>.</li>
    <li>عند إرسال بيانات (POST) تأكد من إعداد الـ Headers وتحويل البيانات باستخدام <code>JSON.stringify()</code>.</li>
  </ul>
</div>
