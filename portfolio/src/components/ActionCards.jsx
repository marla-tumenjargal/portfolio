import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';

class ActionCards extends React.Component {
    render() {
      const cards = [
        {
          title: "see what i'm currently building",
          description: "Current projects and work in progress",
          color: "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
        },
        {
          title: "peek at my AI demos",
          description: "Machine learning and AI experiments",
          color: "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200"
        },
        {
          title: "contact me",
          description: "Get in touch for collaborations",
          color: "bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200"
        },
        {
          title: "explore my projects",
          description: "Full portfolio of completed work",
          color: "bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200"
        },
        {
          title: "read my writing",  
          description: "Technical articles and thoughts",
          color: "bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200"
        },
        {
          title: "CV",
          description: "Professional experience and education",
          color: "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
        }
      ];
  
      return (
        <section className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-white/50`}
              >
                <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }
  }

export default ActionCards;