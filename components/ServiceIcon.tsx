import { Waves, Droplets, CircleDot, Truck, Wind, CookingPot, PanelsTopLeft, Bug } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
const icons: Record<string, LucideIcon> = {
  'drain-line-jetting': Waves,
  'tank-cleaning': Droplets,
  'sump-pit-cleaning': CircleDot,
  'waste-water-tanker-abu-dhabi': Truck,
  'ac-duct-cleaning': Wind,
  'grease-trap-cleaning': CookingPot,
  'kitchen-hood-duct-cleaning': PanelsTopLeft,
  'pest-control-service': Bug,
};
export default function ServiceIcon({slug,size=60,className=''}:{slug:string;size?:number;className?:string}) {
 const Icon=icons[slug]??Bug;
 return <Icon size={size} strokeWidth={1.45} className={className} aria-hidden="true" />;
}
