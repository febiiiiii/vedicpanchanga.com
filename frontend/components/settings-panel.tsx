'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { CityDropdown } from '@/components/city-dropdown';
import { CalendarIcon, Clock, MapPin, RefreshCw, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import useAppStore from '@/lib/store';
import { Location } from '@/lib/types';

interface SettingsPanelProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  onLocationChange: (location: Location) => void;
  onUseCurrentLocation: () => void;
  locationLoading: boolean;
  onCalculate: () => void;
  loading: boolean;
}

export function SettingsPanel({
  selectedTime,
  onTimeChange,
  onLocationChange,
  onUseCurrentLocation,
  locationLoading,
  onCalculate,
  loading
}: SettingsPanelProps) {
  const { selectedDate, setSelectedDate } = useAppStore();

  const handleSetToNow = () => {
    const now = new Date();
    setSelectedDate(now);
    onTimeChange(format(now, 'HH:mm'));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardContent className="space-y-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                  suppressHydrationWarning
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  captionLayout="dropdown"
                  startMonth={new Date(1900, 0)}
                  endMonth={new Date(2100, 11)}
                  defaultMonth={selectedDate || new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Location Dropdown */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <CityDropdown onLocationChange={onLocationChange} />
          </div>

          {/* Quick Actions - Side by Side */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onUseCurrentLocation}
              disabled={locationLoading}
              className="flex items-center gap-1.5"
            >
              {locationLoading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span className="text-xs sm:text-sm">Getting...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-xs sm:text-sm">Current Location</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSetToNow}
              className="flex items-center gap-1.5"
            >
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs sm:text-sm">Set to Now</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onCalculate}
        disabled={loading}
        className="w-full text-sm sm:text-base"
        size="lg"
      >
        {loading ? (
          <>
            <RefreshCw className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
            <span>Calculating...</span>
          </>
        ) : (
          <>
            <Calendar className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Calculate Panchanga</span>
            <span className="sm:hidden">Calculate</span>
          </>
        )}
      </Button>
    </div>
  );
}
