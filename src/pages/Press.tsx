import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ExternalLink, 
  Award, 
  Newspaper, 
  Star,
  TrendingUp,
  Globe,
  Users,
  BookOpen,
  Zap,
  Trophy,
  Target,
  Sparkles
} from 'lucide-react';

// Press coverage data
const pressFeatures = [
  {
    id: 1,
    title: "Rising Star: 16-Year-Old Developer",
    outlet: "Dev.to",
    description: "Featured story about youngest MERN stack developer breaking barriers",
    logo: "📝",
    category: "Feature Story",
    date: "Dec 2024",
    readTime: "5 min read",
    url: "https://dev.to/sailikhithgb",
    color: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 to-blue-600/10"
  },
  {
    id: 2,
    title: "Coding Prodigy's Journey",
    outlet: "Hashnode",
    description: "How YouTube Reels sparked a programming revolution at age 13",
    logo: "🚀",
    category: "Success Story",
    date: "Nov 2024",
    readTime: "7 min read",
    url: "https://sailikhithgb.hashnode.space",
    color: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-600/10"
  },
  {
    id: 3,
    title: "GitHub Rising Stars",
    outlet: "GitHub",
    description: "Recognized in GitHub's emerging developer spotlight program",
    logo: "⭐",
    category: "Recognition",
    date: "Oct 2024",
    readTime: "3 min read",
    url: "https://github.com/SailikhithGB",
    color: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-600/10"
  },
  {
    id: 4,
    title: "Young Innovator Spotlight",
    outlet: "Tech Community",
    description: "Building solutions that matter: A 16-year-old's perspective",
    logo: "💡",
    category: "Innovation",
    date: "Sep 2024",
    readTime: "6 min read",
    url: "#",
    color: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10"
  },
  {
    id: 5,
    title: "Future of Programming",
    outlet: "Developer Weekly",
    description: "Gen Z developers reshaping the tech landscape with fresh ideas",
    logo: "🔮",
    category: "Industry Insight",
    date: "Aug 2024",
    readTime: "8 min read",
    url: "#",
    color: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-500/10 to-purple-600/10"
  },
  {
    id: 6,
    title: "Self-Taught Success",
    outlet: "Learning Platform",
    description: "From zero to full-stack: A masterclass in self-directed learning",
    logo: "🎓",
    category: "Education",
    date: "Jul 2024",
    readTime: "4 min read",
    url: "#",
    color: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-500/10 to-cyan-600/10"
  }
];

// Stats data
const pressStats = [
  { icon: Newspaper, label: "Press Features", value: "15+", color: "text-cyber-blue" },
  { icon: Users, label: "Media Reach", value: "50K+", color: "text-cyber-green" },
  { icon: Globe, label: "Publications", value: "8", color: "text-cyber-purple" },
  { icon: TrendingUp, label: "Growth Rate", value: "300%", color: "text-yellow-400" }
];

// Container variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Card variants for smooth animations
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Press badge component
const PressEmblem = () => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 200 }}
    className="fixed top-24 right-8 z-20 hidden lg:block"
  >
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple rounded-full flex items-center justify-center"
      >
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
          <div className="text-center">
            <Award className="w-8 h-8 text-cyber-blue mx-auto mb-1" />
            <div className="text-xs font-bold text-white">PRESS</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -inset-2 bg-gradient-to-r from-cyber-blue/20 via-cyber-green/20 to-cyber-purple/20 rounded-full blur-lg"
      />
    </div>
  </motion.div>
);

const Press = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const gridRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const gridInView = useInView(gridRef, { once: true, threshold: 0.1 });

  const controls = useAnimation();

  useEffect(() => {
    if (gridInView) {
      controls.start("visible");
    }
  }, [gridInView, controls]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Schema.org JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Sai Likhith GB",
          "url": "https://sailikhithgb.vercel.app",
          "sameAs": [
            "https://dev.to/sailikhithgb",
            "https://sailikhithgb.hashnode.space",
            "https://github.com/SailikhithGB",
            "https://x.com/sailikhithgb",
            "https://www.linkedin.com/in/sailikhithgb/",
            "https://www.wikidata.org/wiki/Q135197223"
          ],
          "knowsAbout": ["Software Development", "MERN Stack", "Web Design"],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Full-Stack Developer"
          }
        })}
      </script>

      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-darker via-black to-cyber-dark opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
      </div>

      <Navigation />
      <PressEmblem />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyber-blue/20 to-cyber-green/20 backdrop-blur-sm border border-cyber-blue/30 rounded-full px-6 py-3 mb-6">
                <Sparkles className="w-5 h-5 text-cyber-blue" />
                <span className="text-cyber-blue font-semibold">In the Spotlight</span>
                <Sparkles className="w-5 h-5 text-cyber-green" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Press</span>
              <span className="text-white"> Coverage</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Discover how <span className="text-cyber-blue font-semibold">Sai Likhith GB</span> is making waves in the tech industry as one of India's youngest full-stack developers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button 
                className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold text-lg px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('press-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Explore Coverage
              </Button>
            </motion.div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pressStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:border-cyber-blue/50 group"
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-green/20 rounded-xl group-hover:from-cyber-blue/30 group-hover:to-cyber-green/30 transition-all duration-300">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 font-sora">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-inter">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Press Grid */}
          <motion.section
            id="press-grid"
            ref={gridRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="mb-20"
          >
            <motion.div
              variants={cardVariants}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">Featured </span>
                <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore the latest coverage and recognition from leading tech publications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(feature.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative"
                >
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:border-cyber-blue/50 relative">
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Hover glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue/20 via-cyber-green/20 to-cyber-purple/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Logo and Category */}
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          animate={hoveredCard === feature.id ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className="text-4xl"
                        >
                          {feature.logo}
                        </motion.div>
                        <div className={`px-3 py-1 bg-gradient-to-r ${feature.color} rounded-full text-xs font-semibold text-white`}>
                          {feature.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        {/* Meta info */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {feature.outlet}
                          </span>
                          <span>{feature.readTime}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyber-blue/25`}
                          onClick={() => window.open(feature.url, '_blank')}
                        >
                          <span>Read Article</span>
                          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </motion.div>

                      {/* Date badge */}
                      <div className="absolute top-4 right-4 text-xs text-gray-500 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        {feature.date}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-cyber-blue/10 via-cyber-green/10 to-cyber-purple/10 border border-white/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto backdrop-blur-lg">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Media Inquiries Welcome
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Interested in featuring Sai Likhith's story? Get in touch for interviews, collaborations, or press features.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold px-8 py-4 rounded-xl"
                    onClick={() => window.open('mailto:codewithsailikhith@gmail.com?subject=Press Inquiry', '_blank')}
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Contact for Press
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-black px-8 py-4 rounded-xl"
                    onClick={() => window.open('/contact', '_self')}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Press;