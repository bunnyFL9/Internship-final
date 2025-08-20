// Simplified Alumni Statistics Manager
class AlumniManager {
    constructor() {
        // Load the API configuration from config.js
        this.alumniGrid = document.getElementById('alumni-grid');
        this.loadingSpinner = document.getElementById('loading-spinner');
    }

    async init() {
        try {
            await this.loadYears();
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize alumni manager:', error);
            this.showError('Failed to load alumni data');
        }
    }

    async loadYears() {
        try {
            // Fetch data from both university endpoints
            const [telkomResponse, binusResponse] = await Promise.all([
                apiRequest(API_CONFIG.ENDPOINTS.telkom.stats).catch(err => ({ total_projects: 0, total_members: 0 })),
                apiRequest(API_CONFIG.ENDPOINTS.binus.stats).catch(err => ({ total_projects: 0, total_members: 0 }))
            ]);
            
            // Create year data using the statistics
            const combinedYears = this.createYearData(telkomResponse, binusResponse);
            this.renderYears(combinedYears);
        } catch (error) {
            console.error('Error loading years:', error);
            this.showError('Failed to load years data');
        }
    }

    createYearData(telkomStats, binusStats) {
        // Generate year data for multiple years (2020-2025)
        const currentYear = new Date().getFullYear();
        const years = [];
        
        // Add current year data (2025)
        years.push({
            year: 2025,
            project_count: (telkomStats.total_projects || 0) + (binusStats.total_projects || 0),
            member_count: (telkomStats.total_members || 0) + (binusStats.total_members || 0),
            description: "Internship program alumni from 2025 (Telkom University + Binus University)"
        });
        
        // Add previous years with simulated data (decreasing counts)
        const dummyData = [
            { year: 2024, project_count: 8, member_count: 24, description: "Internship program alumni from 2024 (Telkom University + Binus University)" },
            { year: 2023, project_count: 6, member_count: 18, description: "Internship program alumni from 2023 (Telkom University + Binus University)" },
            { year: 2022, project_count: 5, member_count: 15, description: "Internship program alumni from 2022 (Telkom University + Binus University)" },
            { year: 2021, project_count: 4, member_count: 12, description: "Internship program alumni from 2021 (Telkom University + Binus University)" },
            { year: 2020, project_count: 3, member_count: 9, description: "Internship program alumni from 2020 (Telkom University + Binus University)" }
        ];
        
        return [...years, ...dummyData].sort((a, b) => b.year - a.year);
    }

    renderYears(years) {
        if (this.loadingSpinner) {
            this.loadingSpinner.style.display = 'none';
        }

        if (!years || years.length === 0) {
            this.alumniGrid.innerHTML = '<p class="no-data">No alumni data available</p>';
            return;
        }

        const yearsHTML = years.map(year => this.createYearCard(year)).join('');
        this.alumniGrid.innerHTML = yearsHTML;

        // Add animations
        this.animateCards();
    }

