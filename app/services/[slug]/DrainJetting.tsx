import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import BookingForm from '../../../components/BookingForm';
import { business } from '../../../lib/business';
import styles from './drain-jetting.module.css';

const title = 'Drain Line Jetting Services in Dubai';
const description = 'Drain line jetting services in Dubai for residential and commercial properties. Clear grease, sludge and stubborn blockages. Contact Eco Clean UAE.';
const url = new URL('/services/drain-line-jetting', business.url).href;

export const drainJettingMetadata = {
  title: { absolute: title + ' | Eco Clean UAE' },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website' as const },
};

const signs = [
  'Water draining slowly from sinks or floor drains',
  'Recurring drain blockages',
  'Unpleasant odors near drainage points',
  'Standing water or wastewater backing up',
];

const approach = [
  'High-pressure water jetting for suitable drains',
  'Grease, sludge and sediment removal',
  'Residential and commercial drain cleaning',
  'Guidance on ongoing drain maintenance',
];

const steps = [
  ['Discuss the issue', 'Share your location, property type and drainage symptoms.'],
  ['Assess the drain', 'Check the likely blockage and whether jetting is appropriate.'],
  ['Clean the line', 'Use suitable water pressure to dislodge and flush buildup.'],
  ['Review the result', 'Check drainage flow and discuss follow-up maintenance needs.'],
];

const frequentlyAskedQuestions = [
  ['What are drain line jetting services in Dubai?', 'Drain line jetting uses controlled high-pressure water to remove grease, sludge, sediment and debris from suitable residential and commercial drainage pipes.'],
  ['Is residential sewer jetting safe for my pipes?', 'It can be suitable for many drains, but pipe age, material and condition matter. Damaged or fragile pipes may require another approach.'],
  ['Can hydro jetting clear stubborn drain blockages?', 'Hydro jetting can clear many blockages caused by accumulated grease, sludge and sediment. Structural faults or collapsed pipes may need inspection and repair.'],
  ['Do you offer commercial drain jetting in Dubai?', 'Eco Clean UAE accepts enquiries for commercial drain jetting at restaurants, offices and other commercial facilities in Dubai, subject to the property and drainage system requirements.'],
  ['How do I request a drain cleaning service?', 'Call ' + business.phoneLabel + ' or use the enquiry form with your Dubai location, property type and a brief description of the blockage.'],
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': business.url + '#organization',
      name: 'Eco Clean UAE',
      url: business.url,
      telephone: business.phone,
      email: business.email,
      sameAs: [business.instagram, business.facebook],
    },
    {
      '@type': 'Service',
      '@id': url + '#service',
      name: title,
      serviceType: 'High-pressure drain line jetting and blockage removal',
      areaServed: { '@type': 'City', name: 'Dubai' },
      provider: { '@id': business.url + '#organization' },
      audience: { '@type': 'Audience', audienceType: 'Residential and commercial property customers' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: frequentlyAskedQuestions.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  ],
};

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className={`detail-list ${styles.list}`}>
      {items.map(item => <li key={item}><CheckCircle2 size={22} aria-hidden="true" />{item}</li>)}
    </ul>
  );
}

