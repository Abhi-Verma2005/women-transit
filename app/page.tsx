'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { SafetyDataComponent } from "@/components/safety-map"
import { SystemsThinking } from "@/components/systems-thinking"
import { ActionSection } from "@/components/action-section"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Info, TrendingUp, Users } from "lucide-react"

// Define data types
type PageData = {
  stats: {
    reportedIncidents: number
    responseTime: number
    cctvCoverage: number
    communityReports: number
  }
  lastUpdated: string
}

export default function Home() {
  const [pageData, setPageData] = useState<PageData>({
    stats: {
      reportedIncidents: 2347,
      responseTime: 27,
      cctvCoverage: 43,
      communityReports: 5129
    },
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background font-sans">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              <span>SafeTransit India</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/" className="font-medium transition-colors hover:text-foreground/80">
                Home
              </Link>
              <Link
                href="#systems"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Systems View
              </Link>
              <Link
                href="#action"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Take Action
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="container py-6 md:py-12">
          {/* Hero Section - Better Layout with Woman Beside Heading */}
          <section className="py-12 md:py-16 lg:py-20">
            {/* Heading and Woman Side by Side on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-12">
              {/* Heading Section - Now on Left */}
              <div className="space-y-4 md:col-span-7">
                <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
                  Real-time Safety Data
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Making Women's Safety in Public Transport Visible
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Using data and systems thinking to understand, visualize, and address the complex issue of women's
                  safety in India's public transportation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="#systems">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Woman Image - Now on Right */}
              <div className="flex justify-center md:justify-end md:col-span-5">
                <div className="w-full max-w-md md:max-w-full">
                  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    {/* Background thought bubble */}
                    <path d="M320,40 C350,40 370,60 370,90 C370,110 355,125 335,130 C335,135 340,145 350,150 C335,150 325,140 320,130 C290,130 270,110 270,90 C270,60 290,40 320,40" 
                          fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
                    
                    {/* Question mark */}
                    <text x="320" y="105" fontSize="50" textAnchor="middle" fill="#9ca3af">?</text>
                    
                    {/* Woman figure */}
                    <ellipse cx="150" cy="270" rx="70" ry="10" fill="#f3f4f6" opacity="0.5" />
                    
                    {/* Body */}
                    <path d="M150,250 L150,120 C150,100 130,90 130,70 C130,40 140,20 150,20 C160,20 170,40 170,70 C170,90 150,100 150,120" 
                          fill="#f43f5e" opacity="0.8" />
                    
                    {/* Head */}
                    <circle cx="150" cy="50" r="30" fill="#f8fafc" />
                    
                    {/* Face details */}
                    <ellipse cx="140" cy="45" rx="3" ry="4" fill="#0f172a" />
                    <ellipse cx="160" cy="45" rx="3" ry="4" fill="#0f172a" />
                    <path d="M140,65 Q150,75 160,65" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    
                    {/* Hair */}
                    <path d="M120,50 C110,30 120,10 150,10 C180,10 190,30 180,50 C180,30 120,30 120,50" fill="#0f172a" />
                    
                    {/* Arms */}
                    <path d="M150,130 C180,140 200,120 210,140" fill="none" stroke="#f43f5e" strokeWidth="10" strokeLinecap="round" />
                    <path d="M150,130 C120,140 100,120 90,140" fill="none" stroke="#f43f5e" strokeWidth="10" strokeLinecap="round" />
                    
                    {/* Multiple thought paths connecting to main thought bubble */}
                    <path d="M180,70 Q230,40 270,90" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5,5" />
                    <circle cx="190" cy="65" r="3" fill="#d1d5db" />
                    <circle cx="210" cy="55" r="4" fill="#d1d5db" />
                    <circle cx="235" cy="50" r="3" fill="#d1d5db" />
                  </svg>
                </div>
              </div>
            </div>
              
            {/* Safety Index Component - Below both heading and woman */}
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Real-time Safety Index</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  Live Data
                </div>
              </div>
              <SafetyDataComponent />
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Safety index based on CrimeoMeter API data, Open Transit Data, and NCRB statistics.</p>
              </div>
            </div>
          </section>

          {/* Key Stats Section */}
          <section className="py-8 md:py-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                  <h3 className="text-sm font-medium">Reported Incidents</h3>
                </div>
                {loading ? (
                  <p className="mt-2 text-2xl font-bold animate-pulse">Loading...</p>
                ) : (
                  <p className="mt-2 text-2xl font-bold">{pageData?.stats.reportedIncidents.toLocaleString()}</p>
                )}
                <p className="text-xs text-muted-foreground">Last 30 days • Source: CrimeoMeter API</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                  <h3 className="text-sm font-medium">Avg. Response Time</h3>
                </div>
                {loading ? (
                  <p className="mt-2 text-2xl font-bold animate-pulse">Loading...</p>
                ) : (
                  <p className="mt-2 text-2xl font-bold">{pageData?.stats.responseTime} min</p>
                )}
                <p className="text-xs text-muted-foreground">Emergency services • Source: API Setu</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-sky-500" />
                  <h3 className="text-sm font-medium">CCTV Coverage</h3>
                </div>
                {loading ? (
                  <p className="mt-2 text-2xl font-bold animate-pulse">Loading...</p>
                ) : (
                  <p className="mt-2 text-2xl font-bold">{pageData?.stats.cctvCoverage}%</p>
                )}
                <p className="text-xs text-muted-foreground">Of transit routes • Source: Transport for India API</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-sm font-medium">Community Reports</h3>
                </div>
                {loading ? (
                  <p className="mt-2 text-2xl font-bold animate-pulse">Loading...</p>
                ) : (
                  <p className="mt-2 text-2xl font-bold">{pageData?.stats.communityReports.toLocaleString()}</p>
                )}
                <p className="text-xs text-muted-foreground">Citizen contributions • Source: Open Data Platform</p>
              </div>
            </div>
            {!loading && pageData && (
              <div className="mt-2 text-xs text-center text-muted-foreground">
                Last updated: {new Date(pageData.lastUpdated).toLocaleString()}
              </div>
            )}
          </section>

          {/* Systems Thinking Section */}
          <section id="systems" className="py-12 md:py-16">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Understanding the System</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Women's safety issues emerge from interconnected system elements. Explore how these factors influence
                each other.
              </p>
            </div>
            <div className="mt-8">
              <SystemsThinking />
            </div>
          </section>

          {/* Action Section */}
          <section id="action" className="py-12 md:py-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">What You Can Do</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Small actions can create significant change. Find leverage points where your actions matter most.
              </p>
            </div>
            <div className="mt-8">
              <ActionSection />
            </div>
          </section>
        </main>

        <footer className="border-t bg-muted/40">
          <div className="container py-8 md:py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold">SafeTransit India</h3>
                <p className="text-sm text-muted-foreground">
                  A data-driven initiative to improve women's safety in public transportation through systems thinking
                  and community action.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Data Sources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      CrimeoMeter API
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Open Transit Data
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      NCRB Data
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      API Setu
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Partners</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Government Agencies
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      NGOs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Research Institutions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Corporate Sponsors
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Newsletter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Social Media
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      Volunteer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>© 2024 SafeTransit India. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}