import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, MoveRight, ShieldCheck, Sparkles } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import HowItWorks from '../components/HowItWorks';
import Reveal from '../components/Reveal';
import ServiceIcon from '../components/ServiceIcon';
import { business } from '../lib/business';
import { services } from '../lib/data';

export const metadata: Metadata = {
  title: { absolute: 'Cleaning & Maintenance Services in UAE | Eco Clean' },
  description: 'Eco Clean provides drain jetting, tank cleaning, wastewater tanker, AC duct cleaning, grease trap cleaning and pest control services across the UAE.',
  alternates: { canonical: business.url },
  robots: { index: true, follow: true },
};

const organizationId = new URL('#organization', business.url).href;
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: business.name,
      url: business.url,
      telephone: business.phone,
      email: business.email,
      sameAs: [business.instagram, business.facebook],
    },
    {
      '@type': 'WebSite',
      '@id': new URL('#website', business.url).href,
      name: business.name,
      url: business.url,
      publisher: { '@id': organizationId },
    },
  ],
};

const benefits = [
  {
    icon: '✦',
    title: 'Clear Communication',
    description: 'We take the time to understand your requirements and explain the recommended service approach.',
  },
  {
    icon: '✳',
    title: 'Care for Your Space',
    description: 'From drainage systems to ventilation and kitchen facilities, our services focus on the areas that need attention.',
  },
  {
    icon: '☼',
    title: 'Practical Maintenance Support',
    description: 'Our service approach considers both immediate cleaning needs and ongoing property maintenance.',
  },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <section className="hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-wash" />
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="hero-content">
          <Reveal>
            <span className="hero-kicker"><span className="live-dot" /> ECO CLEAN UAE</span>
            <h1>Professional Cleaning &amp; Maintenance Services <em>in the UAE</em></h1>
            <p>From drain line jetting and tank cleaning to AC duct cleaning and pest control, Eco Clean provides practical cleaning and maintenance solutions for residential and commercial properties across the UAE.</p>
            <div className="hero-buttons">
              <Link href="#booking" className="btn btn-primary">Book a Visit <ArrowUpRight size={19} /></Link>
              <Link href="#services" className="btn btn-outline">Explore Services <ArrowDown size={18} /></Link>
            </div>
          </Reveal>
        </div>
        <div className="hero-bottom">
          <div className="hero-scroll"><span className="scroll-line" /> SCROLL TO EXPLORE</div>
          <div className="hero-trust"><ShieldCheck size={20} /><span>Cleaning &amp; maintenance<br /><b>For homes &amp; businesses</b></span></div>
        </div>
      </section>

      <section className="intro-strip" aria-label="Service categories">
        <div className="strip-inner">
          <span>ECO CLEAN UAE</span><div className="strip-divider" />
          <strong>Cleaning &amp; maintenance</strong><div className="strip-divider" />
          <strong>Wastewater management</strong><div className="strip-divider" />
          <span>Pest control</span>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-container">
          <Reveal className="section-heading">
            <h2>Every Space Deserves Care.<br /><em>Our Services.</em></h2>
            <p>Explore our professional cleaning, drainage, wastewater management and pest control services for homes, businesses and industrial facilities across the UAE.</p>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 4) * .06}>
                <Link href={'/services/' + service.slug} className="service-card">
                  <div className="service-card-top"><ArrowUpRight size={23} /></div>
                  <div className="service-illustration" aria-hidden="true"><span><ServiceIcon slug={service.slug} size={76} /></span></div>
                  <div className="service-card-bottom"><h3>{service.name}</h3><p>{service.short}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="about-section section-pad" id="about">
        <div className="section-container about-grid">
          <Reveal>
            <div className="about-image">
              <Image src="/assets/hero-pest-control.png" alt="Eco Clean technician inspecting a living room" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: '75% center' }} />
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <h2>A Clean Space.<br /><em>A Better Environment.</em></h2>
            <p id="about-eco-clean">Eco Clean provides professional cleaning and maintenance services for residential, commercial and industrial properties across the UAE. Our services cover drainage systems, water and wastewater tanks, ventilation systems, commercial kitchens and pest-related concerns.</p>
            <p>We focus on understanding each property’s requirements and recommending practical solutions that support cleanliness, hygiene and ongoing maintenance.</p>
            <div className="about-points">
              <span><Check size={18} /> Property-focused cleaning solutions</span>
              <span><Check size={18} /> Residential and commercial services</span>
              <span><Check size={18} /> Practical maintenance support</span>
            </div>
            <Link href="#about-eco-clean" className="text-arrow">Learn More About Eco Clean <MoveRight size={21} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="reviews-section section-pad" id="reviews">
        <div className="section-container">
          <Reveal className="section-heading">
            <h2>More Care for Your Property.<br /><em>Less Worry.</em></h2>
            <p>Keeping your property clean and well-maintained should be straightforward. Eco Clean offers a range of cleaning and maintenance services that address the needs of homes, commercial kitchens, workplaces and industrial facilities.</p>
          </Reveal>
          <div className="review-grid">
            {benefits.map((benefit, index) => (
              <Reveal delay={index * .08} key={benefit.title}>
                <article className="review-card">
                  <span className="review-star" aria-hidden="true">{benefit.icon}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="career-teaser">
        <div className="section-container career-teaser-grid">
          <div>
            <span className="eyebrow light">GROW WITH ECO CLEAN ✳</span>
            <h2>Good people.<br /><em>Great purpose.</em></h2>
            <p>Build a cleaner, healthier future alongside a team that cares about the details.</p>
          </div>
          <Link href="/careers" className="round-link" aria-label="Explore Eco Clean careers"><ArrowUpRight size={34} /></Link>
        </div>
        <div className="career-decoration" aria-hidden="true">CAREERS ✳ CAREERS ✳ CAREERS</div>
      </section>

      <section className="booking-section section-pad" id="booking">
        <div className="section-container booking-grid">
          <Reveal className="booking-intro">
            <h2>Your Property Deserves <em>Professional Care.</em></h2>
            <p>Need drain line cleaning, wastewater removal, AC duct cleaning or pest control services in the UAE? Tell us what your property needs, and our team can help you explore the appropriate service.</p>
            <div className="booking-badges">
              <span><ShieldCheck size={17} /> Site-specific approach</span>
              <span><Sparkles size={17} /> Clear next steps</span>
            </div>
          </Reveal>
          <Reveal><BookingForm /></Reveal>
        </div>
      </section>
    </main>
  );
}
