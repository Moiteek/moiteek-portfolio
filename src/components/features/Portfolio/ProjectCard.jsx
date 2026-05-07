import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';

/**
 * Project Card Component for Portfolio Display
 * 
 * @component
 * @example
 * <ProjectCard 
 *   project={{
 *     id: 1,
 *     title: "MOITEEK DIGITAL TECH ACADEMY (LMS)",
 *     category: "Learning Management System",
 *     description: "A full Learning Management System with PHP OOP, MySQL...",
 *     tags: ["PHP", "MySQL", "Tailwind CSS"],
 *     links: [{ label: "View on GitHub", url: "https://github.com/moiteek" }]
 *   }}
 *   animationDelay={100}
 * />
 */
const ProjectCard = ({ 
  project = {},
  animationDelay = 0,
  onViewDetails = () => {},
  onHover = () => {},
  className = ""
}) => {
  // State for hover effects
  const [isHovered, setIsHovered] = useState(false);
  
  // Safe defaults for optional fields
  const safeProject = {
    id: project.id || 0,
    title: project.title || 'Untitled Project',
    category: project.category || 'Uncategorized',
    description: project.description || 'No description available.',
    tags: Array.isArray(project.tags) ? project.tags : [],
    links: Array.isArray(project.links) ? project.links : []
  };
  
  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(safeProject.id);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Handle view details
  const handleViewDetails = () => {
    onViewDetails(safeProject);
  };
  
  // Handle link clicks
  const handleLinkClick = (link, e) => {
    e.stopPropagation();
    if (link.url && link.url !== '#') {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Get category color for gradient
  const getCategoryColor = (category) => {
    const colors = {
      'Learning Management System': '#3B82F6',
      'NGO & Non-Profit': '#10B981',
      'Community Platform': '#8B5CF6',
      'Islamic Memorial App': '#059669',
      'Progressive Web App': '#6366F1',
      'AI Tool': '#9333EA'
    };
    return colors[category] || '#6366F1';
  };

  return (
    <article
      className={`card-glass hover-lift group cursor-pointer relative overflow-hidden ${className}`}
      data-animate
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleViewDetails}
      role="article"
      tabIndex={0}
      aria-labelledby={`project-title-${safeProject.id}`}
      aria-describedby={`project-description-${safeProject.id}`}
    >
      {/* Hover Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Card Content */}
      <div className="relative z-10 space-y-6">
        {/* Project Header */}
        <div className="space-y-4">
          {/* Project Image with Category Badge Overlay */}
          {safeProject.image && (
            <div className="relative h-48 rounded-xl overflow-hidden mb-4">
              <img
                src={safeProject.image}
                alt={`${safeProject.title} - Project Screenshot`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  display: 'none',
                  background: `linear-gradient(135deg, ${getCategoryColor(safeProject.category)} 0%, ${getCategoryColor(safeProject.category)} 100%)`
                }}
              >
                <span className="text-2xl font-bold text-white">
                  {safeProject.title.charAt(0)}
                </span>
              </div>
              
              {/* Category Badge Overlay */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-accent-gold/90 text-white rounded-full">
                  {safeProject.category}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Project Title */}
              <h3 
                id={`project-title-${safeProject.id}`}
                className="text-xl font-bold text-text-primary group-hover:text-neon transition-colors duration-300 leading-tight"
              >
                {safeProject.title}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Project Description */}
        <div className="space-y-4">
          <div 
            id={`project-description-${safeProject.id}`}
            className="space-y-3"
          >
            <p className="text-text-secondary text-sm leading-relaxed">
              {safeProject.description}
            </p>
          </div>
        </div>
        
        {/* Technology Tags */}
        {safeProject.tags.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {safeProject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium bg-bg-tertiary/50 text-text-tertiary border border-border-secondary/30 rounded-full group-hover:bg-neon/10 group-hover:text-neon group-hover:border-neon/30 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Project Links */}
        {safeProject.links.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-glass">
            {safeProject.links.map((link, index) => (
              <Button
                key={index}
                variant={link.label.includes('GitHub') ? 'secondary' : 'primary'}
                size="sm"
                onClick={(e) => handleLinkClick(link, e)}
                className="flex-1 group/btn"
              >
                <span className="flex items-center justify-center space-x-2">
                  {link.label.includes('GitHub') ? (
                    <>
                      <i className="fab fa-github w-4 h-4"></i>
                      <span>{link.label}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-external-link-alt w-4 h-4"></i>
                      <span>{link.label}</span>
                    </>
                  )}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      <div className="absolute bottom-4 right-4 w-1 h-1 bg-neon rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Border Animation on Hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-neon/30 transition-all duration-300" />
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl glow-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
};

ProjectCard.propTypes = {
  /**
   * Project object with project details
   */
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string
    }))
  }),
  
  /**
   * Animation delay in milliseconds
   */
  animationDelay: PropTypes.number,
  
  /**
   * View details callback
   */
  onViewDetails: PropTypes.func,
  
  /**
   * Hover callback
   */
  onHover: PropTypes.func,
  
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
};

export default ProjectCard;
