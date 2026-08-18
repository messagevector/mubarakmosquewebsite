import { SITE } from "@/lib/site";

export default function ContactForm() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || SITE.email;
  const cc = process.env.NEXT_PUBLIC_CONTACT_CC || SITE.emailCc;

  return (
    <form action={`https://formsubmit.co/${email}`} method="POST" className="space-y-4">
      <input type="hidden" name="_subject" value="Mubarak Mosque website message" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_cc" value={cc} />
      <label className="block text-sm font-medium text-white">
        Your name *
        <input required name="name" className="field" />
      </label>
      <label className="block text-sm font-medium text-white">
        Email address *
        <input required type="email" name="email" className="field" />
      </label>
      <label className="block text-sm font-medium text-white">
        Your message *
        <textarea required name="message" rows={5} className="field" />
      </label>
      <button type="submit" className="btn btn-gold">
        Send message
      </button>
    </form>
  );
}
