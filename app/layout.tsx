import type {Metadata} from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const metadata:Metadata={title:{default:'Eco Clean | A Better Way to Live Pest-Free',template:'%s | Eco Clean'},description:'Eco Clean pest control services for residences and businesses in the UAE. Explore services and request a visit.',icons:{icon:'/assets/favicon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
