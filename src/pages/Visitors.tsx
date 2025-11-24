import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

interface HeatMapPoint {
  lat: number;
  lon: number;
}

function HeatMapLayer({ points }: { points: HeatMapPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heatLayer = (L as any).heatLayer(
      points.map((p) => {
        const zoom = map.getZoom();
        const weight = 5 + (20 - zoom) * 2;
        return [p.lat, p.lon, weight];
      }),
      {
        radius: 35,
        blur: 25,
        max: 4,
        gradient: {
          0.2: "#4a148c",
          0.4: "#7b1fa2",
          0.6: "#b65fcf",
          0.8: "#be93d4",
          1.0: "#e39ff6",
        },
      }
    );

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

function Visitors() {
  const [points, setPoints] = useState<HeatMapPoint[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const res = await fetch(`${apiUrl}/visitor/heatmap`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch visitors");
        const visitors: { ipAddress: string }[] = await res.json();
        const locs = await Promise.all(
          visitors.map(async (v) => {
            try {
              const geo = await fetch(`https://ipwhois.app/json/${v.ipAddress}`).then((r) => r.json());

              if (geo.success) {
                return { lat: geo.latitude, lon: geo.longitude };
              } else {
                console.warn("Geolocation failed for IP:", v.ipAddress, geo.message);
              }
            } catch (err) {
              console.warn("Geolocation request error for IP:", v.ipAddress, err);
            }
            return null;
          })
        );

        setPoints(locs.filter(Boolean) as HeatMapPoint[]);
      } catch (err) {
        console.error("Error loading visitor heatmap:", err);
      }
    }

    fetchVisitors();
  }, [apiUrl]);

  return (
    <Layout title="Visitors">
      <div style={{ width: "100%", height: "80vh" }}>
        <MapContainer
          center={[25, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%", background: "black" }}
          worldCopyJump={false}
          maxBounds={[[-90, -240], [90, 240]]}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution="© CartoDB"
          />
          <TileLayer
            url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png"
            attribution="© CartoDB"
          />
          <HeatMapLayer points={points} />
        </MapContainer>
      </div>
    </Layout>
  );
}

export default Visitors;
