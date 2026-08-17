-- إضافة عمود تحديد الكورس إلى الجدول
ALTER TABLE course_access_requests ADD COLUMN IF NOT EXISTS target_course text DEFAULT 'all';

-- إضافة عمود لتحديد مصدر الكود (هل هو طلب من الطالب أم كود مسبق من الأدمن)
ALTER TABLE course_access_requests ADD COLUMN IF NOT EXISTS code_type text DEFAULT 'student';

-- التأكد من إيقاف حماية RLS لكي يعمل النظام بدون مشاكل
ALTER TABLE course_access_requests DISABLE ROW LEVEL SECURITY;
