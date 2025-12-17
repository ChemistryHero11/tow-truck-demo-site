"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

interface MapProps {
  className?: string;
}

export default function GoogleMap({ className = "" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        setMapLoaded(true);
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else if (window.google) {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google) {
      const houstonCenter = { lat: 29.7604, lng: -95.3698 };
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: houstonCenter,
        zoom: 10,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#334155" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#475569" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });

      new window.google.maps.Marker({
        position: houstonCenter,
        map,
        title: "RapidTow HQ",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#f97316",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });

      new window.google.maps.Circle({
        strokeColor: "#f97316",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#f97316",
        fillOpacity: 0.1,
        map,
        center: houstonCenter,
        radius: 80000,
      });
    }
  }, [mapLoaded]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-xl" />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-800 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-safety-orange mx-auto mb-4 animate-bounce" />
            <p className="text-white/60">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function InteractiveMapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const serviceAreas = [
    { name: "Downtown Houston", eta: "15 min" },
    { name: "The Woodlands", eta: "25 min" },
    { name: "Sugar Land", eta: "20 min" },
    { name: "Katy", eta: "30 min" },
    { name: "Pearland", eta: "20 min" },
    { name: "Pasadena", eta: "18 min" },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            Service Coverage
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold mt-4">
            SERVING ALL OF <span className="text-gradient-animated">HOUSTON</span>
          </h2>
          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            50+ mile radius coverage with strategically positioned trucks for rapid response.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-4 h-[400px]">
              <GoogleMap className="w-full h-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-6 h-full">
              <h3 className="font-['Oswald'] text-2xl font-bold mb-6 flex items-center gap-2">
                <Navigation className="w-6 h-6 text-safety-orange" />
                Service Areas
              </h3>
              <ul className="space-y-4">
                {serviceAreas.map((area, i) => (
                  <motion.li
                    key={area.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-safety-orange" />
                      <span>{area.name}</span>
                    </div>
                    <span className="text-safety-orange font-semibold text-sm">
                      ~{area.eta}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-white/50 text-sm text-center">
                * ETAs are approximate and may vary based on traffic
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
