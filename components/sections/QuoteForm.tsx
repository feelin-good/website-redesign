'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SERVICES } from '@/lib/data/services'
import { INDUSTRIES } from '@/lib/data/industries'

const PROJECT_STAGES = [
  'Concept / Feasibility',
  'Pre-FEED / Basis of Design',
  'Detailed Engineering',
  'Procurement',
  'Construction',
  'Commissioning',
  'Brownfield Expansion',
  'Not Sure',
]

const BUDGET_RANGES = [
  'Below ₹1 Crore',
  '₹1–5 Crores',
  '₹5–25 Crores',
  '₹25–100 Crores',
  '₹100–500 Crores',
  'Above ₹500 Crores',
  'Prefer not to say',
]

const TIMELINES = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  '1–2 years',
  '2+ years',
  'Flexible',
]

interface FormState {
  name: string; email: string; phone: string; company: string
  industry: string; services: string[]; projectStage: string
  budget: string; timeline: string; location: string; description: string
}

const INITIAL: FormState = {
  name: '', email: '', phone: '', company: '',
  industry: '', services: [], projectStage: '',
  budget: '', timeline: '', location: '', description: '',
}

export function QuoteForm() {
  const [form, setForm]             = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [errors,     setErrors]     = useState<Partial<Record<keyof FormState, string>>>({})

  const toggleService = (slug: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(slug)
        ? f.services.filter(s => s !== slug)
        : [...f.services, slug],
    }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim())     e.name    = 'Required'
    if (!form.email.trim())    e.email   = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.description.trim()) e.description = 'Please describe your project'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name as keyof FormState]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
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
        <h3 className="font-display font-semibold text-xl text-ink mb-2">Proposal Request Received!</h3>
        <p className="text-granite max-w-sm">
          Our team will review your brief and respond within 48 business hours to confirm
          receipt and schedule a discovery call.
        </p>
      </div>
    )
  }

  const ic = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-[6px] border text-sm text-ink placeholder:text-granite
     focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all
     ${errors[field] ? 'border-red-300 bg-red-50' : 'border-alabaster bg-white hover:border-granite/30'}`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Contact info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-granite mb-3">
          Contact Information
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'name',    label: 'Full Name *',    type: 'text',  placeholder: 'Your full name' },
            { name: 'email',   label: 'Work Email *',   type: 'email', placeholder: 'you@company.com' },
            { name: 'phone',   label: 'Phone',          type: 'tel',   placeholder: '+91 98765 43210' },
            { name: 'company', label: 'Organisation',   type: 'text',  placeholder: 'Company name' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-ink mb-1.5">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name as keyof FormState] as string}
                onChange={handleChange}
                placeholder={f.placeholder}
                className={ic(f.name as keyof FormState)}
              />
              {errors[f.name as keyof FormState] && (
                <p className="text-xs text-red-500 mt-1">{errors[f.name as keyof FormState]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-granite mb-3">
          Project Information
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Industry Sector</label>
            <select name="industry" value={form.industry} onChange={handleChange} className={ic('industry')}>
              <option value="">Select sector...</option>
              {INDUSTRIES.map(i => <option key={i.slug} value={i.slug}>{i.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Project Stage</label>
            <select name="projectStage" value={form.projectStage} onChange={handleChange} className={ic('projectStage')}>
              <option value="">Select stage...</option>
              {PROJECT_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Approximate Budget</label>
            <select name="budget" value={form.budget} onChange={handleChange} className={ic('budget')}>
              <option value="">Select range...</option>
              {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Project Timeline</label>
            <select name="timeline" value={form.timeline} onChange={handleChange} className={ic('timeline')}>
              <option value="">Select timeline...</option>
              {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1.5">Project Location</label>
            <input
              type="text" name="location" value={form.location} onChange={handleChange}
              placeholder="City, State" className={ic('location')}
            />
          </div>
        </div>

        {/* Services checkboxes */}
        <div>
          <p className="text-sm font-medium text-ink mb-2.5">Engineering Services Required</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SERVICES.map(s => (
              <label key={s.slug}
                     className={`flex items-center gap-2.5 p-3 rounded-[6px] border cursor-pointer
                                  transition-all duration-200 text-sm
                                  ${form.services.includes(s.slug)
                                    ? 'border-ink bg-ghost-white text-ink font-medium'
                                    : 'border-alabaster bg-white text-granite hover:border-granite/30'}`}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={form.services.includes(s.slug)}
                  onChange={() => toggleService(s.slug)}
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0
                                  transition-colors ${form.services.includes(s.slug)
                                    ? 'border-ink bg-ink'
                                    : 'border-granite/30'}`}>
                  {form.services.includes(s.slug) && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                {s.title}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Project Description <span className="text-red-400">*</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe your project: facility type, key technical challenges, scope of engineering required, and any specific standards or regulatory requirements..."
          className={ic('description')}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-granite">
          All information is kept strictly confidential. NDA available on request.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                     text-white font-semibold px-8 py-3.5 rounded-full
                     transition-all duration-200
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>
          ) : (
            <>Submit Request <ArrowRight size={16} /></>
          )}
        </button>
      </div>
    </form>
  )
}
