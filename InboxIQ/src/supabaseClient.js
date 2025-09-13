import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey);

export async function getEmails() {
    try {
        let { data: emails, error } = await supabase.from("emails").select("*").is('reply', null);
        return emails
    } catch (error) {
        console.log("Error fetching emails: ", error);
        return [];
    }
}

export async function updateReply(text, emailID) {
   let { data, error } = await supabase
    .from('emails')
    .update({ reply: text })
    .eq('id', emailID)
    .select()

  if (error) {
    console.error('Error updating replies:', error)
    return { data: null, error }
  }
  return { data, error: null }

}