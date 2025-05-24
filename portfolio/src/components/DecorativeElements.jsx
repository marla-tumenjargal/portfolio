import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class DecorativeElements extends React.Component {
    render() {
      return (
        <>
          <div className="fixed left-8 top-1/2 transform -translate-y-1/2 opacity-20">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
              <div className="absolute top-4 left-4 w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-6 right-8 w-3 h-3 bg-gray-400 rotate-45"></div>
              <div className="absolute top-8 right-2 text-gray-400 text-xs">✨</div>
            </div>
          </div>
          
          <div className="fixed right-8 bottom-1/4 opacity-20">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 border border-gray-300 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400 rounded-full"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-gray-300"></div>
              <div className="absolute -bottom-3 -left-3 text-gray-400 text-lg">★</div>
            </div>
          </div>
        </>
      );
    }
  }

export default DecorativeElements;