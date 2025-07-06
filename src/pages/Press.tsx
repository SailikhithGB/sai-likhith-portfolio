import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  ExternalLink,
  Calendar,
  Award,
  Code,
  BookOpen,
  Users,
  Globe,
  Camera,
  Palette,
  FileText
} from 'lucide-react';

// Timeline data
const milestones = [
  {
    year: '2022',
    title: 'Started Coding Journey',
    description: 'Discovered programming through YouTube reels, began with Python',
    icon: '🐍',
    color: 'cyber-blue'
  },
  {
    year: '2023', 
    title: 'MERN Stack Mastery',
    description: 'Built full-stack projects with MongoDB, Express, React, Node.js',
    icon: '⚛️',
    color: 'cyber-green'
  },
  {
    year: '2024',
    title: 'Portfolio & Content Creation',
    description: 'Launched portfolio, started blogging on Dev.to & Hashnode',
    icon: '📝',
    color: 'cyber-purple'
  },
  {
    year: '2025',
    title: 'Recognition & Growth',
    description: 'Google verification, press outreach, building tech community',
    icon: '🏆',
    color: 'cyber-blue'
  }
];

// Press quotes
const pressQuotes = [
  {
    quote: "I believe code can change the world — even when you're just 16.",
    context: "On his vision for technology"
  },
  {
    quote: "I started with no tech background, just curiosity and consistency.",
    context: "On his coding journey"
  },
  {
    quote: "Age is just a number when you're passionate about solving real problems.",
    context: "On being a young developer"
  }
];

// Downloadable assets
const assets = [
  {
    title: 'Profile Picture',
    description: 'High-resolution professional headshot',
    type: 'JPG, PNG',
    size: '2MB',
    icon: Camera,
    downloadUrl: '/assets/press/profile-picture.jpg'
  },
  {
    title: 'Brand Banner',
    description: 'Social media headers and banners',
    type: 'PNG, SVG',
    size: '1.5MB',
    icon: Palette,
    downloadUrl: '/assets/press/brand-banner.zip'
  },
  {
    title: 'Media Kit',
    description: 'Complete press kit with bio and facts',
    type: 'PDF',
    size: '500KB',
    icon: FileText,
    downloadUrl: '/assets/press/media-kit.pdf'
  }
];

// Social links
const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/SailikhithGB', color: 'hover:text-cyber-blue' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sailikhithgb', color: 'hover:text-cyber-green' },
  { name: 'Dev.to', icon: BookOpen, url: 'https://dev.to/sailikhithgb', color: 'hover:text-cyber-purple' },
  { name: 'Hashnode', icon: Globe, url: 'https://hashnode.com/@sailikhithgb', color: 'hover:text-cyber-blue' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/sai_likhith_2009', color: 'hover:text-cyber-green' },
  { name: 'Portfolio', icon: ExternalLink, url: 'https://sailikhithgb.vercel.app', color: 'hover:text-cyber-purple' }
];

