import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

type Page = 'home' | 'services' | 'portfolio' | 'pricing' | 'about' | 'blog' | 'contact' | 'luxemaneDetails' | 'umojabornDetails';

const UmojabornDetailsPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const allImages = [
    '/omo/IMG_1144.PNG',
    '/omo/IMG_1145-1.PNG',
    '/omo/IMG-20260416-WA0000.jpg',
  ];

  const videoSrc = "/IMG_1199.MP4"; // The video to be displayed
  const insImage = '/omo/ins.PNG';

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
          <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold mb-6">FASHION & CULTURE</div>
          <h1 className="text-5xl md:text-7xl text-brand-blue mb-6 font-black tracking-tighter">Umojaborn - Full Case Study</h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Explore how Brand Weaver elevated Umojaborn's brand presence, driving significant follower growth and community engagement through strategic Afrocentric content.
          </p>

          {/* Video Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-black text-brand-blue mb-6 text-center">Campaign Highlight Video</h3>
            <video
              className="w-full h-auto rounded-3xl shadow-lg"
              controls
              src={videoSrc}
              poster={insImage}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Umojaborn ins.PNG Image */}
          <div className="mb-12">
            <motion.img
              src={insImage}
              alt="Umojaborn Instagram"
              className="w-full h-auto rounded-3xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-3xl font-black text-brand-blue mb-4">The Challenge</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A new brand needed a hands-free launch and scaling strategy for Instagram, focusing on awareness, engagement, and building an Afrocentric community.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-brand-blue mb-4">Our Solution</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We implemented a comprehensive launch and content strategy focused on attracting and retaining the target audience through trendy Afrocentric content.
              </p>
            </div>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-10 rounded-3xl mb-16 shadow-lg">
            <h3 className="text-3xl font-black text-brand-orange mb-4">Key Results</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> Gained 14k+ new followers</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> Consistent monthly growth</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white" /> Brand recognition in 2 months</li>
            </ul>
          </div>

          {/* Other Additional Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {allImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Umojaborn Image`}
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

export default UmojabornDetailsPage;
