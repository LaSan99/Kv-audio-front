
//install package npm install @supabase/supabase-js

import { createClient } from "@supabase/supabase-js";

const anon_key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXBsbmZua3dkdWp1ZGJzcXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwODQzNjQsImV4cCI6MjA1MzY2MDM2NH0.chGfVwguWsZSeDUfu1NGgtbHfUSS8iE7R1OcrYqxFmk";
const supabase_url = "https://tmyplnfnkwdujudbsqqk.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}
