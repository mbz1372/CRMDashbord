// Dashboard JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard components
    initializeCharts();
    initializeMobileMenu();
    initializeTabSwitching();
    initializeAnimations();
});

// Chart.js configurations
function initializeCharts() {
    // Sales Chart (Main bar chart)
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
                datasets: [{
                    label: 'فروش ماهانه',
                    data: [65, 45, 80, 35, 75, 25, 40, 90, 55, 85, 70, 60],
                    backgroundColor: function(context) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return null;
                        
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, '#8B5CF6');
                        gradient.addColorStop(1, '#06B6D4');
                        return gradient;
                    },
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(139, 92, 246, 0.1)',
                            borderColor: 'transparent'
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                family: 'Vazirmatn',
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                family: 'Vazirmatn',
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                onHover: (event, elements) => {
                    event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
                }
            }
        });
    }

    // Leads Chart (Horizontal bar chart)
    const leadsCtx = document.getElementById('leadsChart');
    if (leadsCtx) {
        new Chart(leadsCtx, {
            type: 'bar',
            data: {
                labels: ['تولید شده', 'کیفی', 'مذاکره'],
                datasets: [{
                    data: [500, 350, 200],
                    backgroundColor: [
                        '#8B5CF6',
                        '#06B6D4', 
                        '#10B981'
                    ],
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(139, 92, 246, 0.1)',
                            borderColor: 'transparent'
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                family: 'Vazirmatn',
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                family: 'Vazirmatn',
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            // Close sidebar when clicking outside
            document.addEventListener('click', function(e) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }
}

// Tab switching functionality
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you could add logic to switch chart data based on selected tab
            updateChartData(this.textContent);
        });
    });
}

// Update chart data based on tab selection
function updateChartData(period) {
    const salesChart = Chart.getChart('salesChart');
    if (!salesChart) return;

    let newData;
    let newLabels;

    switch(period) {
        case 'امروز':
            newLabels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
            newData = [12, 8, 15, 10, 18, 14, 20, 16];
            break;
        case 'این هفته':
            newLabels = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
            newData = [85, 92, 78, 88, 95, 82, 90];
            break;
        default: // امسال
            newLabels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
            newData = [65, 45, 80, 35, 75, 25, 40, 90, 55, 85, 70, 60];
    }

    // Animate chart update
    salesChart.data.labels = newLabels;
    salesChart.data.datasets[0].data = newData;
    salesChart.update('active');
}

// Initialize animations
function initializeAnimations() {
    // Add fade-in animation to cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all cards
    const cards = document.querySelectorAll('.stat-card, .chart-container, .chart-card, .meeting-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Animate counters
    animateCounters();
    
    // Animate progress bars
    animateProgressBars();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-content h3, .status-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with Persian digits
            const persianNumber = current.toFixed(0).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
            counter.textContent = counter.textContent.includes('+') ? '+' + persianNumber : persianNumber;
        }, 20);
    });
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        const width = bar.style.width || '0%';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200);
    });
}

// Utility functions
function formatPersianNumber(number) {
    return number.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

// Real-time clock for meeting time
function updateClock() {
    const now = new Date();
    const hours = formatPersianNumber(now.getHours().toString().padStart(2, '0'));
    const minutes = formatPersianNumber(now.getMinutes().toString().padStart(2, '0'));
    
    const clockElements = document.querySelectorAll('.current-time');
    clockElements.forEach(element => {
        element.textContent = `${hours}:${minutes}`;
    });
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock(); // Initial call

// Smooth scrolling for navigation
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.parentElement.classList.add('active');
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Notification badge animation
function animateNotificationBadges() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'pulse 0.5s';
        });
    });
}

// Initialize notification badges
animateNotificationBadges();

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        // Here you would implement actual search functionality
        // For now, just visual feedback
        if (searchTerm.length > 0) {
            this.parentElement.classList.add('searching');
        } else {
            this.parentElement.classList.remove('searching');
        }
    });
}

// Chart options button functionality
document.querySelectorAll('.chart-options').forEach(option => {
    option.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Here you could open a modal or dropdown for chart options
        console.log('Chart options clicked for:', this.closest('.chart-card').querySelector('h4').textContent);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Performance optimization: Lazy load charts
function lazyLoadCharts() {
    const chartContainers = document.querySelectorAll('canvas');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Chart is visible, ensure it's properly rendered
                const chart = Chart.getChart(entry.target);
                if (chart) {
                    chart.resize();
                }
            }
        });
    });
    
    chartContainers.forEach(container => {
        chartObserver.observe(container);
    });
}

// Initialize lazy loading
lazyLoadCharts();

// Window resize handler
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Resize all charts
        Chart.helpers.each(Chart.instances, function(chart) {
            chart.resize();
        });
    }, 250);
});

console.log('Dashboard initialized successfully! 🚀');