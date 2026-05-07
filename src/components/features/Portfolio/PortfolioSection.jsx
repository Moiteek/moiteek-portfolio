import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import ProjectCard from './ProjectCard';

/**
 * Portfolio Section Component with Category Filtering
 * 
 * @component
 * @example
 * <PortfolioSection 
 *   projects={projectsData}
 *   categories={['All', 'E-commerce', 'LMS', 'Web Apps']}
 *   onFilterChange={handleFilterChange}
 * />
 */
const PortfolioSection = ({ 
  projects = [],
  categories = ['All'],
  onFilterChange = () => {},
  className = ""
}) => {
  // Default projects data
  const defaultProjects = [
    {
      id: 1,
      title: "MOITEEK DIGITAL TECH ACADEMY (LMS)",
      category: "Learning Management System",
      description: "A full Learning Management System with PHP OOP, MySQL, role-based access for Admin and Students, secure registration, and automated course management.",
      tags: ["PHP", "MySQL", "Tailwind CSS"],
      image: "/assets/images/Quran.png",
      links: [{ label: "View on GitHub", url: "https://github.com/moiteek" }]
    },
    {
      id: 2,
      title: "HOPECARE NGO WEBSITE",
      category: "NGO & Non-Profit",
      description: "A professional website for HopeCare NGO, designed to showcase their mission, programs, and impact — helping the organization reach more donors and communities online.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/assets/images/Potiskum connect.png",
      links: [{ label: "View Live", url: "#" }, { label: "View Code", url: "https://github.com/moiteek" }]
    },
    {
      id: 3,
      title: "POTISKUM CONNECT",
      category: "Community Platform",
      description: "A community services platform connecting locals in Potiskum, Nigeria. Find or offer services like tutoring, repairs, farming, and events with an admin approval system.",
      tags: ["JavaScript", "HTML", "CSS"],
      image: "/assets/images/Potiskum connect.png",
      links: [{ label: "View on GitHub", url: "https://github.com/moiteek" }]
    },
    {
      id: 4,
      title: "DR. MAMMAN LEGACY APP",
      category: "Islamic Memorial App",
      description: "A digital memorial and Islamic companion app featuring Quran, Azkar, and Prayer times — built as Sadaqah Jariyah.",
      tags: ["JavaScript", "HTML", "CSS"],
      image: "/assets/images/Quran.png",
      links: [{ label: "View Live", url: "#" }, { label: "View Code", url: "https://github.com/moiteek" }]
    },
    {
      id: 5,
      title: "QURAN REMEMBRANCE PWA",
      category: "Progressive Web App",
      description: "A Progressive Web App for daily Quran reading, reflection, and remembrance with offline support and bilingual content.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/assets/images/Quran.png",
      links: [{ label: "View Live", url: "#" }, { label: "View Code", url: "https://github.com/moiteek" }]
    },
    {
      id: 6,
      title: "AI WEBSITE BUILDER",
      category: "AI Tool",
      description: "An AI-powered website builder that generates complete website layouts and code using artificial intelligence.",
      tags: ["JavaScript"],
      image: "/assets/images/calculator.png",
      links: [{ label: "View on GitHub", url: "https://github.com/moiteek" }]
    }
  ];

  // Use provided projects or default ones
  const projectsToUse = projects.length > 0 ? projects : defaultProjects;
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extract unique categories from projects if not provided
  const derivedCategories = useMemo(() => {
    if (categories.length > 1) return categories;
    
    const uniqueCategories = ['All', ...new Set(projectsToUse.map(project => project.category))];
    return uniqueCategories;
  }, [categories, projectsToUse]);
  
  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsToUse;
    return projectsToUse.filter(project => project.category === activeFilter);
  }, [projectsToUse, activeFilter]);
  
  // Handle filter change
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    onFilterChange(category);
  };
  
  // Handle project hover
  const handleProjectHover = (projectId) => {
    // Can be used for additional hover effects
  };
  
  // Handle project details view
  const handleViewDetails = (project) => {
    // Can be used to open modal or navigate to project details
    console.log('View details for:', project);
  };
  
  return (
    <section 
      id="portfolio" 
      className={`py-fluid-2xl ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-fluid-xl" data-animate>
          <h2 className="text-fluid-3xl font-bold text-gradient mb-6">
            Our Work
          </h2>
          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto">
            Real projects. Real impact. Built for real people.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-fluid-xl" data-animate style={{ animationDelay: '100ms' }}>
          {derivedCategories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 ${
                activeFilter === category
                  ? 'bg-neon/20 text-neon border-neon/50 shadow-neon'
                  : 'bg-transparent text-text-secondary border-border-secondary/30 hover:text-text-primary hover:border-border-primary/50 hover:bg-bg-tertiary/50'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-label={`Filter by ${category}`}
              aria-pressed={activeFilter === category}
            >
              <span className="flex items-center space-x-2">
                {/* Category Icon */}
                {category === 'All' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
                {category === 'E-commerce' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
                {category === 'LMS' && (
                  <i className="fas fa-graduation-cap text-2xl text-blue-400"></i>
                )}
                {category === 'Web Apps' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {category === 'NGO & Non-Profit' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
                <span>{category}</span>
                {/* Active Indicator */}
                {activeFilter === category && (
                  <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                )}
              </span>
            </button>
          ))}
        </div>
        
        {/* Projects Count */}
        <div className="text-center mb-8" data-animate style={{ animationDelay: '200ms' }}>
          <p className="text-text-tertiary">
            Showing <span className="text-neon font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
            {activeFilter !== 'All' && ` in ${activeFilter}`}
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              animationDelay={index * 100}
              onHover={handleProjectHover}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        
        {/* GitHub CTA Button */}
        <div className="text-center mt-12" data-animate style={{ animationDelay: '300ms' }}>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.open('https://github.com/moiteek', '_blank')}
            className="group"
          >
            <span className="flex items-center space-x-3">
              <span>View All Projects on GitHub</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </Button>
        </div>
        
        {/* No Results State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16" data-animate>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-bg-tertiary/50 rounded-full mb-6">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary mb-6">
              There are no projects in the "{activeFilter}" category yet.
            </p>
            <button
              onClick={() => handleFilterChange('All')}
              className="px-6 py-3 bg-neon/20 text-neon border border-neon/30 rounded-lg hover:bg-neon/30 transition-colors duration-300"
            >
              View All Projects
            </button>
          </div>
        )}
        
        {/* Load More Button (for future pagination) */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-12" data-animate style={{ animationDelay: '300ms' }}>
            <button className="px-8 py-4 bg-transparent text-neon border-2 border-neon/50 rounded-lg hover:bg-neon/10 hover:border-neon transition-all duration-300">
              <span className="flex items-center space-x-2">
                <span>Load More Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};


export default PortfolioSection;
