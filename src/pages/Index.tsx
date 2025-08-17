
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Star, Code, Rocket, Lightbulb } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* What Makes Me Stand Out Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Makes Me <span className="gradient-text">Stand Out</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green flex items-center justify-center">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyber-blue">Started coding at 13</h3>
              <p className="text-gray-300 text-sm">Early passion for programming with Python as my first language</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyber-green to-cyber-purple flex items-center justify-center">
                <Code className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyber-green">Building ShopVerse</h3>
              <p className="text-gray-300 text-sm">A full MERN-stack shopping platform with modern features</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyber-purple">Passionate about AI, APIs, and web apps</h3>
              <p className="text-gray-300 text-sm">Exploring cutting-edge technologies and building innovative solutions</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center">
                <Rocket className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gradient-text">Mission: India's youngest startup founder</h3>
              <p className="text-gray-300 text-sm">Building toward launching my own tech startup and making an impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Latest from My <span className="gradient-text">Blog</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Sharing my coding journey, insights, and lessons learned
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Article */}
            <article className="md:col-span-2 lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-cyber-blue/20 border border-cyber-blue/30 px-3 py-1 rounded-full text-xs font-medium text-cyber-blue">
                    Featured
                  </span>
                  <span className="bg-cyber-green/20 border border-cyber-green/30 px-3 py-1 rounded-full text-xs font-medium text-cyber-green">
                    Origin Story
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  How I Started Coding at 13
                </h3>
                
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  My journey into code began with curiosity, a Python script, and a lot of late nights. 
                  I'll share how it all started — from my first "Hello World" to building full-stack applications. 
                  The challenges, breakthroughs, and what kept me motivated through the learning curve.
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Coming Soon</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>8 min read</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  disabled
                  variant="outline" 
                  className="w-full md:w-auto opacity-50 cursor-not-allowed border-cyber-blue/30 text-cyber-blue"
                >
                  Read Full Story (Coming Soon)
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </article>

            {/* Upcoming Articles */}
            <div className="space-y-6">
              <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-cyber-purple/20 border border-cyber-purple/30 px-2 py-1 rounded-full text-xs font-medium text-cyber-purple">
                    Upcoming
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">
                  Building ShopVerse: MERN Stack Journey
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  The technical decisions, challenges, and learnings from building a modern e-commerce platform.
                </p>
                <div className="text-xs text-gray-500">Coming Soon • 10 min read</div>
              </article>

              <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-cyber-green/20 border border-cyber-green/30 px-2 py-1 rounded-full text-xs font-medium text-cyber-green">
                    Upcoming
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">
                  Teen Developer's Guide to APIs
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  Everything I learned about working with APIs, from REST to GraphQL and beyond.
                </p>
                <div className="text-xs text-gray-500">Coming Soon • 6 min read</div>
              </article>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyber-blue/50">
              <a href="/blog">View All Articles</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
