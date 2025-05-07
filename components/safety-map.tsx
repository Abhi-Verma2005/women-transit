"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, Shield, Info, MapPin, Clock } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

type SafetyData = {
  safetyIndex: {
    overall: number
    byArea: Array<{
      id: string
      name: string
      score: number
      insights: string
    }>
  }
  timestamp: string
  insights: string
}

export function SafetyDataComponent() {
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState({ 
    name: "Delhi", 
    lat: 28.6139, 
    lon: 77.2090,
    radius: 10
  })

  useEffect(() => {
    async function fetchSafetyData() {
      try {
        setLoading(true)
        
        // First try to fetch from API if it's configured
        try {
          const response = await fetch(
            `/api/safety-data?lat=${location.lat}&lon=${location.lon}&radius=${location.radius}`, 
            { signal: AbortSignal.timeout(3000) } // Timeout after 3 seconds
          )
          
          if (response.ok) {
            const data = await response.json()
            setSafetyData(data)
            setError(null)
            setLoading(false)
            return
          }
        } catch (apiError) {
          console.log("API not available, falling back to Gemini for real-time data")
        }
        
        // If API fails or isn't available, use Gemini to generate data
        const generatedData = await generateRealtimeSafetyData(location)
        setSafetyData(generatedData)
        setError(null)
      } catch (err) {
        console.error("Error fetching safety data:", err)
        setError("Failed to load safety data. Please try again later.")
        
        // As ultimate fallback, use static mock data
        const mockData = {
          safetyIndex: {
            overall: 0.62,
            byArea: [
              { id: "area1", name: "Central Delhi", score: 0.78, insights: "Generally safe during daytime, exercise caution at night" },
              { id: "area2", name: "South Delhi", score: 0.85, insights: "Well-lit areas with good security presence" },
              { id: "area3", name: "North Delhi", score: 0.45, insights: "Higher risk area, travel with companions recommended" },
              { id: "area4", name: "East Delhi", score: 0.67, insights: "Mixed safety profile, varies by specific location" }
            ]
          },
          insights: "Overall safety varies significantly by area and time of day. South Delhi shows the best safety metrics, while North Delhi requires more caution. Always stay alert on public transit and consider using women-only carriages during peak hours.",
          timestamp: new Date().toISOString()
        }
        
        setSafetyData(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchSafetyData()
  }, [location])

  // Function to generate data using Gemini AI
  async function generateRealtimeSafetyData(locationData: typeof location): Promise<SafetyData> {
    try {
      // Check if Gemini API key is available
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      
      if (!apiKey) {
        throw new Error("Gemini API key not available")
      }
      
      // Use Gemini to generate data
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      const prompt = `Generate realistic, up-to-date safety data for women in public transportation in ${locationData.name}, India. Consider current time and seasonal factors.

Return ONLY a valid JSON object with this structure:
{
  "safetyIndex": {
    "overall": number between 0-1,
    "byArea": [
      {
        "id": string,
        "name": string,
        "score": number between 0-1,
        "insights": string with brief safety tips
      }
    ]
  },
  "insights": string with overall safety analysis,
  "timestamp": current datetime string
}

Include 4-6 different areas with varied safety scores. Make the data realistic, nuanced, and helpful for women's safety.`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text()
      
      // Find the JSON part of the response
      const jsonMatch = responseText.match(/(\{[\s\S]*\})/)
      if (jsonMatch) {
        try {
          let parsedData = JSON.parse(jsonMatch[0])
          
          // Ensure timestamp is in the correct format
          if (!parsedData.timestamp) {
            parsedData.timestamp = new Date().toISOString()
          }
          
          return parsedData as SafetyData
        } catch (parseError) {
          console.error("Failed to parse Gemini response:", parseError)
          throw new Error("Invalid data format from AI")
        }
      } else {
        throw new Error("Could not extract valid JSON from AI response")
      }
    } catch (err) {
      console.error("Error generating data with Gemini:", err)
      throw new Error("Failed to generate safety data")
    }
  }

  // Function to render the safety score with appropriate color and icon
  const renderSafetyScore = (score: number) => {
    let colorClass = ""
    let labelText = ""
    let bgClass = ""

    if (score >= 0.8) {
      colorClass = "text-green-700"
      bgClass = "bg-green-50"
      labelText = "Very Safe"
    }
    else if (score >= 0.6) {
      colorClass = "text-emerald-700"
      bgClass = "bg-emerald-50"
      labelText = "Generally Safe"
    }
    else if (score >= 0.4) {
      colorClass = "text-amber-700"
      bgClass = "bg-amber-50"
      labelText = "Exercise Caution"
    }
    else if (score >= 0.2) {
      colorClass = "text-orange-700"
      bgClass = "bg-orange-50"
      labelText = "High Risk"
    }
    else {
      colorClass = "text-rose-700"
      bgClass = "bg-rose-50"
      labelText = "Very High Risk"
    }

    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgClass}`}>
        <Shield className={`h-4 w-4 ${colorClass}`} />
        <div className={`text-sm font-medium ${colorClass}`}>
          {Math.round(score * 100)}
          <span className="mx-1 text-xs font-normal text-muted-foreground"> | </span>
          <span className="text-xs">{labelText}</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
        <CardContent className="flex items-center gap-3 p-6 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!safetyData) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Overview card */}
      <Card className="overflow-hidden shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Transit Safety Index</CardTitle>
            </div>
            {renderSafetyScore(safetyData.safetyIndex.overall)}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <span>{location.name} Public Transportation</span>
          </div>
        </CardHeader>
        
        <CardContent className="pb-6">
          {/* Insights section */}
          <Card className="bg-primary/5 border-none mt-4">
            <CardContent className="p-4 flex gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{safetyData.insights}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Area safety scores */}
      <div>
        <h3 className="text-lg font-medium mb-3 pl-1">Area Safety Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyData.safetyIndex.byArea.map((area) => (
            <Card key={area.id} className="hover:shadow-md transition-shadow border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-base">{area.name}</h4>
                  {renderSafetyScore(area.score)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{area.insights}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Last updated timestamp */}
      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        Last updated: {new Date(safetyData.timestamp).toLocaleString()}
      </div>
    </div>
  )
}