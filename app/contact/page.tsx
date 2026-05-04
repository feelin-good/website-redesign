import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Linkedin, Youtube, Twitter } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { ContactForm } from '@/components/sections/ContactForm'
import { COMPANY } from '@/lib/data/company'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Lepton Projects Pvt. Ltd. — our engineering team responds within 24 hours. Offices in Pune, Mumbai, Bangalore, Hyderabad, and Delhi.',
}

const OFFICES = [
  {
    city: 'Pune (HQ)',
    address: '4th Floor, Lepton House, Baner Road, Pune — 411045',
    phone: '+91-20-2612-0000',
    email: 'pune@lepton.co.in',
  },
  {
    city: 'Mumbai',
    address: '12th Floor, One BKC, Bandra Kurla Complex, Mumbai — 400051',
    phone: '+91-22-6120-0000',
    email: 'mumbai@lepton.co.in',
  },
  {
    city: 'Bengaluru',
    address: 'Level 6, Prestige Tower, Lavelle Road, Bengaluru — 560001',
    phone: '+91-80-4120-0000',
    email: 'bangalore@lepton.co.in',
  },
  {
    city: 'Hyderabad',
    address: '5th Floor, Cyber Towers, HITEC City, Hyderabad — 500081',
    phone: '+91-40-4012-0000',
    email: 'hyderabad@lepton.co.in',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-lab-grid opacity-70" />
        <div className="container-main relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-electric
                             uppercase tracking-[0.22em] mb-4 font-label">
              <span className="w-6 h-0.5 bg-electric rounded-full" />
              Contact Us
            </span>
            <h1 className="font-display font-semibold text-obsidian mb-5"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
              Let's Start the Engineering Conversation
            </h1>
            <p className="text-lg text-granite leading-relaxed">
              Our engineering team typically responds within one business day.
              Share your project details and we'll get the right specialist in touch with you.
            </p>
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="section-py bg-alabaster">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-4 space-y-6">
              <AnimateOnScroll animation="slide-right">
                <div className="bg-canvas rounded-card shadow-lab p-7">
                  <h2 className="font-display font-semibold text-lg text-obsidian mb-5">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost rounded-control flex items-center justify-center shrink-0">
                        <Phone size={16} className="text-electric" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-[0.22em] mb-0.5 font-label">Phone</p>
                        <a href={`tel:${COMPANY.phone}`}
                           className="text-obsidian font-medium hover:text-electric transition-colors">
                          {COMPANY.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost rounded-control flex items-center justify-center shrink-0">
                        <Mail size={16} className="text-electric" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-[0.22em] mb-0.5 font-label">Email</p>
                        <a href={`mailto:${COMPANY.email}`}
                           className="text-obsidian font-medium hover:text-electric transition-colors">
                          {COMPANY.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost rounded-control flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-electric" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-[0.22em] mb-0.5 font-label">Head Office</p>
                        <p className="text-obsidian font-medium text-sm leading-snug">
                          {COMPANY.address.street},<br />
                          {COMPANY.address.city} — {COMPANY.address.pin}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost rounded-control flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-electric" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-[0.22em] mb-0.5 font-label">Business Hours</p>
                        <p className="text-obsidian font-medium text-sm">
                          Mon–Fri, 9:00 AM – 6:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="mt-6 pt-6 border-t border-alabaster">
                    <p className="text-xs text-granite uppercase tracking-[0.22em] mb-3 font-label">Follow Us</p>
                    <div className="flex gap-2">
                      {[
                        { href: COMPANY.social.linkedin, icon: <Linkedin size={15} />, label: 'LinkedIn' },
                        { href: COMPANY.social.twitter,  icon: <Twitter size={15} />,  label: 'Twitter' },
                        { href: COMPANY.social.youtube,  icon: <Youtube size={15} />,  label: 'YouTube' },
                      ].map(({ href, icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                           aria-label={label}
                           className="w-9 h-9 rounded-control bg-ghost border border-alabaster
                                      flex items-center justify-center text-granite
                                      hover:bg-ink hover:border-ink hover:text-canvas
                                      transition-all duration-200">
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Response promise */}
              <AnimateOnScroll animation="slide-right" delay={100}>
                <div className="bg-ink rounded-card p-6 shadow-lab">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-electric uppercase tracking-[0.22em] font-label">
                      Response Guarantee
                    </span>
                  </div>
                  <p className="text-canvas font-semibold mb-2">Within 24 Business Hours</p>
                  <p className="text-sm text-canvas/70">
                    Every enquiry is reviewed by a senior engineer who will reach out to
                    understand your requirements before proposing next steps.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-canvas rounded-card shadow-lab p-8 lg:p-10">
                  <SectionHeader
                    tag="Send a Message"
                    title="Tell Us About Your Project"
                    description="Fill in the form and our engineering team will get back to you within one business day."
                    className="mb-8"
                  />
                  <ContactForm />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <SectionHeader
            tag="Our Offices"
            title="Pan-India Engineering Presence"
            description="Five offices strategically located to serve clients across India's major industrial and commercial hubs."
            align="center"
            className="mb-12 mx-auto"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICES.map((office, i) => (
              <AnimateOnScroll key={office.city} animation="fade-up" delay={i * 80}>
                <div className="bg-ghost rounded-card p-6 h-full shadow-lab
                                hover:-translate-y-0.5 transition-all duration-200">
                  {/* City header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-electric" />
                    <h3 className="font-display font-semibold text-obsidian">{office.city}</h3>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin size={13} className="text-electric mt-0.5 shrink-0" />
                      <p className="text-xs text-granite leading-snug">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-electric shrink-0" />
                      <a href={`tel:${office.phone}`}
                         className="text-xs text-granite hover:text-obsidian transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-electric shrink-0" />
                      <a href={`mailto:${office.email}`}
                         className="text-xs text-granite hover:text-obsidian transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
