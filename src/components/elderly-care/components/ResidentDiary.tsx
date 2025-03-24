import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, Info } from 'lucide-react';

interface DiaryEntry {
  date: string;
  content: string;
  activities: string[];
  medicallyRelevant?: boolean;
}

interface ResidentDiaryProps {
  diaryEntries: DiaryEntry[];
  residentName: string;
  gender: string;
}

type TimeFrame = 'daily' | 'weekly' | 'monthly';

const ResidentDiary: React.FC<ResidentDiaryProps> = ({ diaryEntries, residentName, gender }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Weekly theme constants
  const weeklyThemes = [
    "Music Week", "Art Appreciation Week", "Cultural Heritage Week", "Nature and Gardening Week"
  ];
  
  // Sort entries by date (most recent first)
  const sortedEntries = [...diaryEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get pronoun based on gender
  const pronoun = gender === 'male' ? 'he' : 'she';
  const possessivePronoun = gender === 'male' ? 'His' : 'Her';
  const capitalPronoun = gender === 'male' ? 'He' : 'She';

  // Filter entries based on the current timeframe and date
  const getFilteredEntries = () => {
    if (timeFrame === 'daily') {
      const dateStr = currentDate.toISOString().split('T')[0];
      return sortedEntries.filter(entry => entry.date === dateStr);
    } else if (timeFrame === 'weekly') {
      // Get start and end of current week
      const startOfWeek = new Date(currentDate);
      // Get the first day of the week (Sunday)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
      endOfWeek.setHours(23, 59, 59, 999);
      
      // Format for comparison
      const startStr = startOfWeek.toISOString().split('T')[0];
      const endStr = endOfWeek.toISOString().split('T')[0];
      
      return sortedEntries.filter(entry => {
        // Compare as strings to ignore time portion
        return entry.date >= startStr && entry.date <= endStr;
      });
    } else { // monthly
      // Get entries for the current month
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      return sortedEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === month && 
               entryDate.getFullYear() === year;
      });
    }
  };
  
  const filteredEntries = getFilteredEntries();

  // Navigation functions
  const navigateBackward = () => {
    const newDate = new Date(currentDate);
    if (timeFrame === 'daily') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (timeFrame === 'weekly') {
      newDate.setDate(newDate.getDate() - 7);
    } else { // monthly
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateForward = () => {
    const newDate = new Date(currentDate);
    if (timeFrame === 'daily') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (timeFrame === 'weekly') {
      newDate.setDate(newDate.getDate() + 7);
    } else { // monthly
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Format date range for header
  const getDateRangeText = () => {
    if (timeFrame === 'daily') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (timeFrame === 'weekly') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else { // monthly
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };
  
  // Generate summary for weekly or monthly view
  const generateSummary = (entries: DiaryEntry[]) => {
    if (entries.length === 0) {
      return `No activities recorded for ${residentName} during this period.`;
    }
    
    // Count common activities
    const activityCount: Record<string, number> = {};
    let medicalCount = 0;
    
    entries.forEach(entry => {
      entry.activities.forEach(activity => {
        // Extract the first part of each activity (before the period) to count similar activities
        const mainActivity = activity.split('.')[0].trim();
        activityCount[mainActivity] = (activityCount[mainActivity] || 0) + 1;
      });
      if (entry.medicallyRelevant) {
        medicalCount++;
      }
    });
    
    // Sort activities by frequency
    const sortedActivities = Object.entries(activityCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5);
    
    // Create summary
    let summary = '';
    
    // Check for themed weeks (look for patterns in the activities)
    let detectedTheme = '';
    weeklyThemes.forEach(theme => {
      const themeWords = theme.toLowerCase().replace(" week", "").split(" ");
      // Check if multiple activities contain the theme words
      const matchingActivities = entries.filter(entry => 
        entry.activities.some(activity => 
          themeWords.some(word => 
            activity.toLowerCase().includes(word)
          )
        )
      );
      
      if (matchingActivities.length >= 2) {
        detectedTheme = theme;
      }
    });
    
    if (timeFrame === 'weekly') {
      // If we detected a themed week, mention it
      if (detectedTheme) {
        summary = `This was ${detectedTheme} for ${residentName}. ${pronoun} participated in several themed activities including `;
        
        // Find specific theme activities
        const themeActivities = [];
        entries.forEach(entry => {
          entry.activities.forEach(activity => {
            const themeLower = detectedTheme.toLowerCase().replace(" week", "");
            if (activity.toLowerCase().includes(themeLower)) {
              const shortDesc = activity.split('.')[0].trim();
              if (!themeActivities.includes(shortDesc)) {
                themeActivities.push(shortDesc);
              }
            }
          });
        });
        
        if (themeActivities.length > 0) {
          summary += themeActivities.slice(0, 2).join(' and ') + '. ';
        } else {
          summary += 'various creative expressions. ';
        }
      } else {
        summary = `This week, ${residentName} ${sortedActivities.length > 0 ? 
          `most frequently ${sortedActivities[0][0].toLowerCase()}` : 
          'had various activities'}. `;
      }
      
      if (sortedActivities.length > 1) {
        summary += `${possessivePronoun} week also included ${sortedActivities[1][0].toLowerCase()} and ${sortedActivities.length > 2 ? sortedActivities[2][0].toLowerCase() : 'other activities'}. `;
      }
      
      const daysActive = new Set(entries.map(entry => entry.date)).size;
      summary += `${capitalPronoun} was active on ${daysActive} days this week. `;
      
      if (medicalCount > 0) {
        summary += `There were ${medicalCount} medically relevant observations noted during the week.`;
      } else {
        summary += `${pronoun} had a week with no medically relevant concerns.`;
      }
    } else { // monthly
      // For monthly view, look for multiple themes
      const monthThemes = weeklyThemes.filter(theme => {
        const themeWords = theme.toLowerCase().replace(" week", "").split(" ");
        const matchingActivities = entries.filter(entry => 
          entry.activities.some(activity => 
            themeWords.some(word => activity.toLowerCase().includes(word))
          )
        );
        return matchingActivities.length >= 3;
      });
      
      if (monthThemes.length > 0) {
        summary = `In ${currentDate.toLocaleDateString('en-US', { month: 'long' })}, ${residentName} participated in `;
        if (monthThemes.length === 1) {
          summary += `${monthThemes[0]} activities and also `;
        } else if (monthThemes.length > 1) {
          summary += `both ${monthThemes.slice(0, 2).join(' and ')} activities, as well as `;
        }
        
        if (sortedActivities.length > 0) {
          summary += `frequently ${sortedActivities[0][0].toLowerCase()}. `;
        } else {
          summary += `various regular activities. `;
        }
      } else {
        summary = `In ${currentDate.toLocaleDateString('en-US', { month: 'long' })}, ${residentName} ${sortedActivities.length > 0 ? 
          `most frequently ${sortedActivities[0][0].toLowerCase()}` : 
          'participated in various activities'}. `;
      }
      
      if (sortedActivities.length > 1) {
        summary += `Other recurring activities included ${sortedActivities.slice(1, 3).map(a => a[0].toLowerCase()).join(' and ')}. `;
      }
      
      const daysActive = new Set(entries.map(entry => entry.date)).size;
      summary += `${capitalPronoun} participated in activities on ${daysActive} different days this month. `;
      
      if (medicalCount > 0) {
        summary += `There were ${medicalCount} medically relevant observations throughout the month.`;
      } else {
        summary += `${pronoun} had a month with no medically relevant concerns.`;
      }
    }
    
    return summary;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
            {residentName}'s Diary
          </h3>
          
          {/* Timeframe selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTimeFrame('daily')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeFrame === 'daily' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFrame('weekly')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeFrame === 'weekly' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFrame('monthly')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeFrame === 'monthly' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        
        {/* Date navigation */}
        <div className="flex justify-between items-center text-gray-700">
          <button 
            onClick={navigateBackward}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">{getDateRangeText()}</span>
          </div>
          
          <button 
            onClick={navigateForward}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {timeFrame === 'daily' ? (
          <>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <div key={entry.date} className="mb-4">
                  {/* Check if this entry might be part of a themed week */}
                  {weeklyThemes.some(theme => 
                    entry.activities.some(activity => 
                      theme.toLowerCase().includes(activity.toLowerCase().split('.')[0].trim())
                    )
                  ) && (
                    <div className="mb-2 text-indigo-600 font-medium text-sm flex items-center">
                      <span className="bg-indigo-100 px-2 py-1 rounded">
                        Part of themed activities this week
                      </span>
                    </div>
                  )}
                  <div className="text-gray-700 leading-relaxed">
                    {entry.content}
                  </div>
                  {entry.medicallyRelevant && (
                    <div className="mt-2 flex items-start text-sm">
                      <div className="flex-shrink-0 mt-0.5">
                        <Info className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="ml-2 text-amber-700 bg-amber-50 rounded-md px-2 py-1 text-xs">
                        Contains medically relevant information
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic text-center py-8">
                No diary entry available for this day
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg text-gray-700">
              {generateSummary(filteredEntries)}
            </div>
            
            {/* List of entries for the period with dates */}
            <div className="divide-y divide-gray-200">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(entry => (
                  <div key={entry.date} className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-medium px-2 py-1 rounded text-xs">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="ml-3 text-gray-700 text-sm flex-1">
                        {entry.content}
                        {entry.medicallyRelevant && (
                          <div className="mt-1 flex items-center text-xs">
                            <Info className="h-3 w-3 text-amber-500 mr-1" />
                            <span className="text-amber-700">Medical note</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic text-center py-8">
                  No entries available for this period
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidentDiary; 