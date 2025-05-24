import React, { useState } from 'react';
import { Search, Instagram, Mail, Rocket, ArrowRight, Code, Brain, MessageCircle, FileText, User, ExternalLink } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';
import SearchResults from './SearchResults';

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFocused: false,
        searchValue: '',
        showSuggestions: false,
        showResults: false
      };
      this.searchRef = React.createRef();
    }
  
    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  
    handleClickOutside = (event) => {
      if (this.searchRef.current && !this.searchRef.current.contains(event.target)) {
        this.setState({ 
          isFocused: false, 
          showSuggestions: false, 
          showResults: false 
        });
      }
    };
  
    handleFocus = () => {
      this.setState({ 
        isFocused: true, 
        showSuggestions: !this.state.searchValue,
        showResults: !!this.state.searchValue
      });
    };
  
    handleChange = (e) => {
      const value = e.target.value;
      this.setState({ 
        searchValue: value,
        showSuggestions: !value,
        showResults: !!value
      });
    };
  
    handleSuggestionClick = (suggestion) => {
      this.setState({
        searchValue: suggestion,
        showSuggestions: false,
        showResults: true
      });
    };
  
    handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        this.setState({ 
          isFocused: false, 
          showSuggestions: false, 
          showResults: false 
        });
      }
    };
  
    render() {
      const { isFocused, searchValue, showSuggestions, showResults } = this.state;
      
      return (
        <div className="max-w-2xl mx-auto relative" ref={this.searchRef}>
          <div className={`relative bg-white border rounded-2xl shadow-lg transition-all duration-300 ${
            isFocused ? 'border-emerald-400 shadow-2xl ring-4 ring-emerald-100' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <div className="flex items-center px-6 py-4">
              <Search className={`w-5 h-5 mr-4 transition-colors ${
                isFocused ? 'text-emerald-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search my work, projects, or ask me anything..."
                value={searchValue}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                className="flex-1 text-lg text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              {searchValue && (
                <button 
                  onClick={() => this.setState({ 
                    searchValue: '', 
                    showResults: false, 
                    showSuggestions: true 
                  })}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          <SearchSuggestions 
            isVisible={showSuggestions && isFocused}
            onSuggestionClick={this.handleSuggestionClick}
          />
          
          <SearchResults 
            searchQuery={searchValue}
            isVisible={showResults && isFocused}
          />
        </div>
      );
    }
  }
export default SearchBar;