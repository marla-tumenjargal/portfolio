'use client'

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

interface HeaderProps {
  isVisible: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + (currentIndex === 0 ? 200 : 120));

      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
      setTimeout(onComplete, 500);
    }
  }, [currentIndex, text, delay, onComplete]);

  return (
    <span className="relative">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Header = ({ isVisible }: HeaderProps) => {
  const navItems = [
    { name: "Ventures", href: "#ventures" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Connect", href: "#connect" },
    { name: "Playground", href: "#playground" },
    { name: "Writing", href: "#writing" },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`w-full bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-700 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">M</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-600 hover:text-black text-sm font-medium transition-colors duration-200 tracking-wide"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-black">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Home() {
  const [showDescription, setShowDescription] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showSections, setShowSections] = useState(false);

  const handleNameComplete = () => {
    setShowDescription(true);
  };

  const handleDescriptionComplete = () => {
    setTimeout(() => {
      setShowHeader(true);
      setTimeout(() => setShowSections(true), 300);
    }, 800);
  };

  const handleExploreClick = () => {
    console.log('Navigate to explore page');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isVisible={showHeader} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white">
        {/* Name in Top Left */}
        <div className="absolute top-6 left-6 text-left z-20">
          <h1 className="text-xl md:text-2xl font-large text-black tracking-tight">
            <TypewriterText 
              text="Marla Tumenjargal" 
              delay={0}
              onComplete={handleNameComplete}
            />
          </h1>
        </div>

        {/* Description + Explore Button */}
        <div className="flex items-left justify-start h-full px-6 pb-24">
          <div className="text-left max-w-xl mt-16">
            <div 
              className={`transition-all duration-1000 ${
                showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-xl md:text text-gray-600 font-light leading-relaxed tracking-wide mb-8">
                <TypewriterText 
                  text="Designer, Developer & Creative Technologist"
                  delay={showDescription ? 0 : 50}
                  onComplete={handleDescriptionComplete}
                />
              </p>
            </div>

            {/* Explore Button */}
            <div 
              className={`transition-all duration-1000 delay-500 ${
                showSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button 
                onClick={handleExploreClick}
                className="w-16 h-16 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
              >
                <svg 
                  className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main 
        className={`transition-all duration-1000 ${
          showSections ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Ventures Section */}
        <section id="ventures" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                Ventures
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Exploring innovative projects that shape the future through technology, 
                design, and creative problem-solving.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Startup Initiative', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
                { name: 'Tech Innovation', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
                { name: 'Creative Project', color: 'bg-gradient-to-br from-green-500 to-teal-500' }
              ].map((venture) => (
                <div key={venture.name} className="group cursor-pointer">
                  <div className={`aspect-square ${venture.color} rounded-lg mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}></div>
                  <h3 className="text-xl font-semibold text-black mb-2">{venture.name}</h3>
                  <p className="text-gray-600">Brief description of this venture and its impact.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                Tech Stack
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The tools and technologies that power modern innovation.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'React', color: 'bg-blue-500' },
                { name: 'Next.js', color: 'bg-black' },
                { name: 'TypeScript', color: 'bg-blue-600' },
                { name: 'Node.js', color: 'bg-green-600' },
                { name: 'Python', color: 'bg-yellow-500' },
                { name: 'Figma', color: 'bg-purple-500' }
              ].map((tech) => (
                <div key={tech.name} className="text-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 ${tech.color} rounded-full mx-auto mb-4`}></div>
                  <h3 className="font-medium text-black">{tech.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
              Connect
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Let's collaborate on something extraordinary. Reach out for projects, 
              opportunities, or just to share ideas.
            </p>
            <div className="flex justify-center space-x-8">
              {['Email', 'LinkedIn', 'Twitter', 'GitHub'].map((platform) => (
                <button key={platform} className="text-gray-600 hover:text-black transition-colors duration-200 font-medium">
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Playground Section */}
        <section id="playground" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                Playground
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Interactive experiments and creative explorations where ideas come to life.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: 'Interactive Demo', color: 'bg-gradient-to-br from-orange-400 to-red-500' },
                { name: 'Creative Experiment', color: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
                { name: 'Code Playground', color: 'bg-gradient-to-br from-teal-400 to-blue-500' },
                { name: 'Design System', color: 'bg-gradient-to-br from-pink-500 to-rose-500' }
              ].map((item) => (
                <div key={item.name} className="group cursor-pointer p-8 bg-white rounded-lg hover:shadow-lg transition-all duration-300">
                  <div className={`aspect-video ${item.color} rounded mb-6 group-hover:scale-105 transition-transform duration-300`}></div>
                  <h3 className="text-xl font-semibold text-black mb-2">{item.name}</h3>
                  <p className="text-gray-600">Explore this interactive element and discover what's possible.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                Writing
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Thoughts and insights on technology, design, and the future of digital experiences.
              </p>
            </div>
            <div className="space-y-12">
              {[
                { title: "The Future of Web Development", date: "June 2025", excerpt: "Exploring emerging trends and technologies that are reshaping how we build for the web." },
                { title: "Design Systems at Scale", date: "May 2025", excerpt: "Building consistent, maintainable design languages for growing organizations." },
                { title: "Creative Coding Explorations", date: "April 2025", excerpt: "Where art meets code, and how creative programming opens new possibilities." }
              ].map((post) => (
                <article key={post.title} className="group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-black mb-2 group-hover:text-gray-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{post.excerpt}</p>
                      <p className="text-sm text-gray-400">{post.date}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer 
        className={`py-12 px-6 border-t border-gray-100 transition-all duration-1000 ${
          showSections ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Marla Tumenjargal. Crafted with intention.
          </p>
        </div>
      </footer>
    </div>
  );
}