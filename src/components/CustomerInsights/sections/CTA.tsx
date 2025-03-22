import React from 'react';

const SecuritySection = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl text-sand">{icon}</span>
      <h4 className="text-lg font-semibold text-sand">{title}</h4>
    </div>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </div>
);

const CTA = () => {
  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MmgtNHYtMnptMC04aDR2MmgtNHYtMnptMCAxNmg0djJoLTR2LTJ6bS0xMi0yNGg0djJoLTR2LTJ6bTAgOGg0djJoLTR2LTJ6bTAgMTZoNHYyaC00di0yen0iLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <span className="inline-block px-4 py-1 bg-background/20 rounded-full text-sand text-sm font-medium mb-8">
          GET STARTED TODAY
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Ready to Unlock Powerful Customer Insights?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join top companies using AI-driven insights to make smarter, data-backed decisions.
        </p>
        <div className="max-w-md mx-auto space-y-4">
          <a 
            href="mailto:i@q0.ai?subject=Start Free Trial&body=Hi,%0D%0A%0D%0AI'd like to start a free trial of your customer insights platform.%0D%0A%0D%0ABest regards"
            className="block w-full px-8 py-4 bg-background text-black font-medium rounded-lg hover:bg-background/90 transition-all text-center"
          >
            Start Free Trial
          </a>
        </div>
        {/* <p className="mt-4 text-sm text-gray-400">No credit card required</p> */}
        <p className="mt-4 text-sm text-gray-400">No credit card required. No obligations.</p>

        <form className="max-w-md mx-auto space-y-4">
          {/* <input
            type="email"
            placeholder="Get started in seconds—enter your email"
            className="w-full px-6 py-4 bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-sand"
          /> */}
          <ul className="text-left pt-4 space-y-2 text-sm text-gray-300 mb-4">
            <li className="flex items-center gap-2">
              <span className="text-sand">✓</span>
              <span>AI-powered analysis of customer feedback</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sand">✓</span>
              <span>Real-time insights for better decisions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sand">✓</span>
              <span>Easy setup in minutes—no coding required</span>
            </li>
          </ul>
          {/* <button className="w-full px-8 py-4 bg-background text-black font-medium rounded-lg 
            transition-all duration-300 ease-in-out
            hover:bg-background/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5
            active:scale-[0.98] active:shadow-sm">
            Start Your Free Trial Today
          </button> */}
        </form>
        
        {/* Security and Privacy Section
        <div className="mt-24 text-left border-t border-white/10 pt-16">
          <h3 className="text-3xl font-bold mb-12 text-center">Security and Privacy Commitment</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <SecuritySection
              icon="🔒"
              title="Security You Can Trust"
              description="At Q0 AI, the security of your data is our top priority. We use industry-leading measures, including AES-256 encryption for data at rest and TLS encryption for data in transit, to ensure your information remains safe."
            />
            
            <SecuritySection
              icon="🛡️"
              title="Privacy by Design"
              description="Our platform is designed with privacy at its core. We collect only the data necessary to deliver the best experience and ensure it's handled responsibly, securely, and in compliance with industry best practices."
            />
            
            <SecuritySection
              icon="📊"
              title="Customer Data Ownership"
              description="You own your data. We do not sell or share your information with third parties. Our role is to process it securely to provide the services you expect."
            />
            
            <SecuritySection
              icon="✅"
              title="Actively Pursuing SOC 2 Certification"
              description="We are in the process of obtaining SOC 2 certification, a globally recognized standard for data security, availability, confidentiality, and privacy. This ensures our platform meets the highest standards for safeguarding your data."
            />
            
            <SecuritySection
              icon="📜"
              title="Committed to GDPR and CCPA Compliance"
              description="We align our practices with global privacy regulations, including GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act). This means you have control over your data, and we're transparent about how it's used."
            />
            
            <SecuritySection
              icon="🔍"
              title="Regular Audits and Assessments"
              description="To stay ahead of evolving security challenges, we conduct regular security audits and assessments to identify and mitigate potential risks."
            />
            
            <SecuritySection
              icon="⚖️"
              title="Your Rights, Our Responsibility"
              description="We empower you to access, modify, or delete your personal data at any time. If you have questions about how your data is handled, contact us at [support@example.com]."
            />
            
            <SecuritySection
              icon="📡"
              title="Incident Response and Monitoring"
              description="Our systems are monitored 24/7 to ensure reliability and detect threats early. We have robust incident response processes to address any security issues promptly and effectively."
            />
            
            <SecuritySection
              icon="☁️"
              title="State-of-the-Art Infrastructure"
              description="We partner with leading cloud providers such as AWS, GCP, and Azure to deliver a secure and reliable platform, ensuring 99.9% uptime."
            />
            
            <SecuritySection
              icon="📈"
              title="Continuous Improvement"
              description="We are committed to continuously improving our security and privacy practices as we grow. Your trust drives our innovation."
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CTA; 