const Press = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const heroRef = useRef(null);
  const bioRef = useRef(null);
  const timelineRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const bioInView = useInView(bioRef, { once: true });
  const timelineInView = useInView(timelineRef, { once: true });

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % pressQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <title>Press Kit - Sai Likhith GB | 16-Year-Old Full-Stack Developer</title>
      <meta name="description" content="Media kit for Sai Likhith GB - India's youngest full-stack developer. Download bio, assets, and press materials." />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Press Kit - Sai Likhith GB" />
      <meta property="og:description" content="Media kit for India's youngest full-stack developer" />
      <meta property="og:image" content="/assets/press/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Press Kit
            </h1>
            <h2 className="text-2xl md:text-3xl text-white mb-4">
              Sai Likhith GB
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed">
              Download bio, assets, logos, and connect with Sai Likhith GB — a 16-year-old developer building the future through code.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold">
                <Download className="w-5 h-5 mr-2" />
                Download Assets
              </Button>
              <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black">
                <Github className="w-5 h-5 mr-2" />
                View GitHub
              </Button>
              <Button variant="outline" className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black">
                <Mail className="w-5 h-5 mr-2" />
                Contact
              </Button>
            </div>
          </motion.section>

          {/* Bios Section */}
          <motion.section
            ref={bioRef}
            initial={{ opacity: 0, x: -50 }}
            animate={bioInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8 mb-20"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cyber-blue mb-4">Short Bio</h3>
                <p className="text-gray-300 leading-relaxed">
                  Sai Likhith GB is a 16-year-old full-stack developer from Bengaluru, India. Starting at 13, he's mastered MERN stack development, created multiple projects, and actively shares knowledge through Dev.to and Hashnode blogs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cyber-green mb-4">Long Bio</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Sai Likhith GB discovered programming at 13 through YouTube reels and quickly became passionate about technology. 
                  Starting with Python, he expanded to full-stack development with the MERN stack (MongoDB, Express, React, Node.js). 
                  At just 16, he's built production-ready applications, maintained an active presence on technical blogs, 
                  and earned recognition as one of India's youngest developers. His journey represents the new generation of 
                  self-taught programmers who leverage modern learning platforms to master complex technologies early.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Assets Section */}
          <section className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              Download <span className="gradient-text">Assets</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {assets.map((asset, index) => (
                <motion.div
                  key={asset.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-cyber-blue/20 to-cyber-green/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <asset.icon className="w-8 h-8 text-cyber-blue" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{asset.title}</h4>
                      <p className="text-gray-400 mb-2">{asset.description}</p>
                      <div className="text-sm text-gray-500 mb-4">{asset.type} • {asset.size}</div>
                      <Button 
                        className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black"
                        onClick={() => window.open(asset.downloadUrl, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Milestones Timeline */}
          <motion.section
            ref={timelineRef}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Milestones</span> Timeline
            </h3>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-blue via-cyber-green to-cyber-purple opacity-30"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="text-3xl mb-2">{milestone.icon}</div>
                          <div className="text-2xl font-bold gradient-text mb-2">{milestone.year}</div>
                          <h4 className="text-xl font-semibold text-cyber-blue mb-2">{milestone.title}</h4>
                          <p className="text-gray-300">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="relative z-10 w-6 h-6 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full border-4 border-black animate-pulse"></div>
                    
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Press Quotes */}
          <section className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              Press-Ready <span className="gradient-text">Quotes</span>
            </h3>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="text-2xl md:text-3xl font-bold text-white mb-4 italic">
                    "{pressQuotes[currentQuote].quote}"
                  </blockquote>
                  <p className="text-gray-400">— {pressQuotes[currentQuote].context}</p>
                </motion.div>
                
                <div className="flex justify-center mt-6 space-x-2">
                  {pressQuotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentQuote ? 'bg-cyber-blue' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Official Links */}
          <section className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              Official <span className="gradient-text">Links</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-white/5 backdrop-blur-sm border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group ${link.color}`}
                >
                  <link.icon className="w-8 h-8 mx-auto mb-2 text-gray-300 group-hover:text-current transition-colors duration-300" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </p>
                </motion.a>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-cyber-blue/10 via-cyber-green/10 to-cyber-purple/10 border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Want to Feature or Interview Sai Likhith?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Get in touch for interviews, collaborations, or press features.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold"
                  onClick={() => window.open('mailto:codewithsailikhith@gmail.com?subject=Press Inquiry', '_blank')}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-black"
                  onClick={() => window.open('/contact', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </Card>
          </motion.section>
        </div>
      </main>
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Sai Likhith GB",
          "jobTitle": "Full-Stack Developer",
          "age": 16,
          "nationality": "Indian",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "India"
          },
          "url": "https://sailikhithgb.vercel.app",
          "sameAs": [
            "https://github.com/SailikhithGB",
            "https://www.linkedin.com/in/sailikhithgb",
            "https://dev.to/sailikhithgb",
            "https://hashnode.com/@sailikhithgb"
          ],
          "knowsAbout": ["Full-Stack Development", "MERN Stack", "Python", "Web Development"],
          "description": "16-year-old full-stack developer from India specializing in MERN stack development"
        })}
      </script>
    </div>
  );
};

export default Press;