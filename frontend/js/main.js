// js/main.js

// Handle form submission
document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        year: parseInt(document.getElementById('year').value),
        mileage: parseInt(document.getElementById('mileage').value),
        engine: document.getElementById('engine').value
    };
    
    try {
        const response = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const result = await response.json();
            displayResult(result);
        } else {
            alert('Error: Could not get prediction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server. Make sure backend is running on http://localhost:5000');
    }
});

// Display prediction result
function displayResult(result) {
    const resultCard = document.getElementById('resultCard');
    const priceDisplay = document.getElementById('predictedPrice');
    const confidenceDisplay = document.getElementById('confidence');
    
    priceDisplay.textContent = result.predicted_price.toLocaleString('en-IN');
    confidenceDisplay.textContent = `Confidence: ${result.confidence}%`;
    
    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Theme toggle
document.querySelector('.theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    this.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
});

// Add light theme styles
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    body.light-theme {
        --dark-bg: #f5f5f5;
        --text: #1a1a1a;
        --card-bg: rgba(255, 255, 255, 0.9);
    }
    
    body.light-theme .background-animation {
        background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    }
    
    body.light-theme .glass-card {
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 212, 255, 0.3);
    }
    
    body.light-theme .navbar {
        background: rgba(255, 255, 255, 0.9);
    }
`;
document.head.appendChild(themeStyle);

console.log('Car Price Prediction AI loaded successfully! ✅');