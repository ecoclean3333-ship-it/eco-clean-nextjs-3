import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { business } from '../lib/business';
import { services } from '../lib/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Image src="/assets/ec-icon.png" alt="Eco Clean" width={82} height={55} />
          <h2>Cleaner Spaces.<br /><em>Better Care.</em></h2>
          <p>Professional cleaning, wastewater management and property maintenance services across the UAE.</p>
        </div>
        <div>
          <span className="footer-label">EXPLORE</span>
          <Link href="/">Home</Link>
          <Link href="/#about">About Us</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#reviews">Why Choose Us</Link>
          <Link href="/#booking">Contact Us</Link>
          <Link href="/careers">Careers</Link>
        </div>
        <div>
          <span className="footer-label">SERVICES</span>
          {services.slice(0, 5).map(service => <Link key={service.slug} href={'/services/' + service.slug}>{service.name}</Link>)}
        </div>
        <div>
          <span className="footer-label">LET’S TALK</span>
          <a href={'tel:' + business.phone}>{business.phoneLabel}</a>
          <a href={'mailto:' + business.email}>{business.email}</a>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <Link className="footer-cta" href="/#booking">Request a Visit <ArrowUpRight size={18} /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Eco Clean. All rights reserved.</span>
      </div>
    </footer>
  );
}
