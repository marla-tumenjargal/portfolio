import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';
import Header from './components/Header';
import ActionCards from './components/ActionCards';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import DecorativeElements from './components/DecorativeElements';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <Header />
      <Navigation />
      <HeroSection />
      <ActionCards />
      <DecorativeElements />
    </div>
  );
}
