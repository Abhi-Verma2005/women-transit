import { NextResponse } from "next/server"

// API endpoints for data fetching
const CRIMEOMETER_API_URL = "https://api.crimeometer.com/v1/incidents/raw-data"
const NCRB_DATA_URL = "https://data.gov.in/resource/crime-against-women"
const OPEN_TRANSIT_DELHI_URL = "https://otd.delhi.gov.in/api/v1/transit"

// CrimeoMeter API handler
async function fetchCrimeometerData(lat: number, lon: number, radius: number) {
  try {
    const response = await fetch(`${CRIMEOMETER_API_URL}?lat=${lat}&lon=${lon}&distance=${radius}km`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CRIMEOMETER_API_KEY || "",
      },
    })

    if (!response.ok) {
      throw new Error(`CrimeoMeter API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching CrimeoMeter data:", error)
    throw error
  }
}

// NCRB Data handler
async function fetchNCRBData() {
  try {
    const response = await fetch(NCRB_DATA_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`NCRB API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching NCRB data:", error)
    throw error
  }
}

// Open Transit Data (Delhi) handler
async function fetchTransitData() {
  try {
    const response = await fetch(OPEN_TRANSIT_DELHI_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_TRANSIT_API_KEY || ""}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Open Transit API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching transit data:", error)
    throw error
  }
}

// Combine data from multiple sources for a comprehensive safety view
async function aggregateSafetyData(lat: number, lon: number, radius: number) {
  try {
    // Fetch data in parallel for better performance
    const [crimeData, ncrbData, transitData] = await Promise.all([
      fetchCrimeometerData(lat, lon, radius),
      fetchNCRBData(),
      fetchTransitData(),
    ])

    // Process and combine the data
    // This would involve data normalization, correlation, and preparation for visualization
    return {
      crimeData: crimeData.incidents || [],
      historicalTrends: processNCRBData(ncrbData),
      transitRoutes: processTransitData(transitData),
      safetyIndex: calculateSafetyIndex(crimeData, transitData),
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error aggregating safety data:", error)
    throw error
  }
}

// Process NCRB data for historical trends
function processNCRBData(data: any) {
  // Extract relevant data for women's safety in public transport
  // Transform into format suitable for visualization
  return data
}

// Process transit data to identify routes and stations
function processTransitData(data: any) {
  // Extract route information, station details, etc.
  return data
}

// Calculate safety index based on multiple factors
function calculateSafetyIndex(crimeData: any, transitData: any) {
  // Algorithm to determine safety levels based on:
  // - Crime incidents near transit routes
  // - Time of day factors
  // - Transit congestion
  // - Infrastructure factors (lighting, CCTV, etc.)

  // Return normalized safety scores for different areas
  return {
    overall: 0.65, // Example value
    byArea: [
      // Example data structure
      { id: "delhi_central", name: "Central Delhi", score: 0.72 },
      { id: "delhi_south", name: "South Delhi", score: 0.68 },
      // More areas would be included
    ],
    byTimeOfDay: [
      { time: "morning", score: 0.75 },
      { time: "afternoon", score: 0.82 },
      { time: "evening", score: 0.63 },
      { time: "night", score: 0.41 },
    ],
  }
}

// API route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Get parameters from request
  const lat = Number.parseFloat(searchParams.get("lat") || "28.6139") // Default to Delhi coordinates
  const lon = Number.parseFloat(searchParams.get("lon") || "77.2090")
  const radius = Number.parseFloat(searchParams.get("radius") || "10")

  try {
    const safetyData = await aggregateSafetyData(lat, lon, radius)
    return NextResponse.json(safetyData)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch safety data" }, { status: 500 })
  }
}
