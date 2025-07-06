import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin, 
  Send, 
  MessageCircle,
  Download,
  Calendar,
  Briefcase
} from 'lucide-react';

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema)
  });

  const triggerSuccessEffects = () => {
    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const socialLinks = [{
    name: 'GitHub',
    url: 'https://github.com/sailikhithking',
    icon: Github,
    color: 'hover:text-cyber-blue',
    description: 'Check out my code repositories'
  }, {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sai-likhith-gb-180b332a4',
    icon: Linkedin,
    color: 'hover:text-cyber-green',
    description: 'Connect professionally'
  }, {
    name: 'Instagram',
    url: 'https://www.instagram.com/sai_likhith_2009',
    icon: Instagram,
    color: 'hover:text-cyber-purple',
    description: 'Follow my journey'
  }];

  const quickActions = [
    {
      label: 'Download Resume',
      icon: Download,
      action: () => window.open('/resume.pdf', '_blank'),
      color: 'from-cyber-blue to-blue-500'
    },
    {
      label: 'Schedule Call',
      icon: Calendar,
      action: () => window.open('https://cal.com/sailikhith', '_blank'),
      color: 'from-cyber-green to-green-500'
    },
    {
      label: 'Hire Me',
      icon: Briefcase,
      action: () => window.open('mailto:codewithsailikhith@gmail.com?subject=Hiring Opportunity', '_blank'),
      color: 'from-cyber-purple to-purple-500'
    }
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Check if EmailJS is properly configured
      if (serviceId === 'your_service_id' || templateId === 'your_template_id' || publicKey === 'your_public_key') {
        // Demo mode - show success animation without sending email
        console.log('Demo Mode - Form Data:', data);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
        
        setIsSubmitted(true);
        triggerSuccessEffects();
        toast.success('Demo Mode: Message received! 🎉');
        reset();
        
        setTimeout(() => setIsSubmitted(false), 5000);
        return;
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Sai Likhith GB',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitted(true);
      triggerSuccessEffects();
      toast.success('Message sent successfully! 🚀');
      reset();
      
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Let's collaborate, build, and innovate. Don't hesitate to reach out.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={action.action}
                className={`bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className="w-5 h-5" />
                {action.label}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Let's Connect</h2>
                <p className="text-gray-300 text-lg mb-8">
                  I'm always excited to connect with fellow developers, potential collaborators, and anyone interested in tech. Whether you have a project idea, want to discuss opportunities, or just want to say hi, I'd love to hear from you!
                </p>
              </div>

              {/* Location */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyber-blue/20 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Location</h3>
                      <p className="text-gray-300">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyber-green/20 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-cyber-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-300">codewithsailikhith@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>
                <div className="grid gap-4">
                  {socialLinks.map((social) => (
                    <Card key={social.name} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4">
                        <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                          <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-all duration-300">
                            <social.icon className={`w-5 h-5 text-gray-300 ${social.color} transition-colors duration-300`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-white group-hover:text-cyber-blue transition-colors duration-300">
                              {social.name}
                            </h4>
                            <p className="text-sm text-gray-400">{social.description}</p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 3D Interactive Chat Illustration */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="relative group">
                  <div className="w-48 h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-green/20 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-cyber-blue/50 transition-all duration-300">
                    <div className="relative">
                      {/* Laptop */}
                      <motion.div 
                        className="w-24 h-16 bg-gray-800 rounded-lg border border-gray-600 relative"
                        whileHover={{ rotateY: 15, rotateX: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-20 h-12 bg-cyber-blue/30 rounded-sm m-2 flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-cyber-blue animate-pulse" />
                        </div>
                      </motion.div>
                      {/* Person silhouette */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full"></div>
                      
                      {/* Floating particles */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-2 h-2 bg-cyber-green rounded-full"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-cyber-purple rounded-full"
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>
                  
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-cyber-green to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Message Sent! 🚀</h3>
                      <p className="text-gray-300">
                        Thanks for reaching out! I'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            First Name *
                          </Label>
                          <Input 
                            {...register('firstName')}
                            type="text" 
                            className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-cyber-blue/20" 
                            placeholder="Your first name" 
                          />
                          {errors.firstName && (
                            <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Last Name *
                          </Label>
                          <Input 
                            {...register('lastName')}
                            type="text" 
                            className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-cyber-blue/20" 
                            placeholder="Your last name" 
                          />
                          {errors.lastName && (
                            <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Email *
                        </Label>
                        <Input 
                          {...register('email')}
                          type="email" 
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-cyber-blue/20" 
                          placeholder="your.email@example.com" 
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Subject *
                        </Label>
                        <Input 
                          {...register('subject')}
                          type="text" 
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-cyber-blue/20" 
                          placeholder="What's this about?" 
                        />
                        {errors.subject && (
                          <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Message *
                        </Label>
                        <Textarea 
                          {...register('message')}
                          rows={5} 
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-cyber-blue/20 resize-none" 
                          placeholder="Tell me about your project or just say hello!" 
                        />
                        {errors.message && (
                          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyber-blue/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Animated typing indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <div className="flex gap-1">
                  <motion.div 
                    className="w-2 h-2 bg-cyber-blue rounded-full"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-cyber-green rounded-full"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-cyber-purple rounded-full"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                </div>
                <span className="text-sm">Ready to connect</span>
              </div>
            </motion.div>
          </div>

          {/* Final CTA */}
          <motion.section 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <p className="text-lg text-gray-300 italic max-w-3xl mx-auto">
                "Remember the name: <span className="gradient-text font-semibold">Sai Likhith GB</span> — the youngest full-stack developer building India's tech future."
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Contact;