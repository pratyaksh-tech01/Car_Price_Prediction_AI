# 🚗 Car Price Prediction AI

An advanced, AI-powered web application that predicts car prices using Machine Learning. Features a stunning, fully responsive UI with animated backgrounds and interactive mouse effects.

## ✨ Features

- 🤖 **AI Price Prediction**: Advanced ML model for accurate car price predictions
- 🎨 **Stunning UI**: Modern glassmorphism design with gradient effects
- ✨ **Animated Background**: Moving particles with smooth floating animations
- 🖱️ **Interactive Effects**: Mouse tracking and cursor glow effects
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode**: Toggle between themes
- 📊 **Market Insights**: Real-time market trends and analysis
- ⚡ **Fast Performance**: Optimized frontend and backend

## 🏗️ Project Structure

```
Car_Price_Prediction_AI/
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   ├── style.css           # Main styles with animations
│   │   └── responsive.css      # Mobile & tablet styles
│   └── js/
│       ├── animation.js        # Particle & animation effects
│       ├── main.js             # Core functionality
│       └── api.js              # API integration
├── backend/
│   ├── app.py                  # Flask application
│   ├── train_model.py          # ML model training script
│   ├── config.py               # Configuration
│   ├── requirements.txt        # Python dependencies
│   └── model.pkl               # Trained ML model
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pratyaksh-tech01/Car_Price_Prediction_AI.git
   cd Car_Price_Prediction_AI
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python train_model.py
   python app.py
   ```

3. **Open Frontend**
   - Open `frontend/index.html` in your browser OR
   - Run local server: `cd frontend && python -m http.server 3000`
   - Visit: `http://localhost:3000`

## 🎯 Usage

1. Fill in car details (Brand, Model, Year, Mileage, Engine Type)
2. Click "🔮 Predict Price" button
3. Get instant price prediction with confidence score
4. View market insights and trends

## 🌐 Deployment

### Frontend (Vercel/Netlify)

**Vercel:**
```bash
npm i -g vercel
cd frontend
vercel --prod
```

**Netlify:**
- Connect GitHub repo → Select `frontend` as publish directory

### Backend (Railway/Render)

**Railway.app:**
1. Connect GitHub repo
2. Set root directory to `backend`
3. Auto deploys with `gunicorn app:app`

**Render.com:**
1. Create Web Service → Connect GitHub
2. Build: `pip install -r requirements.txt`
3. Start: `gunicorn app:app`

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript, Chart.js
- **Backend**: Flask, scikit-learn, pandas, NumPy
- **ML Model**: Random Forest Regressor

## 📊 Features Breakdown

### 1. Price Prediction
- Takes car details as input
- Uses ML model to predict price
- Shows confidence percentage

### 2. Beautiful UI
- Glassmorphism design
- Animated gradient text
- Floating particles background
- Smooth transitions

### 3. Responsive Design
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

### 4. Dark/Light Theme
- Toggle between themes
- Persistent settings

## 🎨 Customization

### Change Colors
Edit `frontend/css/style.css`:
```css
:root {
    --primary: #00d4ff;      /* Cyan */
    --secondary: #ff006e;    /* Pink */
    --dark-bg: #0a0e27;      /* Dark */
}
```

### Change Particle Count
Edit `frontend/js/animation.js`:
```javascript
const particleCount = 50;  // Change this
```

## 📱 Browser Support
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## 📝 License
MIT License - Free to use for personal and commercial projects

## 👨‍💻 Author
**Pratyaksh Sharma** - [@pratyaksh-tech01](https://github.com/pratyaksh-tech01)

---

**Made with ❤️ by Pratyaksh Sharma**
