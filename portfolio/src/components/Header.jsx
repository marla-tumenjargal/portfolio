import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class Header extends React.Component {
    render() {
      return (
        <header className="w-full bg-emerald-700 text-white py-3">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-medium">always connecting dots.</p>
          </div>
        </header>
      );
    }
  }
export default Header;