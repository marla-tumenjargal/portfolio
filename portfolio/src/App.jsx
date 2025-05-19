import { useState, useEffect, useRef } from 'react';
import './App.css';

function Tab({ name, isActive, onMouseEnter, onClick }) {
  return (
    <div
      className={`tab ${isActive ? 'active' : ''}`}
      data-tab={name}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {name}
    </div>
  );
}

function TabBar() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    transform: 'translateX(0px)',
    opacity: 0
  });
  const initialAnimationRef = useRef(true);

  const tabs = ['Projects', 'AI Demos', 'Writing', 'About'];

  useEffect(() => {
    const activeTabEl = document.querySelector('.tab.active');
    if (activeTabEl && initialAnimationRef.current) {

      setIndicatorStyle({
        width: `${activeTabEl.offsetWidth}px`,
        transform: `translateX(${activeTabEl.offsetLeft}px)`,
        opacity: 0,
        transition: 'none'
      });
      
      // Fade in with slow animation
      setTimeout(() => {
        setIndicatorStyle(prev => ({
          ...prev,
          opacity: 1,
          transition: 'transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.75s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.75s ease'
        }));
        initialAnimationRef.current = false;
      }, 50);
    }
  }, []);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (hoveredTab) return;
      
      const activeTabEl = document.querySelector('.tab.active');
      if (activeTabEl) {
        updateElementPosition(activeTabEl);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, hoveredTab]);

  // Hover effect handler
  useEffect(() => {
    if (hoveredTab) {
      const hoveredElement = document.querySelector(`.tab[data-tab="${hoveredTab}"]`);
      if (hoveredElement) {
        updateElementPosition(hoveredElement);
      }
    } else {
      const activeTabEl = document.querySelector('.tab.active');
      if (activeTabEl) {
        updateElementPosition(activeTabEl);
      }
    }
  }, [hoveredTab]);

  const updateElementPosition = (element) => {
    setIndicatorStyle(prev => ({
      ...prev,
      width: `${element.offsetWidth}px`,
      transform: `translateX(${element.offsetLeft}px)`,
      opacity: 1
    }));
  };

  return (
    <div className="tabbar-container">
      <div className="tabbar" onMouseLeave={() => setHoveredTab(null)}>
        <div className="indicator" style={indicatorStyle}></div>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            name={tab}
            isActive={tab === activeTab}
            onMouseEnter={() => setHoveredTab(tab)}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return <TabBar />;
}