import React from 'react';
import { MapPin, AlertTriangle, Shield, Camera } from 'lucide-react';

interface Incident {
  id: string;
  type: 'theft' | 'vandalism' | 'damage' | 'report';
  location: string;
  coordinates: [number, number];
  timestamp: string;
  status: 'pending' | 'investigating' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  source: 'sensor' | 'camera' | 'citizen';
  description: string;
}

interface MapViewProps {
  incidents: Incident[];
}

const MapView: React.FC<MapViewProps> = ({ incidents }) => {
  const getIncidentIcon = (incident: Incident) => {
    switch (incident.source) {
      case 'camera':
        return <Camera className="h-4 w-4" />;
      case 'sensor':
        return <Shield className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="relative">
      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-80 relative overflow-hidden">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-400"></div>
            ))}
          </div>
        </div>

        {/* Map Title */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">City Infrastructure Map</span>
          </div>
        </div>

        {/* Incident Markers */}
        {incidents.map((incident, index) => (
          <div
            key={incident.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getPriorityColor(incident.priority)} rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform`}
            style={{
              left: `${20 + (index % 4) * 20}%`,
              top: `${25 + Math.floor(index / 4) * 25}%`,
            }}
            title={`${incident.location} - ${incident.description}`}
          >
            {getIncidentIcon(incident)}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-sm">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Priority Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Low</span>
            </div>
          </div>
        </div>

        {/* Integration Note */}
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-sm">
          <span className="text-xs font-medium">Real-time GPS Integration</span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {incidents.length} incident{incidents.length !== 1 ? 's' : ''} on map
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
            Refresh
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-colors">
            Full Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapView;