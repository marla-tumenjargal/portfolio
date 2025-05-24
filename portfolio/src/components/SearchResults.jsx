import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class SearchResults extends React.Component {
    constructor(props) {
      super(props);
      this.searchData = {
        "see what i'm currently building": [
          {
            title: "AI-Powered Task Manager",
            description: "Building a smart task management system with natural language processing and predictive scheduling.",
            category: "Current Project",
            icon: <Brain className="w-5 h-5" />,
            status: "In Progress - 80% Complete",
            tech: ["React", "Node.js", "OpenAI API", "PostgreSQL"],
            link: "#"
          },
          {
            title: "Real-time Collaboration Platform",
            description: "Developing a Figma-like collaborative workspace for developers with live code editing and version control.",
            category: "Current Project", 
            icon: <Code className="w-5 h-5" />,
            status: "In Progress - 60% Complete",
            tech: ["TypeScript", "WebRTC", "Socket.io", "MongoDB"],
            link: "#"
          },
          {
            title: "Smart Campus Navigation App",
            description: "UC Berkeley campus navigation with AR features and crowd-sourced real-time updates.",
            category: "Current Project",
            icon: <Search className="w-5 h-5" />,
            status: "In Progress - 40% Complete", 
            tech: ["React Native", "ARKit", "Firebase", "MapBox"],
            link: "#"
          }
        ],
        "peek at my ai demos": [
          {
            title: "Neural Style Transfer Web App",
            description: "Real-time artistic style transfer using TensorFlow.js in the browser.",
            category: "AI Demo",
            icon: <Brain className="w-5 h-5" />,
            status: "Live Demo Available",
            tech: ["TensorFlow.js", "React", "WebGL"],
            link: "#"
          },
          {
            title: "Smart Recipe Generator",
            description: "AI that creates recipes based on available ingredients and dietary preferences.",
            category: "AI Demo",
            icon: <Brain className="w-5 h-5" />,
            status: "Live Demo Available",
            tech: ["GPT-3.5", "Python", "Flask", "React"],
            link: "#"
          }
        ],
        "contact me": [
          {
            title: "Email",
            description: "marla.tumenjargal@berkeley.edu",
            category: "Contact",
            icon: <Mail className="w-5 h-5" />,
            status: "Always available",
            link: "mailto:marla.tumenjargal@berkeley.edu"
          },
          {
            title: "LinkedIn",
            description: "Connect with me professionally",
            category: "Contact",
            icon: <User className="w-5 h-5" />,
            status: "Active",
            link: "#"
          }
        ],
        "explore my projects": [
          {
            title: "E-commerce Platform",
            description: "Full-stack marketplace with payment processing and admin dashboard.",
            category: "Web Development",
            icon: <Code className="w-5 h-5" />,
            status: "Completed",
            tech: ["React", "Express", "Stripe", "PostgreSQL"],
            link: "#"
          },
          {
            title: "Data Visualization Dashboard",
            description: "Interactive dashboard for analyzing university enrollment trends.",
            category: "Data Science",
            icon: <FileText className="w-5 h-5" />,
            status: "Completed",
            tech: ["D3.js", "Python", "Pandas", "Flask"],
            link: "#"
          }
        ]
      };
    }
    getSearchResults = (query) => {
        if (!query.trim()) return [];
        
        const lowerQuery = query.toLowerCase().trim();
        
        // Direct matches
        if (this.searchData[lowerQuery]) {
          return this.searchData[lowerQuery];
        }
        
        // Fuzzy matching
        let results = [];
        Object.keys(this.searchData).forEach(key => {
          if (key.includes(lowerQuery) || lowerQuery.includes(key.split(' ')[0])) {
            results.push(...this.searchData[key]);
          }
        });
        
        // Search within project titles and descriptions
        if (results.length === 0) {
          Object.values(this.searchData).flat().forEach(item => {
            if (item.title.toLowerCase().includes(lowerQuery) || 
                item.description.toLowerCase().includes(lowerQuery) ||
                item.tech?.some(t => t.toLowerCase().includes(lowerQuery))) {
              results.push(item);
            }
          });
        }
        
        return results.slice(0, 6); // Limit results
      };
    
      render() {
        const { searchQuery, isVisible } = this.props;
        const results = this.getSearchResults(searchQuery);
        
        if (!isVisible || !searchQuery.trim()) return null;
        
        return (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </span>
                    <span className="text-xs text-gray-500">Press Enter to see all</span>
                  </div>
                </div>
                <div className="py-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
                      onClick={() => window.open(result.link, '_blank')}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1 text-emerald-600">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                              {result.title}
                            </h4>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2">
                              {result.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {result.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-emerald-600 font-medium">
                              {result.status}
                            </span>
                            {result.tech && (
                              <div className="flex space-x-1">
                                {result.tech.slice(0, 3).map((tech, i) => (
                                  <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {tech}
                                  </span>
                                ))}
                                {result.tech.length > 3 && (
                                  <span className="text-xs text-gray-500">+{result.tech.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-sm text-gray-600 mb-2">No results found for "{searchQuery}"</p>
                <p className="text-xs text-gray-500">
                  Try searching for "current projects", "AI demos", "contact", or "experience"
                </p>
              </div>
            )}
          </div>
        );
      }
    }
export default SearchResults;