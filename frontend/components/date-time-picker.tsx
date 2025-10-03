'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  date: Date;
  time: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

export function DateTimePicker({ date, time, onDateChange, onTimeChange }: DateTimePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(newDate);
      setCalendarOpen(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTimeChange(e.target.value);
  };

  const setToNow = () => {
    const now = new Date();
    onDateChange(now);
    onTimeChange(format(now, 'HH:mm'));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Date & Time
        </CardTitle>
        <CardDescription>
          Select date and time for calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time (24-hour format)
          </Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={setToNow}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}