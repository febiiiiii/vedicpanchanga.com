"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Diamond } from "lucide-react"

interface NorthIndianChartProps {
  chartImage?: string  // Base64 encoded image from API
}

export function NorthIndianChart({ chartImage }: NorthIndianChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Diamond className="h-5 w-5" />
          Birth Chart (North Indian Style)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartImage ? (
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={chartImage}
              alt="North Indian Birth Chart showing planetary positions in houses"
              className="max-w-full h-auto rounded-lg shadow-lg"
              style={{ maxHeight: "600px" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <Diamond className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Chart not available. Please calculate panchanga first.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}