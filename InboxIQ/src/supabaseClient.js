import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey);

export async function getEmails() {
    try {
        let { data: emails, error } = await supabase.from("emails").select("*");
        return emails
    } catch (error) {
        console.log("Error fetching emails: ", error);
        return [];
    }
}
