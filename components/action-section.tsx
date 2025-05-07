"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, FileText, Heart, MessageSquare, Share2, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

type ActionPoint = {
  id: string
  title: string
  description: string
  icon: string
  impact: string
  effort: string
  action: string
  actionUrl: string
  stats: {
    [key: string]: string | number
  }
}

type LeveragePointsAnalysis = {
  [key: string]: {
    description: string
    examples: string[]
    effectivenessScore: number
    implementationDifficulty: number
    currentInitiatives: number
  }
}

type ActionData = {
  actionPoints: ActionPoint[]
  leveragePointsAnalysis: LeveragePointsAnalysis
  lastUpdated: string
}

export function ActionSection() {
  const [actionData, setActionData] = useState<ActionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("actions")

  useEffect(() => {
    async function fetchActionData() {
      try {
        setLoading(true)
        const response = await fetch("/api/action-points")

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setActionData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching action data:", err)
        setError("Failed to load action data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchActionData()
  }, [])

  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "alert-triangle":
        return <AlertTriangle className="h-6 w-6 text-rose-500" />
      case "users":
        return <Users className="h-6 w-6 text-emerald-500" />
      case "share":
        return <Share2 className="h-6 w-6 text-sky-500" />
      case "message-square":
        return <MessageSquare className="h-6 w-6 text-amber-500" />
      case "file-text":
        return <FileText className="h-6 w-6 text-violet-500" />
      case "heart":
        return <Heart className="h-6 w-6 text-red-500" />
      case "bell":
        return <Bell className="h-6 w-6 text-orange-500" />
      case "shield":
        return <Shield className="h-6 w-6 text-blue-500" />
      default:
        return <AlertTriangle className="h-6 w-6 text-rose-500" />
    }
  }

  // Function to get color class based on impact level
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High":
        return "text-rose-500"
      case "High":
        return "text-orange-500"
      case "Medium":
        return "text-amber-500"
      case "Low":
        return "text-emerald-500"
      case "Very Low":
        return "text-sky-500"
      default:
        return "text-muted-foreground"
    }
  }

  // Function to get color class based on effort level
  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "Very High":
        return "text-rose-500"
      case "High":
        return "text-orange-500"
      case "Medium":
        return "text-amber-500"
      case "Low":
        return "text-emerald-500"
      case "Very Low":
        return "text-sky-500"
      default:
        return "text-muted-foreground"
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-12 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
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

  if (!actionData) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4 mb-6">
        <Button variant={activeTab === "actions" ? "default" : "outline"} onClick={() => setActiveTab("actions")}>
          Action Points
        </Button>
        <Button variant={activeTab === "leverage" ? "default" : "outline"} onClick={() => setActiveTab("leverage")}>
          Systems Leverage Analysis
        </Button>
      </div>

      {activeTab === "actions" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actionData.actionPoints.map((point) => (
            <Card key={point.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  {renderIcon(point.icon)}
                  <CardTitle className="text-lg">{point.title}</CardTitle>
                </div>
                <CardDescription>{point.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Impact:</span>
                    <div className={`font-medium ${getImpactColor(point.impact)}`}>{point.impact}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Effort:</span>
                    <div className={`font-medium ${getEffortColor(point.effort)}`}>{point.effort}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs">
                  {Object.entries(point.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Systems Leverage Points Analysis</CardTitle>
              <CardDescription>
                Based on Donella Meadows' framework for systemic change - from least to most effective
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(actionData.leveragePointsAnalysis)
                .sort((a, b) => a[1].effectivenessScore - b[1].effectivenessScore)
                .map(([key, point]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Effectiveness:</span>
                          <span className="font-medium text-sm">{Math.round(point.effectivenessScore * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Difficulty:</span>
                          <span className="font-medium text-sm">
                            {Math.round(point.implementationDifficulty * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Progress
                        value={point.effectivenessScore * 100}
                        className="h-2"
                        indicatorClassName="bg-emerald-500"
                      />
                      <Progress
                        value={point.implementationDifficulty * 100}
                        className="h-2"
                        indicatorClassName="bg-rose-500"
                      />
                    </div>

                    <p className="text-sm text-muted-foreground">{point.description}</p>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                      {point.examples.map((example, i) => (
                        <Card key={i} className="bg-muted/50">
                          <CardContent className="p-3 text-sm">{example}</CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground">Current initiatives: {point.currentInitiatives}</div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-xs text-right text-muted-foreground">
        Data updated: {new Date(actionData.lastUpdated).toLocaleString()}
      </div>
    </div>
  )
}
