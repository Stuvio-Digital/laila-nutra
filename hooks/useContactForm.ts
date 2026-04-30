"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/schemas/contactSchema";

export const useContactForm = () => {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      companyName: '',
      message: '',
      terms: false as any,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitState("loading");
      console.log('Form submitted:', data);
      await new Promise((r) => setTimeout(r, 800));
      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
        form.reset();
      }, 2000);
    } catch (e) {
      setSubmitState("idle");
    }
  };

  const onError = (errors: any) => {
    const firstError = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstError}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return {
    form,
    submitState,
    onSubmit,
    onError
  };
};
