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
type Page = 'home' | 'services' | 'case-studies' | 'about' | 'blog' | 'contact';

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
    { name: 'Case Studies', id: 'case-studies' },
    { name: 'About', id: 'about' },
    { name: 'Blog', id: 'blog' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-blue py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <img 
            src="/logo.png" 
            alt="Brandweaver Logo" 
            className="h-12 w-auto object-contain transform group-hover:scale-110 transition-all duration-500"
          />
          <span className={`font-display font-black text-2xl tracking-tighter ${scrolled ? 'text-white' : 'text-brand-blue'} group-hover:text-brand-orange transition-colors`}>
            BRANDWEAVER
          </span>
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
                  : scrolled ? 'text-white' : 'text-brand-blue'
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
        <button className="md:hidden text-brand-blue" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? 'text-white' : 'text-brand-blue'} /> : <Menu className={scrolled ? 'text-white' : 'text-brand-blue'} />}
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

const Footer = () => (
  <footer className="bg-brand-black text-white py-20 font-secondary">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/logo.png" 
            alt="Brandweaver Logo" 
            className="h-10 w-auto object-contain transform group-hover:scale-110 transition-all duration-500"
          />
          <span className="font-display font-black text-2xl tracking-tighter group-hover:text-brand-orange transition-colors">BRANDWEAVER</span>
        </div>
        <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
          The strategic growth partner for scaling brands. We weave together creativity, innovation, and excellence to drive success through digital strategies.
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
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-6 text-brand-orange">Services</h4>
        <ul className="flex flex-col gap-4 text-gray-400">
          <li><a href="#" className="hover:text-white transition-colors">Social Media Management</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Content Creation</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Branding & Design</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Sponsored Ads</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6 text-brand-orange">Company</h4>
        <ul className="flex flex-col gap-4 text-gray-400">
          <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Brandweaver LTD. All rights reserved.
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
            <span>GROWTH PARTNER FOR SCALING BRANDS</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] md:leading-[0.9] mb-8 text-brand-blue">
            We Help You <span className="text-brand-orange">Scale</span> Beyond Limits.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
            Not just an agency, but your strategic partner. We drive revenue through data-backed strategy and creative excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onCtaClick}
              className="bg-brand-blue text-white px-6 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-brand-savoy transition-all shadow-xl hover:-translate-y-1"
            >
              Start Your Growth Partnership <ArrowRight size={20} />
            </button>
            <button className="px-6 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5 transition-all">
              View Case Studies
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
            className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20"
          >
            <div className="text-brand-orange font-black text-2xl sm:text-3xl">13K+</div>
            <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">Followers Gained</div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-brand-blue p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl z-20 text-white"
          >
            <div className="font-black text-2xl sm:text-3xl">250%</div>
            <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest">Revenue Growth</div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Beliefs Section */}
    <section className="py-24 bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-4">Our Core Beliefs</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">We don't just do marketing. We drive business growth through these fundamental principles.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { title: "Marketing drives revenue", desc: "Every campaign is measured by its impact on your bottom line.", icon: <TrendingUp /> },
            { title: "Strategy > Vibes", desc: "Aesthetic is important, but strategy is what converts visitors.", icon: <Target /> },
            { title: "Consistency builds growth", desc: "Long-term success is the result of relentless consistency.", icon: <Zap /> },
            { title: "Founders shouldn't DIY", desc: "Focus on your product; let us handle the growth engine.", icon: <Users /> },
          ].map((belief, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 group hover:border-brand-orange transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform">
                {belief.icon}
              </div>
              <h3 className="text-xl mb-4 group-hover:text-brand-orange transition-colors">{belief.title}</h3>
              <p className="text-blue-100/70 leading-relaxed">{belief.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Overview */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl text-brand-blue mb-6">Full-Stack Growth Solutions</h2>
            <p className="text-gray-600 text-lg">We provide everything you need to scale your brand from zero to market leader.</p>
          </div>
          <button className="text-brand-orange font-bold flex items-center gap-2 hover:gap-4 transition-all">
            See All Services <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: "Social Media Management", desc: "Strategic content and community growth.", icon: <MessageSquare /> },
            { title: "Content Creation", desc: "High-end photo and video that tells your story.", icon: <Camera /> },
            { title: "Branding & Graphic Design", desc: "Visual identities that command attention.", icon: <Palette /> },
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-100 hover:border-brand-orange hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-brand-blue group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                {service.icon}
              </div>
              <h3 className="text-2xl mb-4 text-brand-blue group-hover:text-brand-orange transition-colors">{service.title}</h3>
              <p className="text-gray-500 mb-8">{service.desc}</p>
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Social Proof */}
    <section className="py-24 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-blue rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-brand-orange font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={18} /> Case Study
              </div>
              <h2 className="text-4xl md:text-6xl text-white mb-8 leading-tight">UmojaBorn: From 0 to 13K+ Followers</h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                We implemented a complete content strategy and community management plan that transformed UmojaBorn's digital presence in record time.
              </p>
              <button className="bg-white text-brand-blue px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-orange hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl">
                Read Full Case Study <ArrowRight size={20} />
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-orange/20 blur-2xl rounded-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800" 
                alt="Social Proof" 
                className="rounded-3xl shadow-2xl relative z-10 hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

const ServicesPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl text-brand-blue mb-6">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive digital solutions designed to weave success into every aspect of your brand.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {[
          { 
            title: "Social Media Management", 
            icon: <MessageSquare size={40} />, 
            desc: "We don't just post; we build communities. Our strategic approach ensures your brand stays relevant and engaging across all platforms.",
            features: ["Content Strategy", "Community Engagement", "Analytics & Reporting", "Influencer Outreach"]
          },
          { 
            title: "Content Creation", 
            icon: <Camera size={40} />, 
            desc: "Visual storytelling that resonates. We produce high-quality photo and video content that captures your brand's essence and drives engagement.",
            features: ["Professional Photography", "Video Production", "Short-form Content (Reels/TikTok)", "Copywriting"]
          },
          { 
            title: "Branding & Graphic Design", 
            icon: <Palette size={40} />, 
            desc: "First impressions matter. We craft unique visual identities that reflect your brand's values and command attention in a crowded market.",
            features: ["Logo Design", "Brand Guidelines", "Marketing Collateral", "UI/UX Design"]
          },
          { 
            title: "Website/App Development", 
            icon: <Code size={40} />, 
            desc: "Your digital storefront. We build fast, responsive, and conversion-focused websites and applications that provide seamless user experiences.",
            features: ["Custom Web Development", "E-commerce Solutions", "Mobile App Development", "SEO Optimization"]
          },
          { 
            title: "Sponsored Ads & Campaign Management", 
            icon: <Megaphone size={40} />, 
            desc: "Targeted growth. We manage high-performing ad campaigns that put your brand in front of the right audience at the right time.",
            features: ["Meta Ads", "Google Ads", "Retargeting Strategies", "Conversion Tracking"]
          }
        ].map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row gap-12 p-12 rounded-[40px] ${i % 2 === 0 ? 'bg-white' : 'bg-brand-blue text-white'}`}
          >
            <div className="lg:w-1/3">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 ${i % 2 === 0 ? 'bg-brand-orange/10 text-brand-orange' : 'bg-white/10 text-brand-orange'}`}>
                {service.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl mb-4">{service.title}</h2>
              <p className={i % 2 === 0 ? 'text-gray-600' : 'text-blue-100'}>{service.desc}</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {service.features.map((feature, j) => (
                <div key={j} className={`flex items-center gap-3 p-4 sm:p-6 rounded-2xl ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white/5'}`}>
                  <CheckCircle2 className="text-brand-orange shrink-0" />
                  <span className="font-bold text-sm sm:text-base">{feature}</span>
                </div>
              ))}
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
          <h1 className="text-5xl md:text-7xl text-brand-blue mb-8">Who We Are</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Brandweaver is a skillful artist, a master weaver at crafting unique brand experiences by interconnecting intricate elements – Creativity, innovation and excellence.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            We operate at the intersection of digital marketing, fashion, and skincare, offering a diverse range of products and services designed to meet the evolving needs of modern consumers and businesses.
          </p>
        </motion.div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
            alt="Our Team" 
            className="rounded-[40px] shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-orange rounded-full flex items-center justify-center text-white font-black text-center p-4">
            Established for Excellence
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-32">
        {[
          { title: "Our Vision", desc: "To pioneer the future of brand experiences by seamlessly integrating creativity, innovation, and excellence, consistently pushing boundaries and delivering unparalleled results." },
          { title: "Our Mission", desc: "To weave together creativity, innovation, and excellence, crafting and empowering brands to achieve success through digital strategies and exceptional execution." },
          { title: "Our Philosophy", desc: "Strategy > Vibes. We believe that true growth comes from a foundation of solid strategy, consistent execution, and creative brilliance." },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-2xl text-brand-blue mb-6">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-blue rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 md:p-20 text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-6xl mb-8">Ready to weave your success story?</h2>
        <button className="bg-brand-orange text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:scale-105 transition-transform">
          Start Your Growth Partnership
        </button>
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
            <h1 className="text-5xl md:text-7xl text-brand-blue mb-8">Let's Talk Growth.</h1>
            <p className="text-xl text-gray-600 mb-12">
              Ready to scale? Fill out the form below or book a discovery call to start your growth partnership.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Us</h4>
                  <p className="text-gray-500">hello@brandweaver.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center shrink-0">
                  <Target />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Office</h4>
                  <p className="text-gray-500">Lagos, Nigeria | Remote Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[32px] sm:rounded-[40px] shadow-2xl border border-gray-100">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 sm:py-20"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-brand-blue">Message Received!</h2>
                <p className="text-gray-600">Our growth strategists will be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-xs sm:text-sm uppercase tracking-widest text-gray-400">Full Name</label>
                    <input required type="text" className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-xs sm:text-sm uppercase tracking-widest text-gray-400">Email Address</label>
                    <input required type="email" className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-xs sm:text-sm uppercase tracking-widest text-gray-400">Company Name</label>
                  <input type="text" className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="Your Brand" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-xs sm:text-sm uppercase tracking-widest text-gray-400">Service Interested In</label>
                  <select className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-orange transition-all">
                    <option>Social Media Management</option>
                    <option>Content Creation</option>
                    <option>Branding & Design</option>
                    <option>Web Development</option>
                    <option>Sponsored Ads</option>
                    <option>Full Scale Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-xs sm:text-sm uppercase tracking-widest text-gray-400">Message</label>
                  <textarea rows={4} className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="Tell us about your goals..."></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-blue text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-brand-orange transition-all shadow-xl">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl text-brand-blue mb-6">Success Stories</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real results for real brands. See how we weave success into every partnership.</p>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          {[
            { 
              title: "UmojaBorn Growth", 
              category: "Social Media & Content", 
              result: "0 → 13K Followers", 
              img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800" 
            },
            { 
              title: "Luxe Skincare Launch", 
              category: "Branding & Web Dev", 
              result: "250% ROI in 3 Months", 
              img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" 
            },
            { 
              title: "TechScale Campaign", 
              category: "Sponsored Ads", 
              result: "4.5x ROAS", 
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
            },
            { 
              title: "FashionForward Rebrand", 
              category: "Full Strategy", 
              result: "Brand of the Year Nominee", 
              img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
            }
          ].map((study, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden mb-6 sm:mb-8 aspect-video shadow-xl">
                <img src={study.img} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 sm:p-10">
                  <button className="bg-white text-brand-blue px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold flex items-center gap-2 text-sm sm:text-base">
                    View Case Study <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <div className="text-brand-orange font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">{study.category}</div>
                  <h3 className="text-2xl sm:text-3xl text-brand-blue">{study.title}</h3>
                </div>
                <div className="bg-brand-white px-4 py-2 rounded-full font-black text-brand-blue border border-gray-200 text-sm sm:text-base">
                  {study.result}
                </div>
              </div>
            </motion.div>
          ))}
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
      case 'services': return <ServicesPage />;
      case 'case-studies': return <CaseStudiesPage />;
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
      <Footer />
    </div>
  );
}

