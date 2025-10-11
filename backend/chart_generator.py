#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
North Indian Chart Generator - Simplified
"""

import io
import base64
import os
from typing import Dict, List
from PIL import Image, ImageDraw, ImageFont


class NorthIndianChart:
    """North Indian Vedic astrology chart"""

    def __init__(self):
        # Planet symbols
        self.planets = {
            0: "Su", 1: "Mo", 2: "Ma", 3: "Me",
            4: "Ju", 5: "Ve", 6: "Sa", 7: "Ra", 8: "Ke"
        }

        # Base image path
        self.base_image = os.path.join(os.path.dirname(__file__), "base_north_india_chart.png")

        # House positions (600x400) - properly centered in each house section
        # Layout: 2 columns x 4 rows for better readability
        self.house_pos = {
            1: [(240, 80), (340, 75), (295, 100), (340, 100), (295, 125)],
            2: [(160, 35), (205, 35), (160, 60), (205, 60), (160, 85)],
            3: [(35, 145), (80, 145), (35, 170), (80, 170), (35, 195)],
            4: [(130, 145), (175, 145), (130, 170), (175, 170), (130, 195)],
            5: [(45, 295), (90, 295), (45, 320), (90, 320), (45, 345)],
            6: [(160, 295), (205, 295), (160, 320), (205, 320), (160, 345)],
            7: [(295, 225), (340, 225), (295, 250), (340, 250), (295, 275)],
            8: [(410, 295), (455, 295), (410, 320), (455, 320), (410, 345)],
            9: [(485, 240), (530, 240), (485, 265), (530, 265), (485, 290)],
            10: [(515, 145), (560, 145), (515, 170), (560, 170), (515, 195)],
            11: [(490, 80), (535, 80), (490, 105), (535, 105), (490, 130)],
            12: [(410, 35), (455, 35), (410, 60), (455, 60), (410, 85)]
        }

        # House number positions (600x400)
        self.sign_pos = {
            1: (290, 150), 2: (160, 80), 3: (110, 110), 4: (240, 190),
            5: (110, 280), 6: (160, 300), 7: (290, 240), 8: (430, 310),
            9: (480, 280), 10: (350, 190), 11: (490, 100), 12: (430, 70)
        }


    def generate_chart_base64(self, lagna: int, planet_positions: Dict[int, List[int]], title: str = "") -> str:
        """Generate chart as base64 PNG"""

        # Load base image
        img = Image.open(self.base_image).convert('RGB')
        if img.size != (600, 400):
            img = img.resize((600, 400), Image.Resampling.LANCZOS)

        draw = ImageDraw.Draw(img)

        # Use local Helvetica Bold font (size 24)
        font_path = os.path.join(os.path.dirname(__file__), "Helvetica.ttc")
        font = ImageFont.truetype(font_path, size=24, index=1)

        # Draw house numbers (zodiac signs) in maroon
        for house in range(1, 13):
            sign = ((lagna + house - 1) % 12) + 1
            draw.text(self.sign_pos[house], str(sign), fill=(128, 0, 0), font=font)

        # Draw planets
        for house, planets in planet_positions.items():
            if planets and house in self.house_pos:
                for idx, planet in enumerate(planets[:8]):
                    if idx < len(self.house_pos[house]):
                        x, y = self.house_pos[house][idx]
                        symbol = self.planets.get(planet, "")
                        if symbol:
                            draw.text((x, y), symbol, fill=(0, 0, 0), font=font)

        # Convert to base64
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        return base64.b64encode(buf.getvalue()).decode('utf-8')


if __name__ == "__main__":
    chart = NorthIndianChart()

    # Test data
    house_planets = {
        1: [4], 3: [1, 8], 4: [7], 5: [0, 5, 2, 3], 9: [6]
    }

    chart_b64 = chart.generate_chart_base64(lagna=1, planet_positions=house_planets)

    with open("test_chart.png", "wb") as f:
        f.write(base64.b64decode(chart_b64))

    print("Test chart saved (600x400)")
