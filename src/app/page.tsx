"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-scroll';
import { sanity } from "../sanity/client";
import { urlFor } from "../sanity/imageUrl";
import { Geist, Geist_Mono } from "next/font/google";

type Product = {
  _id: string;
  name: string;
  description: string;
  image: any;
  minOrder: number;
  price: string;
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "700"],
  display: "swap",
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2s loader
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    sanity.fetch(
      `*[_type == "product"] | order(_createdAt desc){
        _id, name, description, image, minOrder, price
      }`
    ).then(setProducts);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible])

  useEffect(() => {
    // Set --vh for mobile viewport height (client-side only)
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear'
  };

  const carouselImages = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white ${geistSans.variable} ${geistMono.variable} font-sans`}> 
      <style>{`
        .section-divider { width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #22d3ee 40%, #0e7490 60%, transparent); margin: 4rem 0 2.5rem 0; border-radius: 1rem; opacity: 0.7; }
      `}</style>
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-x-hidden transition-opacity duration-700">
          <Image
            src="/images/logo.jpg"
            alt="DOA Prints Logo"
            width={260}
            height={160}
            className="animate-beat drop-shadow-xl rounded-xl"
            priority
          />
          <style jsx global>{`
            @keyframes beat {
              0%, 100% { transform: scale(1); }
              20% { transform: scale(1.08); }
              40% { transform: scale(0.95); }
              60% { transform: scale(1.1); }
              80% { transform: scale(0.97); }
            }
            .animate-beat {
              animation: beat 1.2s infinite cubic-bezier(.4,0,.2,1);
            }
          `}</style>
        </div>
      )}

      {/* Main Website Content */}
      <div className={`transition-opacity overflow-x-hidden duration-700 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}> 
        <style jsx global>{`
          html {
            font-family: var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          }
          code, .font-mono {
            font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          }
        `}</style>
        {/* Header */}
        <header className={`w-full py-4 px-6 flex items-center justify-between bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-lg shadow-xl fixed top-0 z-30 transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
          <a href="/" className="flex items-center gap-3 group">
            <Image 
              src="/images/logo.jpg" 
              alt="DOA Prints Logo" 
              width={80} 
              height={40} 
              className="rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110" 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-semibold tracking-wide">
            <Link to="services" smooth={true} duration={500} offset={-80} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="Services">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L8 21m6.25-4l1.75 4M12 3v6m0 0l3 3m-3-3l-3 3" /></svg>
            </Link>
            <Link to="products" smooth={true} duration={500} offset={-80} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="Products">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
            </Link>
            <Link to="about" smooth={true} duration={500} offset={-80} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="About">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h0a4 4 0 014 4v2"/></svg>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-80} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="Contact">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 3v4M8 3v4M3 11h18"/></svg>
            </Link>
          </nav>

        {/* Mobile Nav (Icons Row) - hidden when loading */}
        {!loading && (
          <nav className="md:hidden fixed bottom-4 left-60 -translate-x-1/2 z-40 flex items-center justify-center gap-8 bg-black/70 rounded-full px-4 py-2 shadow-xl backdrop-blur-lg">
            <Link to="services" smooth={true} duration={500} offset={-80} className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="Services" onClick={handleLinkClick}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L8 21m6.25-4l1.75 4M12 3v6m0 0l3 3m-3-3l-3 3" /></svg>
            </Link>
            <Link to="products" smooth={true} duration={500} offset={-80} className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="Products" onClick={handleLinkClick}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
            </Link>
            <Link to="about" smooth={true} duration={500} offset={-80} className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="About" onClick={handleLinkClick}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h0a4 4 0 014 4v2"/></svg>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-80} className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" title="Contact" onClick={handleLinkClick}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-4.5M16 3v4M8 3v4M3 11h18"/></svg>
            </Link>
          </nav>
        )}
        </header>

        {/* Mobile Nav (Dropdown) replaced with icon row above */}

        {/* Carousel Section */}
        <section className="w-full min-h-[100vh] md:min-h-[100vh] relative font-bold bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-14 md:pt-20 pb-16 md:pb-0" id="hero">
          <Slider {...carouselSettings}>
            {carouselImages.map((src, index) => (
              <div key={index} className="w-full h-[70vh] md:h-[100vh] min-h-[70vh] md:min-h-screen relative">
                <Image
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  fill
                  className="absolute inset-0 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h1 className="text-4xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent drop-shadow-lg font-[family-name:var(--font-geist-sans)]">
                    Quality Prints, Fast Delivery
                  </h1>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <div className="section-divider" />
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center min-h-[100vh] px-2 sm:px-6 py-4 sm:py-10 gap-8 sm:gap-14 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-14 md:pt-20 pb-16 md:pb-0" id="services">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 mb-4 font-[family-name:var(--font-geist-sans)] drop-shadow-[0_2px_8px_rgba(34,211,238,0.25)]">Our Services</h2>
            <p className="text-lg sm:text-xl max-w-3xl text-gray-300">
              We offer a wide range of printing services to meet your needs. Each service is handled with the utmost care and precision to ensure the best results.
            </p>
          </div>

          <div className="flex overflow-x-auto overscroll-x-contain gap-6 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 w-full max-w-6xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Service Item 1: Business Cards */}
            <div className="flex-shrink-0 w-72 sm:w-auto group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:from-cyan-900/40 hover:to-cyan-800/30 hover:shadow-cyan-400/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white font-[family-name:var(--font-geist-sans)]">Business Cards</h3>
              <p className="text-gray-300 text-center text-sm">High-quality, custom business cards to make your brand stand out.</p>
            </div>

            {/* Service Item 2: Banners */}
            <div className="flex-shrink-0 w-72 sm:w-auto group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:from-cyan-900/40 hover:to-cyan-800/30 hover:shadow-cyan-400/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white font-[family-name:var(--font-geist-sans)]">Banners</h3>
              <p className="text-gray-300 text-center text-sm">Vibrant and durable banners for all your promotional needs.</p>
            </div>

            {/* Service Item 3: Flyers */}
            <div className="flex-shrink-0 w-72 sm:w-auto group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:from-cyan-900/40 hover:to-cyan-800/30 hover:shadow-cyan-400/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white font-[family-name:var(--font-geist-sans)]">Flyers</h3>
              <p className="text-gray-300 text-center text-sm">Eye-catching flyers designed to capture attention and deliver your message.</p>
            </div>

            {/* Service Item 4: Custom Prints */}
            <div className="flex-shrink-0 w-72 sm:w-auto group bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:from-cyan-900/40 hover:to-cyan-800/30 hover:shadow-cyan-400/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.294 1.293.995 3.44-.401 4.434a2 2 0 01-2.828 0l-5-5a2 2 0 00-1.414-.586H8V4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-white font-[family-name:var(--font-geist-sans)]">Custom Prints</h3>
              <p className="text-gray-300 text-center text-sm">From custom apparel to unique promotional items, we print your ideas.</p>
            </div>
          </div>

          {/* Products Section */}
          <div className="section-divider" />
          <section className="w-full max-w-6xl mt-12 px-2 sm:px-6 min-h-[100vh] py-10 sm:py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-3xl shadow-xl border border-gray-800/60 fade-in" id="products">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 font-[family-name:var(--font-geist-sans)] drop-shadow-[0_2px_8px_rgba(34,211,238,0.25)]">Our Products</h2>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-72 px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {products
                .filter(product =>
                  product.name.toLowerCase().includes(search.toLowerCase()) ||
                  product.description.toLowerCase().includes(search.toLowerCase())
                )
                .map(product => (
                  <div key={product._id} className="min-w-[260px] max-w-xs w-full bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-800/40 p-3 sm:p-5 rounded-2xl shadow-2xl hover:shadow-cyan-400/30 hover:scale-[1.03] transition-all duration-300 flex flex-col">
                    <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl">
                      <img
                        src={urlFor(product.image).width(400).url()}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-[family-name:var(--font-geist-sans)]">{product.name}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">{product.description}</p>
                    <div className="flex flex-col gap-1 text-xs sm:text-sm mb-2">
                      <span className="text-gray-400">Min. Order: <span className="text-white font-semibold">{product.minOrder}</span></span>
                    <span className="text-cyan-400 font-semibold">Starting at {product.price}</span>
                    </div>
                    <a
                      href={`https://wa.me/+2348088613262?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 rounded-lg shadow-md transition-all duration-200"
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                ))}
            </div>
          </section>
        </main>

                {/* About Section */}
        <div className="section-divider" />
        <section id="about" className="max-w-4xl mx-auto px-4 min-h-[100vh] flex flex-col justify-center text-center bg-gradient-to-b from-gray-900/80 to-black/90 rounded-3xl shadow-2xl mt-12 fade-in pt-14 md:pt-20 pb-16 md:pb-0">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-400 font-[family-name:var(--font-geist-sans)] drop-shadow-[0_2px_8px_rgba(34,211,238,0.25)]">About Us</h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-[family-name:var(--font-geist-sans)]">
            With years of experience, DOA Prints is committed to delivering top-notch printing services using the latest technology. Our team ensures every project meets the highest standards of quality and customer satisfaction.
          </p>
        </section>

        {/* Contact Section */}
        <div className="section-divider" />
        <section id="contact" className="max-w-3xl mx-auto px-4 min-h-[100vh] flex flex-col justify-center text-center bg-gradient-to-b from-black/90 to-gray-900/80 rounded-3xl shadow-2xl mt-12 fade-in pt-14 md:pt-20 pb-16 md:pb-0">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-400 font-[family-name:var(--font-geist-sans)] drop-shadow-[0_2px_8px_rgba(34,211,238,0.25)]">Contact Us</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 font-[family-name:var(--font-geist-sans)]">Ready to start your next project? Reach out to us today!</p>
          <a href="mailto:deborahokuboyejo@gmail.com" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 font-[family-name:var(--font-geist-sans)]">Email Us</a>
        </section>

        {/* WhatsApp Floating Button */}
        <a href="https://wa.me/+2348088613262?text=Hello%20DOA%20Prints" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 z-40">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.433-9.886-9.888-9.886-5.448 0-9.886 4.434-9.889 9.885.002 2.024.63 3.965 1.739 5.627l-1.134 4.139 4.274-1.12z" /></svg>
        </a>

        {/* Footer */}
        <div className="section-divider" />
        <footer className="w-full py-10 bg-gradient-to-t from-black/90 to-gray-900/80 backdrop-blur-md text-gray-300 font-[family-name:var(--font-geist-sans)] fade-in">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">DOA Prints</h3>
                <p className="text-gray-400">Quality Prints, Delivered Fast.</p>
                <p className="text-sm mt-2">RC: 36785937</p>
              </div>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/doaprints?igsh=MW9nNG9xNjRsMDJ6ag==" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.623C8.726.54 8.333.552 7.053.61c-3.552.162-6.138 2.748-6.298 6.298-.058 1.28-.07 1.673-.07 4.938s.012 3.658.07 4.938c.16 3.552 2.746 6.138 6.298 6.298 1.28.058 1.673.07 4.938.07s3.658-.012 4.938-.07c3.552-.16 6.138-2.746 6.298-6.298.058-1.28.07-1.673.07-4.938s-.012-3.658-.07-4.938C20.278 3.358 17.692.772 14.14.61 12.86.552 12.467.54 12 .54z"/><path d="M12 6.865A5.135 5.135 0 1017.135 12 5.135 5.135 0 0012 6.865zm0 8.27A3.135 3.135 0 1115.135 12 3.135 3.135 0 0112 15.135z"/><path d="M16.949 5.586a1.25 1.25 0 10-1.25 1.25 1.25 1.25 0 001.25-1.25z"/></svg></a>
                <a href="https://www.tiktok.com/@doaprints?_t=ZM-8xdolfMcPFm&_r=1" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.74.85-2.7 1.03A4.26 4.26 0 0016.3 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.72-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.8 1.91 3.56-.71 0-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.94.07 4.28 4.28 0 004 2.98 8.52 8.52 0 01-5.33 1.84c-.34 0-.68-.02-1.01-.06A12.07 12.07 0 008.84 21c7.28 0 11.27-6.04 11.27-11.27 0-.17 0-.34-.01-.51.77-.56 1.44-1.26 1.97-2.02z"/></svg></a>
                <a href="https://www.facebook.com/share/16SPp9bYsS/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12S5.65 23.5 12 23.5 23.5 18.35 23.5 12 18.35.5 12 .5zm4.67 8.22h-1.84c-.55 0-.88.35-.88.9v1.2h2.65l-.35 2.6H13.95V22h-3.2v-8.53H9.33V10.8h1.42V9.5c0-1.4.87-3.2 3.2-3.2h2.72v2.42z"/></svg></a>
                <a href="https://wa.me/+2348088613262" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.433-9.886-9.888-9.886-5.448 0-9.886 4.434-9.889 9.885.002 2.024.63 3.965 1.739 5.627l-1.134 4.139 4.274-1.12z" /></svg></a>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} DOA Prints. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      </div>
    </>
  );
}
