import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

type Page = 'home' | 'services' | 'portfolio' | 'pricing' | 'about' | 'blog' | 'contact' | 'luxemaneDetails';

const LuxemaneDetailsPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const images = [
    '/luxma/insta.PNG',
    '/luxma/IMG_7795.JPG',
    '/luxma/IMG_7797.JPG',
    '/luxma/IMG_7811.JPG',
    '/luxma/IMG_7814.JPG',
    '/luxma/IMG_7816.JPG',
  ];

  return (
    <div className="pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => setCurrentPage('portfolio')}
          className="flex items-center gap-2 text-brand-blue font-bold mb-12 hover:gap-4 transition-all"
        >
          <ChevronLeft size={20} /> Back to Our Work
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-16 rounded-[40px] shadow-xl border border-gray-100"
        >
          <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold mb-6">BEAUTY & HAIR</div>
          <h1 className="text-5xl md:text-7xl text-brand-blue mb-6 font-black tracking-tighter">Luxemane Hair - Full Case Study</h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Discover how Brand Weaver transformed Luxemane Hair's online presence, achieving significant traffic increases and social media growth.
          </p>

          {/* Main Image */}
          <motion.img
            src={images[0]}
            alt="Luxemane Hair Instagram Feed"
            className="w-full h-auto rounded-3xl mb-12 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-3xl font-black text-brand-blue mb-4">The Challenge</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A new hair brand struggled with launch visibility, online presence, and driving consistent traffic to their platform. They needed a robust strategy to cut through the noise and establish a strong digital footprint.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-brand-blue mb-4">Our Solution</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Brand Weaver executed a comprehensive strategy that included rebuilding their visual identity, curating high-quality brand content, and launching targeted social media campaigns. We focused on authenticity and engagement to boost visibility and web traffic.
              </p>
            </div>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-10 rounded-3xl mb-16 shadow-lg">
            <h3 className="text-3xl font-black text-brand-orange mb-4">Key Results</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> 50+ high-quality brand content pieces produced</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> 220% increase in website traffic</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> 50x TikTok growth in engagement and followers</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> 10x Instagram growth with targeted audience acquisition</li>
            </ul>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-black text-brand-blue mb-6 text-center">Campaign Highlight Video</h3>
            <video
              className="w-full h-auto rounded-3xl shadow-lg"
              controls
              src="/IMG_8357.MOV"
              poster="/luxma/insta.PNG"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {images.slice(1).map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Luxemane Hair - Additional Shot ${index + 1}`}
                className="w-full h-auto rounded-2xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LuxemaneDetailsPage;
