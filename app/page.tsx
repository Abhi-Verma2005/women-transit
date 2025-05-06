import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { SafetyMap } from "@/components/safety-map"
import { SystemsThinking } from "@/components/systems-thinking"
import { ActionSection } from "@/components/action-section"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Info, TrendingUp, Users } from "lucide-react"

export default function Home() {
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
                href="#trends"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Data Trends
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
              <Button size="sm" className="hidden md:flex">
                Report Incident
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-6 md:py-12">
          {/* Hero Section */}
          <section className="py-12 md:py-16 lg:py-22">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
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
                  <Button size="lg">Explore the Data</Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
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
                <SafetyMap />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Safety index based on CrimeoMeter API data, Open Transit Data, and NCRB statistics.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Stats Section */}
          <section className="py-8 md:py-12">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                  <h3 className="text-sm font-medium">Reported Incidents</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">2,347</p>
                <p className="text-xs text-muted-foreground">Last 30 days • Source: CrimeoMeter API</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                  <h3 className="text-sm font-medium">Avg. Response Time</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">27 min</p>
                <p className="text-xs text-muted-foreground">Emergency services • Source: API Setu</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-sky-500" />
                  <h3 className="text-sm font-medium">CCTV Coverage</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">43%</p>
                <p className="text-xs text-muted-foreground">Of transit routes • Source: Transport for India API</p>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-sm font-medium">Community Reports</h3>
                </div>
                <p className="mt-2 text-2xl font-bold">5,129</p>
                <p className="text-xs text-muted-foreground">Citizen contributions • Source: Open Data Platform</p>
              </div>
            </div>
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
