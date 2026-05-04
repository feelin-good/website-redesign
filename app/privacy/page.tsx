import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Lepton Projects Pvt. Ltd.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 bg-alabaster min-h-screen">
      <div className="container-main max-w-4xl">
        <h1 className="font-display font-semibold text-obsidian mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Privacy Policy
        </h1>
        <p className="text-granite mb-10">Last updated: January 2025</p>

        <div className="bg-canvas rounded-card border border-alabaster shadow-lab p-8 lg:p-12 prose-lepton space-y-8">
          <section>
            <h2 className="font-display font-semibold text-xl text-obsidian mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you fill in contact forms, request proposals, or communicate with us. This includes your name, email address, phone number, company name, and project details.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-obsidian mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to respond to your enquiries, provide engineering services, send relevant communications, and improve our website and service offerings.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-obsidian mb-3">3. Information Sharing</h2>
            <p>We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law or to trusted service providers who assist us in operating our website and delivering services.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-obsidian mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-obsidian mb-3">5. Contact Us</h2>
            <p>For privacy-related queries, contact us at <a href="mailto:privacy@lepton.co.in" className="text-electric hover:underline">privacy@lepton.co.in</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