    createYearCard(yearData) {
        const { year, project_count, member_count, description } = yearData;
        
        return `
            <div class="alumni-card year-button" data-year="${year}">
                <div class="card-content">
                    <h3 class="year">${year}</h3>
                    <p class="card-title">View our Internship Alumni Project</p>
                    <div class="year-stats">
                        <span class="stat">
                            <i class="fas fa-project-diagram"></i>
                            ${project_count || 0} Projects
                        </span>
                        <span class="stat">
                            <i class="fas fa-users"></i>
                            ${member_count || 0} Members
                        </span>
                    </div>
                    ${description ? `<p class="year-description">${description}</p>` : ''}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Add click handlers for year cards
        document.addEventListener('click', (e) => {
            // Check if e.target exists and has closest method
            if (!e.target || typeof e.target.closest !== 'function') return;
            
            const yearCard = e.target.closest('.alumni-card');
            if (yearCard && yearCard.classList.contains('year-button')) {
                const year = yearCard.dataset.year;
                this.handleYearClick(year);
            }
        });

        // Add hover effects with event delegation
        const alumniGrid = document.getElementById('alumni-grid');
        if (alumniGrid) {
            alumniGrid.addEventListener('mouseenter', (e) => {
                if (e.target.classList && e.target.classList.contains('alumni-card')) {
                    e.target.style.transform = 'translateY(-10px) scale(1.02)';
                }
            }, true);

            alumniGrid.addEventListener('mouseleave', (e) => {
                if (e.target.classList && e.target.classList.contains('alumni-card')) {
                    e.target.style.transform = 'translateY(0) scale(1)';
                }
            }, true);
        }
    }

    async handleYearClick(year) {
        try {
            // For now, redirect to existing pages or show modal
            if (year === "2025") {
                window.location.href = "university.html";
            } else {
                await this.showYearDetails(year);
            }
        } catch (error) {
            console.error('Error handling year click:', error);
            this.showError('Failed to load year details');
        }
    }

    async showYearDetails(year) {
        try {
            // Get projects and members from both universities
            const [
                telkomProjects, telkomMembers,
                binusProjects, binusMembers
            ] = await Promise.all([
                apiRequest(API_CONFIG.ENDPOINTS.telkom.projects).catch(() => []),
                apiRequest(API_CONFIG.ENDPOINTS.telkom.members).catch(() => []),
                apiRequest(API_CONFIG.ENDPOINTS.binus.projects).catch(() => []),
                apiRequest(API_CONFIG.ENDPOINTS.binus.members).catch(() => [])
            ]);
            
            // Combine projects and members from both servers
            const allProjects = [...telkomProjects, ...binusProjects];
            const allMembers = [...telkomMembers, ...binusMembers];
            
            // Filter by year (if year field exists, otherwise show all)
            const yearProjects = allProjects.filter(p => !p.year || p.year == year);
            const yearMembers = allMembers.filter(m => {
                // Get members whose teams match the projects for this year
                const teamNames = yearProjects.map(p => p.team);
                return teamNames.includes(m.team);
            });
            
            const yearData = {
                year: year,
                project_count: yearProjects.length,
                member_count: yearMembers.length,
                description: `Internship program alumni from ${year} (Combined from Telkom University and Binus University)`
            };

            this.createYearModal(yearData, yearProjects, yearMembers);
        } catch (error) {
            console.error('Error loading year details:', error);
            this.showError('Failed to load year details');
        }
    }

    createYearModal(yearData, projects, members) {
        const modal = document.createElement('div');
        modal.className = 'year-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${yearData.year} Internship Alumni</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="year-overview">
                        <p>${yearData.description || 'No description available'}</p>
                        <div class="stats">
                            <div class="stat-item">
                                <i class="fas fa-project-diagram"></i>
                                <span>${projects.length} Projects</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-users"></i>
                                <span>${members.length} Members</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="projects-section">
                        <h3>Projects</h3>
                        <div class="projects-grid">
                            ${projects.map(project => `
                                <div class="project-card">
                                    <h4>${project.team}</h4>
                                    <p class="project-title">${project.title}</p>
                                    <span class="category-badge">${project.category}</span>
                                    ${project.link ? `<a href="${project.link}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="members-section">
                        <h3>Members</h3>
                        <div class="members-grid">
                            ${members.map(member => `
                                <div class="member-card">
                                    <div class="member-info">
                                        <h4>${member.name}</h4>
                                        <p class="member-team">${member.team}</p>
                                        ${member.university ? `<p class="member-university">${member.university}</p>` : ''}
                                        ${member.major ? `<p class="member-major">${member.major}</p>` : ''}
                                        ${member.role ? `<p class="member-role">${member.role}</p>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        this.addModalStyles();
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .year-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 90%;
                max-height: 90%;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h2 {
                margin: 0;
                color: #333;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .year-overview {
                margin-bottom: 30px;
            }
            
            .stats {
                display: flex;
                gap: 20px;
                margin-top: 15px;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #666;
            }
            
            .projects-grid, .members-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 15px;
            }
            
            .project-card, .member-card {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
            
            .project-card h4, .member-card h4 {
                margin: 0 0 10px 0;
                color: #333;
            }
            
            .category-badge {
                display: inline-block;
                background: #009DFF;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                margin: 10px 0;
            }
            
            .project-link {
                display: inline-block;
                margin: 5px 10px 5px 0;
                color: #009DFF;
                text-decoration: none;
            }
            
            .project-link:hover {
                text-decoration: underline;
            }
            
            .member-team, .member-university, .member-major, .member-role {
                margin: 5px 0;
                color: #666;
                font-size: 14px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    animateCards() {
        const cards = document.querySelectorAll('.alumni-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const alumniManager = new AlumniManager();
    alumniManager.init();
}); 