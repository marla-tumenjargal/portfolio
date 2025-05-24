import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class SearchSuggestions extends React.Component {
    render() {
      const { isVisible, onSuggestionClick } = this.props;
      
      if (!isVisible) return null;
      
      const suggestions = [
        { text: "see what i'm currently building", icon: <Code className="w-4 h-4" /> },
        { text: "peek at my AI demos", icon: <Brain className="w-4 h-4" /> },
        { text: "contact me", icon: <MessageCircle className="w-4 h-4" /> },
        { text: "explore my projects", icon: <FileText className="w-4 h-4" /> },
        { text: "read my writing", icon: <FileText className="w-4 h-4" /> },
        { text: "CV", icon: <User className="w-4 h-4" /> }
      ];
      
      return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-40">
          <div className="p-3 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Popular searches
            </span>
          </div>
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 transition-colors"
                onClick={() => onSuggestionClick(suggestion.text)}
              >
                <div className="text-emerald-600">
                  {suggestion.icon}
                </div>
                <span className="text-sm text-gray-700">{suggestion.text}</span>
                <ArrowRight className="w-3 h-3 text-gray-400 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
export default SearchSuggestions;