import type { Metadata } from 'next';
import { business } from '../../../lib/business';
import styles from './pest-control.module.css';

export const pestControl = {
  slug: 'pest-control-service',
  title: 'Pest Control Services in Dubai',
  intro: 'Pests do not belong in your home. Eco Clean provides inspection-led pest control services in Dubai for villas, apartments and workplaces, with targeted options for cockroaches, ants, bed bugs, rodents and other common pests. Our approach considers the pest, the property and the precautions needed before treatment.',
  signsIntro: 'Early signs of pest activity in your Dubai villa or apartment can include:',
  signs: [
    'Cockroaches or ants near kitchens, drains and pantries',
    'Droppings, gnaw marks, scratching or other rodent signs',
    'Bed bug signs, insect activity or unexplained property damage',
  ],
  approachIntro: 'The appropriate method depends on identification, property conditions and safety requirements.',
  approach: [
    'Inspect the pest, activity level and entry points',
    'Recommend a site-specific control and safety plan',
    'Provide preparation, follow-up and prevention guidance',
  ],
  banner: '/assets/EcoClean_Pest_Control_Dubai_Banner.webp',
  bannerAlt: 'Illustration of a pest control technician performing targeted perimeter treatment at a residential property in Dubai',
  bookingIntro: 'Seen cockroaches, ants, bed bugs or signs of rodents? Tell us what is happening at your villa, apartment or workplace in Dubai. Share a few details and we can discuss an appropriate next step.',
};

const title = pestControl.title + ' | Eco Clean UAE';
const description = 'Pest control services in Dubai for villas, apartments and workplaces. Ask about cockroach, ant, bed bug and rodent treatments. Book with Eco Clean UAE.';
const url = new URL('/services/' + pestControl.slug, business.url).href;

export const pestControlMetadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    images: [{ url: new URL(pestControl.banner, business.url).href, width: 1108, height: 283, alt: pestControl.bannerAlt }],
  },
};

const municipalityUrl = 'https://www.dm.gov.ae/municipality-business/public-health-pest-control-section/';

const pestTopics = [
  ['Cockroach and Ant Control', 'Cockroaches often appear around moisture, food residue, drains and concealed gaps. Ants may follow trails into kitchens and pantries. A targeted approach considers sanitation, access points, monitoring and suitable treatments for the affected areas.'],
  ['Bed Bug Treatment', 'Bed bugs can hide in mattress seams, furniture joints and cracks near sleeping areas. Effective management may require careful inspection, room preparation and follow-up.'],
  ['Rat and Mouse Control', 'Rodent activity may be signalled by droppings, gnaw marks, scratching sounds or damaged packaging. Managing rodents also involves addressing entry routes, food sources and harbourage areas.'],
  ['Termites, Mosquitoes and Other Pests', 'Termite concerns require a dedicated inspection to assess potential structural risk and suitable treatment options. Mosquito and fly control may include reducing breeding and resting sites. Other crawling insects, fleas or ticks should be identified before selecting a method.'],
];

const questions = [
  ['Which pests are common in Dubai homes?', 'Cockroaches, ants, bed bugs, rodents, termites, mosquitoes and flies are among the concerns residents may report. The recommended treatment depends on correct pest identification.'],
  ['Is pest control safe for children and pets?', 'Safety depends on the method, product and application. Tell the service team about children and pets, and follow all preparation, exclusion and re-entry instructions.'],
  ['Will one treatment remove every infestation?', 'Bed bugs, rodents and recurring cockroach activity may need monitoring, follow-up visits and preventive changes.'],
];

export function PestControlOverview() {
  return (
    <div className={styles.overview}>
      <p>From kitchen cabinets to bedrooms and outdoor garden areas, pests can find food, moisture and hidden shelter in many parts of a property. Good pest management begins by identifying the actual pest and why it is present. Eco Clean focuses on the reported problem, likely entry points and practical next steps.</p>
      <p>For villa pest control in Dubai, attention may include outdoor entry routes, service ducts, gardens and storage areas. For apartment pest control in Dubai, shared walls, bathrooms, kitchen plumbing and adjoining units can affect recurring activity. We can review the signs you notice and discuss suitable inspection and treatment options for your space.</p>
    </div>
  );
}

export function PestControlDetails() {
  return (
    <section className={`section-pad detail-content ${styles.details}`}>
      <div className="section-container">
        <section>
          <h2>Residential Pest Control for Dubai Villas and Apartments</h2>
          <p>Whether you are dealing with occasional insects or signs of a persistent infestation, the right solution depends on the species, affected rooms and access conditions. Inspection-led pest control helps direct attention to the source of activity while limiting unnecessary treatment.</p>
          <div className={styles.topics}>
            {pestTopics.map(([heading, copy]) => (
              <div key={heading}><h3>{heading}</h3><p>{copy}</p></div>
            ))}
          </div>
        </section>
        <section>
          <h2>Pest Control for Workplaces and Shared Buildings</h2>
          <p>Offices, shops, staff accommodation and common areas can face different pest pressures from apartments and villas. Identifying risk areas, documenting observations and planning appropriate follow-up can help property managers respond consistently while respecting site operations.</p>
        </section>
        <section>
          <h2>Pest Control Safety for Families, Pets and Property</h2>
          <p>A responsible pest management plan considers children, pets, food-handling areas, ventilation and the way a room is used. Before treatment, occupants should receive clear preparation instructions and any required temporary access or re-entry precautions. Products, where needed, must be appropriate for the pest and location and used according to their labels and applicable requirements.</p>
          <p>Prevention also matters. Seal avoidable entry gaps, store food securely, manage waste, repair water leaks and remove standing water where practical. These steps can complement professional inspection and control, especially when pest activity keeps returning.</p>
        </section>
        <section>
          <h2>Dubai Municipality Approved Pest Control <em>and What Customers Should Check</em></h2>
          <p>Before booking, check whether the provider holds current authorisation, whether the staff are qualified for the work, and which treatment products and precautions are proposed. Dubai Municipality publishes licensed-company information through its <a href={municipalityUrl}>Public Health Pest Control Section</a>.</p>
        </section>
        <section className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          {questions.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
          <details>
            <summary>How do I verify Dubai Municipality approved pest control?</summary>
            <p>Check the licensed-company information from the <a href={municipalityUrl}>Dubai Municipality Public Health Pest Control Section</a>, then ask the provider for its current documentation.</p>
          </details>
        </section>
      </div>
    </section>
  );
}
