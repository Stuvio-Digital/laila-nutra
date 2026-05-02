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
      supportType: '' as any,
      message: '',
      terms: false as any,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitState("loading");
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
        form.reset();
      }, 2000);
    } catch (e: any) {
      console.error('Form Submission Error:', e);
      setSubmitState("idle");
      alert(e.message || "Failed to send message. Please try again later.");
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
