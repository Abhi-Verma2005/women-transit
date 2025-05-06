import { NextResponse } from "next/server"

// API to fetch action points and leverage data
export async function GET() {
  try {
    // In a real implementation, this would fetch from various sources
    // For now, we're providing structured data that would come from APIs

    const actionPoints = [
      {
        id: "report",
        title: "Report Incidents",
        description: "Contribute to the data by reporting incidents you witness or experience.",
        icon: "alert-triangle",
        impact: "Medium",
        effort: "Low",
        action: "Use the SafeTransit app to report incidents in real-time",
        actionUrl: "/report",
        stats: {
          reportsLastMonth: 1247,
          avgResponseTime: "18 minutes",
          resolutionRate: "72%",
        },
      },
      {
        id: "community",
        title: "Join Community Initiatives",
        description: "Participate in local safety groups and community watch programs.",
        icon: "users",
        impact: "High",
        effort: "Medium",
        action: "Find local safety groups in your area",
        actionUrl: "/community",
        stats: {
          activeGroups: 87,
          totalMembers: 12500,
          areasWithGroups: "68% of transit hubs",
        },
      },
      {
        id: "awareness",
        title: "Raise Awareness",
        description: "Share information about safety issues and solutions with your network.",
        icon: "share",
        impact: "Medium",
        effort: "Low",
        action: "Share this website and its data on social media",
        actionUrl: "/share",
        stats: {
          socialShares: 8720,
          peopleReached: "~2.1 million",
          awarenessIncrease: "23% in target areas",
        },
      },
      {
        id: "feedback",
        title: "Provide Feedback",
        description: "Give feedback to transit authorities about safety concerns and suggestions.",
        icon: "message-square",
        impact: "High",
        effort: "Medium",
        action: "Submit feedback to transit authorities",
        actionUrl: "/feedback",
        stats: {
          feedbackSubmitted: 3450,
          implementationRate: "41%",
          avgImplementationTime: "4.2 months",
        },
      },
      {
        id: "policy",
        title: "Advocate for Policy Change",
        description: "Support policies that improve safety in public transportation.",
        icon: "file-text",
        impact: "Very High",
        effort: "High",
        action: "Sign petitions and contact your representatives",
        actionUrl: "/policy",
        stats: {
          activePetitions: 12,
          totalSignatures: 145000,
          policiesChanged: 7,
        },
      },
      {
        id: "donate",
        title: "Support NGOs",
        description: "Donate to organizations working on women's safety in public transport.",
        icon: "heart",
        impact: "High",
        effort: "Low",
        action: "Donate to partner NGOs",
        actionUrl: "/donate",
        stats: {
          partneredNGOs: 23,
          totalDonations: "₹1.8 crore",
          womenSupported: 28500,
        },
      },
      {
        id: "alerts",
        title: "Enable Safety Alerts",
        description: "Stay informed about safety conditions in your area.",
        icon: "bell",
        impact: "Low",
        effort: "Very Low",
        action: "Subscribe to safety alerts",
        actionUrl: "/alerts",
        stats: {
          subscribedUsers: 42700,
          alertsLastMonth: 187,
          userSafetyRating: "4.2/5",
        },
      },
      {
        id: "training",
        title: "Take Safety Training",
        description: "Learn safety skills and strategies for public transportation.",
        icon: "shield",
        impact: "Medium",
        effort: "Medium",
        action: "Register for a free online safety course",
        actionUrl: "/training",
        stats: {
          availableCourses: 8,
          completedTrainings: 15200,
          safetyConfidenceIncrease: "68%",
        },
      },
    ]

    // Leverage points analysis based on Donella Meadows' framework
    const leveragePointsAnalysis = {
      // From least to most effective leverage points
      parameters: {
        description: "Changing parameters like budget allocations or staffing levels",
        examples: [
          "Increasing police presence at stations",
          "Extending CCTV coverage to more areas",
          "Adding more emergency phones",
        ],
        effectivenessScore: 0.35,
        implementationDifficulty: 0.4,
        currentInitiatives: 12,
      },
      buffers: {
        description: "Adjusting the size of stabilizing stocks and buffers",
        examples: [
          "Increasing reserve emergency response teams",
          "Expanding backup power for safety systems",
          "Creating redundant reporting channels",
        ],
        effectivenessScore: 0.42,
        implementationDifficulty: 0.45,
        currentInitiatives: 8,
      },
      structure: {
        description: "Changing the physical structure of the system",
        examples: [
          "Redesigning transit stations for better visibility",
          "Creating women-only sections in trains and buses",
          "Implementing better lighting in transit corridors",
        ],
        effectivenessScore: 0.58,
        implementationDifficulty: 0.65,
        currentInitiatives: 15,
      },
      delays: {
        description: "Adjusting the length of delays in feedback loops",
        examples: [
          "Reducing emergency response times",
          "Accelerating incident reporting processing",
          "Shortening time between reporting and action",
        ],
        effectivenessScore: 0.67,
        implementationDifficulty: 0.55,
        currentInitiatives: 11,
      },
      feedbackLoops: {
        description: "Strengthening or creating feedback mechanisms",
        examples: [
          "Creating community feedback channels for safety measures",
          "Implementing real-time safety rating systems",
          "Establishing regular safety audits with public input",
        ],
        effectivenessScore: 0.78,
        implementationDifficulty: 0.6,
        currentInitiatives: 9,
      },
      information: {
        description: "Improving information flows and transparency",
        examples: [
          "Publishing real-time safety data dashboards",
          "Creating incident mapping applications",
          "Implementing transparent reporting on resolution status",
        ],
        effectivenessScore: 0.82,
        implementationDifficulty: 0.5,
        currentInitiatives: 14,
      },
      rules: {
        description: "Changing the rules and policies of the system",
        examples: [
          "Mandating safety features in all public transport",
          "Creating stricter penalties for harassment",
          "Requiring safety training for all transit staff",
        ],
        effectivenessScore: 0.75,
        implementationDifficulty: 0.7,
        currentInitiatives: 7,
      },
      selfOrganization: {
        description: "Enabling system self-organization and adaptation",
        examples: [
          "Supporting community-led safety initiatives",
          "Creating frameworks for local safety solutions",
          "Enabling decentralized safety reporting networks",
        ],
        effectivenessScore: 0.88,
        implementationDifficulty: 0.65,
        currentInitiatives: 6,
      },
      goals: {
        description: "Changing the goals of the system",
        examples: [
          "Shifting from incident response to prevention",
          "Prioritizing women's perception of safety in metrics",
          "Making safety a primary KPI for transit authorities",
        ],
        effectivenessScore: 0.92,
        implementationDifficulty: 0.75,
        currentInitiatives: 5,
      },
      paradigms: {
        description: "Changing the mindset or paradigm from which the system arises",
        examples: [
          "Shifting from viewing safety as women's responsibility to societal responsibility",
          "Moving from reactive to proactive safety approaches",
          "Changing cultural attitudes about women in public spaces",
        ],
        effectivenessScore: 0.95,
        implementationDifficulty: 0.9,
        currentInitiatives: 3,
      },
    }

    return NextResponse.json({
      actionPoints,
      leveragePointsAnalysis,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching action points data:", error)
    return NextResponse.json({ error: "Failed to fetch action points data" }, { status: 500 })
  }
}
