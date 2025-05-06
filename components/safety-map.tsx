"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

type SafetyData = {
  safetyIndex: {
    overall: number
    byArea: Array<{
      id: string
      name: string
      score: number
    }>
  }
  timestamp: string
}

export function SafetyMap() {
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSafetyData() {
      try {
        setLoading(true)
        // Default to Delhi coordinates
        const lat = 28.6139
        const lon = 77.2090
        const radius = 10
        
        // First try to fetch from API if it's configured
        try {
          const response = await fetch(`/api/safety-data?lat=${lat}&lon=${lon}&radius=${radius}`, { 
            signal: AbortSignal.timeout(3000) // Timeout after 3 seconds
          })
          
          if (response.ok) {
            const data = await response.json()
            setSafetyData(data)
            setError(null)
            setLoading(false)
            return
          }
        } catch (apiError) {
          console.log("API not available, falling back to Gemini mock data")
        }
        
        // If API fails or isn't available, use simplified mock data
        const mockData = {
          safetyIndex: {
            overall: 0.62,
            byArea: [
              { id: "area1", name: "Central Delhi", score: 0.78 },
              { id: "area2", name: "South Delhi", score: 0.85 },
              { id: "area3", name: "North Delhi", score: 0.45 },
              { id: "area4", name: "East Delhi", score: 0.67 }
            ]
          },
          timestamp: new Date().toISOString()
        }
        
        setSafetyData(mockData)
        setError(null)
      } catch (err) {
        console.error("Error fetching safety data:", err)
        setError("Failed to load safety data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSafetyData()
  }, [])

  // Function to render the safety score with appropriate color
  const renderSafetyScore = (score: number) => {
    let colorClass = ""

    if (score >= 0.8) colorClass = "text-green-500"
    else if (score >= 0.6) colorClass = "text-emerald-500"
    else if (score >= 0.4) colorClass = "text-amber-500"
    else if (score >= 0.2) colorClass = "text-orange-500"
    else colorClass = "text-rose-500"

    return (
      <div className="flex items-center gap-1">
        <div className={`font-bold ${colorClass}`}>{Math.round(score * 100)}</div>
        <div className="text-xs text-muted-foreground">/ 100</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
        <CardContent className="flex items-center gap-2 p-4 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!safetyData) {
    return null
  }

  return (
    <div className="space-y-3">
      {/* Overview card */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Safety Overview</h3>
              <p className="text-xs text-muted-foreground">Delhi Public Transit</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Overall Safety</div>
              {renderSafetyScore(safetyData.safetyIndex.overall)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Area safety scores */}
      <div className="grid grid-cols-2 gap-3">
        {safetyData.safetyIndex.byArea.map((area) => (
          <Card key={area.id}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium">{area.name}</div>
                {renderSafetyScore(area.score)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Last updated timestamp */}
      <div className="text-xs text-center text-muted-foreground">
        Last updated: {new Date(safetyData.timestamp).toLocaleString()}
      </div>
    </div>
  )
}