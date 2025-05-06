import { NextResponse } from "next/server"

// API to fetch system factors data that influence women's safety
export async function GET() {
  try {
    // In a real implementation, this would fetch data from various sources
    // For now, we're providing structured data that would come from APIs

    const systemFactors = {
      // Policy & Governance data from government APIs
      policy: {
        recentPolicies: [
          {
            id: "policy_1",
            name: "Women's Safety in Public Transport Act",
            year: 2022,
            implementation: 0.65, // Implementation score
            impact: 0.72, // Measured impact
          },
          {
            id: "policy_2",
            name: "CCTV Mandate for Public Transport",
            year: 2021,
            implementation: 0.58,
            impact: 0.63,
          },
          {
            id: "policy_3",
            name: "Emergency Response System Integration",
            year: 2023,
            implementation: 0.42,
            impact: 0.51,
          },
        ],
        budgetAllocation: {
          total: 12500000000, // 1.25 billion INR
          percentChange: 15, // 15% increase from previous year
          breakdown: [
            { category: "Infrastructure", percentage: 45 },
            { category: "Technology", percentage: 30 },
            { category: "Training", percentage: 15 },
            { category: "Awareness", percentage: 10 },
          ],
        },
      },

      // Infrastructure data from transport and urban development APIs
      infrastructure: {
        cctv: {
          coverage: 0.43, // 43% coverage
          functionalRate: 0.78, // 78% of installed CCTVs are functional
          byTransportType: [
            { type: "Bus", coverage: 0.38 },
            { type: "Metro", coverage: 0.92 },
            { type: "Train", coverage: 0.51 },
            { type: "Bus Stops", coverage: 0.29 },
            { type: "Metro Stations", coverage: 0.95 },
            { type: "Train Stations", coverage: 0.87 },
          ],
        },
        lighting: {
          adequateLighting: 0.56, // 56% of transit areas have adequate lighting
          byArea: [
            { area: "Central Delhi", score: 0.72 },
            { area: "South Delhi", score: 0.68 },
            { area: "North Delhi", score: 0.51 },
            { area: "East Delhi", score: 0.48 },
            { area: "West Delhi", score: 0.53 },
          ],
        },
        panicButtons: {
          availability: 0.37, // 37% of transport has panic buttons
          functionalRate: 0.65, // 65% are functional
          responseTime: 18, // Average response time in minutes
        },
      },

      // Reporting systems data
      reporting: {
        channels: [
          {
            name: "Mobile App",
            usage: 0.45, // 45% of reports come through this channel
            responseTime: 12, // minutes
            userSatisfaction: 0.72, // 72% satisfaction rate
          },
          {
            name: "Emergency Hotline",
            usage: 0.3,
            responseTime: 8,
            userSatisfaction: 0.68,
          },
          {
            name: "Transport Staff",
            usage: 0.15,
            responseTime: 22,
            userSatisfaction: 0.53,
          },
          {
            name: "Police Station",
            usage: 0.1,
            responseTime: 35,
            userSatisfaction: 0.47,
          },
        ],
        reportingRate: 0.23, // Estimated percentage of incidents that get reported
        barriers: [
          { barrier: "Fear of retaliation", percentage: 0.28 },
          { barrier: "Lack of awareness of channels", percentage: 0.22 },
          { barrier: "Distrust in authorities", percentage: 0.19 },
          { barrier: "Process complexity", percentage: 0.17 },
          { barrier: "Time constraints", percentage: 0.14 },
        ],
      },

      // Response time data
      response: {
        average: 27, // minutes
        byTimeOfDay: [
          { time: "Morning (6AM-12PM)", minutes: 22 },
          { time: "Afternoon (12PM-6PM)", minutes: 25 },
          { time: "Evening (6PM-12AM)", minutes: 31 },
          { time: "Night (12AM-6AM)", minutes: 38 },
        ],
        byArea: [
          { area: "Central Delhi", minutes: 18 },
          { area: "South Delhi", minutes: 23 },
          { area: "North Delhi", minutes: 29 },
          { area: "East Delhi", minutes: 32 },
          { area: "West Delhi", minutes: 27 },
        ],
        impactOnReporting: [
          { responseTime: "<15 min", reportingLikelihood: 0.82 },
          { responseTime: "15-30 min", reportingLikelihood: 0.65 },
          { responseTime: "30-60 min", reportingLikelihood: 0.41 },
          { responseTime: ">60 min", reportingLikelihood: 0.23 },
        ],
      },

      // Public awareness data
      awareness: {
        knowledgeOfRights: 0.58, // 58% aware of their rights
        knowledgeOfReportingChannels: 0.47, // 47% aware of how to report
        awarenessPrograms: [
          {
            name: "Safe Transit Campaign",
            reach: 2500000, // people
            effectiveness: 0.63, // measured impact
          },
          {
            name: "School Safety Education",
            reach: 1200000,
            effectiveness: 0.78,
          },
          {
            name: "Transit Staff Training",
            reach: 85000,
            effectiveness: 0.71,
          },
        ],
        mediaRepresentation: {
          coverage: 0.39, // 39% of relevant issues get media coverage
          accuracy: 0.65, // 65% accuracy in reporting
          impact: 0.72, // Impact on public perception
        },
      },

      // Community action data
      community: {
        activeInitiatives: 127, // Number of active community initiatives
        participation: 0.08, // 8% of population participates
        successStories: [
          {
            name: "Community Watch Program - South Delhi",
            participants: 12500,
            impact: "32% reduction in incidents",
          },
          {
            name: "Safe Route Mapping - Bangalore",
            participants: 8700,
            impact: "Created 45 verified safe routes",
          },
          {
            name: "Transport Buddy System - Mumbai",
            participants: 22000,
            impact: "89% of participants report feeling safer",
          },
        ],
        challengesFaced: [
          { challenge: "Sustained participation", severity: 0.75 },
          { challenge: "Coordination with authorities", severity: 0.68 },
          { challenge: "Resource limitations", severity: 0.82 },
          { challenge: "Measuring impact", severity: 0.71 },
        ],
      },
    }

    // Connections between system elements
    const systemConnections = [
      {
        source: "policy",
        target: "infrastructure",
        strength: 0.85, // Connection strength
        description: "Policies directly influence infrastructure development through funding and mandates",
        examples: [
          "CCTV Mandate led to 28% increase in camera installations",
          "Safety budget allocations improved lighting in 34 transit hubs",
        ],
      },
      {
        source: "policy",
        target: "reporting",
        strength: 0.72,
        description: "Policies establish and regulate reporting mechanisms",
        examples: [
          "One-touch reporting requirement led to app development",
          "Mandatory response protocols improved reporting efficiency",
        ],
      },
      {
        source: "infrastructure",
        target: "reporting",
        strength: 0.68,
        description: "Better infrastructure enables more effective reporting",
        examples: [
          "CCTV presence increases reporting rates by 23%",
          "Well-lit areas show 31% higher incident documentation",
        ],
      },
      {
        source: "reporting",
        target: "response",
        strength: 0.91,
        description: "Reporting system efficiency directly impacts response times",
        examples: [
          "App-based reporting reduced response time by 42%",
          "Centralized reporting system improved coordination by 37%",
        ],
      },
      {
        source: "response",
        target: "community",
        strength: 0.76,
        description: "Response effectiveness influences community engagement",
        examples: [
          "Areas with <15min response times have 3x more community initiatives",
          "Visible police response increased volunteer participation by 28%",
        ],
      },
      {
        source: "community",
        target: "awareness",
        strength: 0.83,
        description: "Community action drives awareness and education",
        examples: [
          "Community workshops increased reporting knowledge by 45%",
          "Peer education programs reached 320,000 women in 2023",
        ],
      },
      {
        source: "awareness",
        target: "policy",
        strength: 0.69,
        description: "Public awareness creates pressure for policy changes",
        examples: [
          "Media campaign led to new safety legislation in 2022",
          "Public hearings influenced budget allocation increase of 15%",
        ],
      },
      {
        source: "infrastructure",
        target: "response",
        strength: 0.77,
        description: "Infrastructure quality affects emergency response capability",
        examples: [
          "GPS in buses reduced location identification time by 64%",
          "Emergency lanes improved response vehicle travel time by 28%",
        ],
      },
    ]

    // Feedback loops in the system
    const feedbackLoops = [
      {
        id: "reporting-response",
        name: "Reporting & Response Loop",
        elements: ["reporting", "response", "community", "awareness"],
        strength: 0.81, // Overall strength of the feedback loop
        description:
          "When reporting systems are effective and response times are quick, community trust increases, leading to more reporting and better awareness.",
        keyMetrics: [
          "For every 10% improvement in response time, reporting rates increase by 7.5%",
          "Communities with high reporting rates (>60%) show 34% better awareness of safety resources",
          "Areas with trusted reporting systems have 3.2x more community safety initiatives",
        ],
        interventionPoints: [
          {
            point: "Streamlined reporting process",
            potentialImpact: 0.72,
            implementation: "Reduce steps in reporting flow from 7 to 3",
          },
          {
            point: "Response time transparency",
            potentialImpact: 0.68,
            implementation: "Public dashboards showing real-time response performance",
          },
          {
            point: "Community feedback channels",
            potentialImpact: 0.75,
            implementation: "Regular community forums with response teams",
          },
        ],
      },
      {
        id: "policy-infrastructure",
        name: "Policy & Infrastructure Loop",
        elements: ["policy", "infrastructure", "reporting", "awareness"],
        strength: 0.76,
        description:
          "Strong policies lead to better infrastructure, which improves reporting systems and raises public awareness, creating pressure for even better policies.",
        keyMetrics: [
          "Policy implementation scores correlate with infrastructure quality at r=0.78",
          "Infrastructure improvements lead to 23% increase in successful incident reporting",
          "Public awareness of infrastructure changes drives policy approval ratings up by 18%",
        ],
        interventionPoints: [
          {
            point: "Policy implementation tracking",
            potentialImpact: 0.81,
            implementation: "Public dashboard for tracking policy implementation progress",
          },
          {
            point: "Infrastructure audit system",
            potentialImpact: 0.75,
            implementation: "Regular public audits of safety infrastructure with published results",
          },
          {
            point: "Participatory budgeting",
            potentialImpact: 0.69,
            implementation: "Community input on 25% of safety infrastructure budget allocation",
          },
        ],
      },
      {
        id: "community-awareness",
        name: "Community & Awareness Loop",
        elements: ["community", "awareness", "policy", "infrastructure"],
        strength: 0.72,
        description:
          "Active communities raise awareness, which influences policy changes, leading to improved infrastructure that empowers communities further.",
        keyMetrics: [
          "Community-led awareness campaigns reach 3.7x more people than government initiatives",
          "Areas with high awareness scores see 42% more policy advocacy activities",
          "Community feedback influences 28% of infrastructure planning decisions",
        ],
        interventionPoints: [
          {
            point: "Community ambassador program",
            potentialImpact: 0.77,
            implementation: "Train 5,000 community safety ambassadors across major cities",
          },
          {
            point: "Public awareness measurement",
            potentialImpact: 0.65,
            implementation: "Quarterly surveys to measure awareness levels and identify gaps",
          },
          {
            point: "Community-policy dialogue forums",
            potentialImpact: 0.82,
            implementation: "Monthly structured dialogues between community leaders and policymakers",
          },
        ],
      },
    ]

    return NextResponse.json({
      systemFactors,
      systemConnections,
      feedbackLoops,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching system factors data:", error)
    return NextResponse.json({ error: "Failed to fetch system factors data" }, { status: 500 })
  }
}
