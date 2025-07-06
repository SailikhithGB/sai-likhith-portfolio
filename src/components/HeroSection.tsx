import { Button } from '@/components/ui/button';
import { Github, Linkedin, ExternalLink } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg">
      {/* Floating background elements */}
      <div className="floating-icon top-20 left-10 text-6xl">⚛️</div>
      <div className="floating-icon top-40 right-20 text-4xl" style={{
        animationDelay: '2s'
      }}>🐍</div>
      <div className="floating-icon bottom-40 left-20 text-5xl" style={{
        animationDelay: '4s'
      }}>⚡</div>
      <div className="floating-icon bottom-20 right-10 text-3xl" style={{
        animationDelay: '1s'
      }}>🚀</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Profile Avatar with Holographic Effect */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition-all duration-300"></div>
            
            {/* Main avatar container */}
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-cyber-blue via-cyber-green to-cyber-purple p-1 animate-glow-pulse">
              <div className="w-full h-full rounded-full bg-cyber-dark p-1 relative overflow-hidden">
                {/* Profile Image */}
                <img 
                  src="data:image/jpeg;base64,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"
                  alt="Sai Likhith GB - Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Holographic overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-transparent to-cyber-green/20 rounded-full mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/30 via-transparent to-transparent rounded-full mix-blend-overlay"></div>
                
                {/* Animated scanning lines */}
                <div className="absolute inset-0 opacity-30 rounded-full overflow-hidden">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-vertical"></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-cyber-green to-transparent animate-scan-horizontal"></div>
                </div>
                
                {/* Floating holographic particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyber-blue/80 rounded-full animate-float"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-cyber-green/80 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-4 -right-4 w-2.5 h-2.5 bg-cyber-purple/80 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-4 -left-4 w-2 h-2 bg-cyber-blue/80 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
              </div>
            </div>
            
            {/* Orbiting tech icons */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-2xl">⚛️</div>
              <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 text-2xl">🐍</div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 text-2xl">⚡</div>
              <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 text-2xl">🚀</div>
            </div>
          </div>
        </div>

        {/* Animated Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gradient-to-r from-cyber-blue/20 to-blue-500/20 border border-cyber-blue/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            📅 Coding Since Age 13
          </div>
          <div className="bg-gradient-to-r from-cyber-green/20 to-green-500/20 border border-cyber-green/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            💻 MERN + Python
          </div>
          <div className="bg-gradient-to-r from-cyber-purple/20 to-purple-500/20 border border-cyber-purple/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            📰 Featured on Dev.to, Hashnode
          </div>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            📍 Bengaluru, India
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in">
          Hi, I'm <span className="gradient-text ">Sai Likhith GB</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-in" style={{
        animationDelay: '0.2s'
      }}>
          Youngest full-stack developer in India. Building bold digital experiences using{' '}
          <span className="text-cyber-blue font-semibold">Python</span>,{' '}
          <span className="text-cyber-green font-semibold">React</span> &{' '}
          <span className="text-cyber-purple font-semibold">Node.js</span> since age 13.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in" style={{
        animationDelay: '0.4s'
      }}>
          <Button asChild size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyber-blue/50 border border-transparent hover:border-cyber-blue/30">
            <a href="/projects">Explore My Work</a>
          </Button>
          
          <div className="flex gap-4">
            <Button asChild variant="outline" size="lg" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black transition-all duration-300 rounded-full shadow-lg hover:shadow-cyber-blue/50 hover:border-cyber-blue/50">
              <a href="https://github.com/sailikhithking" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={20} />
                GitHub
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all duration-300 rounded-full shadow-lg hover:shadow-cyber-green/50 hover:border-cyber-green/50">
              <a href="https://www.linkedin.com/in/sai-likhith-gb-180b332a4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        {/* Call to action quote */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto animate-slide-in" style={{
        animationDelay: '0.6s'
      }}>
          <p className="text-lg text-gray-300 italic">
            "Remember the name: <span className="gradient-text font-semibold">Sai Likhith GB</span> — the youngest full-stack developer building India's tech future."
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
