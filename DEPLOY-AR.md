# خطوات التشغيل النهائي

1. في Firebase افتح مشروع `souq-el-baramoun`.
2. فعّل تسجيل الدخول بواسطة البريد الإلكتروني/كلمة المرور من قسم المصادقة. المستخدم سيكتب رقم الهاتف فقط داخل التطبيق؛ التطبيق يحوّل الرقم إلى هوية داخلية ولا يعرض بريداً إلكترونياً.
3. أنشئ قاعدة Firestore وفعّل Storage.
4. انسخ `.env.example` إلى `.env` وضع قيم تطبيق الويب.
5. ثبّت Firebase CLI ثم نفّذ:
   `firebase login`
   ثم `firebase use souq-el-baramoun`
6. انشر القواعد:
   `firebase deploy --only firestore:rules,storage`
7. بعد `npm install` نفّذ `npm run build` ثم `firebase deploy --only hosting`.
8. أنشئ أول حساب مدير من التطبيق، ثم في Firestore غيّر مستند المستخدم نفسه إلى `role: admin` و`active: true`.
9. اختبر: إنشاء حساب، دخول، رفع إعلان، مراجعة المدير، إعلان مميز، المشاهدات، وطلب فودافون كاش.
