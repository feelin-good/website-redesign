import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Linkedin, Youtube, Twitter } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { ContactForm } from '@/components/sections/ContactForm'
import { Map, MapMarker, MarkerContent, MarkerLabel } from '@/components/ui/map'
import { COMPANY } from '@/lib/data/company'

const OFFICES = [
  {
    city: 'Ghaziabad (HQ)',
    address: 'Lepton House, NH-9, Loni, Ghaziabad — 201102',
    phone: '+91-120-2612-0000',
    email: 'contact@lepton.co.in',
    longitude: 77.3574,
    latitude: 28.6275,
  },
  {
    city: 'Delhi',
    address: '405, Plot A-23, Institutional Area, Phase II, Delhi — 110016',
    phone: '+91-11-4010-0000',
    email: 'delhi@lepton.co.in',
    longitude: 77.2512,
    latitude: 28.5491,
  },
]

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Lepton Projects Pvt. Ltd. — our engineering team responds within 24 hours. Offices in Ghaziabad (HQ) and Delhi.',
}

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
                <div className="bg-white rounded-card border border-ghost-white shadow-humble p-7">
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
                <div className="bg-obsidian rounded-card p-6 border border-obsidian/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-electric-orange rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-electric-orange uppercase tracking-widest">
                      Response Guarantee
                    </span>
                  </div>
                  <p className="text-white font-semibold mb-2">Within 24 Business Hours</p>
                  <p className="text-sm text-granite">
                    Every enquiry is reviewed by a senior engineer who will reach out to
                    understand your requirements before proposing next steps.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-white rounded-card border border-alabaster shadow-humble p-8 lg:p-10">
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
      <section className="section-py bg-white">
        <div className="container-main">
          <SectionHeader
            tag="Our Offices"
            title="Engineering Hubs Across India"
            description="Strategically located offices to serve clients across India's major industrial and commercial centers."
            align="center"
            className="mb-12 mx-auto"
          />
          <div className="grid sm:grid-cols-2 gap-8">
            {OFFICES.map((office, i) => (
              <AnimateOnScroll key={office.city} animation="fade-up" delay={i * 80}>
                <div className="bg-ghost-white rounded-card border border-alabaster overflow-hidden
                                hover:border-alabaster hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  {/* Map */}
                  <div className="h-48 bg-ghost-white relative">
                    <Map center={[office.longitude, office.latitude]} zoom={13}>
                      <MapMarker longitude={office.longitude} latitude={office.latitude}>
                        <MarkerContent>
                          <div className="w-8 h-8 bg-electric-orange rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                            L
                          </div>
                        </MarkerContent>
                        <MarkerLabel>{office.city}</MarkerLabel>
                      </MapMarker>
                    </Map>
                  </div>
                  {/* Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-electric-orange" />
                      <h3 className="font-display font-bold text-obsidian">{office.city}</h3>
                    </div>
                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-start gap-2">
                        <MapPin size={13} className="text-electric-orange mt-0.5 shrink-0" />
                        <p className="text-xs text-granite leading-snug">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-electric-orange shrink-0" />
                        <a href={`tel:${office.phone}`}
                           className="text-xs text-granite hover:text-electric-orange transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-electric-orange shrink-0" />
                        <a href={`mailto:${office.email}`}
                           className="text-xs text-granite hover:text-electric-orange transition-colors">
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
