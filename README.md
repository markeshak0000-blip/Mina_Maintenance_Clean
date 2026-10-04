# Mina Maintenance — Windows

نسخة سطح مكتب Windows من نظام **Mina Maintenance** باستخدام Electron.

## اسم التطبيق
**Mina Maintenance**

## الملفات المهمة

- `app/index.html` — واجهة النظام.
- `main.js` — تشغيل تطبيق Windows وإدارة النافذة والطباعة والروابط الخارجية.
- `preload.js` — طبقة آمنة بين الواجهة وElectron.
- `build/Mina-Maintenance.ico` — أيقونة Windows الأساسية.
- `assets/Mina-Maintenance.png` — الصورة عالية الدقة للأيقونة.
- `package.json` — إعدادات المشروع والبناء.
- `build-windows.bat` — تثبيت المتطلبات وبناء Installer + Portable EXE.
- `run-windows.bat` — تشغيل النسخة أثناء التطوير.

## التشغيل على Windows

1. ثبّت Node.js 22 أو أحدث.
2. افتح مجلد المشروع.
3. شغّل `run-windows.bat` للتجربة.

## بناء النسخة النهائية

شغّل:

`build-windows.bat`

سيتم إنشاء ملفات Windows داخل مجلد `dist`، أهمها Installer بصيغة EXE ونسخة Portable.

## معلومات المطور

ENG. Mark Eshak  
Infinity MEN2  
Software Engineer  
تطوير هندسة البرمجيات وأنظمة سطح المكتب المتكاملة لإدارة الأعمال.
