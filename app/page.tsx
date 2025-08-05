"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Zap, Aperture } from "lucide-react" // New icons for futuristic feel

export default function InnovationFestLaunch() {
  const [isLaunching, setIsLaunching] = useState(false)
  const [isLaunched, setIsLaunched] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0) // New state for loading progress
  const [showPoster, setShowPoster] = useState(false)

  const handleLaunch = () => {
    setIsLaunching(true)
    setLoadingProgress(0) // Reset progress
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isLaunching && loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          const newProgress = prevProgress + 1 // Increment by 1%
          if (newProgress >= 100) {
            if (interval) clearInterval(interval)
            setTimeout(() => {
              setIsLaunched(true)
              setTimeout(() => {
                setShowPoster(true)
              }, 500) // Delay before showing poster after 100%
            }, 1000) // Delay after reaching 100% before launching
            return 100
          }
          return newProgress
        })
      }, 30) // Adjust interval for desired speed (e.g., 30ms for 3 seconds to 100%)
    } else if (!isLaunching && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLaunching, loadingProgress])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden font-mono text-foreground">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/placeholder-grid.png')] bg-repeat opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/10 to-transparent"></div>
      </div>

      {!isLaunching && !isLaunched ? (
        // Initial Launch Button Screen
        <Card className="w-full max-w-2xl z-10 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-700">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <h1 className="text-5xl font-extrabold text-primary mb-2 animate-in slide-in-from-top-4 duration-1000">
                INNOVATION FESTIVAL <span className="text-primary">2025</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-in slide-in-from-top-8 duration-1000 delay-200">
                Official Poster Launch
              </p>
              <div className="w-32 h-1 bg-primary mx-auto mb-8 animate-in slide-in-from-left duration-1000 delay-400"></div>
            </div>

            <p className="text-foreground mb-8 text-lg animate-in fade-in-0 duration-1000 delay-600">
              Initiate sequence for the grand unveiling.
            </p>

            <Button
              onClick={handleLaunch}
              size="lg"
              className="relative bg-primary hover:bg-primary/90 text-primary-foreground text-2xl px-16 py-5 rounded-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-1000 delay-800 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative flex items-center gap-2">
                <Zap className="w-6 h-6 group-hover:animate-pulse" />
                Launch
                <Zap className="w-6 h-6 group-hover:animate-pulse" />
              </span>
            </Button>
          </CardContent>
        </Card>
      ) : isLaunching && !isLaunched ? (
        // Launching Animation Screen (Loading Progress)
        <Card className="w-full max-w-2xl z-10 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4 animate-pulse">SYSTEM INITIALIZING...</h1>
              <div className="w-32 h-1 bg-primary mx-auto mb-8 animate-pulse"></div>
            </div>

            <div className="space-y-6">
              <div className="relative flex items-center justify-center h-48 w-48 mx-auto">
                {/* Main Loading Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full border-4 border-primary/50 animate-spin-slow"></div>
                  <div className="absolute w-3/4 h-3/4 rounded-full border-4 border-primary/30 animate-spin-reverse-slow"></div>
                  <div className="absolute w-1/2 h-1/2 rounded-full border-4 border-primary/20 animate-spin-fast"></div>
                  <div className="absolute text-3xl font-extrabold text-primary animate-digital-pulse-small">
                    {loadingProgress}%
                  </div>
                </div>
              </div>

              {/* Loading bar */}
              <div className="w-full bg-muted rounded-full h-4 mx-auto max-w-md shadow-inner relative overflow-hidden">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  <div className="absolute inset-y-0 right-0 w-1 bg-white/50 animate-scanline"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Poster Display Screen
        <div className="w-full max-w-6xl z-10">
          {/* Header with enhanced fade-in animation */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${showPoster ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <h1 className="text-4xl font-extrabold text-primary mb-2 relative">
              INNOVATION FESTIVAL <span className="text-primary">2025</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary animate-[expand_1s_ease-out_forwards] delay-500"></div>
            </h1>
            <div className="w-32 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {/* Poster Display */}
          <Card
            className={`shadow-3xl rounded-2xl bg-card/95 backdrop-blur-xl border border-border transition-all duration-1000 delay-300 hover:scale-[1.02] ${showPoster ? "opacity-100 translate-y-0 animate-materialize" : "opacity-0 translate-y-8"}`}
          >
            <CardContent className="p-8">
              <div className="relative overflow-hidden rounded-xl group">
                <div
                  className={`transition-all duration-1000 delay-500 ${showPoster ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                >
                  <Image
                    src="/official-innovation-festival-poster.jpeg"
                    alt="Official Innovation Festival Poster"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
                    priority
                  />
                </div>

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions (empty as per request) */}
          <div
            className={`text-center mt-8 space-x-4 transition-all duration-1000 delay-700 ${showPoster ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          ></div>

          <div
            className={`text-center mt-6 transition-all duration-1000 delay-900 ${showPoster ? "opacity-100" : "opacity-0"}`}
          ></div>
        </div>
      )}

      <style jsx>{`
        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blob-slow {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob-slow {
          animation: blob-slow 15s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }

        @keyframes digital-pulse {
          0%, 100% { transform: scale(1); text-shadow: 0 0 5px rgba(0,255,255,0.5), 0 0 10px rgba(0,255,255,0.3); }
          50% { transform: scale(1.05); text-shadow: 0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.6); }
        }
        .animate-digital-pulse {
          animation: digital-pulse 1s infinite alternate;
        }

        @keyframes digital-pulse-small {
          0%, 100% { transform: scale(1); text-shadow: 0 0 3px rgba(0,255,255,0.5); }
          50% { transform: scale(1.02); text-shadow: 0 0 6px rgba(0,255,255,0.8); }
        }
        .animate-digital-pulse-small {
          animation: digital-pulse-small 0.8s infinite alternate;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }

        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 7s linear infinite;
        }

        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spin-fast 2s linear infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }

        @keyframes scanline {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scanline {
          animation: scanline 1s infinite linear;
        }

        @keyframes materialize {
          0% {
            opacity: 0;
            transform: scaleY(0.1) translateY(50px);
            filter: blur(20px) brightness(2);
          }
          50% {
            opacity: 0.5;
            filter: blur(10px) brightness(1.5);
          }
          100% {
            opacity: 1;
            transform: scaleY(1) translateY(0);
            filter: blur(0) brightness(1);
          }
        }
        .animate-materialize {
          animation: materialize 1.5s ease-out forwards;
        }

        .shadow-neon-red {
          box-shadow: 0 0 8px rgba(255, 0, 0, 0.7), 0 0 15px rgba(255, 0, 0, 0.4);
        }
        .shadow-neon-red-lg {
          box-shadow: 0 0 12px rgba(255, 0, 0, 0.9), 0 0 25px rgba(255, 0, 0, 0.6);
        }
        .shadow-neon-blue {
          box-shadow: 0 0 8px rgba(0, 255, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.4);
        }
        .shadow-neon-blue-lg {
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.9), 0 0 25px rgba(0, 255, 255, 0.6);
        }
        .shadow-neon-green {
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.7), 0 0 15px rgba(0, 255, 0, 0.4);
        }
        .shadow-inner-dark {
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  )
}