export default function DrainJetting() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="detail-hero detail-hero-with-photo">
        <div className="section-container">
          <Link href="/#services" className="back-link"><ArrowLeft size={17} /> All services</Link>
          <div className="detail-hero-grid">
            <div>
              <span className="eyebrow light">ECO CLEAN UAE · DUBAI</span>
              <h1>Drain Line <em>Jetting</em> Services in Dubai</h1>
              <p>Professional high-pressure drain cleaning for residential and commercial properties. Address stubborn blockages, grease, sludge and sediment with a cleaning method suited to your drainage system.</p>
              <div className={styles.actions}>
                <a href="#drain-booking" className="btn btn-primary">Book a drain cleaning <ArrowUpRight size={19} /></a>
                <a href={`tel:${business.phone}`}>Call {business.phoneLabel}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-hero-photo">
          <Image src="/assets/hero-drain-jetting-dubai.webp" alt="Technician operating high-pressure drain jetting equipment at a Dubai property" fill priority sizes="100vw" />
        </div>
      </section>

      <section className="section-pad detail-content">
        <div className="section-container detail-two-col">
          <div>
            <span className="eyebrow">SPOT THE PROBLEM</span>
            <h2>What to <em>look for.</em></h2>
            <p>Blocked drains can interrupt a home or business. These signs may indicate buildup in a drain or sewer line.</p>
            <DetailList items={signs} />
          </div>
          <div>
            <span className="eyebrow">OUR APPROACH</span>
            <h2>How we <em>help.</em></h2>
            <p>We assess the issue and recommend an appropriate cleaning approach for the pipework and blockage.</p>
            <DetailList items={approach} />
          </div>
        </div>
      </section>

      <section className={`section-pad ${styles.soft}`}>
        <div className="section-container detail-two-col">
          <div>
            <span className="eyebrow">WHAT WE DO</span>
            <h2>High-pressure drain cleaning that gets to the <em>buildup.</em></h2>
            <p>Hydro jet drain cleaning directs controlled pressurized water into suitable drain lines to loosen accumulated grease, soap residue, sediment and other material. Jetting can also help wash deposits from the inner pipe walls.</p>
            <p>The right pressure and method depend on the pipe’s condition. Damaged or collapsed pipework may need inspection or repair instead.</p>
            <a href="#drain-booking" className="btn btn-primary">Request a quote <ArrowUpRight size={19} /></a>
          </div>
          <Image className={styles.supportingImage} src="/assets/hydro-jet-drain-cleaning.webp" alt="Technician cleaning a drainage access point with water jetting equipment" width={1448} height={1086} sizes="(max-width: 780px) 90vw, 45vw" />
        </div>
      </section>

      <section className="section-pad">
        <div className="section-container">
          <span className="eyebrow">WHO WE HELP</span>
          <h2>Drain jetting for <em>everyday properties.</em></h2>
          <div className="detail-two-col">
            <article className={styles.card}>
              <h3>Commercial Drain Jetting Dubai</h3>
              <p>Restaurants, commercial kitchens, hotels, offices and warehouses rely on reliable wastewater flow. Grease, food waste and sediment can gradually restrict drain lines and cause repeat disruptions.</p>
              <h4>Commercial kitchen drains</h4>
              <p>High-pressure jetting may help clear grease deposits and debris from suitable commercial kitchen drainage systems.</p>
              <h4>Building and industrial drains</h4>
              <p>Jetting can address sludge and sediment in suitable wastewater lines, based on the material present and system condition.</p>
            </article>
            <article className={styles.card}>
              <h3>Residential Sewer Jetting</h3>
              <p>Villas, apartments and residential buildings can develop blocked pipes from soap residue, grease, sand and everyday debris. Our residential sewer jetting enquiries cover indoor and outdoor drainage problems.</p>
              <h4>Villa and apartment drain cleaning</h4>
              <p>Stubborn clogged pipe cleaning may help restore normal flow in suitable kitchen, bathroom and shared drain lines.</p>
              <h4>Outdoor drainage cleaning</h4>
              <p>Sand, mud and leaves may accumulate in outdoor drainage points, where water jetting can help remove accessible buildup.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`section-pad ${styles.soft}`}>
        <div className="section-container detail-two-col">
          <div>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>Hydro Jet Drain <em>Cleaning</em></h2>
            <p>Controlled high-pressure water is delivered through a suitable nozzle to break up deposits and flush loosened debris along the drainage line. The cleaning setup is selected after considering the access point and pipe condition.</p>
            <h3>Drain Blockage Removal</h3>
            <p>From grease buildup to compacted sludge, the goal is to restore effective wastewater flow where jetting is suitable. Severe damage and collapsed pipework may need repair.</p>
          </div>
          <div className={styles.card}>
            <h3>Our 4-step process</h3>
            <ol className={styles.steps}>
              {steps.map(([step, detail]) => <li key={step}><strong>{step}</strong><p>{detail}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className={`section-container ${styles.faq}`}>
          <span className="eyebrow">FREQUENT QUESTIONS</span>
          <h2>Drain jetting <em>FAQs.</em></h2>
          {frequentlyAskedQuestions.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="booking-section section-pad" id="drain-booking">
        <div className="section-container booking-grid">
          <div className="booking-intro">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Ready for <em>peace of mind?</em></h2>
            <p>Blocked drains at your home or workplace? Tell us what is happening and we can discuss the next step for your Dubai property.</p>
            <div className={styles.actions}>
              <a href={`tel:${business.phone}`}>Call {business.phoneLabel}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>
          <BookingForm initialService="Drain Line Jetting" />
        </div>
      </section>
    </main>
  );
}
