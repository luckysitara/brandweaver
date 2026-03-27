import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from './services/geminiService';
import { 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Instagram, 
  Linkedin, 
  Facebook, 
  ChevronRight,
  TrendingUp,
  Zap,
  Target,
  Users,
  MessageSquare,
  Palette,
  Code,
  Megaphone,
  Camera
} from 'lucide-react';

// Types
type Page = 'home' | 'services' | 'portfolio' | 'pricing' | 'about' | 'blog' | 'contact';

// Components
const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string, id: Page }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Our Work', id: 'portfolio' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About', id: 'about' },
    { name: 'Blog', id: 'blog' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-blue/90 backdrop-blur-md py-3 shadow-lg' : 'bg-brand-blue py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <img 
            src="/logo.png" 
            alt="Brandweaver Logo" 
            className="h-20 w-auto object-contain transform group-hover:scale-110 transition-all duration-500"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`font-medium transition-colors hover:text-brand-orange ${
                currentPage === link.id 
                  ? 'text-brand-orange' 
                  : 'text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
          >
            Start Partnership
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-blue p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsOpen(false);
                  }}
                  className={`text-left text-xl font-bold ${currentPage === link.id ? 'text-brand-orange' : 'text-white'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  setIsOpen(false);
                }}
                className="bg-brand-orange text-white px-6 py-4 rounded-xl font-bold text-center mt-4"
              >
                Start Partnership
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-brand-black text-white py-20 font-secondary">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center mb-6 group cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img 
            src="/logo.png" 
            alt="Brand Weaver Logo" 
            className="h-24 w-auto object-contain transform group-hover:scale-110 transition-all duration-500"
          />
        </div>
        <p className="text-gray-400 max-w-md mb-4 leading-relaxed font-bold">
          The Engine Behind Modern Business Growth.
        </p>
        <p className="text-gray-500 max-w-md mb-8 leading-relaxed italic">
          📍 Working with brands worldwide — empowering beauty, fashion, and e-commerce businesses to evolve, grow, and win.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors text-xs font-black">
            TK
          </a>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-6 text-brand-orange">Growth Solutions</h4>
        <ul className="flex flex-col gap-4 text-gray-400">
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors text-left">Social Media Marketing</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors text-left">Website & App Dev</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors text-left">AI & Automation</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors text-left">Branding & Design</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors text-left">PPC & Media Buying</button></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6 text-brand-orange">Quick Links</h4>
        <ul className="flex flex-col gap-4 text-gray-400">
          <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors text-left">Home</button></li>
          <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors text-left">About Us</button></li>
          <li><button onClick={() => setCurrentPage('portfolio')} className="hover:text-white transition-colors text-left">Our Work</button></li>
          <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition-colors text-left">Pricing</button></li>
          <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white transition-colors text-left">Blog</button></li>
          <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors text-left font-bold text-brand-orange">Request Custom Package</button></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Brand Weaver LTD. All rights reserved.
    </div>
  </footer>
);

