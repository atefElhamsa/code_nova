import { createClient } from '@supabase/supabase-js';

// ضع رابط مشروعك ومفتاح Anon هنا
const supabaseUrl = 'https://rkncoqjqfdpgvgcvkpxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrbmNvcWpxZmRwZ3ZnY3ZrcHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzOTAzNDIsImV4cCI6MjEwMTk2NjM0Mn0.hB5xrXfieH26O3VWOMaxJl_dFonWHeav6ffxfycr25I';

let supabaseInstance = null;

try {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.warn("Supabase is not configured properly yet.");
}

export const supabase = supabaseInstance;
