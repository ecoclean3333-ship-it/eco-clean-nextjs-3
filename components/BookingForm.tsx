'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { business } from '../lib/business';
import { services } from '../lib/data';

export default function BookingForm() {
  const [prepared, setPrepared] = useState(false);

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = 'Eco Clean service enquiry: ' + form.get('service');
    const body = [
      'Name: ' + form.get('name'),
      'Phone: ' + form.get('phone'),
      'Service: ' + form.get('service'),
      'Property type: ' + form.get('property'),
      'Message: ' + form.get('message'),
    ].join('\n');

    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }

  return (
    <div className="booking-card">
      <h3>Let’s Get Your Space <em>Taken Care Of.</em></h3>
      <p>Share your service requirements and location. Our team will review your enquiry and contact you about the next steps. Your email app will open to send the request.</p>
      <form onSubmit={prepareEnquiry}>
        <div className="field-row">
          <label>Full Name<input name="name" autoComplete="name" required /></label>
          <label>Phone Number<input name="phone" type="tel" autoComplete="tel" placeholder="+971 …" required /></label>
        </div>
        <div className="field-row">
          <label>
            Service Required
            <select name="service" required defaultValue="">
              <option value="" disabled>Choose a service</option>
              {services.map(service => <option key={service.slug}>{service.name}</option>)}
            </select>
          </label>
          <label>
            Property Type
            <select name="property" defaultValue="Home">
              <option>Home</option><option>Office</option><option>Restaurant</option><option>Other</option>
            </select>
          </label>
        </div>
        <label>Your Message<textarea name="message" rows={3} placeholder="Include your location and any service details." /></label>
        <button type="submit" className="btn btn-primary form-submit">Request a Service <ArrowUpRight size={18} /></button>
        <p role="status" className="form-notice" hidden={!prepared}><CheckCircle2 size={16} /> Send the prepared request from your email app.</p>
      </form>
    </div>
  );
}
