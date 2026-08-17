---
sidebar_position: 2
---

# Inheritance

## 🎯 Learning Objectives
- فهم مفهوم الوراثة (Inheritance) وإعادة استخدام الكود.
- استخدام الكلمتين المحجوزتين `extends` و `super`.

---

## 1. الوراثة (Inheritance)

الوراثة تسمح لك بإنشاء فئة (Class) جديدة مبنية على فئة موجودة مسبقاً، حيث ترث كل الخصائص والوظائف الموجودة في الفئة الأب (Parent Class) وتستطيع إضافة خصائص جديدة لها.

> 💡 **مقارنة بـ Dart:**
> الوراثة في جافاسكريبت متطابقة تماماً مع Dart. نستخدم كلمة `extends` للوراثة، وكلمة `super` للوصول لـ Constructor الفئة الأب.

### مثال تطبيقي

لدينا فئة أساسية تمثل حيوان (Animal):
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }
}
```

الآن نريد إنشاء فئة جديدة لتمثيل القطط (Cat) ترث من فئة الحيوان:
```javascript
class Cat extends Animal {
  constructor(name, color) {
    // يجب استدعاء super أولاً لتمرير الـ name للفئة الأب
    super(name); 
    this.color = color; // إضافة الخاصية الجديدة
  }

  meow() {
    console.log(`${this.name} says Meow!`);
  }
}

const myCat = new Cat("Milo", "Orange");

myCat.eat();  // موروثة من Animal: Milo is eating.
myCat.meow(); // وظيفة خاصة بـ Cat: Milo says Meow!
console.log(myCat.color); // Orange
```

## 2. التجاوز (Method Overriding)

كما هو الحال في Dart، يمكنك في جافاسكريبت أن تعيد تعريف دالة موجودة في الأب (Parent) بداخل الابن (Child) لتعمل بشكل مختلف.

```javascript
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  // إعادة تعريف الدالة eat() لتتصرف بشكل مختلف للكلاب
  eat() {
    console.log(`${this.name} is eating dog food loudly!`);
  }
}

const myDog = new Dog("Rex");
myDog.eat(); // Rex is eating dog food loudly!
```
> ⚠️ **ملاحظة:** في جافاسكريبت لا نستخدم كلمة `@override` (التي نستخدمها كـ Annotation في Dart). فقط قم بكتابة الدالة بنفس الاسم وسيتم تجاوزها.

---

## 💻 جرب بنفسك (Hands-on)
1. أنشئ فئة أساسية `Vehicle` تحتوي على خاصية `brand` ووظيفة `startEngine()`.
2. أنشئ فئة `Motorcycle` ترث من `Vehicle`، وأضف لها خاصية `hasSidecar` (نوعها Boolean).
3. استدعِ `startEngine()` من كائن `Motorcycle`.

---

<div className="summary-box">
  <h3>📝 خلاصة</h3>
  <ul>
    <li>الكلمة <code>extends</code> تستخدم لجعل فئة ترث من أخرى.</li>
    <li>استدعاء <code>super()</code> داخل الـ <code>constructor</code> الخاص بالابن ضروري جداً <strong>قبل</strong> استخدام <code>this</code>.</li>
    <li>التجاوز (Overriding) يحدث بكتابة الدالة بنفس الاسم داخل الابن.</li>
  </ul>
</div>
