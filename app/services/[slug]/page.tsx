import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import BookingForm from '../../../components/BookingForm';
import ServiceIcon from '../../../components/ServiceIcon';
import EcoCleanWaterTank3D from '../../../components/EcoCleanWaterTank3D';
import { business } from '../../../lib/business';
import { services } from '../../../lib/data';
import DrainJetting, { drainJettingMetadata } from './DrainJetting';
import { pestControl, pestControlMetadata, PestControlOverview, PestControlDetails } from './PestControlContent';
import styles from './pest-control.module.css';

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'drain-line-jetting') return drainJettingMetadata;
  if (slug === pestControl.slug) return pestControlMetadata;

  const service = services.find(item => item.slug === slug);
  return { title: service?.name ?? 'Service', description: service?.description };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  if (slug === 'drain-line-jetting') return <DrainJetting />;

  const isPestControl = slug === pestControl.slug;
  const name = service.name.split(' ');

  return (
    <main>
      <section className="detail-hero">
        <div className="section-container">
          <Link href="/#services" className="back-link"><ArrowLeft size={17} /> All services</Link>
          <div className="detail-hero-grid">
            <div>
              <span className="eyebrow light">ECO CLEAN · OUR SERVICES ✳</span>
              {isPestControl
                ? <h1 className={styles.heroTitle}>Pest Control <em>Services in Dubai</em></h1>
                : <h1>{name.slice(0, -1).join(' ')}<br /><em>{name.slice(-1)}</em></h1>}
              <p>{isPestControl ? pestControl.intro : service.description}</p>
              {isPestControl ? (
                <div className={styles.heroActions}>
                  <Link href="#pest-booking" className="btn btn-primary">Book a Pest Control Visit <ArrowUpRight size={19} /></Link>
                  <a href={`tel:${business.phone}`}>Call {business.phoneLabel}</a>
                </div>
              ) : (
                <Link href="/#booking" className="btn btn-primary">Book a visit <ArrowUpRight size={19} /></Link>
              )}
            </div>
            <div className="detail-emoji" aria-hidden="true">
              <span><ServiceIcon slug={slug} size={184} /></span>
              <div className="detail-ring ring-a" />
              <div className="detail-ring ring-b" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad detail-content">
        <div className="section-container">
          <div className="detail-two-col">
            <div>
              <span className="eyebrow">KNOW THE SIGNS ✳</span>
              <h2>What to <em>look for.</em></h2>
              <p>{isPestControl ? pestControl.signsIntro : 'Common signs that this service may be useful.'}</p>
              <div className="detail-list">
                {(isPestControl ? pestControl.signs : service.signs).map(sign => (
                  <div key={sign}><CheckCircle2 size={22} />{sign}</div>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">OUR APPROACH ✳</span>
              <h2>How we <em>help.</em></h2>
              <p>{isPestControl ? pestControl.approachIntro : 'The exact work depends on the site assessment and applicable local requirements.'}</p>
              <div className="detail-list">
                {(isPestControl ? pestControl.approach : service.approach).map((step, index) => (
                  <div key={step}><span className="list-number">0{index + 1}</span>{step}</div>
                ))}
              </div>
            </div>
          </div>
          {isPestControl && <PestControlOverview />}
        </div>
      </section>

      {slug === 'tank-cleaning' ? <EcoCleanWaterTank3D /> : (
        <section className="detail-image-band">
          <Image
            src={isPestControl ? pestControl.banner : '/assets/hero-pest-control.png'}
            alt={isPestControl ? pestControl.bannerAlt : 'Pest control professional at work'}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
          />
          <div><ShieldCheck size={28} /><h2>Cleaner spaces.<br />Better living.</h2></div>
        </section>
      )}

      {isPestControl && <PestControlDetails />}

      <section className="booking-section section-pad" id={isPestControl ? 'pest-booking' : undefined}>
        <div className="section-container booking-grid">
          <div className="booking-intro">
            <span className="eyebrow">LET'S FIX THIS ✳</span>
            {isPestControl ? <h2>Ready for a <em>pest-free space?</em></h2> : <h2>Ready for<br /><em>peace of mind?</em></h2>}
            <p>{isPestControl ? pestControl.bookingIntro : 'Tell us what’s happening and we’ll help you plan the next step.'}</p>
            {isPestControl && <a href={`tel:${business.phone}`}>Call {business.phoneLabel}</a>}
          </div>
          {isPestControl ? (
            <BookingForm
              initialService={service.name}
              instructions="Confirm Pest Control Service under Service Required, add your property type and location, and briefly describe the signs you have noticed. Your email app will open to send the request."
              submitLabel="Request Pest Control Service"
            />
          ) : <BookingForm />}
        </div>
      </section>
    </main>
  );
}
