import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, X, Check, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { facilities } from '../mockData';

// Define the resident structure
interface Resident {
  id: string;
  name: string;
  dateOfBirth: string;
  room: string;
  gender: string;
  status: 'stable' | 'attention' | 'critical';
  lastChecked: string;
  keywordFrequency?: {
    pain: number;
    tired: number;
    dizzy: number;
  };
  alerts: number;
  healthScore?: number;
  historicalHealthScores?: number[];
  facilityId: string; // Added facility ID field
}

interface ResidentManagementProps {
  residents: any[]; // Accept any type of resident because we need to convert
  onUpdateResidents: (residents: Resident[]) => void;
}

const ResidentManagement: React.FC<ResidentManagementProps> = ({ 
  residents: initialResidents,
  onUpdateResidents
}) => {
  const [residents, setResidents] = useState<Resident[]>(() => {
    // Convert any age to dateOfBirth if needed
    return initialResidents.map((resident, index) => {
      // Create a new object with required fields
      const newResident: Resident = {
        id: resident.id,
        name: resident.name,
        dateOfBirth: '',
        room: resident.room,
        gender: resident.gender || 'female',
        status: resident.status,
        lastChecked: resident.lastChecked,
        alerts: resident.alerts,
        // Distribute residents across facilities using modulo
        facilityId: facilities[index % facilities.length].name,
        keywordFrequency: resident.keywordFrequency,
        healthScore: resident.healthScore,
        historicalHealthScores: resident.historicalHealthScores
      };
      
      // Convert age to dateOfBirth if needed
      if ('age' in resident) {
        const today = new Date();
        const birthYear = today.getFullYear() - resident.age;
        newResident.dateOfBirth = `${birthYear}-01-01`; // Default to January 1st
      }
      
      return newResident;
    });
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedFacilities, setExpandedFacilities] = useState<Record<string, boolean>>(
    facilities.reduce((acc, facility) => ({ ...acc, [facility.name]: true }), {})
  );
  
  const [newResident, setNewResident] = useState<Partial<Resident>>({
    name: '',
    dateOfBirth: '',
    room: '',
    gender: 'female',
    status: 'stable',
    lastChecked: 'Just now',
    alerts: 0,
    facilityId: facilities[0].name,
    keywordFrequency: {
      pain: 0,
      tired: 0,
      dizzy: 0
    }
  });

  // Update parent component when residents change
  useEffect(() => {
    onUpdateResidents(residents);
  }, [residents, onUpdateResidents]);

  const filteredResidents = residents.filter(resident => 
    (resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.facilityId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group residents by facility
  const residentsByFacility = filteredResidents.reduce<Record<string, Resident[]>>((acc, resident) => {
    const facilityId = resident.facilityId;
    if (!acc[facilityId]) {
      acc[facilityId] = [];
    }
    acc[facilityId].push(resident);
    return acc;
  }, {});

  const toggleFacility = (facilityId: string) => {
    setExpandedFacilities(prev => ({
      ...prev,
      [facilityId]: !prev[facilityId]
    }));
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleAddResident = () => {
    const id = `P${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
    
    // Generate mock historical health scores
    const historicalHealthScores = Array.from({ length: 6 }, (_, i) => {
      // Base score with some random variation
      const baseScore = 75 - Math.floor(Math.random() * 10);
      // Trend upward slightly for each step
      return baseScore + i;
    });
    
    const residentToAdd: Resident = {
      id,
      name: newResident.name || '',
      dateOfBirth: newResident.dateOfBirth || '',
      room: newResident.room || '',
      gender: newResident.gender || 'female',
      status: newResident.status || 'stable',
      lastChecked: 'Just now',
      alerts: 0,
      facilityId: newResident.facilityId || facilities[0].name,
      keywordFrequency: {
        pain: 0,
        tired: 0,
        dizzy: 0
      },
      historicalHealthScores
    };
    
    setResidents([...residents, residentToAdd]);
    setNewResident({
      name: '',
      dateOfBirth: '',
      room: '',
      gender: 'female',
      status: 'stable',
      facilityId: facilities[0].name
    });
    setShowAddForm(false);
  };

  const handleRemoveResident = (id: string) => {
    if (window.confirm('Are you sure you want to remove this resident?')) {
      setResidents(residents.filter(resident => resident.id !== id));
    }
  };

  const handleEditResident = (resident: Resident) => {
    setEditingResident(resident);
  };

  const handleSaveEdit = () => {
    if (editingResident) {
      setResidents(residents.map(r => 
        r.id === editingResident.id ? editingResident : r
      ));
      setEditingResident(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingResident(null);
  };

  const formatDateOfBirth = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Resident Management</h2>
          <button
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => setShowAddForm(true)}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Resident
          </button>
        </div>

        {/* Search Box */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search residents by name, room, or facility"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add Resident Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Resident</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowAddForm(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newResident.name}
                  onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newResident.dateOfBirth}
                  onChange={(e) => setNewResident({...newResident, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newResident.room}
                  onChange={(e) => setNewResident({...newResident, room: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newResident.gender}
                  onChange={(e) => setNewResident({...newResident, gender: e.target.value})}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newResident.facilityId}
                  onChange={(e) => setNewResident({...newResident, facilityId: e.target.value})}
                >
                  {facilities.map(facility => (
                    <option key={facility.name} value={facility.name}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newResident.status}
                  onChange={(e) => setNewResident({...newResident, status: e.target.value as 'stable' | 'attention' | 'critical'})}
                >
                  <option value="stable">Stable</option>
                  <option value="attention">Needs Attention</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 hover:bg-gray-300"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={handleAddResident}
                disabled={!newResident.name || !newResident.room || !newResident.dateOfBirth}
              >
                Add Resident
              </button>
            </div>
          </div>
        )}

        {/* Residents By Facility */}
        <div className="space-y-4">
          {Object.keys(residentsByFacility).length > 0 ? (
            Object.entries(residentsByFacility).map(([facilityId, facilityResidents]) => (
              <div key={facilityId} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="bg-gray-50 px-6 py-3 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFacility(facilityId)}
                >
                  <h3 className="text-md font-medium text-gray-900">
                    {facilityId} ({facilityResidents.length} residents)
                  </h3>
                  <button className="text-gray-500">
                    {expandedFacilities[facilityId] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                
                {expandedFacilities[facilityId] && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {facilityResidents.map(resident => (
                          <tr key={resident.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingResident?.id === resident.id ? (
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                  value={editingResident.name}
                                  onChange={(e) => setEditingResident({...editingResident, name: e.target.value})}
                                />
                              ) : (
                                <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingResident?.id === resident.id ? (
                                <input
                                  type="date"
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                  value={editingResident.dateOfBirth}
                                  onChange={(e) => setEditingResident({...editingResident, dateOfBirth: e.target.value})}
                                />
                              ) : (
                                <div className="text-sm text-gray-500">
                                  {formatDateOfBirth(resident.dateOfBirth)}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {calculateAge(resident.dateOfBirth)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingResident?.id === resident.id ? (
                                <input
                                  type="text"
                                  className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                                  value={editingResident.room}
                                  onChange={(e) => setEditingResident({...editingResident, room: e.target.value})}
                                />
                              ) : (
                                <div className="text-sm text-gray-500">{resident.room}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingResident?.id === resident.id ? (
                                <select
                                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                  value={editingResident.gender}
                                  onChange={(e) => setEditingResident({...editingResident, gender: e.target.value})}
                                >
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              ) : (
                                <div className="text-sm text-gray-500 capitalize">{resident.gender}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${
                                resident.status === 'stable' ? 'text-green-600' : 
                                resident.status === 'attention' ? 'text-yellow-600' : 
                                'text-red-600'
                              } capitalize`}>
                                {resident.status}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {editingResident?.id === resident.id ? (
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={handleSaveEdit}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <Check className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={handleCancelEdit}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => handleEditResident(resident)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    <Pencil className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={() => handleRemoveResident(resident.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No residents found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentManagement; 