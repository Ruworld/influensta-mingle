// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ttbqphmobxpqybzfegxl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0YnFwaG1vYnhwcXliemZlZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTQ0MDMsImV4cCI6MjA1ODEzMDQwM30.NYesA13-9nPd1Pz8eUsH5l4tY1dRvs-9XA7kTSnJQMc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);