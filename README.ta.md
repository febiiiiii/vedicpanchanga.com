# திருக் பஞ்சாங்கம்

நவீன வலை இடைமுகத்துடன் உயர் துல்லியமான இந்து பஞ்சாங்க கணிப்பான். எந்த தேதி (கி.மு. 5000 - கி.பி. 5000) மற்றும் இடத்திற்கும் பாரம்பரிய பஞ்சாங்கத்தை கணக்கிடுங்கள்.

⭐ **இந்த திட்டம் உங்களுக்கு பயனுள்ளதாக இருந்தால், GitHub இல் நட்சத்திரம் கொடுக்கவும்!** இது மற்றவர்களுக்கு இந்த கருவியை கண்டுபிடிக்க உதவுகிறது.

## விரைவு தொடக்கம்

```bash
# களஞ்சியத்தை நகலெடுக்கவும்
git clone https://github.com/bidyashish/drik-panchanga
cd drik-panchanga

# ஒரு-கட்டளை அமைப்பு மற்றும் இயக்கம்
./setup.sh

# அல்லது கைமுறை அமைப்பு:
# முனையம் 1 - பின்தளம்
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python api.py

# முனையம் 2 - முன்தளம்
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

http://localhost:3000 ஐ உலாவியில் திறக்கவும்

## அம்சங்கள்

**பஞ்சாங்க கூறுகள்**: திதி • நட்சத்திரம் • யோகம் • கரணம் • வாரம்
**நேரங்கள்**: சூரிய உதயம்/அஸ்தமனம் • சந்திர உதயம்/அஸ்தமனம் • ராகு காலம் • யம கண்டம் • குளிகை • அபிஜித்
**வானியல்**: கிரக நிலைகள் • விம்சோத்தரி தசை • அயனாம்சம் (லாஹிரி)
**நவீன UI**: இருள்/ஒளி முறை • 100,000+ இடங்கள் • பதிலளிக்கும் வடிவமைப்பு

## தொழில்நுட்ப அடுக்கு

**பின்தளம்**: Python • FastAPI • PySwisseph
**முன்தளம்**: Next.js 15 • React 19 • TypeScript • Tailwind CSS v4 • Shadcn/ui

## API ஆவணம்

முக்கிய முனைப்புள்ளி: `http://localhost:3000/api/v1/panchanga`
முழு ஆவணங்கள்: [API.md](./API.md) பார்க்கவும் • பின்தள ஆவணங்கள்: `http://localhost:8000/docs`


## நன்றி

சதீஷ் பி டி யின் [திருக் பஞ்சாங்கம்](https://github.com/bdsatish/drik-panchanga) அடிப்படையில்.
வானியல் கணக்கீடுகளுக்கு Swiss Ephemeris பயன்படுத்துகிறது.