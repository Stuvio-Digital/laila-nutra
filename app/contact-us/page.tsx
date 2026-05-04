"use client";
import React from 'react';
import {
  ChevronDown,
  CheckSquare,
  Square,
} from 'lucide-react';
import FadeUp from '@/components/FadeUp';
import CTA from '@/components/CTA';
import { useContactForm } from '@/hooks/useContactForm';

const baseField =
  'w-full bg-transparent border border-transparent rounded-sm px-3 @4xl:px-4 py-2.5 @4xl:py-3 contact-input text-gray-900 placeholder:text-gray-400 placeholder:text-body transition-all duration-200 outline outline-textSecondary/50 focus:outline-blue';

const ContactPage: React.FC = () => {
  const {
    form: {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, touchedFields, isSubmitted },
    },
    submitState,
    onSubmit,
    onError
  } = useContactForm();

  const termsChecked = watch('terms');

  return (
    <main className="@container relative min-h-screen w-full overflow-x-hidden footer-bg pt-30 sm:pt-40 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 py-12 sm:py-16 my-auto">
      {/* LEFT */}
      <FadeUp className="flex flex-col gap-10 lg:gap-15 col-span-4 sm:col-span-12 md:col-span-6" delay={0.2}>
        <h3 className="text-white text-heading2 [@media(min-width:1536px)]:text-heading1 font-semibold leading-[124%] tracking-[-2%]">
          Ready to Build <br /> something together?
        </h3>
      </FadeUp>

      {/* RIGHT */}
      <FadeUp className="col-span-4 sm:col-span-12 md:col-span-6 [@media(min-width:1920px)]:max-w-[90%] [@media(min-width:1920px)]:ml-auto w-full mt-10 md:mt-0" delay={0.4}>
        <div className="bg-white rounded-xl">
          <h3 className="text-black text-subHeading1 font-medium leading-[124%] tracking-[-2%] py-6 border-b border-borderColor mb-10 px-4 sm:px-5 md:px-6 lg:px-7.5 xl:px-10">Connect With Us</h3>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="gap-y-6 md:gap-y-7.5 gap-x-4 md:gap-x-5 lg:gap-x-7.5 grid grid-cols-2 px-4 sm:px-5 md:px-6 lg:px-7.5 xl:px-10 pb-10">

            {/* Name */}
            <div className="flex flex-col gap-1.5 col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input {...register('name')} type="text" placeholder="Your full name" className={baseField} />
              {(touchedFields.name || isSubmitted) && errors.name && (
                <p className="error-msg text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="flex flex-col gap-1.5 col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone', {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  }
                })}
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className={baseField}
                maxLength={10}
              />
              {(touchedFields.phone || isSubmitted) && errors.phone && (
                <p className="error-msg text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input {...register('email')} type="email" placeholder="you@example.com" className={baseField} />
              {(touchedFields.email || isSubmitted) && errors.email && (
                <p className="error-msg text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input {...register('companyName')} type="text" placeholder="Company Name" className={baseField} />
              {(touchedFields.companyName || isSubmitted) && errors.companyName && (
                <p className="error-msg text-red-500">{errors.companyName.message}</p>
              )}
            </div>

            {/* Service Type */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="contact-label text-body font-medium text-gray-700">
                Service Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register('supportType')} defaultValue="" className={`${baseField} appearance-none pr-10 cursor-pointer text-body`}>
                  <option value="" disabled>Select service type</option>
                  <option value="Product">Product</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              {(touchedFields.supportType || isSubmitted) && errors.supportType && (
                <p className="error-msg text-red-500">{errors.supportType.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="contact-label text-body font-medium text-gray-700">Message</label>
              <textarea {...register('message')} rows={4} placeholder="Write your message here…" className={`${baseField} resize-none`} />
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <button
                type="button"
                onClick={() =>
                  setValue('terms', termsChecked ? (undefined as any) : true, { shouldValidate: true })
                }
                className="flex items-start gap-3 group w-fit outline-none focus:outline-none focus:ring-0 focus:border-none border-none focus-visible:outline-none"
              >
                {termsChecked ? <CheckSquare size={20} className="text-blue" /> : <Square size={20} className="text-gray-400" />}
                <span className="contact-label text-body text-gray-700">
                  I agree to the{' '} terms and conditions
                </span>
              </button>
              <input type="hidden" {...register('terms')} />
              {(touchedFields.terms || isSubmitted) && errors.terms && (
                <p className="error-msg text-red-500">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-1 col-span-2">
              <CTA
                ctaContent={
                submitState === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting…
                  </span>
                ) : submitState === "success" ? (
                  "Submitted"
                ) : (
                  "Send Message"
                )
                }
                as="button"
                type="submit"
                disabled={submitState === "loading"}
              />
            </div>

          </form>
        </div>

      </FadeUp>
    </main>
  );
};

export default ContactPage;