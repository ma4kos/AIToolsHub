import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://kvffxqqqmkzckuukyroy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZmZ4cXFxbWt6Y2t1dWt5cm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMzcxNDIsImV4cCI6MjA0ODcxMzE0Mn0.RJYe-6EGLWxnSkcS9VQFYJl2Dnn72UmlyBhwcveoHNQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);