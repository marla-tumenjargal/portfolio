'use client'

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

interface HeaderProps {
  isVisible: boolean;
}

// Loading Animation Component
const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for dynamic interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Start animation after a brief delay to show blank screen
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsPlaying(true)
    }, 300)

    return () => clearTimeout(startTimer)
  }, [])

  // High frame rate animation timeline
  useEffect(() => {
    if (!isPlaying) return

    const startTime = Date.now()
    const totalDuration = 4000 // 4 seconds total

    const animationFrame = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      setAnimationProgress(progress)

      if (progress < 1) {
        requestAnimationFrame(animationFrame)
      } else {
        setIsComplete(true)
        // Trigger the completion callback after a brief delay
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }

    const animationId = requestAnimationFrame(animationFrame)
    return () => cancelAnimationFrame(animationId)
  }, [isPlaying, onComplete])

  // Generate perfectly symmetrical positions for 6 dots
  const orbitingDots = Array.from({ length: 6 }, (_, i) => {
    const angle = i * 60 * (Math.PI / 180) // Perfect 60-degree spacing
    return { id: i, angle }
  })

  // Calculate current state based on progress
  const getRadius = (progress) => {
    if (progress < 0.15) {
      return 0 // At center - initial growth
    } else if (progress < 0.25) {
      // Expand outward with perfect symmetry
      const expandProgress = (progress - 0.15) / 0.1
      return 50 * expandProgress
    } else if (progress < 0.6) {
      return 50 // Perfect circular orbit
    } else if (progress < 0.75) {
      // Symmetrical spiral inward
      const spiralProgress = (progress - 0.6) / 0.15
      return 50 * (1 - spiralProgress * spiralProgress)
    } else {
      return 0 // Perfectly centered merge
    }
  }

  const getRotation = (progress) => {
    if (progress < 0.15) {
      return 0
    } else if (progress < 0.75) {
      const orbitProgress = (progress - 0.15) / 0.6
      // Smooth, symmetrical rotation
      return orbitProgress * orbitProgress * orbitProgress * 2160 // 6 perfect rotations
    } else {
      return 2160
    }
  }

  const getCornerPosition = (progress) => {
    if (progress < 0.75) {
      return { x: 0, y: 0 }
    } else {
      const travelProgress = (progress - 0.75) / 0.25
      // Smooth easing with perfect diagonal movement
      const easedProgress = 1 - Math.pow(1 - travelProgress, 3)

      return {
        x: window.innerWidth * 0.45 * easedProgress,
        y: -window.innerHeight * 0.35 * easedProgress,
      }
    }
  }

  const getDotSize = (progress) => {
    if (progress < 0.08) {
      return 1 + progress * 12.5 * 10
    } else if (progress < 0.15) {
      const growthProgress = (progress - 0.08) / 0.07
      return 11 + growthProgress * 9
    } else if (progress < 0.25) {
      // Symmetrical dispersal
      return 20 * (1 - (progress - 0.15) / 0.1)
    } else if (progress < 0.6) {
      return 0 // No center dot during orbit
    } else if (progress < 0.75) {
      // Symmetrical merge
      const mergeProgress = (progress - 0.6) / 0.15
      return mergeProgress * 35
    } else {
      return 48 // Profile picture size
    }
  }

  const getOrbitDotSize = (progress) => {
    if (progress < 0.25) {
      return 18
    } else if (progress < 0.6) {
      const orbitProgress = (progress - 0.25) / 0.35
      // Symmetrical mouse interaction
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const mouseDistance = Math.sqrt(Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2))
      const mouseEffect = Math.max(0, 1 - mouseDistance / 200) * 6 // Reduced for symmetry

      return 18 + orbitProgress * 10 + mouseEffect
    } else {
      const mergeProgress = (progress - 0.6) / 0.15
      return 28 + mergeProgress * 15
    }
  }

  // Don't render anything if animation hasn't started
  if (!isPlaying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
        <div className="relative w-96 h-96 flex items-center justify-center"></div>
      </div>
    )
  }

  const cornerPosition = getCornerPosition(animationProgress)
  const currentRadius = getRadius(animationProgress)
  const currentRotation = getRotation(animationProgress)
  const mainDotSize = getDotSize(animationProgress)
  const orbitDotSize = getOrbitDotSize(animationProgress)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Perfectly symmetrical animation container */}
        <motion.div
          className="absolute"
          style={{
            rotate: currentRotation,
            x: cornerPosition.x,
            y: cornerPosition.y,
          }}
        >
          {/* Center dot - perfectly centered */}
          {(animationProgress < 0.25 || animationProgress > 0.6) && mainDotSize > 0 && (
            <div>
              {[...Array(7)].map((_, layerIndex) => (
                <motion.div
                  key={`main-layer-${layerIndex}`}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: "#1626ff",
                    opacity: 0.1 + layerIndex * 0.13,
                    width: mainDotSize + layerIndex * (mainDotSize * 0.3),
                    height: mainDotSize + layerIndex * (mainDotSize * 0.3),
                    left: -(mainDotSize / 2) - layerIndex * (mainDotSize * 0.15),
                    top: -(mainDotSize / 2) - layerIndex * (mainDotSize * 0.15),
                  }}
                />
              ))}
            </div>
          )}

          {/* Perfectly symmetrical orbiting dots */}
          {animationProgress >= 0.15 &&
            animationProgress <= 0.75 &&
            orbitingDots.map((dot, index) => {
              let dotOpacity = 1
              if (animationProgress < 0.25) {
                dotOpacity = (animationProgress - 0.15) / 0.1
              } else if (animationProgress > 0.65) {
                dotOpacity = Math.max(0, 1 - (animationProgress - 0.65) / 0.1)
              }

              // Perfect symmetrical positioning - no wobble
              const dotAngle = dot.angle
              const x = Math.cos(dotAngle) * currentRadius
              const y = Math.sin(dotAngle) * currentRadius

              return (
                <div key={dot.id} style={{ opacity: dotOpacity }}>
                  {[...Array(6)].map((_, layerIndex) => (
                    <motion.div
                      key={`orbit-layer-${dot.id}-${layerIndex}`}
                      className="absolute rounded-full"
                      style={{
                        backgroundColor: "#1626ff",
                        opacity: 0.12 + layerIndex * 0.15,
                        width: orbitDotSize + layerIndex * 6,
                        height: orbitDotSize + layerIndex * 6,
                        left: x - orbitDotSize / 2 - layerIndex * 3,
                        top: y - orbitDotSize / 2 - layerIndex * 3,
                      }}
                    />
                  ))}
                </div>
              )
            })}
        </motion.div>
      </div>
    </div>
  )
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
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showSections, setShowSections] = useState(false);

  const handleLoadingComplete = () => {
    setShowPortfolio(true);
  };

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

  // Show loading animation first
  if (!showPortfolio) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

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