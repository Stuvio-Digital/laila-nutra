"use client";
import React from 'react';
import {
  ChevronDown,
  Check,
  Square,
  CheckSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FadeUp from '@/components/FadeUp';
import CTA from '@/components/CTA';
import { useContactForm } from '@/hooks/useContactForm';
import { countryCodes } from '@/data/countryCodes';

const baseField =
  'w-full bg-transparent border border-transparent rounded-sm px-3 @4xl:px-4 py-2.5 @4xl:py-3 contact-input text-gray-900 placeholder:text-gray-400 placeholder:text-body transition-all duration-200 outline outline-textSecondary/50 focus:outline-blue';

const areaOfInterestSubText: Record<string, string> = {
  'Proprietary Ingredient Sourcing': 'Phyto-actives, standardised botanicals & validated raw materials',
  'CDMO & Contract Manufacturing': 'End-to-end formulation, scale-up, and turnkey production',
  'R&D & Co-Development': 'Translational science, custom formulation & IP co-creation',
  'Quality Assurance (QA)': 'Audits, CoA/SDS requests, testing & certification',
  'Regulatory & Compliance': 'Global market entry, safety dossiers & novel food submissions',
  'General / Other Inquiry': 'We’ll make sure your message reaches the right person',
};

const ContactPage: React.FC = () => {
  const {
    form: {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors, touchedFields, isSubmitted },
    },
    submitState,
    onSubmit,
    onError,
    resetSubmitState
  } = useContactForm();

  const relationshipType = watch('relationshipType');
  const areaOfInterest = watch('areaOfInterest');
  const termsChecked = watch('terms');

  const showBatchNumber = relationshipType === 'Existing Client / Partner' && 
                       (areaOfInterest === 'Quality Assurance (QA)' || areaOfInterest === 'Regulatory & Compliance');

  return (
    <main className="@container relative min-h-screen w-full overflow-x-hidden footer-bg pt-30 sm:pt-40 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 py-12 sm:py-16 my-auto gap-y-15 lg:gap-y-20">
      {/* Success Modal */}
      <AnimatePresence>
        {submitState === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Success!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Thank you, your enquiry has been received. Our team will be in touch shortly.
              </p>
              <button
                onClick={resetSubmitState}
                className="w-full py-4 bg-blue text-white rounded-xl font-bold hover:bg-blue/90 transition-all active:scale-95 shadow-lg shadow-blue/20"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT */}
      <FadeUp className="flex flex-col gap-6 lg:gap-10 col-span-4 sm:col-span-12 lg:col-span-6" delay={0.2}>
        <h1 className="text-white text-heading2 [@media(min-width:1536px)]:text-heading1 font-semibold leading-[110%] tracking-[-2%]">
          Precision Starts Here
        </h1>
        <p className="text-white/80 text-body [@media(min-width:1536px)]:text-bodyBase max-w-[90%] leading-[124%]">
          From validated botanicals to turnkey CDMO solutions, Laila Nutra works at the intersection of science and scale. Reach out to our team and let’s find the right solution for your market.
        </p>
      </FadeUp>

      {/* RIGHT */}
      <FadeUp className="col-span-4 sm:col-span-12 lg:col-span-6 [@media(min-width:1920px)]:max-w-[90%] [@media(min-width:1920px)]:ml-auto w-full mt-10 md:mt-0" delay={0.4}>
        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 sm:px-5 md:px-6 lg:px-7.5 xl:px-10 py-8 border-b border-borderColor">
            <p className="text-blue text-xs tracking-[-1%] font-bold mb-6">Get in Touch</p>
            <h2 className="text-black text-body leading-[124%] tracking-[-2%] mb-3">Whether you’re exploring an ingredient, scaling a formula, or entering a new market — the right conversation starts here.</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="gap-y-6 md:gap-y-7.5 gap-x-4 md:gap-x-5 lg:gap-x-7.5 grid grid-cols-2 px-4 sm:px-5 md:px-6 lg:px-7.5 xl:px-10 py-10">

            {/* Full Name */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input {...register('fullName')} type="text" placeholder="Your name" className={baseField} />
              {(touchedFields.fullName || isSubmitted) && errors.fullName && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Business Email */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Business Email <span className="text-red-500">*</span>
              </label>
              <input {...register('businessEmail')} type="email" placeholder="you@company.com" className={baseField} />
              {(touchedFields.businessEmail || isSubmitted) && errors.businessEmail && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.businessEmail.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-stretch border border-transparent rounded-sm contact-input transition-all duration-200 outline outline-textSecondary/50 focus-within:outline-blue overflow-hidden">
                <div className="relative border-r border-gray-200 shrink-0">
                  <select {...register('phoneCode')} className="h-full bg-transparent pl-3 pr-8 py-2.5 @4xl:py-3 appearance-none cursor-pointer text-body text-gray-700 outline-none border-none">
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.dial_code}>
                        {c.code} {c.dial_code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <input 
                  {...register('phone', {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, '');
                    }
                  })} 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-transparent px-3 py-2.5 @4xl:py-3 text-body text-gray-900 placeholder:text-gray-400 outline-none border-none" 
                />
              </div>
              {(touchedFields.phone || isSubmitted) && errors.phone && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Company / Organisation */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Company / Organisation <span className="text-red-500">*</span>
              </label>
              <input {...register('company')} type="text" placeholder="Your company name" className={baseField} />
              {(touchedFields.company || isSubmitted) && errors.company && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.company.message}</p>
              )}
            </div>

            {/* Job Title */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Job Title
              </label>
              <input {...register('jobTitle')} type="text" placeholder="e.g. Head of Procurement, R&D Director" className={baseField} />
            </div>

            {/* Relationship Type */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                You are a... <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register('relationshipType')} defaultValue="" className={`${baseField} appearance-none pr-10 cursor-pointer text-body`}>
                  <option value="" disabled>Select one</option>
                  <option value="New Partnership Inquiry">New Partnership Inquiry</option>
                  <option value="Existing Client / Partner">Existing Client / Partner</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              {(touchedFields.relationshipType || isSubmitted) && errors.relationshipType && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.relationshipType.message}</p>
              )}
            </div>

            {/* Region */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                Based in <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register('region')} defaultValue="" className={`${baseField} appearance-none pr-10 cursor-pointer text-body`}>
                  <option value="" disabled>Select your region</option>
                  <option value="North America (USA & Canada)">North America (USA & Canada)</option>
                  <option value="Europe & United Kingdom">Europe & United Kingdom</option>
                  <option value="Middle East & Africa">Middle East & Africa</option>
                  <option value="India & South Asia">India & South Asia</option>
                  <option value="Asia-Pacific (APAC)">Asia-Pacific (APAC)</option>
                  <option value="Latin America (LATAM)">Latin America (LATAM)</option>
                  <option value="Other / Global">Other / Global</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              {(touchedFields.region || isSubmitted) && errors.region && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.region.message}</p>
              )}
            </div>

            {/* Area of Interest */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="contact-label text-body font-medium text-gray-700">
                I'm looking for... <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register('areaOfInterest')} defaultValue="" className={`${baseField} appearance-none pr-10 cursor-pointer text-body`}>
                  <option value="" disabled>Select one</option>
                  <option value="Proprietary Ingredient Sourcing">Proprietary Ingredient Sourcing</option>
                  <option value="CDMO & Contract Manufacturing">CDMO & Contract Manufacturing</option>
                  <option value="R&D & Co-Development">R&D & Co-Development</option>
                  <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
                  <option value="Regulatory & Compliance">Regulatory & Compliance</option>
                  <option value="General / Other Inquiry">General / Other Inquiry</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              {areaOfInterest && areaOfInterestSubText[areaOfInterest] && (
                <p className="text-xs text-blue/70 italic mt-1 animate-fadeIn">{areaOfInterestSubText[areaOfInterest]}</p>
              )}
              {(touchedFields.areaOfInterest || isSubmitted) && errors.areaOfInterest && (
                <p className="error-msg text-red-500 text-xs mt-1">{errors.areaOfInterest.message}</p>
              )}
            </div>

            {/* Conditional Field: Batch Number */}
            {showBatchNumber && (
              <div className="flex flex-col gap-1.5 col-span-2 animate-fadeIn">
                <label className="contact-label text-body font-medium text-gray-700">
                  Batch / Lot Number or Request Type
                </label>
                <input {...register('batchNumber')} type="text" placeholder="e.g. LN-2024-00412 or 'Request COA'" className={baseField} />
              </div>
            )}

            {/* Message */}
            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="contact-label text-body font-medium text-gray-700">Tell us more</label>
              <textarea {...register('message')} rows={4} placeholder="Share any details about your project, timeline, or specific requirements" className={`${baseField} resize-none`} />
            </div>

            {/* Submit */}
            <div className="pt-4 col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {/* Terms / Privacy Policy */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setValue('terms', !termsChecked, { shouldValidate: true })
                    }
                    className="flex items-start gap-3 group w-fit outline-none text-left"
                  >
                    <div className="mt-0.5 shrink-0 transition-colors duration-200">
                      {termsChecked ? (
                        <CheckSquare size={18} className="text-blue" />
                      ) : (
                        <Square size={18} className="text-gray-400 group-hover:text-blue/50" />
                      )}
                    </div>
                    <p className="text-sm text-textSecondary tracking-tighter">
                      By submitting this form, you agree to our Privacy Policy. We do not share your information with third parties.
                    </p>
                  </button>
                  {(touchedFields.terms || isSubmitted) && errors.terms && (
                    <p className="error-msg text-red-500 text-[10px] mt-0.5">{errors.terms.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <CTA
                    ctaContent={
                      submitState === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting…
                        </span>
                      ) : submitState === "success" ? (
                        "Thank you!"
                      ) : (
                        "Send Enquiry"
                      )
                    }
                    as="button"
                    type="submit"
                    disabled={submitState === "loading"}
                    className="w-full justify-center cursor-pointer"
                  />
                </div>
                
                <p className="text-xs text-gray-500">
                  We typically respond within 1–2 business days. For urgent matters, email us directly at <a href="mailto:enquiry@lailanutra.com" className="text-blue hover:underline">enquiry@lailanutra.com</a>.
                </p>
              </div>
            </div>

          </form>
        </div>

      </FadeUp>
    </main>
  );
};

export default ContactPage;