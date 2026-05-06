import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Phone, Mail, MapPin, Clock, Linkedin, Youtube, Twitter } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { ContactForm } from '@/components/sections/ContactForm'
import { COMPANY } from '@/lib/data/company'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Lepton Projects Pvt. Ltd. — our engineering team responds within 24 hours. Head office in Ghaziabad (NCR), with project presence across India.',
}

// Loaded client-side only — MapLibre uses browser WebGL APIs
const OfficeMap = dynamic(
  () => import('@/components/ui/OfficeMap').then(m => m.OfficeMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-ghost-white animate-pulse" /> }
)

const OFFICES = [
  {
    city: 'Ghaziabad — Head Office',
    address: 'Aditya Mega City, Vaibhav Khand, Indirapuram, Ghaziabad — 201014, U.P.',
    phone: COMPANY.phone,
    email: COMPANY.email,
    lat: 28.6275,
    lng: 77.3574,
  },
  {
    city: 'Delhi — Regional Office',
    address: 'Nehru Place Business Centre, New Delhi — 110019',
    phone: '+91-11-4000-0000',
    email: 'delhi@lepton.co.in',
    lat: 28.5491,
    lng: 77.2512,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ghost-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              Contact Us
            </span>
            <h1 className="font-display font-semibold text-ink mb-5"
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
      <section className="section-py bg-ghost-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-4 space-y-6">
              <AnimateOnScroll animation="slide-right">
                <div className="bg-canvas rounded-card border border-alabaster shadow-humble p-7">
                  <h2 className="font-display font-semibold text-lg text-ink mb-5">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost-white rounded-[6px] flex items-center justify-center shrink-0">
                        <Phone size={16} className="text-ink" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-wider mb-0.5">Phone</p>
                        <a href={`tel:${COMPANY.phone}`}
                           className="text-ink font-medium hover:text-granite transition-colors">
                          {COMPANY.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost-white rounded-[6px] flex items-center justify-center shrink-0">
                        <Mail size={16} className="text-ink" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-wider mb-0.5">Email</p>
                        <a href={`mailto:${COMPANY.email}`}
                           className="text-ink font-medium hover:text-granite transition-colors">
                          {COMPANY.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost-white rounded-[6px] flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-ink" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-wider mb-0.5">Head Office</p>
                        <p className="text-ink font-medium text-sm leading-snug">
                          {COMPANY.address.street},<br />
                          {COMPANY.address.city} — {COMPANY.address.pin}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-ghost-white rounded-[6px] flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-ink" />
                      </div>
                      <div>
                        <p className="text-xs text-granite uppercase tracking-wider mb-0.5">Business Hours</p>
                        <p className="text-ink font-medium text-sm">
                          Mon–Fri, 9:00 AM – 6:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="mt-6 pt-6 border-t border-alabaster">
                    <p className="text-xs text-granite uppercase tracking-wider mb-3">Follow Us</p>
                    <div className="flex gap-2">
                      {[
                        { href: COMPANY.social.linkedin, icon: <Linkedin size={15} />, label: 'LinkedIn' },
                        { href: COMPANY.social.twitter,  icon: <Twitter size={15} />,  label: 'Twitter' },
                        { href: COMPANY.social.youtube,  icon: <Youtube size={15} />,  label: 'YouTube' },
                      ].map(({ href, icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                           aria-label={label}
                           className="w-9 h-9 rounded-[6px] bg-ghost-white border border-alabaster
                                      flex items-center justify-center text-granite
                                      hover:bg-ink hover:border-ink hover:text-white
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
                <div className="bg-obsidian rounded-card p-6 border border-white/8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                      Response Guarantee
                    </span>
                  </div>
                  <p className="text-white font-semibold mb-2">Within 24 Business Hours</p>
                  <p className="text-sm text-white/60">
                    Every enquiry is reviewed by a senior engineer who will reach out to
                    understand your requirements before proposing next steps.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-canvas rounded-card border border-alabaster shadow-humble p-8 lg:p-10">
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

      {/* Offices with maps */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <SectionHeader
            tag="Our Offices"
            title="Where to Find Us"
            description="Headquartered in Ghaziabad (NCR) with a regional presence in Delhi and project site offices across India."
            align="center"
            className="mb-12 mx-auto"
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {OFFICES.map((office, i) => (
              <AnimateOnScroll key={office.city} animation="fade-up" delay={i * 120}>
                <div className="bg-canvas rounded-card border border-alabaster shadow-humble overflow-hidden
                                hover:shadow-[0_40px_40px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
                  {/* MapLibre map */}
                  <div className="h-48 relative overflow-hidden bg-ghost-white">
                    <OfficeMap lat={office.lat} lng={office.lng} zoom={13} className="w-full h-full" />
                  </div>

                  {/* Office info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-ink" />
                      <h3 className="font-display font-semibold text-ink">{office.city}</h3>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={13} className="text-granite mt-0.5 shrink-0" />
                        <p className="text-sm text-granite leading-snug">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone size={13} className="text-granite shrink-0" />
                        <a href={`tel:${office.phone}`}
                           className="text-sm text-granite hover:text-ink transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail size={13} className="text-granite shrink-0" />
                        <a href={`mailto:${office.email}`}
                           className="text-sm text-granite hover:text-ink transition-colors">
                          {office.email}
                        </a>
                      </div>
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
