# Drik Panchanga

[![GitHub stars](https://img.shields.io/github/stars/bidyashish/drik-panchanga?style=social)](https://github.com/bidyashish/drik-panchanga/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/bidyashish/drik-panchanga)](https://github.com/bidyashish/drik-panchanga/issues)
[![GitHub license](https://img.shields.io/badge/license-AGPL--3.0%20%26%20MIT-blue)](https://github.com/bidyashish/drik-panchanga/blob/main/LICENSE)

High-precision Hindu almanac calculator with modern web interface. Calculate traditional Panchanga for any date (5000 BCE - 5000 CE) and location.

⭐ **If you find this project useful, please consider giving it a star on GitHub!** It helps others discover this tool.

## Quick Start

```bash
# Clone repository
git clone https://github.com/bidyashish/drik-panchanga
cd drik-panchanga

# One-command setup and run
./setup.sh

# Or manual setup:
# Terminal 1 - Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python api.py

# Terminal 2 - Frontend
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

Open http://localhost:3000

## Features

**Panchanga Elements**: Tithi • Nakshatra • Yoga • Karana • Vaara
**Timings**: Sunrise/Sunset • Moonrise/Moonset • Rahu Kala • Yama Ganda • Gulika • Abhijit
**Astronomical**: Planetary positions • Vimsottari Dasha • Ayanamsha (Lahiri)
**Modern UI**: Dark/Light mode • 100,000+ locations • Responsive design

## Tech Stack

**Backend**: Python • FastAPI • PySwisseph
**Frontend**: Next.js 15 • React 19 • TypeScript • Tailwind CSS v4 • Shadcn/ui

## API Documentation

Main endpoint: `http://localhost:3000/api/v1/panchanga`
Full docs: See [API.md](./API.md) • Backend docs: `http://localhost:8000/docs`

## License

**Backend**: AGPL-3.0 • **Frontend**: MIT

## Contributing

We welcome contributions! Here's how you can help:

### 🐛 Found a Bug?
[Open an issue](https://github.com/bidyashish/drik-panchanga/issues/new) with details about the problem and steps to reproduce.

### 💡 Have a Feature Request?
[Create an issue](https://github.com/bidyashish/drik-panchanga/issues/new) describing the feature and why it would be useful.

### 🔧 Want to Contribute Code?
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### ⭐ Support the Project
- **Star this repository** to help others find it
- Share it with others who might find it useful
- Report issues and suggest improvements

## Credits

Based on [Drik Panchanga](https://github.com/bdsatish/drik-panchanga) by Satish BD.
Uses Swiss Ephemeris for astronomical calculations.