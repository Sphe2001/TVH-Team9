import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, AlertTriangle, CheckCircle, Clock, MapPin, Camera, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MapView from './MapView';

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
  assignedTo?: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mock incident data
    const mockIncidents: Incident[] = [
      {
        id: '1',
        type: 'theft',
        location: 'Main St & 5th Ave',
        coordinates: [-74.0060, 40.7128],
        timestamp: '2025-01-15T14:30:00Z',
        status: 'investigating',
        priority: 'high',
        source: 'sensor',
        description: 'Stop sign removal detected by sensor network',
        assignedTo: 'Officer Johnson'
      },
      {
        id: '2',
        type: 'vandalism',
        location: 'Park Avenue Traffic Light',
        coordinates: [-74.0070, 40.7138],
        timestamp: '2025-01-15T12:15:00Z',
        status: 'pending',
        priority: 'medium',
        source: 'camera',
        description: 'AI detected graffiti activity on traffic control box'
      },
      {
        id: '3',
        type: 'report',
        location: 'Central Plaza',
        coordinates: [-74.0050, 40.7118],
        timestamp: '2025-01-15T10:45:00Z',
        status: 'resolved',
        priority: 'low',
        source: 'citizen',
        description: 'Citizen reported damaged street sign - repair completed'
      },
      {
        id: '4',
        type: 'damage',
        location: 'Industrial District',
        coordinates: [-74.0080, 40.7148],
        timestamp: '2025-01-15T08:20:00Z',
        status: 'pending',
        priority: 'high',
        source: 'sensor',
        description: 'Multiple sensors offline - possible infrastructure damage'
      }
    ];

    setIncidents(mockIncidents);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredIncidents = incidents.filter(incident => 
    filter === 'all' || incident.status === filter
  );

  const stats = {
    total: incidents.length,
    pending: incidents.filter(i => i.status === 'pending').length,
    investigating: incidents.filter(i => i.status === 'investigating').length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'investigating': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SafeGuard Dashboard</h1>
                <p className="text-sm text-gray-600">{user.name} - {user.role.replace('_', ' ').toUpperCase()}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investigating</p>
                <p className="text-2xl font-bold text-blue-600">{stats.investigating}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map View */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Incident Locations</h2>
            </div>
            <div className="p-6">
              <MapView incidents={filteredIncidents} />
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Incidents</h2>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredIncidents.map((incident) => (
                  <div key={incident.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                          {incident.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                          {incident.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        {incident.source === 'camera' && <Camera className="h-4 w-4" />}
                        {incident.source === 'citizen' && <Users className="h-4 w-4" />}
                        {incident.source === 'sensor' && <Shield className="h-4 w-4" />}
                        <span className="capitalize">{incident.source}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1 capitalize">{incident.type}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{incident.location}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{incident.description}</p>
                    <div className="text-xs text-gray-500">
                      {new Date(incident.timestamp).toLocaleString()}
                      {incident.assignedTo && (
                        <span className="ml-2">• Assigned to: {incident.assignedTo}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;