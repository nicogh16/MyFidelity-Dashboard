import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdicqtupwckhvxhlkiuf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkaWNxdHVwd2NraHZ4aGxraXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTQ3MjYsImV4cCI6MjA2MjM3MDcyNn0.yov8gb45e5lGa_W5XRz4MA9N8AXSdyGlHReTAIf1tQA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 