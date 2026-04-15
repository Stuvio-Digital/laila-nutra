"use client";
import React from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
  ChevronDown,
  CheckSquare,
  Square,
} from 'lucide-react';

// ─── CTA Component ───────────────────────────────────────────────────────────

interface CTAProps {
  ctaContent: React.ReactNode;
  href?: string;
  target?: string;
  className?: string;
  as?: 'link' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const CTA: React.FC<CTAProps> = ({
  ctaContent,
  href,
  target,
  className = '',
  as = 'link',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const commonClasses = `cursor-pointer text-body tracking-[-1%] text-normal text-white px-4 md:px-4.5 lg:px-5.5 py-2.5 md:py-3 w-fit rounded-full bg-blue text-center flex justify-center items-center ${className}`;

  if (as === 'button') {
    return (
      <button type={type} className={commonClasses} onClick={onClick} disabled={disabled}>
        {ctaContent}
      </button>
    );
  }

  return (
    <NextLink href={href || '#'} className={commonClasses} target={target} onClick={onClick}>
      {ctaContent}
    </NextLink>
  );
};

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters long'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  supportType: z.enum(['Product', 'General Enquiry'], {
    error: 'Please select a support type',
  }),
  message: z.string().optional(),
  terms: z.literal(true, {
    error: 'You must agree to the terms and conditions',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Contact Info Items ───────────────────────────────────────────────────────

const contactItems = [
  { icon: Mail, label: 'Email', value: 'bharath.b@lailanutra.com', href: 'mailto:bharath.b@lailanutra.com' },
  { icon: Phone, label: 'Phone', value: '+91-8331893714', href: 'tel:+918331893714' },
  { icon: Globe, label: 'LinkedIn', value: 'lailanutra', href: 'https://www.linkedin.com/company/lailanutra.com/posts/?feedView=all' },
  { icon: MapPin, label: 'Location', value: 'Vijayawada, India', href: null },
  { icon: Clock, label: 'Working Hours', value: 'Mon – Sat: 9:00 am – 6:00 pm', href: null },
];

// ─── Shared field classes ─────────────────────────────────────────────────────

const baseField =
  'w-full bg-transparent border border-transparent rounded-sm px-3 @4xl:px-4 py-2.5 @4xl:py-3 contact-input text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline outline-textSecondary/50 focus:outline-blue';

// ─── Page ────────────────────────────────────────────────────────────────────

const ContactPage: React.FC = () => {
  const [submitState, setSubmitState] = React.useState<"idle" | "loading" | "success">("idle");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  const termsChecked = watch('terms');

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitState("loading");

      console.log('Form submitted:', data);
      await new Promise((r) => setTimeout(r, 800));

      setSubmitState("success");

      setTimeout(() => {
        setSubmitState("idle");
      }, 300);
    } catch (e) {
      setSubmitState("idle");
    }
  };

  const onError = (errors: any) => {
    const firstError = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstError}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main className="@container relative min-h-screen w-full overflow-x-hidden footer-bg pt-26 sm:pt-28 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 py-12 sm:py-16 items-center">

      {/* LEFT */}
      <div className="flex flex-col gap-10 lg:gap-15 col-span-4 sm:col-span-12 md:col-span-5">
        <h3 className="text-white text-heading1 font-semibold leading-[124%] tracking-[-2%]">
          Contact Us
        </h3>

        <div className="hidden flex-col gap-7.5 md:flex">
          {contactItems.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Icon size={18} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-white/50 text-text18 tracking-[-2%] font-medium">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-text16 text-white hover:text-blue-300 transition-colors duration-200 break-all"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-text16 text-white">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-4 sm:col-span-12 md:col-span-7 @6xl:max-w-[90%] @6xl:ml-auto mt-10 md:mt-0">
        <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 lg:p-[30px] xl:p-10">

          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="contact-label font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input {...register('name')} type="text" placeholder="Your full name" className={baseField} />
              {(touchedFields.name || isSubmitted) && errors.name && (
                <p className="error-msg text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="contact-label font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className={baseField}
                  maxLength={10}
                  onInput={(e: any) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  }}
                />
                {(touchedFields.phone || isSubmitted) && errors.phone && (
                  <p className="error-msg text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="contact-label font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input {...register('email')} type="email" placeholder="you@example.com" className={baseField} />
                {(touchedFields.email || isSubmitted) && errors.email && (
                  <p className="error-msg text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Support Type */}
            <div className="flex flex-col gap-1.5">
              <label className="contact-label font-medium text-gray-700">
                Support Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register('supportType')} defaultValue="" className={`${baseField} appearance-none pr-10 cursor-pointer`}>
                  <option value="" disabled>Select support type</option>
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
            <div className="flex flex-col gap-1.5">
              <label className="contact-label font-medium text-gray-700">Message</label>
              <textarea {...register('message')} rows={4} placeholder="Write your message here…" className={`${baseField} resize-none`} />
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setValue('terms', termsChecked ? (undefined as any) : true, { shouldValidate: true })
                }
                className="flex items-start gap-3 group w-fit outline-none focus:outline-none focus:ring-0 focus:border-none border-none focus-visible:outline-none"
              >
                {termsChecked ? <CheckSquare size={20} className="text-blue" /> : <Square size={20} className="text-gray-400" />}
                <span className="contact-label text-gray-700">
                  I agree to the{' '} terms and conditions
                </span>
              </button>
              <input type="hidden" {...register('terms')} />
              {(touchedFields.terms || isSubmitted) && errors.terms && (
                <p className="error-msg text-red-500">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-1">
              <CTA
                ctaContent={
                submitState === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    "Submitting…"
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

      </div>
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-7.5 md:hidden col-span-4 sm:col-span-12 mt-10">
        {contactItems.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-3 col-span-4 sm:col-span-6">
            <div className="shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Icon size={18} className="text-white" strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white/50 text-text18 tracking-[-2%] font-medium">
                {label}
              </span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-text16 text-white hover:text-blue-300 transition-colors duration-200 break-all"
                >
                  {value}
                </a>
              ) : (
                <span className="text-text16 text-white">{value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ContactPage;