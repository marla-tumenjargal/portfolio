import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class Navigation extends React.Component {
    render() {
      return (
        <nav className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-800 hover:text-emerald-600 font-medium transition-colors">Projects</a>
              <a href="#" className="text-gray-800 hover:text-emerald-600 font-medium transition-colors">Thoughts</a>
              <a href="#" className="text-gray-800 hover:text-emerald-600 font-medium transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center space-x-2">
              <Rocket className="w-6 h-6 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">happy monday</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Instagram className="w-5 h-5 text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </nav>
      );
    }
  }
export default Navigation;