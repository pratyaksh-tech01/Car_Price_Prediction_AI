// js/api.js

// API Configuration
const API_BASE_URL = 'http://localhost:5000';

// Fetch market insights
async function loadMarketInsights() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/insights`);
        if (response.ok) {
            const data = await response.json();
            renderCharts(data);
        }
    } catch (error) {
        console.error('Error loading insights:', error);
    }
}

// Render charts
function renderCharts(data) {
    // Price trend chart
    const priceCtx = document.getElementById('priceChart').getContext('2d');
    new Chart(priceCtx, {
        type: 'line',
        data: {
            labels: data.years || ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Average Car Price Trend',
                data: data.prices || [500000, 550000, 600000, 650000, 700000, 750000, 800000],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    // Market share chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'doughnut',
        data: {
            labels: ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Others'],
            datasets: [{
                data: [25, 20, 15, 15, 12, 13],
                backgroundColor: [
                    '#00d4ff',
                    '#ff006e',
                    '#00ff88',
                    '#ffaa00',
                    '#aa00ff',
                    '#ff0055'
                ],
                borderColor: '#0a0e27',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Load insights on page load
window.addEventListener('load', loadMarketInsights);

console.log('API module loaded successfully! ✅');