'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlanetPosition } from '@/lib/types';
import { PLANETS } from '@/lib/constants';
import { Star, RotateCcw } from 'lucide-react';

interface PlanetaryPositionsProps {
  positions: PlanetPosition[];
}

export function PlanetaryPositions({ positions }: PlanetaryPositionsProps) {
  const getPlanetSymbol = (planetName: string) => {
    const planet = PLANETS.find(p => p.name === planetName);
    return planet?.symbol || '';
  };

  const formatDegree = (longitude: number) => {
    const deg = Math.floor(longitude);
    const minFloat = (longitude - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = Math.floor((minFloat - min) * 60);
    return `${deg}° ${min}' ${sec}"`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Planetary Positions
        </CardTitle>
        <CardDescription>
          Current positions of celestial bodies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Planet</TableHead>
              <TableHead>Rashi</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Nakshatra</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{getPlanetSymbol(position.planet || position.name)}</span>
                    {position.planet || position.name}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {position.zodiac_sign}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatDegree(position.longitude)}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{position.nakshatra}</div>
                    <div className="text-xs text-muted-foreground">
                      Pada {position.pada}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {position.retrograde && (
                    <Badge variant="secondary" className="gap-1">
                      <RotateCcw className="h-3 w-3" />
                      Retro
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}