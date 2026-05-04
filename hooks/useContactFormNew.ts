"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchemaNew, ContactFormDataNew } from "@/schemas/contactSchemaNew";

export const useContactFormNew = () => {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  const form = useForm<ContactFormDataNew>({
    resolver: zodResolver(contactSchemaNew),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      businessEmail: '',
      company: '',
      jobTitle: '',
      relationshipType: '' as any,
      areaOfInterest: '' as any,
      region: '' as any,
      phoneCode: '+1',
      phone: '',
      batchNumber: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormDataNew) => {
    try {
      setSubmitState("loading");
      
      const response = await fetch('/api/contact-new', {
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
      form.reset();
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
    onError,
    resetSubmitState: () => setSubmitState("idle")
  };
};
