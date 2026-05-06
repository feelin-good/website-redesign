'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SERVICES } from '@/lib/data/services'

const ENQUIRY_TYPES = [
  'New Project Enquiry',
  'Technical Consultation',
  'Quote / Proposal Request',
  'EPC / Turnkey Enquiry',
  'Partnership / Collaboration',
  'Career Enquiry',
  'Other',
]

interface FormState {
  name: string
  email: string
  phone: string
  company: string
  service: string
  enquiryType: string
  message: string
}

const INITIAL_STATE: FormState = {
  name: '', email: '', phone: '', company: '',
  service: '', enquiryType: '', message: '',
}

export function ContactForm() {
  const [form, setForm]         = useState<FormState>(INITIAL_STATE)
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [errors,     setErrors]     = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim())    newErrors.name    = 'Name is required'
    if (!form.email.trim())   newErrors.email   = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors(e => ({ ...e, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-ghost-white rounded-full flex items-center justify-center mb-5">
          <CheckCircle size={32} className="text-ink" />
        </div>
        <h3 className="font-display font-semibold text-xl text-ink mb-2">
          Message Received!
        </h3>
        <p className="text-granite max-w-sm">
          Thank you, <strong>{form.name.split(' ')[0]}</strong>. Our engineering team will review
          your enquiry and respond within one business day.
        </p>
        <button
          onClick={() => { setForm(INITIAL_STATE); setSubmitted(false) }}
          className="mt-6 text-sm font-semibold text-ink hover:text-granite transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-[6px] border text-ink placeholder:text-granite text-sm
     focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent
     transition-all duration-200
     ${errors[field] ? 'border-red-300 bg-red-50' : 'border-alabaster bg-white hover:border-granite/30'}`

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Raj Sharma"
            className={inputClass('name')}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Work Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="raj@company.com"
            className={inputClass('email')}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass('phone')}
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your Organisation"
            className={inputClass('company')}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Enquiry Type
          </label>
          <select
            name="enquiryType"
            value={form.enquiryType}
            onChange={handleChange}
            className={inputClass('enquiryType')}
          >
            <option value="">Select type...</option>
            {ENQUIRY_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Service of Interest
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={inputClass('service')}
          >
            <option value="">Select service...</option>
            {SERVICES.map(s => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-ink mb-1.5">
          Project Details <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Briefly describe your project — type of facility, scope, location, timeline, and any specific engineering challenges..."
          className={inputClass('message')}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-granite">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                     text-white font-semibold px-8 py-3.5 rounded-full
                     transition-all duration-200
                     disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
