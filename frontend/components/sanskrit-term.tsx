'use client';

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface SanskritTermProps {
  term: string;
  explanation: string;
  showIcon?: boolean;
}

export function SanskritTerm({ term, explanation, showIcon = true }: SanskritTermProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help border-b border-dotted border-muted-foreground/50 hover:border-muted-foreground/80 transition-colors">
            {term}
            {showIcon && <HelpCircle className="h-3 w-3 text-muted-foreground" />}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Predefined Sanskrit terms and their explanations
export const SANSKRIT_EXPLANATIONS = {
  tithi: "Lunar day in the Hindu calendar, representing the phase of the Moon. There are 30 Tithis in a lunar month.",
  nakshatra: "Lunar mansion or constellation. The 27 Nakshatras divide the zodiac into equal parts, each ruled by a deity.",
  yoga: "Auspicious combination of Sun and Moon positions. There are 27 Yogas, each with specific characteristics.",
  karana: "Half of a Tithi. There are 11 Karanas that repeat in a specific sequence throughout the lunar month.",
  vaara: "Day of the week. Each day is ruled by a specific planet in Vedic astrology.",
  paksha: "Lunar fortnight. Shukla Paksha is the bright fortnight (waxing moon), Krishna Paksha is the dark fortnight (waning moon).",
  pada: "Quarter of a Nakshatra. Each Nakshatra has 4 Padas, further dividing the lunar mansion.",
  rahuKala: "Inauspicious time period ruled by Rahu. It's best to avoid important activities during this time.",
  yamaGanda: "Inauspicious time period associated with Lord Yama. Avoid new beginnings during this period.",
  gulikaKala: "Inauspicious time period ruled by Saturn's son Gulika. Not favorable for auspicious activities.",
  abhijitMuhurta: "The most auspicious time of the day, occurring around midday. Considered suitable for all activities.",
  ayanamsha: "The angle by which the tropical zodiac has precessed from the sidereal zodiac. Used to convert between tropical and sidereal positions.",
  rashi: "Zodiac sign. There are 12 Rashis, each spanning 30 degrees of the zodiac.",
  muhurta: "Auspicious time period for performing specific activities. Each Muhurta lasts approximately 48 minutes.",
};
