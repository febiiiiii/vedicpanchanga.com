'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  BookOpen,
  Code,
  Copy,
  Check,
  ArrowLeft,
  Server,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function ApiDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(label);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const CodeBlock = ({ code }: { code: string; language?: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className="language-{language}">{code}</code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={() => copyToClipboard(code, 'code')}
      >
        {copiedEndpoint === 'code' ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
                  <BookOpen className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">API Documentation</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Vedic Panchanga REST API
                  </p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Introduction */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="h-6 w-6 text-primary" />
              Welcome to the Vedic Panchanga API
            </CardTitle>
            <CardDescription className="text-base">
              A comprehensive REST API for calculating Vedic Panchanga, planetary positions, and astrological data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The Vedic Panchanga API provides accurate calculations for traditional Hindu calendar elements including
              Tithi, Nakshatra, Yoga, Karana, Vaara, planetary positions, and auspicious timings based on location and date/time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border">
                <Zap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Fast & Accurate</h4>
                  <p className="text-sm text-muted-foreground">Real-time calculations using astronomical algorithms</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border">
                <Globe className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Location-Based</h4>
                  <p className="text-sm text-muted-foreground">Precise results for any location worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">RESTful Design</h4>
                  <p className="text-sm text-muted-foreground">Simple, intuitive API following REST principles</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Base URL */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Base URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg font-mono">
              <code className="flex-1">{typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(
                  typeof window !== 'undefined' ? `${window.location.origin}/api` : 'https://your-domain.com/api',
                  'base-url'
                )}
              >
                {copiedEndpoint === 'base-url' ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <Tabs defaultValue="panchanga" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="panchanga">Panchanga Endpoint</TabsTrigger>
            <TabsTrigger value="planets">Planetary Positions</TabsTrigger>
          </TabsList>

          {/* Panchanga Endpoint */}
          <TabsContent value="panchanga" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Calculate Panchanga</CardTitle>
                  <Badge variant="default" className="bg-green-600">GET</Badge>
                </div>
                <CardDescription>
                  Get complete Panchanga data for a specific date, time, and location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Endpoint */}
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
                    <Badge variant="default" className="bg-green-600">GET</Badge>
                    <code className="flex-1">/api/panchanga</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard('/api/panchanga', 'panchanga-endpoint')}
                    >
                      {copiedEndpoint === 'panchanga-endpoint' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Query Parameters */}
                <div>
                  <h4 className="font-semibold mb-3">Query Parameters</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">date</code>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Date in ISO 8601 format (e.g., &quot;2024-03-15&quot;)
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">time</code>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Time in 24-hour format (e.g., &quot;14:30&quot;)
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">latitude</code>
                        <Badge variant="secondary" className="text-xs">number</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Latitude in decimal degrees (e.g., 28.6139)
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">longitude</code>
                        <Badge variant="secondary" className="text-xs">number</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Longitude in decimal degrees (e.g., 77.2090)
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">timezone</code>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        IANA timezone identifier (e.g., &quot;Asia/Kolkata&quot;)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Example Request */}
                <div>
                  <h4 className="font-semibold mb-3">Example Request</h4>
                  <CodeBlock
                    code={`GET ${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/panchanga?date=2024-03-15&time=14:30&latitude=28.6139&longitude=77.2090&timezone=Asia/Kolkata`}
                    language="bash"
                  />
                </div>

                <Separator />

                {/* Example Response */}
                <div>
                  <h4 className="font-semibold mb-3">Example Response</h4>
                  <CodeBlock
                    code={JSON.stringify({
                      date: "2024-03-15T14:30:00.000Z",
                      location: {
                        latitude: 28.6139,
                        longitude: 77.2090,
                        timezone: "Asia/Kolkata",
                        city: "New Delhi",
                        country: "India"
                      },
                      sunrise: "06:35 AM",
                      sunset: "06:42 PM",
                      moonrise: "07:20 AM",
                      moonset: "08:15 PM",
                      tithi: {
                        name: "Shukla Panchami",
                        index: 5,
                        paksha: "Shukla",
                        endTime: "15:45",
                        percentage: 65.3
                      },
                      nakshatra: {
                        name: "Rohini",
                        index: 4,
                        pada: 2,
                        endTime: "18:22",
                        lord: "Moon",
                        percentage: 42.1
                      },
                      yoga: {
                        name: "Siddha",
                        index: 21,
                        endTime: "16:30"
                      },
                      karana: {
                        name: "Bava",
                        index: 0,
                        endTime: "15:45"
                      },
                      vaara: {
                        name: "Friday",
                        index: 5,
                        lord: "Venus"
                      },
                      ayanamsha: 24.123456,
                      rahuKala: {
                        start: "10:30 AM",
                        end: "12:00 PM"
                      },
                      yamaGanda: {
                        start: "13:30 PM",
                        end: "15:00 PM"
                      },
                      gulikaKala: {
                        start: "09:00 AM",
                        end: "10:30 AM"
                      },
                      abhijitMuhurta: {
                        start: "12:00 PM",
                        end: "12:48 PM"
                      }
                    }, null, 2)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planets Endpoint */}
          <TabsContent value="planets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Planetary Positions</CardTitle>
                  <Badge variant="default" className="bg-green-600">GET</Badge>
                </div>
                <CardDescription>
                  Get current positions of all planets in the zodiac
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Endpoint */}
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
                    <Badge variant="default" className="bg-green-600">GET</Badge>
                    <code className="flex-1">/api/planets</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard('/api/planets', 'planets-endpoint')}
                    >
                      {copiedEndpoint === 'planets-endpoint' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Query Parameters */}
                <div>
                  <h4 className="font-semibold mb-3">Query Parameters</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">date</code>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Date in ISO 8601 format (e.g., &quot;2024-03-15&quot;)
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-muted px-2 py-1 rounded">time</code>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                        <Badge variant="outline" className="text-xs">required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Time in 24-hour format (e.g., &quot;14:30&quot;)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Example Request */}
                <div>
                  <h4 className="font-semibold mb-3">Example Request</h4>
                  <CodeBlock
                    code={`GET ${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/planets?date=2024-03-15&time=14:30`}
                    language="bash"
                  />
                </div>

                <Separator />

                {/* Example Response */}
                <div>
                  <h4 className="font-semibold mb-3">Example Response</h4>
                  <CodeBlock
                    code={JSON.stringify([
                      {
                        name: "Sun",
                        longitude: 354.523,
                        latitude: 0.0,
                        speed: 0.9856,
                        retrograde: false,
                        rashi: {
                          rashi: "Pisces",
                          degree: 24,
                          minute: 31,
                          second: 24,
                          nakshatra: "Revati",
                          pada: 2
                        },
                        nakshatra: "Revati"
                      },
                      {
                        name: "Moon",
                        longitude: 68.234,
                        latitude: 2.345,
                        speed: 13.176,
                        retrograde: false,
                        rashi: {
                          rashi: "Gemini",
                          degree: 8,
                          minute: 14,
                          second: 2,
                          nakshatra: "Mrigashira",
                          pada: 3
                        },
                        nakshatra: "Mrigashira"
                      }
                    ], null, 2)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Response Codes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>HTTP Status Codes</CardTitle>
            <CardDescription>Standard HTTP status codes used by the API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Badge variant="default" className="bg-green-600">200</Badge>
                <div>
                  <p className="font-semibold">OK</p>
                  <p className="text-sm text-muted-foreground">Request successful, data returned</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Badge variant="default" className="bg-yellow-600">400</Badge>
                <div>
                  <p className="font-semibold">Bad Request</p>
                  <p className="text-sm text-muted-foreground">Missing or invalid parameters</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Badge variant="default" className="bg-red-600">500</Badge>
                <div>
                  <p className="font-semibold">Internal Server Error</p>
                  <p className="text-sm text-muted-foreground">Server error during calculation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              All calculations are approximate and for general guidance only. For critical astrological work, please consult with a qualified Vedic astrologer.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Vedic Panchanga API - Traditional Hindu Calendar System</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
