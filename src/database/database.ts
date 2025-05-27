import { createClient } from '@supabase/supabase-js';
import { supaUrl, supaKey } from 'src/env';

const supabase = createClient(
  process.env.SUPABASE_URL || supaUrl!,
  process.env.SUPABASE_KEY || supaKey!,
);

export default supabase;
