import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ufbmksliiqqmgbqqwsve.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYm1rc2xpaXFxbWdicXF3c3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODExMjAsImV4cCI6MjAxODg1NzEyMH0.tVrgNxq8X_mvjijIrHqCUjLSTuwgRJuJ174SLA-Qk6g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