// Pages
const GrowthStrategistChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I'm your Brandweaver Growth Strategist. How can I help you scale your brand today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const systemPrompt = `You are the Brandweaver AI Growth Strategist. Your goal is to help businesses scale through strategic digital marketing, branding, and content creation. 
    Be professional, insightful, and growth-oriented. 
    Brandweaver's core beliefs: 
    1. Marketing drives revenue. 
    2. Strategy > Vibes. 
    3. Consistency builds growth. 
    4. Founders shouldn't DIY their marketing.
    
    User question: ${userMsg}`;

    const aiResponse = await getGeminiResponse(systemPrompt);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || "I'm sorry, I'm having trouble connecting right now." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-brand-blue p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Growth Strategist</h3>
                <p className="text-xs text-blue-200">AI-Powered Scaling Partner</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-orange text-white rounded-tr-none' 
                      : 'bg-white text-brand-blue shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about scaling your brand..."
                className="flex-grow px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-blue text-white p-3 rounded-xl hover:bg-brand-orange transition-colors disabled:opacity-50"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

// Pages
const HomePage = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <div className="overflow-hidden">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/5 rounded-bl-[200px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Zap size={16} />
            <span>GROWTH PARTNER FOR AMBITIOUS BRANDS</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9] mb-8 text-brand-blue">
            We Don't Just Market Brands – We Build <span className="text-brand-orange">Growth Engines</span>.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            At Brand Weaver LTD, we transform ambitious fashion, beauty, and e-commerce businesses into scalable global brands by weaving together bold creativity, intelligent AI, seamless web experiences, and powerful marketing strategies to deliver measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onCtaClick}
              className="bg-brand-blue text-white px-6 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-brand-savoy transition-all shadow-xl hover:-translate-y-1"
            >
              👉 Plug In Your Business. <ArrowRight size={20} />
            </button>
            <button className="px-6 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5 transition-all">
              View Our Work
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
              alt="Strategic Planning" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20 flex flex-col items-center"
          >
            <div className="text-brand-orange font-black text-2xl sm:text-3xl">4.8 ⭐⭐⭐⭐</div>
            <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">43 Reviews</div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-brand-blue p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20 text-white"
          >
            <div className="font-black text-2xl sm:text-3xl">250%</div>
            <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest">Revenue Growth</div>
          </motion.div>
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 -left-8 bg-brand-orange p-3 rounded-lg shadow-lg z-20 text-white font-bold text-sm hidden sm:block"
          >
            15+ Global Clients
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* The Engine Behind Your Business Growth */}
    <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-brand-orange font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              THE ENGINE BEHIND YOUR BUSINESS GROWTH
            </div>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
              We strategize. <span className="text-brand-orange">We execute.</span> You scale.
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Unlike traditional agencies that leave you managing half the work, we deliver <strong>hands-free business growth</strong>.
            </p>
            <p className="text-lg text-blue-200 mb-10 leading-relaxed">
              From ideation to execution, our team handles everything — content creation, digital strategy, social campaigns, data-driven reporting, and automation — while you focus on the business you love.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Ideation', 'Execution', 'Content Creation', 'Digital Strategy', 'Automation', 'Reporting'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle2 size={16} className="text-brand-orange" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-brand-orange to-brand-savoy p-1 rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" 
                alt="Growth Engine" 
                className="rounded-3xl w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Full stack growth solutions summary */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-blue mb-4 tracking-tighter">Full Stack Growth Solutions</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">We provide the technical and creative expertise needed to scale your brand.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Social Media Marketing", icon: <MessageSquare size={32} />, desc: "Turn your socials into revenue streams with strategic content." },
            { title: "Web Development", icon: <Code size={32} />, desc: "Elegant, modern websites built to convert and perform." },
            { title: "AI Marketing Solutions", icon: <Zap size={32} />, desc: "Next-gen automation and intelligence for effortless growth." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[40px] bg-gray-50 border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-brand-orange shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-brand-blue mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{item.desc}</p>
              <button className="text-brand-orange font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                See Details <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Work Highlights */}
    <section className="py-24 bg-brand-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Our Work</h2>
            <p className="text-blue-100 text-xl font-medium italic italic">Real Results. Real Growth.</p>
          </div>
          <button 
            onClick={() => onCtaClick()}
            className="bg-brand-orange text-white px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl"
          >
            View Our Work
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Luxemane Hair", result: "220% Traffic Increase", desc: "Scaled a hair brand's online visibility and traffic through strategic content." },
            { title: "Umojaborn", result: "14K+ New Followers", desc: "Increased Instagram reach by 400% with trendy Afrocentric content strategy." },
            { title: "Web Platform", result: "60% Conversion Boost", desc: "Designed and launched a web platform that boosted conversions significantly." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:border-brand-orange transition-all group">
              <div className="text-brand-orange font-black text-4xl mb-4 group-hover:scale-110 transition-transform origin-left tracking-tighter">{item.result.split(' ')[0]}</div>
              <div className="text-blue-100 font-bold mb-4 uppercase tracking-widest text-xs">{item.title}</div>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing & Strategy Summary */}
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
              <h2 className="text-4xl font-black text-brand-blue mb-8 tracking-tighter">Flexible Pricing</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We offer flexible packages tailored to your brand’s stage – whether you’re a startup seeking visibility or a thriving business ready to expand globally.
              </p>
              <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10 mb-10">
                <p className="text-brand-blue font-bold italic">
                  🎯 Need a custom package? Tell us a little bit about your brand, and we’ll design your personalized growth plan.
                </p>
              </div>
              <button 
                onClick={onCtaClick}
                className="w-full bg-brand-blue text-white py-5 rounded-2xl font-black text-xl hover:bg-brand-orange transition-all shadow-xl"
              >
                Request Custom Growth Plan →
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black text-brand-blue mb-8 tracking-tighter">We Build Growth Plans, Not Just Campaigns.</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Every dollar you invest goes exactly where it matters — into meaningful actions that move your business forward and scale your results.
            </p>
            <div className="space-y-4">
              {['Data-Driven Strategy', 'Custom Execution', 'Measurable ROI', 'Relentless Optimization'].map((item) => (
                <div key={item} className="flex items-center gap-4 text-xl font-bold text-brand-blue">
                  <CheckCircle2 className="text-brand-orange" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Blog & Insights Summary */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block bg-brand-orange/10 text-brand-orange px-6 py-2 rounded-full font-black text-sm mb-6 uppercase tracking-widest">Blog & Insights</div>
        <h2 className="text-4xl md:text-6xl font-black text-brand-blue mb-8 tracking-tighter">Learn. Grow. Lead.</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Stay ahead with insights, updates, and the latest trends in digital marketing, AI, and branding. We share actionable strategies that help you build the brand of tomorrow — today.
        </p>
        <button className="bg-brand-blue text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
          Visit Our Blog
        </button>
      </div>
    </section>
  </div>
);

const ServicesPage = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl text-brand-blue mb-6 font-black tracking-tighter">Our Services</h1>
        <p className="text-xl text-brand-orange max-w-2xl mx-auto font-black uppercase tracking-widest mb-4">Bold Ideas. Powerful Execution. Measurable Growth.</p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Every service we offer is designed to make scaling effortless, creative, and data-driven. Whether you’re launching a new brand, scaling, or automating your entire funnel, our experts are the growth engine you need behind the scenes.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 sm:gap-16">
        {[
          { 
            title: "Social Media Marketing", 
            tagline: "Turn Your Socials into Revenue Streams.",
            icon: <MessageSquare size={40} />, 
            desc: "We craft scroll-stopping content, build authentic communities, and drive measurable revenue through storytelling, campaigns, and intelligent performance tracking.",
            gain: ["A clear social strategy that attracts your ideal audience", "Engaging, creative and AI-backed content that drives consistent leads", "Smart analytics to measure what actually works"],
            who: "Founders, business owners, and creative entrepreneurs who want consistent growth without doing it all themselves."
          },
          { 
            title: "Website & App Development + Management", 
            tagline: "Design That Converts. Systems That Perform.",
            icon: <Code size={40} />, 
            desc: "Your website and app are the foundation of your digital presence. We build sleek, responsive, sales-focused platforms that look beautiful and perform flawlessly across devices.",
            gain: ["A site and or application that matches your brand and drives conversions", "Secure, fast-loading, SEO-optimized web systems", "Ongoing updates and management"],
            packages: ["Launch Pad – Get your dream site live fast.", "Scale Engine – Full eCommerce and conversion setup.", "Orbit Suite – Custom platforms and app systems for brands ready to scale globally."]
          },
          { 
            title: "Branding & Design", 
            tagline: "Create a Brand That’s Impossible to Ignore.",
            icon: <Palette size={40} />, 
            desc: "We design identities and visuals that people remember. From logos to packaging to full brand systems, we bring your story to life with strategy, emotion, and design that sells.",
            gain: ["A unique brand identity and clear visual system", "Compelling designs that inspire trust and loyalty", "Consistent creative support across all platforms"],
            packages: ["Essence Pack – Start strong with a full brand identity.", "Momentum Visuals – Refresh and elevate your design presence.", "Elite Visual Command – Creative direction for fast-growing brands."]
          },
          { 
            title: "PPC & Media Buying", 
            tagline: "Ads That Perform. Results You Can Measure.",
            icon: <Megaphone size={40} />, 
            desc: "We turn your ad spend into a profit engine. Using smart targeting, creative storytelling, and constant optimization, we build campaigns that deliver real ROI.",
            gain: ["Profitable ad campaigns across Google, Meta, TikTok, and more", "Intelligent tracking and conversion reporting", "Campaigns built to scale, not just spend"],
            packages: ["Launch Flow – Test and discover what works.", "Growth Accelerator – Scale your winning campaigns.", "Performance Empire – Multi-channel dominance with high ROI."]
          },
          { 
            title: "AI Solutions & Automation", 
            tagline: "Smarter Systems. Effortless Growth.",
            isComingSoon: true,
            icon: <Zap size={40} />, 
            desc: "AI is your silent growth partner. We integrate smart tools that automate repetitive work, boost productivity, and predict what your customers want next.",
            gain: ["AI content automation and chatbots", "Predictive analytics for marketing decisions", "Streamlined workflows that save time and cost"],
            packages: ["IntelliStart – Begin your AI-powered transformation.", "Smart Flow Pro – Automate your marketing process.", "Neural Growth Suite – AI systems that run your business 24/7."]
          }
        ].map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row gap-12 p-8 sm:p-16 rounded-[40px] shadow-2xl border border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-brand-blue text-white'}`}
          >
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${i % 2 === 0 ? 'bg-brand-orange/10 text-brand-orange' : 'bg-white/10 text-brand-orange'}`}>
                  {service.icon}
                </div>
                {service.isComingSoon && (
                  <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Coming Soon</span>
                )}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight">{service.title}</h2>
              <p className={`text-xl font-bold mb-6 ${i % 2 === 0 ? 'text-brand-orange' : 'text-brand-savoy'}`}>{service.tagline}</p>
              <p className={`text-lg mb-10 leading-relaxed ${i % 2 === 0 ? 'text-gray-600' : 'text-blue-100'}`}>{service.desc}</p>
              
              <div className="space-y-6">
                <h4 className={`font-black uppercase tracking-widest text-xs ${i % 2 === 0 ? 'text-gray-400' : 'text-blue-300'}`}>What You Gain:</h4>
                <ul className="space-y-4">
                  {service.gain.map((item, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <CheckCircle2 size={24} className="text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`lg:w-1/2 p-8 sm:p-12 rounded-3xl flex flex-col justify-center ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white/5 border border-white/10'}`}>
              {service.who && (
                <div className="mb-10">
                  <h4 className={`font-black uppercase tracking-widest text-xs mb-4 ${i % 2 === 0 ? 'text-gray-400' : 'text-blue-300'}`}>Who It’s For:</h4>
                  <p className="italic text-xl leading-relaxed">“{service.who}”</p>
                </div>
              )}
              {service.packages && (
                <div>
                  <h4 className={`font-black uppercase tracking-widest text-xs mb-6 ${i % 2 === 0 ? 'text-gray-400' : 'text-blue-300'}`}>Available Packages:</h4>
                  <div className="space-y-4">
                    {service.packages.map((pkg, j) => (
                      <div key={j} className={`p-5 rounded-2xl border transition-all hover:translate-x-2 ${i % 2 === 0 ? 'bg-white border-gray-200 shadow-sm' : 'bg-brand-blue border-white/10 shadow-lg'}`}>
                        <p className="font-bold text-base sm:text-lg">{pkg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button 
                onClick={onCtaClick}
                className={`w-full mt-12 py-5 rounded-2xl font-black text-lg sm:text-xl transition-all shadow-xl hover:scale-105 active:scale-95 ${i % 2 === 0 ? 'bg-brand-blue text-white hover:bg-brand-savoy' : 'bg-brand-orange text-white hover:bg-orange-600'}`}
              >
                {service.isComingSoon ? 'Get Early Access' : 'Book a Consultation'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl md:text-7xl text-brand-blue mb-8 font-black tracking-tighter">About Us</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed italic font-medium text-balance">
            At Brand Weaver LTD, we are a collective of digital experts united by one goal — helping businesses grow smarter, faster, and stronger through the power of creativity, data, and innovation.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            We bring together specialists in digital strategy, design, social media, branding, AI, web development, and paid media — each expert contributing their unique skill set to build your brand’s growth engine.
          </p>
          <button className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-orange transition-all shadow-xl">
            Ignite My Brand Engine <ArrowRight size={20} />
          </button>
        </motion.div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
            alt="Collective of Experts" 
            className="rounded-[40px] shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-orange rounded-full flex items-center justify-center text-white font-black text-center p-6 shadow-2xl">
            Built for Real Growth
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-[40px] p-12 md:p-20 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-brand-blue font-black mb-6 tracking-tighter">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">We help fashion, beauty, and e-commerce brands transform their digital presence into measurable growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Social Strategy", desc: "Social media marketing and content growth strategies." },
            { title: "Visual Direction", desc: "Branding and design direction that commands attention." },
            { title: "Web & App", desc: "Sleek and high-performing website and app development." },
            { title: "AI Marketing", desc: "Next-gen AI-driven marketing solutions." },
            { title: "Media Buying", desc: "PPC and media buying for high-performance campaigns." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <h3 className="text-2xl font-black text-brand-blue mb-4 tracking-tight group-hover:text-brand-orange transition-colors">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="bg-brand-blue p-12 rounded-[40px] text-white">
          <h3 className="text-brand-orange font-black uppercase tracking-widest text-sm mb-4">Our Mission</h3>
          <p className="text-2xl font-bold leading-relaxed">
            To empower ambitious brands with digital systems that combine creativity, data, and technology — creating sustainable business growth that lasts.
          </p>
        </div>
        <div className="bg-brand-orange p-12 rounded-[40px] text-white">
          <h3 className="text-brand-blue font-black uppercase tracking-widest text-sm mb-4">Our Vision</h3>
          <p className="text-2xl font-bold leading-relaxed">
            To redefine digital marketing by blending innovation and human creativity into one seamless growth experience.
          </p>
        </div>
      </div>

      <div className="mb-32">
        <h2 className="text-4xl md:text-6xl text-brand-blue font-black mb-16 text-center tracking-tighter">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Collaboration", desc: "Every win is a team effort between us and our clients." },
            { title: "Creativity", desc: "We craft ideas that demand attention and spark emotion." },
            { title: "Innovation", desc: "We move fast and think ahead, always evolving." },
            { title: "Excellence", desc: "Results matter — and so does the experience." }
          ].map((value, i) => (
            <div key={i} className="text-center p-8">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange font-black text-2xl mx-auto mb-6">
                {value.title[0]}
              </div>
              <h3 className="text-xl font-black text-brand-blue mb-4 tracking-tight">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-brand-blue font-black mb-4 tracking-tighter">Meet the Weavers</h2>
          <p className="text-xl text-brand-orange font-bold uppercase tracking-widest">The Team Behind the Growth Engines</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { name: "Mirian George", role: "Digital Marketing Strategist" },
            { name: "Rienne", role: "Cyber Security Specialist" },
            { name: "Ogugua Chidinma", role: "Social Media Team Lead" },
            { name: "Gabriel", role: "Branding Specialist" }
          ].map((member, i) => (
            <div key={i} className="group">
              <div className="aspect-square rounded-[40px] bg-gray-100 mb-6 overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-brand-blue opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="w-full h-full flex items-center justify-center text-gray-300 font-black text-6xl">BW</div>
              </div>
              <h3 className="text-2xl font-black text-brand-blue mb-2 tracking-tight">{member.name}</h3>
              <p className="text-gray-500 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl text-brand-blue mb-8 font-black tracking-tighter text-balance">Let’s Talk About Your Project</h1>
            <p className="text-xl text-gray-600 mb-12 italic font-medium">
              Get a Custom Quote — Let’s understand your goals and design your growth system.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-1 text-brand-blue">Email Us</h4>
                  <p className="text-gray-500 text-lg">hello@brandweaver.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center shrink-0">
                  <Target size={28} />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-1 text-brand-blue">Our Reach</h4>
                  <p className="text-gray-500 text-lg">Working with brands worldwide from Lagos, Nigeria.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-brand-blue rounded-3xl text-white">
              <h4 className="text-2xl font-black mb-4 tracking-tight">Why Brands Choose Us</h4>
              <ul className="space-y-4">
                {[
                  "We Execute What We Strategize",
                  "We Mix Creativity with Data",
                  "We’re Industry Natives",
                  "We Build Long-Term Growth"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-brand-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[40px] shadow-3xl border border-gray-100">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-black mb-4 text-brand-blue tracking-tight">Message Received!</h2>
                <p className="text-gray-600 text-lg leading-relaxed">Our growth strategists will be in touch within 24 hours to build your custom growth plan.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-black text-xs uppercase tracking-widest text-gray-400">Full Name</label>
                    <input required type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-black text-xs uppercase tracking-widest text-gray-400">Email Address</label>
                    <input required type="email" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-black text-xs uppercase tracking-widest text-gray-400">Service(s) You’re Interested In</label>
                  <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-orange transition-all">
                    <option>Social Media Marketing</option>
                    <option>Website & App Development</option>
                    <option>AI Solutions & Automation</option>
                    <option>Branding & Design</option>
                    <option>PPC & Media Buying</option>
                    <option>Full Scale Growth Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-black text-xs uppercase tracking-widest text-gray-400">Estimated Budget</label>
                  <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-orange transition-all">
                    <option>&lt; 300k</option>
                    <option>350k–700k</option>
                    <option>700k–950k</option>
                    <option>1M+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-black text-xs uppercase tracking-widest text-gray-400">Tell Us About Your Project</label>
                  <textarea rows={4} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="What are your goals?"></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-blue text-white py-5 rounded-2xl font-black text-xl hover:bg-brand-orange transition-all shadow-2xl hover:scale-105 active:scale-95">
                  Build My Custom Growth Plan →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6 text-center mb-20">
      <h1 className="text-5xl md:text-7xl text-brand-blue mb-6 font-black tracking-tighter">Featured Projects</h1>
      <p className="text-xl text-brand-orange font-black uppercase tracking-widest mb-4 italic">Real Brands. Real Growth. Real Results.</p>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">Every brand we work with gets a custom growth blueprint — from creative direction to automated marketing systems. We blend performance strategy with flawless execution, giving you measurable progress and visible growth at every stage.</p>
    </div>

    <div className="max-w-7xl mx-auto px-6 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { step: "1", title: "Discover", desc: "Understand your brand, audience, and goals." },
          { step: "2", title: "Design", desc: "Craft a tailored growth system built around your vision." },
          { step: "3", title: "Deploy", desc: "Execute with precision." },
          { step: "4", title: "Optimize", desc: "Track, test, and evolve until results compound." }
        ].map((item, i) => (
          <div key={i} className="relative p-8 bg-white rounded-3xl shadow-lg border border-gray-100 group hover:bg-brand-blue transition-all duration-500">
            <div className="text-6xl font-black text-brand-orange/10 absolute top-4 right-4 group-hover:text-white/10 transition-colors">{item.step}</div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{item.title}</h3>
            <p className="text-gray-600 group-hover:text-blue-100 transition-colors">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button 
          onClick={onCtaClick}
          className="bg-brand-orange text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
        >
          Let’s Build Your Next Success Story
        </button>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 space-y-24 mb-32">
      <h2 className="text-4xl md:text-6xl text-brand-blue font-black mb-16 text-center">Case Highlights</h2>
      
      {/* Luxemane Hair */}
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold mb-6">BEAUTY & HAIR</div>
          <h3 className="text-4xl sm:text-5xl font-black text-brand-blue mb-8">1. Luxemane Hair</h3>
          <div className="space-y-6 mb-10">
            <div>
              <h4 className="font-black text-brand-orange uppercase tracking-widest text-sm mb-2">The Challenge:</h4>
              <p className="text-lg text-gray-600">A hair brand struggled with launch, online visibility and traffic.</p>
            </div>
            <div>
              <h4 className="font-black text-brand-orange uppercase tracking-widest text-sm mb-2">Our Solution:</h4>
              <p className="text-lg text-gray-600">We rebuilt their visual identity, ideated and curated high quality brand content, executed social media campaigns to boost visibility and website traffic.</p>
            </div>
            <div>
              <h4 className="font-black text-brand-orange uppercase tracking-widest text-sm mb-2">Results:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> 50+ high quality brand content</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> 220% increase in traffic</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> 50x TikTok growth</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> 10x Instagram growth</li>
              </ul>
            </div>
          </div>
          <button 
            onClick={onCtaClick}
            className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange transition-all shadow-lg"
          >
            View Project Details
          </button>
        </div>
        <div className="lg:w-1/2 rounded-[40px] overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" alt="Luxemane Hair" className="w-full h-auto" />
        </div>
      </div>

      {/* Umojaborn */}
      <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
        <div className="lg:w-1/2">
          <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold mb-6">FASHION & CULTURE</div>
          <h3 className="text-4xl sm:text-5xl font-black text-brand-blue mb-8">2. Umojaborn</h3>
          <div className="space-y-6 mb-10">
            <div>
              <h4 className="font-black text-brand-orange uppercase tracking-widest text-sm mb-2">The Challenge:</h4>
              <p className="text-lg text-gray-600">New brand, needs launch and scaling strategy for Instagram hands-free growth. They need awareness, engagement and Afrocentric-community.</p>
            </div>
            <div>
              <h4 className="font-black text-brand-orange uppercase tracking-widest text-sm mb-2">Our Solution:</h4>
              <p className="text-lg text-gray-600">We implemented a launch and content strategy that focuses on target audience attraction and retention through trendy Afrocentric content.</p>
            </div>
            <div>
              <h4 className="font-black text-brand-orange uppercase tracking-widest text-sm mb-2">Results:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Gained 14k+ new followers</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Consistent monthly growth</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Brand recognition in 2 months</li>
              </ul>
            </div>
          </div>
          <button 
            onClick={onCtaClick}
            className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange transition-all shadow-lg"
          >
            View Project Details
          </button>
        </div>
        <div className="lg:w-1/2 rounded-[40px] overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" alt="Umojaborn" className="w-full h-auto" />
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={onCtaClick}
          className="bg-brand-orange text-white px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl"
        >
          Start My Growth Journey
        </button>
      </div>
    </div>

    <div className="bg-brand-blue py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">Industries We Empower</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Fashion", desc: "From startups to bold clothing lines ready to scale globally." },
            { title: "Beauty & Skincare", desc: "Building digital empires around personal care brands." },
            { title: "E-commerce", desc: "Helping product-driven businesses convert clicks into loyal customers." }
          ].map((industry, i) => (
            <div key={i} className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-brand-orange transition-all group">
              <h3 className="text-2xl font-black mb-4 text-brand-orange">{industry.title}</h3>
              <p className="text-lg text-blue-100 leading-relaxed">{industry.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PricingPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6 text-center mb-20">
      <h1 className="text-5xl md:text-7xl text-brand-blue mb-6 font-black tracking-tighter text-balance">Invest in the Systems That Actually Grow Your Business</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        No two brands start from the same place — and no two need the same path to grow. 
        Some businesses only need a few smart adjustments to see momentum. Others need bold new content, stronger visibility, or an automated growth system powered by strategy and AI.
      </p>
    </div>

    <div className="max-w-7xl mx-auto px-6 mb-32">
      <div className="bg-brand-blue rounded-[40px] p-10 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange opacity-10 blur-[120px] rounded-full" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">We Don’t Sell Services — We Build <span className="text-brand-orange">Growth Plans</span></h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              At Brand Weaver LTD, we don’t price with cookie-cutter tiers. We design pricing around the work required to reach your goals, not arbitrary packages or vanity metrics.
            </p>
            <div className="space-y-4">
              {[
                "More brand visibility",
                "Smarter automation and better data flow",
                "A website that sells while you sleep",
                "Campaigns that actually convert"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-brand-orange" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-brand-orange font-bold italic text-lg">
              We’ll build a plan that focuses every dollar on real growth.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
            <h3 className="text-2xl font-black mb-8">Why Choose Custom Pricing?</h3>
            <div className="space-y-8">
              {[
                { title: "Strategy + Execution Combined", desc: "You’re paying for ideation, execution and results." },
                { title: "Data-Driven Value", desc: "Every goal is linked to measurable KPIs." },
                { title: "Scalable Systems", desc: "We start lean, grow smart, and expand as you do." },
                { title: "No Surprises", desc: "Transparent pricing, clear expectations, and a system built for success." }
              ].map((item, i) => (
                <div key={i}>
                  <h4 className="font-bold text-brand-orange mb-2 uppercase tracking-widest text-xs">{item.title}</h4>
                  <p className="text-blue-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 mb-32">
      <h2 className="text-4xl md:text-6xl text-brand-blue font-black mb-16 text-center tracking-tighter">How Our Pricing Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            step: "Step 1",
            title: "Discovery Audit",
            desc: "We start with a complete evaluation of your brand’s digital presence: your website, ads, content, audience performance, and competition.",
            items: ["A clear map of what's driving or blocking growth", "Expert insight into your current digital ecosystem", "A practical action plan"]
          },
          {
            step: "Step 2",
            title: "Strategy Proposal",
            desc: "After the audit, we build a custom strategy designed for long-term growth. We only recommend what works for your specific brand stage.",
            items: ["Custom-tailored growth roadmap", "KPI-focused strategies", "Resource allocation plan"]
          },
          {
            step: "Step 3",
            title: "Custom Quote",
            desc: "Once your plan is finalized, we send a fixed, transparent quote directly tied to the exact work needed. No hidden fees.",
            items: ["What we'll do & why it matters", "How long it takes", "The exact investment required"]
          }
        ].map((step, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 flex flex-col">
            <div className="text-brand-orange font-black text-sm uppercase tracking-widest mb-4">{step.step}</div>
            <h3 className="text-3xl font-black text-brand-blue mb-6 tracking-tight">{step.title}</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{step.desc}</p>
            <div className="mt-auto pt-8 border-t border-gray-100 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400">You'll Get:</h4>
              {step.items.map((item, j) => (
                <div key={j} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-brand-white rounded-[40px] p-12 md:p-20 text-center border-2 border-dashed border-gray-200">
        <h2 className="text-4xl md:text-5xl font-black text-brand-blue mb-8">Ready to Build Your Growth Plan?</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto italic font-medium">Most clients start with a 3–6 month growth phase, then continue with a flexible, month-to-month system that keeps scaling results.</p>
        <button className="bg-brand-blue text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
          Get Your Custom Growth Quote →
        </button>
      </div>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl text-brand-blue mb-6">Growth Insights</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Expert advice on scaling your brand, marketing strategy, and digital innovation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Why Founders Shouldn't DIY Their Marketing", date: "Oct 12, 2023", category: "Strategy" },
          { title: "The Power of Consistency in Brand Growth", date: "Oct 05, 2023", category: "Growth" },
          { title: "Strategy Over Vibes: Converting Visitors into Clients", date: "Sep 28, 2023", category: "Conversion" },
          { title: "Social Media Trends to Watch in 2024", date: "Sep 21, 2023", category: "Social" },
          { title: "Building a Visual Identity that Commands Attention", date: "Sep 14, 2023", category: "Branding" },
          { title: "How to Measure Marketing ROI Effectively", date: "Sep 07, 2023", category: "Analytics" },
        ].map((post, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all group">
            <div className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-4">{post.category}</div>
            <h3 className="text-2xl text-brand-blue mb-6 group-hover:text-brand-orange transition-colors">{post.title}</h3>
            <div className="flex justify-between items-center text-gray-400 text-sm">
              <span>{post.date}</span>
              <button className="font-bold text-brand-blue flex items-center gap-1">Read More <ChevronRight size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onCtaClick={() => setCurrentPage('contact')} />;
      case 'services': return <ServicesPage onCtaClick={() => setCurrentPage('contact')} />;
      case 'portfolio': return <PortfolioPage onCtaClick={() => setCurrentPage('contact')} />;
      case 'pricing': return <PricingPage />;
      case 'about': return <AboutPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onCtaClick={() => setCurrentPage('contact')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <GrowthStrategistChat />
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

