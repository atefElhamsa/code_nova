---
sidebar_position: 1
---

# ES Modules (import/export)

## 🎯 Learning Objectives
- تقسيم الكود إلى ملفات صغيرة قابلة لإعادة الاستخدام.
- استخدام `export` لتصدير المتغيرات والدوال.
- استخدام `import` لاستيرادها في ملفات أخرى.

---

## 1. لماذا نحتاج الـ Modules؟

كلما كبر حجم المشروع، أصبح من المستحيل وضع كل الكود في ملف واحد (script.js). الـ Modules تسمح لنا بتقسيم الكود إلى وحدات مستقلة.

> 💡 **مقارنة بـ Dart:**
> الـ Modules في جافاسكريبت تقابل الكلمات المحجوزة `import` و `part/part of` أو استيراد الباقات (Packages) في لغة Dart.

## 2. التصدير (Export)

لكي تتمكن من استخدام شيء (متغير، دالة، كلاس) موجود في ملف `A` بداخل ملف `B`، يجب عليك أولاً أن "تُصدره" (Export).

### أ. التصدير المسمى (Named Export)
يمكنك تصدير عدة أشياء من نفس الملف.

```javascript
// file: mathUtils.js

export const pi = 3.14159;

export function add(a, b) {
  return a + b;
}
```

### ب. التصدير الافتراضي (Default Export)
يُستخدم عندما يكون الملف يحتوي على شيء أساسي واحد فقط (مثل كلاس أو مكون React).

```javascript
// file: User.js

export default class User {
  constructor(name) {
    this.name = name;
  }
}
```

## 3. الاستيراد (Import)

### استيراد الـ Named Exports
يجب أن تستخدم نفس الأسماء وتضعها داخل أقواس معقوفة `{}`.
```javascript
// file: main.js
import { pi, add } from './mathUtils.js';

console.log(pi); // 3.14159
console.log(add(2, 5)); // 7
```

### استيراد الـ Default Export
لا تستخدم الأقواس المعقوفة، ويمكنك تسميته بأي اسم تريد!
```javascript
// file: main.js
import MyCustomUser from './User.js';

const user = new MyCustomUser("Omar");
```

---

## 💻 جرب بنفسك (Hands-on)
1. أنشئ ملفاً باسم `utils.js` وقم بتصدير دالة (Named Export) تقوم بتحويل النص إلى أحرف كبيرة `toUpperCase()`.
2. أنشئ ملف `app.js` وقم باستيراد الدالة واستخدمها لطباعة نص.
> **تلميح مهم:** لكي تعمل الـ Modules في المتصفح، يجب أن تضيف السمة `type="module"` إلى وسم السكريبت في الـ HTML: `<script type="module" src="app.js"></script>`

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الـ <code>Modules</code> تساعد في تنظيم الكود وتقسيمه عبر ملفات.</li>
    <li>الـ <code>Named Export</code> يسمح لك بتصدير أجزاء محددة (ويجب استيرادها بنفس الاسم مع أقواس <code>{}</code>).</li>
    <li>الـ <code>Default Export</code> يصدر وحدة رئيسية واحدة لكل ملف ويمكن استيرادها بأي اسم تختاره بدون أقواس.</li>
  </ul>
</div>
