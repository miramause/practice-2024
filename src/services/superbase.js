import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://keueoptkyfbqzrpwswud.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldWVvcHRreWZicXpycHdzd3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NzQzMDQsImV4cCI6MjAyODE1MDMwNH0.bwsz3RVBMJkis181kRg8vXQKVt0EFD0zj5fo0aBLA34'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;