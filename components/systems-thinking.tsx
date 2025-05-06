"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

type SystemElement = {
  id: string
  name: string
  description: string
  connections: string[]
  category: "social" | "physical" | "institutional" | "economic"
}

type SystemsData = {
  elements: SystemElement[]
  relationships: Array<{
    from: string
    to: string
    description: string
    strength: number
  }>
  leveragePoints: Array<{
    id: string
    name: string
    description: string
    impact: number
  }>
}

export function SystemsThinking() {
  const [systemsData, setSystemsData] = useState<SystemsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSystemsData() {
      try {
        setLoading(true)
        
        // First try to fetch from API if it's configured
        try {
          const response = await fetch("/api/systems-data", { 
            signal: AbortSignal.timeout(3000) // Timeout after 3 seconds
          })
          
          if (response.ok) {
            const data = await response.json()
            setSystemsData(data)
            setError(null)
            setLoading(false)
            return
          }
        } catch (apiError) {
          console.log("API not available, falling back to Gemini mock data")
        }
        
        // If API fails or isn't available, use Gemini to generate mock data
        const mockData = await generateMockSystemsData()
        setSystemsData(mockData)
        setError(null)
      } catch (err) {
        console.error("Error fetching systems data:", err)
        setError("Failed to load systems data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSystemsData()
  }, [])

  // Function to generate mock data using Gemini AI
  async function generateMockSystemsData(): Promise<SystemsData> {
    try {
      // Check if Gemini API key is available
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      
      if (!apiKey) {
        // If no API key, return hardcoded mock data
        return {
          elements: [
            {
              id: "e1",
              name: "Public Transport Infrastructure",
              description: "Physical transit environment including stations, vehicles, and routes",
              connections: ["e2", "e4", "e6"],
              category: "physical"
            },
            {
              id: "e2",
              name: "Surveillance & Security",
              description: "CCTV cameras, security personnel, and emergency response systems",
              connections: ["e1", "e3"],
              category: "institutional"
            },
            {
              id: "e3",
              name: "Law Enforcement",
              description: "Police presence, reporting mechanisms, and response protocols",
              connections: ["e2", "e7"],
              category: "institutional"
            },
            {
              id: "e4",
              name: "Crowding & Peak Hours",
              description: "Passenger density and rush hour dynamics",
              connections: ["e1", "e5"],
              category: "social"
            },
            {
              id: "e5",
              name: "Community Awareness",
              description: "Public education and collective vigilance",
              connections: ["e4", "e8"],
              category: "social"
            },
            {
              id: "e6",
              name: "Lighting & Visibility",
              description: "Illumination in transit areas and surroundings",
              connections: ["e1", "e7"],
              category: "physical"
            },
            {
              id: "e7",
              name: "Reporting Mechanisms",
              description: "Systems for reporting incidents and emergency response",
              connections: ["e3", "e6"],
              category: "institutional"
            },
            {
              id: "e8",
              name: "Economic Factors",
              description: "Funding for safety initiatives and socioeconomic considerations",
              connections: ["e5"],
              category: "economic"
            }
          ],
          relationships: [
            {
              from: "e1",
              to: "e2",
              description: "Infrastructure design affects surveillance capability",
              strength: 0.8
            },
            {
              from: "e2",
              to: "e3",
              description: "Surveillance feeds into law enforcement response",
              strength: 0.7
            },
            {
              from: "e4",
              to: "e5",
              description: "Crowding affects community awareness and vigilance",
              strength: 0.6
            },
            {
              from: "e6",
              to: "e2",
              description: "Lighting improves surveillance effectiveness",
              strength: 0.75
            },
            {
              from: "e7",
              to: "e3",
              description: "Reporting mechanisms improve law enforcement response time",
              strength: 0.85
            },
            {
              from: "e8",
              to: "e1",
              description: "Economic factors influence infrastructure quality",
              strength: 0.9
            }
          ],
          leveragePoints: [
            {
              id: "lp1",
              name: "Well-lit Transit Stops",
              description: "Strategic lighting improvements at high-risk transit points",
              impact: 0.8
            },
            {
              id: "lp2",
              name: "Real-time Reporting App",
              description: "Mobile application for immediate incident reporting and tracking",
              impact: 0.9
            },
            {
              id: "lp3",
              name: "Women-only Carriages",
              description: "Dedicated safe spaces during peak hours",
              impact: 0.7
            },
            {
              id: "lp4",
              name: "Community Watch Program",
              description: "Volunteer observers trained to identify and report issues",
              impact: 0.65
            }
          ]
        }
      }
      
      // If API key is available, use Gemini to generate data
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      const prompt = `Generate realistic systems thinking data for women's safety in public transportation in India. The response should be a valid JSON object with this structure:

{
  "elements": [
    {
      "id": string,
      "name": string,
      "description": string,
      "connections": [array of element ids],
      "category": one of ["social", "physical", "institutional", "economic"]
    }
  ],
  "relationships": [
    {
      "from": string (element id),
      "to": string (element id),
      "description": string,
      "strength": number between 0-1
    }
  ],
  "leveragePoints": [
    {
      "id": string,
      "name": string,
      "description": string,
      "impact": number between 0-1
    }
  ]
}

Include 8 system elements across different categories, 6 key relationships, and 4 leverage points for intervention. Make the system elements reflect real factors affecting women's safety in Indian public transit systems.`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text()
      
      // Find the JSON part of the response
      const jsonMatch = responseText.match(/(\{[\s\S]*\})/)
      if (jsonMatch) {
        try {
          const parsedData = JSON.parse(jsonMatch[0])
          return parsedData as SystemsData
        } catch (parseError) {
          console.error("Failed to parse Gemini response:", parseError)
          throw new Error("Invalid data format from AI")
        }
      } else {
        throw new Error("Could not extract valid JSON from AI response")
      }
    } catch (err) {
      console.error("Error generating mock data:", err)
      throw new Error("Failed to generate mock systems data")
    }
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      social: "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800",
      physical: "bg-emerald-100 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800",
      institutional: "bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800",
      economic: "bg-rose-100 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700"
  }

  // Get impact color
  const getImpactColor = (impact: number) => {
    if (impact >= 0.8) return "bg-green-500"
    if (impact >= 0.6) return "bg-emerald-500"
    if (impact >= 0.4) return "bg-amber-500"
    if (impact >= 0.2) return "bg-orange-500"
    return "bg-rose-500"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
        <CardContent className="flex items-center gap-2 p-6 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!systemsData) {
    return null
  }

  const selectedElementData = selectedElement 
    ? systemsData.elements.find(e => e.id === selectedElement) 
    : null

  const relatedRelationships = selectedElement
    ? systemsData.relationships.filter(r => r.from === selectedElement || r.to === selectedElement)
    : []

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-sm">Social</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm">Physical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
          <span className="text-sm">Institutional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500"></div>
          <span className="text-sm">Economic</span>
        </div>
      </div>

      {/* System Elements */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemsData.elements.map((element) => (
          <Card
            key={element.id}
            className={`cursor-pointer transition-colors border ${getCategoryColor(element.category)} ${
              selectedElement === element.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedElement(element.id === selectedElement ? null : element.id)}
          >
            <CardContent className="p-4">
              <div className="font-medium">{element.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{element.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {element.connections.map((conn) => {
                  const connElement = systemsData.elements.find((e) => e.id === conn)
                  return (
                    <div
                      key={conn}
                      className="rounded-full bg-background px-2 py-1 text-xs border shadow-sm"
                    >
                      {connElement?.name}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Element Details */}
      {selectedElementData && (
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">{selectedElementData.name}</h3>
            <p className="mt-1 text-muted-foreground">{selectedElementData.description}</p>
            
            <h4 className="mt-4 font-medium">Key Relationships:</h4>
            <div className="mt-2 space-y-2">
              {relatedRelationships.length > 0 ? (
                relatedRelationships.map((rel) => {
                  const fromElement = systemsData.elements.find(e => e.id === rel.from)
                  const toElement = systemsData.elements.find(e => e.id === rel.to)
                  return (
                    <div key={`${rel.from}-${rel.to}`} className="rounded-lg border bg-card p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          {fromElement?.name} → {toElement?.name}
                        </div>
                        <div 
                          className="ml-2 h-2 w-16 rounded-full" 
                          style={{ 
                            background: `linear-gradient(to right, #f43f5e, #10b981)`,
                            opacity: 0.3 + rel.strength * 0.7
                          }}
                        />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{rel.description}</p>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No direct relationships found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leverage Points */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Key Leverage Points</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {systemsData.leveragePoints.map((point) => (
            <Card key={point.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{point.name}</h4>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`h-3 w-3 rounded-full ${getImpactColor(point.impact)}`}
                    />
                    <span className="text-sm">Impact: {Math.round(point.impact * 100)}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}