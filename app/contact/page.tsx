import type { Metadata } from "next";
import ContactLayout from "../components/contact/ContactLayout";
import contactData from "@/app/data/contact.json";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactData.hero.description,
};

export default function ContactPage() {
  return <ContactLayout />;
}
