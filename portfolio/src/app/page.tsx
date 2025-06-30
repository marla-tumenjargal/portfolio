'use client'

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';
import './globals.css';
import header from './header.png'

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

interface HeaderProps {
  isVisible: boolean;
}

interface ProjectCardProps {
  title: string;
  isNew?: boolean;
  backgroundColor: string;
  hoverColor: string;
  href: string;
  className?: string;
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
      <div className="loading-container">
        <div className="loading-content"></div>
      </div>
    )
  }

  const cornerPosition = getCornerPosition(animationProgress)
  const currentRadius = getRadius(animationProgress)
  const currentRotation = getRotation(animationProgress)
  const mainDotSize = getDotSize(animationProgress)
  const orbitDotSize = getOrbitDotSize(animationProgress)

  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Perfectly symmetrical animation container */}
        <motion.div
          className="animation-container"
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
                  className="center-dot"
                  style={{
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
                      className="orbit-dot"
                      style={{
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
      }, delay + (currentIndex === 0 ? 100 : 50));

      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
      setTimeout(onComplete, 500);
    }
  }, [currentIndex, text, delay, onComplete]);

  return (
    <span className="typewriter-container">
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

const Header = ({ isVisible }: HeaderProps) => {
  const navItems = [
    { name: "Ventures", href: "#ventures" },
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
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-circle">
              <span className="logo-text">M</span>
            </div>
          </div>

          <nav className="nav-desktop">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="nav-button"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mobile-menu-button">
            <button>
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  isNew, 
  backgroundColor, 
  hoverColor, 
  href, 
  className = '' 
}) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.outline = `3px solid ${hoverColor}`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.outline = 'none';
  };

  return (
    <Link href={href}>
      <div 
        className={`project-card ${className}`}
        style={{ backgroundColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-card-content">
          <div className="project-card-inner">
            <h3 className="project-title">{title}</h3>
            {isNew && (
              <span className="new-badge">
                NEW
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Project Grid Gallery Component
const ProjectGrid = ({ showGallery }: { showGallery: boolean }) => {
  const projects = [
    {
      title: "AI Meeting Notes",
      subtitle: "Perfect notes every time",
      isNew: true,
      backgroundColor: "#FFB5B5", // salmon
      hoverColor: "#FF8A8A",
      href: "/ai-meeting-notes"
    },
    {
      title: "Enterprise Search",
      subtitle: "One search for everything", 
      isNew: true,
      backgroundColor: "#B5D4FF", // baby blue
      hoverColor: "#8AC4FF",
      href: "/enterprise-search"
    },
    {
      title: "Projects",
      subtitle: "Keep every plan on track",
      isNew: false,
      backgroundColor: "#FFF4B5", // baby yellow
      hoverColor: "#FFEB8A",
      href: "/projects"
    },
    {
      title: "Notion Mail",
      subtitle: "The inbox that thinks like you",
      isNew: true,
      backgroundColor: "#E0E0E0", // baby gray
      hoverColor: "#D0D0D0",
      href: "/notion-mail"
    },
    {
      title: "Business-in-a-box",
      subtitle: "Run your entire company",
      isNew: false,
      backgroundColor: "#B5FFB5", // baby green
      hoverColor: "#8AFF8A",
      href: "/business-in-a-box"
    }
  ];

  return (
    <div className={`project-grid ${showGallery ? 'visible' : 'hidden'}`}>
      <div className="project-grid-header">
        <h2 className="grid-title">
          Featured Projects
        </h2>
        <p className="grid-description">
          A collection of applications I've built, from productivity tools to creative experiments
        </p>
      </div>

      <div className="grid-container">
        <div className="grid-layout">
          {/* Row 1: Projects 1 & 2 */}
          <ProjectCard
            title={`${projects[0].title} - ${projects[0].subtitle}`}
            isNew={projects[0].isNew}
            backgroundColor={projects[0].backgroundColor}
            hoverColor={projects[0].hoverColor}
            href={projects[0].href}
            className="grid-item"
          />
          
          <ProjectCard
            title={`${projects[1].title} - ${projects[1].subtitle}`}
            isNew={projects[1].isNew}
            backgroundColor={projects[1].backgroundColor}
            hoverColor={projects[1].hoverColor}
            href={projects[1].href}
            className="grid-item"
          />

          {/* Row 2: Project 3 (long panel) */}
          <ProjectCard
            title={`${projects[2].title} - ${projects[2].subtitle}`}
            isNew={projects[2].isNew}
            backgroundColor={projects[2].backgroundColor}
            hoverColor={projects[2].hoverColor}
            href={projects[2].href}
            className="grid-item grid-item-wide"
          />

          {/* Row 3: Projects 4 & 5 */}
          <ProjectCard
            title={`${projects[3].title} - ${projects[3].subtitle}`}
            isNew={projects[3].isNew}
            backgroundColor={projects[3].backgroundColor}
            hoverColor={projects[3].hoverColor}
            href={projects[3].href}
            className="grid-item"
          />

          <ProjectCard
            title={`${projects[4].title} - ${projects[4].subtitle}`}
            isNew={projects[4].isNew}
            backgroundColor={projects[4].backgroundColor}
            hoverColor={projects[4].hoverColor}
            href={projects[4].href}
            className="grid-item"
          />
        </div>
      </div>
    </div>
  );
};

// Article Popup Component
const ArticlePopup = ({ article, isVisible, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose]);

  if (!article) return null;

  return (
    <div 
      className={`article-popup-overlay ${isVisible ? 'visible' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="article-popup">
        <button className="article-popup-close" onClick={onClose}>
          ×
        </button>
        <div className="article-popup-content">
          <h1 className="article-popup-title">
            {article.fullTitle || article.title}
          </h1>
          
          <hr className="article-section-divider" />
          
          <div className="article-section">
            <h2 className="article-section-title">OUR GOAL</h2>
            <p className="article-section-content">
              Our goal is to build superintelligent autonomous systems. We believe that solving 
              autonomous coding is the root node problem that will enable superintelligence 
              more broadly. If you build a superintelligent autonomous coding system, all other 
              verticals of computer-based work will follow.
            </p>
          </div>

          <hr className="article-section-divider" />

          <div className="article-section">
            <h2 className="article-section-title">RESEARCH</h2>
            <p className="article-section-content">
              Our research sits at the intersection of reinforcement learning and language 
              models. Over the last decade, our team built some of the most capable AI systems, 
              such as AlphaGo and Gemini, in both fields. Our research bet for building 
              superintelligence is to improve the autonomous capabilities of language models 
              with reinforcement learning. One way to think of our research agenda is by asking 
              the question – how do we get a language model to exhibit the same level of 
              autonomy on a computer as AlphaGo did at Go?
            </p>
          </div>

          <hr className="article-section-divider" />

          <div className="article-section">
            <h2 className="article-section-title">POSTS</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticlePopup, setShowArticlePopup] = useState(false);

  const handleLoadingComplete = () => {
    setShowPortfolio(true);
  };

  const handleNameComplete = () => {
    setShowDescription(true);
  };

  const handleDescriptionComplete = () => {
    setTimeout(() => {
      setShowHeader(true);
      setTimeout(() => {
        setShowSections(true);
        setTimeout(() => setShowGallery(true), 500);
      }, 300);
    }, 800);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowArticlePopup(true);
  };

  const handleCloseArticle = () => {
    setShowArticlePopup(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  // Show loading animation first
  if (!showPortfolio) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="main-container">
      <Header isVisible={showHeader} />
      
      {/* Hero Section - Header Image Only */}
      <section className="hero-section">
        {/* Name in Top Left */}
        <div className="hero-name">
          <h1 className="hero-title">
            <TypewriterText 
              text="Hi I'm John Doe -- I'm a Product Designer at Webflow." 
              delay={0}
              onComplete={handleNameComplete}
            />
          </h1>
        </div>

        {/* Description positioned above image */}
        <div className="hero-description">
          <div className={`description-content ${showDescription ? 'visible' : 'hidden'}`}>
            <p className="description-text">
              <TypewriterText 
                text="I am a seasoned product designer with 5 years of experience specializing 
                in crafting creative tools solutions and empowering creatives."
                delay={showDescription ? 0 : 5}
                onComplete={handleDescriptionComplete}
              />
            </p>
          </div>
        </div>

        {/* Header Image Section - Main focal point */}
        <div className={`header-image-section ${showGallery ? 'visible' : 'hidden'}`}>
          <div className="header-image-container">
            <img 
              src={header.src} 
              alt="Header" 
              className="header-image"
            />
          </div>
        </div>
      </section>

      {/* Projects Section - Separate scrollable section */}
      <section className="projects-section">
        <ProjectGrid showGallery={showGallery} />
      </section>

      {/* Main Content */}
      <main className={`main-content ${showSections ? 'visible' : 'hidden'}`}>
        {/* Ventures Section */}
        <section id="ventures" className="section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Ventures
              </h2>
              <p className="section-description-large">
                Exploring innovative projects that shape the future through technology, 
                design, and creative problem-solving.
              </p>
            </div>
            <div className="grid-3">
              {[
                { name: 'Startup Initiative', color: 'bg-gradient-purple-pink' },
                { name: 'Tech Innovation', color: 'bg-gradient-blue-cyan' },
                { name: 'Creative Project', color: 'bg-gradient-green-teal' }
              ].map((venture) => (
                <div key={venture.name} className="venture-card">
                  <div className={`venture-card-image ${venture.color}`}></div>
                  <h3 className="venture-card-title">{venture.name}</h3>
                  <p className="venture-card-description">Brief description of this venture and its impact.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="section">
          <div className="section-container-medium">
            <div className="section-header">
              <h2 className="section-title">
                Connect
              </h2>
              <p className="section-description-medium">
                Let's collaborate on something extraordinary. Reach out for projects, 
                opportunities, or just to share ideas.
              </p>
            </div>
            <div className="connect-buttons">
              {['Email', 'LinkedIn', 'Twitter', 'GitHub'].map((platform) => (
                <button key={platform} className="connect-button">
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Playground Section */}
        <section id="playground" className="section section-gray">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Playground
              </h2>
              <p className="section-description-large">
                Interactive experiments and creative explorations where ideas come to life.
              </p>
            </div>
            <div className="grid-2">
              {[
                { name: 'Interactive Demo', color: 'bg-gradient-orange-red' },
                { name: 'Creative Experiment', color: 'bg-gradient-indigo-purple' },
                { name: 'Code Playground', color: 'bg-gradient-teal-blue' },
                { name: 'Design System', color: 'bg-gradient-pink-rose' }
              ].map((item) => (
                <div key={item.name} className="playground-card">
                  <div className={`playground-card-image ${item.color}`}></div>
                  <h3 className="playground-card-title">{item.name}</h3>
                  <p className="playground-card-description">Explore this interactive element and discover what's possible.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="section">
          <div className="section-container-medium">
            <div className="section-header">
              <h2 className="section-title">
                Writing
              </h2>
              <p className="section-description">
                some thoughtpieces on philosophy, poetry, and human-centered technology. 
              </p>
            </div>
            <div className="writing-list">
              {[
                { 
                  title: "issue 01: eternal sunshine", 
                  fullTitle: "Building superintelligent autonomous systems",
                  date: "june 1st, 2025", 
                  excerpt: "raise y_our glasses (one last time!)" 
                },
                { 
                  title: "Design Systems at Scale", 
                  fullTitle: "Building superintelligent autonomous systems",
                  date: "May 2025", 
                  excerpt: "Building consistent, maintainable design languages for growing organizations." 
                },
                { 
                  title: "Creative Coding Explorations", 
                  fullTitle: "Building superintelligent autonomous systems",
                  date: "April 2025", 
                  excerpt: "Where art meets code, and how creative programming opens new possibilities." 
                }
              ].map((post) => (
                <article key={post.title} className="article-card" onClick={() => handleArticleClick(post)}>
                  <div className="article-content">
                    <div className="article-text">
                      <h3 className="article-title">
                        {post.title}
                      </h3>
                      <p className="article-excerpt">{post.excerpt}</p>
                      <p className="article-date">{post.date}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`footer ${showSections ? 'visible' : 'hidden'}`}>
        <div className="footer-container">
          <p className="footer-text">
            © 2025 Marla Tumenjargal. Crafted with intention.
          </p>
        </div>
      </footer>

      {/* Article Popup */}
      <ArticlePopup 
        article={selectedArticle}
        isVisible={showArticlePopup}
        onClose={handleCloseArticle}
      />
    </div>
  );
}