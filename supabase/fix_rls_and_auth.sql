-- ==============================================================================
-- 🚀 إصلاح شامل لـ RLS (أمان قاعدة البيانات) والتسجيل
-- انسخ هذا الكود بالكامل وضعه في Supabase SQL Editor ثم اضغط RUN
-- ==============================================================================

-- 1️⃣ إصلاح جدول الأكواد (course_access_requests)
-- هذا يحل مشكلة "حدث خطأ أثناء توليد الكود" في لوحة تحكم الأدمن
ALTER TABLE public.course_access_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all operations for all users" ON public.course_access_requests;
CREATE POLICY "Enable all operations for all users" 
ON public.course_access_requests 
AS PERMISSIVE FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);


-- 2️⃣ إصلاح جدول المستخدمين (user_profiles)
-- التأكد من أن كل مستخدم يقدر يقدر يشوف ويعدل بياناته فقط
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" 
ON public.user_profiles FOR SELECT 
USING ( auth.uid() = id );

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" 
ON public.user_profiles FOR UPDATE 
USING ( auth.uid() = id );


-- 3️⃣ إصلاح مشكلة التسجيل (Trigger)
-- التأكد من أن النظام له صلاحيات كافية (SECURITY DEFINER) لإنشاء الحسابات
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url, phone)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
