import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class HeroSection extends React.Component {
    render() {
      return (
        <section className="container mx-auto px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
              I'm Marla Tumenjargal,
            </h1>
            
            <div className="text-gray-600 mb-12 space-y-2">
              <p className="text-lg">currently a full-stack developer and</p>
              <p className="text-lg">computer science student at UC Berkeley.</p>
            </div>
            
            <div className="mb-16">
              <p className="text-gray-500 mb-6 text-lg">what are you looking for?</p>
              <SearchBar />
            </div>
          </div>
        </section>
      );
    }
  }
export default HeroSection;