import { NextResponse } from "next/server"

// API to fetch trend data from NCRB and other sources
export async function GET() {
  try {
    // In a real implementation, this would fetch from NCRB API and other sources
    // For now, we're providing structured data that would come from these APIs

    const trendData = {
      // Monthly incident data from NCRB
      incidentTrends: [
        { month: "Jan", incidents: 180, resolved: 120 },
        { month: "Feb", incidents: 200, resolved: 150 },
        { month: "Mar", incidents: 220, resolved: 170 },
        { month: "Apr", incidents: 190, resolved: 140 },
        { month: "May", incidents: 240, resolved: 180 },
        { month: "Jun", incidents: 280, resolved: 200 },
        { month: "Jul", incidents: 260, resolved: 210 },
        { month: "Aug", incidents: 220, resolved: 190 },
        { month: "Sep", incidents: 230, resolved: 200 },
        { month: "Oct", incidents: 210, resolved: 180 },
        { month: "Nov", incidents: 240, resolved: 210 },
        { month: "Dec", incidents: 250, resolved: 220 },
      ],

      // Response time distribution from emergency services data
      responseTimeDistribution: [
        { time: "<15 min", percentage: 20 },
        { time: "15-30 min", percentage: 35 },
        { time: "30-60 min", percentage: 25 },
        { time: "1-2 hrs", percentage: 15 },
        { time: ">2 hrs", percentage: 5 },
      ],

      // Location data from CrimeoMeter and police reports
      locationData: [
        { location: "Bus Stops", incidents: 320, percentage: 21.8 },
        { location: "Metro Stations", incidents: 280, percentage: 19.1 },
        { location: "Inside Buses", incidents: 420, percentage: 28.6 },
        { location: "Inside Metros", incidents: 190, percentage: 12.9 },
        { location: "Auto Rickshaws", incidents: 250, percentage: 17.0 },
      ],

      // Time of day analysis from incident reports
      timeOfDayData: [
        { time: "6-9 AM", incidents: 180, percentage: 12.3 },
        { time: "9-12 PM", incidents: 120, percentage: 8.2 },
        { time: "12-3 PM", incidents: 100, percentage: 6.8 },
        { time: "3-6 PM", incidents: 150, percentage: 10.2 },
        { time: "6-9 PM", incidents: 280, percentage: 19.1 },
        { time: "9-12 AM", incidents: 320, percentage: 21.8 },
        { time: "12-6 AM", incidents: 210, percentage: 14.3 },
      ],

      // Year-over-year comparison
      yearlyComparison: [
        { year: 2019, incidents: 1450, reportingRate: 0.18 },
        { year: 2020, incidents: 1280, reportingRate: 0.19 }, // Lower due to COVID lockdowns
        { year: 2021, incidents: 1320, reportingRate: 0.21 },
        { year: 2022, incidents: 1520, reportingRate: 0.22 },
        { year: 2023, incidents: 1680, reportingRate: 0.23 },
      ],

      // Infrastructure correlation
      infrastructureCorrelation: [
        { factor: "CCTV Coverage", correlation: 0.72 }, // Strong negative correlation with incidents
        { factor: "Lighting Quality", correlation: 0.68 },
        { factor: "Police Presence", correlation: 0.65 },
        { factor: "Crowd Density", correlation: -0.58 }, // Positive correlation with incidents
        { factor: "Response Time", correlation: -0.76 },
      ],

      // Demographic insights
      demographicInsights: {
        ageGroups: [
          { group: "18-24", percentage: 38 },
          { group: "25-34", percentage: 29 },
          { group: "35-44", percentage: 18 },
          { group: "45-54", percentage: 10 },
          { group: "55+", percentage: 5 },
        ],
        timeOfTravel: [
          { time: "Early Morning", percentage: 12 },
          { time: "Morning Rush", percentage: 28 },
          { time: "Midday", percentage: 15 },
          { time: "Evening Rush", percentage: 32 },
          { time: "Night", percentage: 13 },
        ],
        travelPurpose: [
          { purpose: "Work Commute", percentage: 58 },
          { purpose: "Education", percentage: 22 },
          { purpose: "Shopping", percentage: 8 },
          { purpose: "Social", percentage: 7 },
          { purpose: "Other", percentage: 5 },
        ],
      },
    }

    return NextResponse.json({
      ...trendData,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching trend data:", error)
    return NextResponse.json({ error: "Failed to fetch trend data" }, { status: 500 })
  }
}
