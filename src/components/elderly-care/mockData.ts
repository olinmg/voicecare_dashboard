// Mock data for the elderly care dashboard

// Facility data
export const facilities = [
  {
    name: "Sunrise Senior Living",
    location: "San Francisco, CA",
    metrics: {
      occupancyRate: 85,
      patientCount: 120,
      alertCount: 3,
      patientSatisfaction: 92,
      staffEfficiency: 88,
      checkInSuccessRate: 95,
      medicationAdherence: 90,
      avgMoodScore: 7.8,
      responseLatency: 12,
      alertResolutionRate: 100,
      stressDetection: 2.3,
      conversationCoherence: 88,
      engagementDuration: 96
    }
  },
  {
    name: "Golden Years Care",
    location: "Los Angeles, CA",
    metrics: {
      occupancyRate: 78,
      patientCount: 95,
      alertCount: 10,
      patientSatisfaction: 75,
      staffEfficiency: 72,
      checkInSuccessRate: 82,
      medicationAdherence: 75,
      avgMoodScore: 5.9,
      responseLatency: 23,
      alertResolutionRate: 65,
      stressDetection: 5.8,
      conversationCoherence: 66,
      engagementDuration: 73
    }
  },
  {
    name: "Evergreen Retirement",
    location: "Seattle, WA",
    metrics: {
      occupancyRate: 92,
      patientCount: 150,
      alertCount: 2,
      patientSatisfaction: 95,
      staffEfficiency: 90,
      checkInSuccessRate: 97,
      medicationAdherence: 94,
      avgMoodScore: 8.1,
      responseLatency: 11,
      alertResolutionRate: 98,
      stressDetection: 1.9,
      conversationCoherence: 92,
      engagementDuration: 98
    }
  },
  {
    name: "Silver Horizons",
    location: "Denver, CO",
    metrics: {
      occupancyRate: 81,
      patientCount: 110,
      alertCount: 7,
      patientSatisfaction: 84,
      staffEfficiency: 82,
      checkInSuccessRate: 90,
      medicationAdherence: 82,
      avgMoodScore: 6.8,
      responseLatency: 18,
      alertResolutionRate: 85,
      stressDetection: 3.7,
      conversationCoherence: 79,
      engagementDuration: 87
    }
  }
];

// Manager dashboard metrics
export const managerMetrics = {
  totalResidents: 475,
  occupancyRate: 85,
  activeAlerts: 22,
  medicationAdherence: 87,
  avgMoodScore: 7.2,
  checkInSuccessRate: 92,
  alertResolutionRate: 89,
  stressDetection: 3.2,
  conversationCoherence: 84,
  // Weekly trends for medication adherence (grouped by month)
  medicationAdherenceTrend: [
    { date: "Jan W1", value: 82.5 },
    { date: "Jan W2", value: 83.8 },
    { date: "Jan W3", value: 84.7 },
    { date: "Jan W4", value: 85.9 },
    { date: "Feb W1", value: 86.3 },
    { date: "Feb W2", value: 86.0 },
    { date: "Feb W3", value: 85.5 },
    { date: "Feb W4", value: 87.0 }
  ],
  // Weekly trends for mood score
  moodScoreTrend: [
    { date: "Week 1", value: 6.7 },
    { date: "Week 2", value: 6.8 },
    { date: "Week 3", value: 7.0 },
    { date: "Week 4", value: 7.1 },
    { date: "Week 5", value: 7.2 },
    { date: "Week 6", value: 7.0 },
    { date: "Week 7", value: 7.3 },
    { date: "Week 8", value: 7.2 }
  ],
  // Weekly trends for check-in success
  checkInRateTrend: [
    { date: "Week 1", value: 87.3 },
    { date: "Week 2", value: 88.9 },
    { date: "Week 3", value: 90.1 },
    { date: "Week 4", value: 91.2 },
    { date: "Week 5", value: 91.7 },
    { date: "Week 6", value: 90.8 },
    { date: "Week 7", value: 91.5 },
    { date: "Week 8", value: 92.0 }
  ],
  // Facility comparison showing distinct patterns for each facility - WEEKLY data grouped by month
  facilityComparisonTrend: {
    weeks: ["Jan W1", "Jan W2", "Jan W3", "Jan W4", "Feb W1", "Feb W2", "Feb W3", "Feb W4"],
    facilities: [
      {
        name: "Sunrise Senior Living",
        // Stable with slight variations at a high level
        moodSeries: [7.6, 7.8, 7.7, 7.9, 7.7, 7.8, 7.9, 7.8],
        medicationSeries: [95, 96, 94, 95, 97, 96, 95, 97],
        lonelinessSeries: [3.2, 3.1, 3.0, 2.9, 3.0, 2.8, 2.7, 2.6]
      },
      {
        name: "Golden Years Care",
        // Declining mood but INCREASING medication adherence - inverse relationship
        moodSeries: [6.8, 6.5, 6.1, 5.8, 5.5, 5.2, 4.9, 4.5],
        medicationSeries: [75, 78, 83, 86, 89, 92, 95, 98],
        lonelinessSeries: [4.5, 5.2, 5.8, 6.3, 6.9, 7.4, 7.8, 8.3]
      },
      {
        name: "Evergreen Retirement",
        // Strong improvement from medium to excellent
        moodSeries: [7.5, 7.6, 7.7, 7.9, 8.0, 8.1, 8.2, 8.3],
        medicationSeries: [82, 85, 87, 90, 92, 94, 97, 98],
        lonelinessSeries: [4.1, 3.9, 3.7, 3.4, 3.1, 2.8, 2.5, 2.2]
      },
      {
        name: "Silver Horizons",
        // Initial decline, then recovery efforts - roller coaster pattern
        moodSeries: [6.7, 6.5, 6.2, 6.3, 6.4, 6.6, 6.8, 6.9],
        medicationSeries: [88, 82, 75, 70, 72, 78, 85, 89],
        lonelinessSeries: [3.8, 4.2, 5.0, 5.5, 5.2, 4.8, 4.3, 3.9]
      }
    ]
  },
  // Cognitive function trend with variance data
  cognitiveScoreTrend: [
    { date: "Week 1", value: 81.2, upperBound: 84.5, lowerBound: 78.0 },
    { date: "Week 2", value: 81.5, upperBound: 84.7, lowerBound: 78.2 },
    { date: "Week 3", value: 81.0, upperBound: 84.3, lowerBound: 77.8 },
    { date: "Week 4", value: 81.3, upperBound: 84.6, lowerBound: 78.1 },
    { date: "Week 5", value: 80.9, upperBound: 84.1, lowerBound: 77.7 },
    { date: "Week 6", value: 81.6, upperBound: 84.8, lowerBound: 78.3 },
    { date: "Week 7", value: 81.2, upperBound: 84.5, lowerBound: 78.0 },
    { date: "Week 8", value: 81.4, upperBound: 84.6, lowerBound: 78.2 }
  ],
  // Stress detection trend (lower is better) - weekly
  stressDetectionTrend: [
    { date: "Week 1", value: 4.1, upperBound: 5.6, lowerBound: 2.5 },
    { date: "Week 2", value: 3.9, upperBound: 5.3, lowerBound: 2.4 },
    { date: "Week 3", value: 3.7, upperBound: 5.1, lowerBound: 2.3 },
    { date: "Week 4", value: 3.5, upperBound: 4.9, lowerBound: 2.1 },
    { date: "Week 5", value: 3.3, upperBound: 4.6, lowerBound: 2.0 },
    { date: "Week 6", value: 3.2, upperBound: 4.5, lowerBound: 1.9 },
    { date: "Week 7", value: 3.1, upperBound: 4.4, lowerBound: 1.8 },
    { date: "Week 8", value: 3.0, upperBound: 4.3, lowerBound: 1.7 }
  ],
  // Alert distribution by category
  alertDistribution: [
    { category: "Medication", count: 9 },
    { category: "Falls", count: 3 },
    { category: "Mood Issues", count: 6 },
    { category: "Social Isolation", count: 4 }
  ],
  // Alert trend over time (weekly)
  alertTrend: [
    { date: "Week 1", value: 18 },
    { date: "Week 2", value: 20 },
    { date: "Week 3", value: 23 },
    { date: "Week 4", value: 19 },
    { date: "Week 5", value: 21 },
    { date: "Week 6", value: 24 },
    { date: "Week 7", value: 20 },
    { date: "Week 8", value: 22 }
  ],
  // Response latency trend (weekly)
  responseLatencyTrend: [
    { date: "Week 1", value: 17.5 },
    { date: "Week 2", value: 16.8 },
    { date: "Week 3", value: 16.2 },
    { date: "Week 4", value: 15.5 },
    { date: "Week 5", value: 14.9 },
    { date: "Week 6", value: 15.1 },
    { date: "Week 7", value: 14.7 },
    { date: "Week 8", value: 14.3 }
  ],
  // Replacing wellBeingMetrics to remove healthScoreGain
  wellBeingMetrics: {
    moodImprovement: 14,
    stressReduction: 21,
    socialEngagementIncrease: 17
  }
};

// Caretaker dashboard metrics
export const caretakerMetrics = {
  assignedResidents: 12,
  tasksCompleted: 28,
  activeAlerts: 2,
  medicationAdherence: 91,
  avgMoodScore: 7.4,
  stressDetection: 2.8,
  conversationCoherence: 86,
  patientImprovementRate: 15,
  // Daily trends
  tasksTrend: [
    { date: "Mon", value: 25 },
    { date: "Tue", value: 28 },
    { date: "Wed", value: 30 },
    { date: "Thu", value: 27 },
    { date: "Fri", value: 28 },
    { date: "Sat", value: 26 },
    { date: "Sun", value: 28 }
  ],
  // Medication adherence trend showing good compliance
  medicationAdherenceTrend: [
    { date: "Mon", value: 90.3 },
    { date: "Tue", value: 91.8 },
    { date: "Wed", value: 91.2 },
    { date: "Thu", value: 90.5 },
    { date: "Fri", value: 90.9 },
    { date: "Sat", value: 89.7 },
    { date: "Sun", value: 91.5 }
  ],
  // Mood score trend showing weekend boost
  moodScoreTrend: [
    { date: "Mon", value: 7.1 },
    { date: "Tue", value: 7.3 },
    { date: "Wed", value: 7.2 },
    { date: "Thu", value: 7.3 },
    { date: "Fri", value: 7.4 },
    { date: "Sat", value: 7.8 },
    { date: "Sun", value: 7.9 }
  ],
  // Resident improvement trend showing progress
  patientImprovementTrend: [
    { date: "Mon", value: 12 },
    { date: "Tue", value: 13 },
    { date: "Wed", value: 13 },
    { date: "Thu", value: 14 },
    { date: "Fri", value: 14 },
    { date: "Sat", value: 15 },
    { date: "Sun", value: 15 }
  ],
  // Response latency analysis
  responseLatencyDistribution: [
    { range: "0-5s", count: 3 },
    { range: "5-10s", count: 5 },
    { range: "10-15s", count: 2 },
    { range: "15-20s", count: 1 },
    { range: ">20s", count: 1 }
  ],
  // Keyword frequency analysis
  keywordFrequency: [
    { word: "Pain", count: 12 },
    { word: "Tired", count: 8 },
    { word: "Dizzy", count: 3 },
    { word: "Confused", count: 2 },
    { word: "Lonely", count: 7 }
  ]
};

// Resident data with more realistic trend data
export const patients = [
  {
    id: "P001",
    name: "Alice Johnson",
    age: 78,
    room: "201",
    lastChecked: "1 hour ago",
    alerts: 0,
    status: "stable" as const,
    medicationAdherence: 5, // Scale of 1-5
    moodScore: 8.2,
    voiceToneVariation: 2.1, // Scale of 1-10 (lower is better)
    responseLatency: 9, // seconds
    stressDetection: 2.3, // Scale of 1-10 (lower is better)
    conversationCoherence: 8.5, // Scale of 1-10
    engagementDuration: 95, // percentage of expected time
    interactiveEngagement: 8.7, // Scale of 1-10
    keywordFrequency: {
      pain: 1,
      tired: 2,
      dizzy: 0
    },
    // Weekly mood scores trending up
    historicalMoodScores: [7.5, 7.7, 7.8, 8.0, 8.1, 8.2],
    gender: "female"
  },
  {
    id: "P002",
    name: "Robert Smith",
    age: 82,
    room: "205",
    lastChecked: "30 mins ago",
    alerts: 1,
    status: "attention" as const,
    medicationAdherence: 3, // Scale of 1-5
    moodScore: 5.4,
    voiceToneVariation: 5.8, // Scale of 1-10 (lower is better)
    responseLatency: 18, // seconds
    stressDetection: 6.2, // Scale of 1-10 (lower is better)
    conversationCoherence: 6.5, // Scale of 1-10
    engagementDuration: 65, // percentage of expected time
    interactiveEngagement: 5.3, // Scale of 1-10
    keywordFrequency: {
      pain: 5,
      tired: 4,
      dizzy: 2
    },
    // Weekly mood scores declining
    historicalMoodScores: [6.2, 6.0, 5.9, 5.7, 5.5, 5.4],
    gender: "male"
  },
  {
    id: "P003",
    name: "Mary Williams",
    age: 75,
    room: "210",
    lastChecked: "2 hours ago",
    alerts: 0,
    status: "stable" as const,
    medicationAdherence: 5, // Scale of 1-5
    moodScore: 8.7,
    voiceToneVariation: 1.8, // Scale of 1-10 (lower is better)
    responseLatency: 7, // seconds
    stressDetection: 1.9, // Scale of 1-10 (lower is better)
    conversationCoherence: 9.2, // Scale of 1-10
    engagementDuration: 98, // percentage of expected time
    interactiveEngagement: 9.1, // Scale of 1-10
    keywordFrequency: {
      pain: 0,
      tired: 1,
      dizzy: 0
    },
    // Weekly mood scores consistently high
    historicalMoodScores: [8.5, 8.6, 8.5, 8.7, 8.6, 8.7],
    gender: "female"
  },
  {
    id: "P004",
    name: "James Brown",
    age: 85,
    room: "215",
    lastChecked: "15 mins ago",
    alerts: 2,
    status: "critical" as const,
    medicationAdherence: 2, // Scale of 1-5
    moodScore: 4.2,
    voiceToneVariation: 7.5, // Scale of 1-10 (lower is better)
    responseLatency: 25, // seconds
    stressDetection: 7.8, // Scale of 1-10 (lower is better)
    conversationCoherence: 5.1, // Scale of 1-10
    engagementDuration: 55, // percentage of expected time
    interactiveEngagement: 4.2, // Scale of 1-10
    keywordFrequency: {
      pain: 8,
      tired: 6,
      dizzy: 3
    },
    // Weekly mood scores severely declining
    historicalMoodScores: [5.5, 5.2, 4.9, 4.6, 4.4, 4.2],
    gender: "male"
  },
  {
    id: "P005",
    name: "Emily Davis",
    age: 73,
    room: "220",
    lastChecked: "45 mins ago",
    alerts: 1,
    status: "attention" as const,
    medicationAdherence: 4, // Scale of 1-5
    moodScore: 6.8,
    voiceToneVariation: 4.2, // Scale of 1-10 (lower is better)
    responseLatency: 14, // seconds
    stressDetection: 4.5, // Scale of 1-10 (lower is better)
    conversationCoherence: 7.2, // Scale of 1-10
    engagementDuration: 78, // percentage of expected time
    interactiveEngagement: 6.9, // Scale of 1-10
    keywordFrequency: {
      pain: 3,
      tired: 3,
      dizzy: 1
    },
    // Weekly mood scores fluctuating but improving
    historicalMoodScores: [6.2, 6.0, 6.3, 6.5, 6.7, 6.8],
    gender: "female"
  }
];

// Enhanced alert data with more details
export const alerts = [
  {
    type: "high" as const,
    message: "Resident James Brown showing signs of respiratory distress",
    timestamp: "15 mins ago",
    patientName: "James Brown",
    facilityName: "Sunrise Senior Living",
    category: "Health Decline",
    details: "Respiratory rate increased to 22 breaths/min. SpO2 dropped to 92%. Resident reported feeling 'short of breath' 8 times during check-in call.",
    recommendedAction: "Immediate medical assessment required"
  },
  {
    type: "medium" as const,
    message: "Medication schedule update required for Robert Smith",
    timestamp: "30 mins ago",
    patientName: "Robert Smith",
    facilityName: "Sunrise Senior Living",
    category: "Medication",
    details: "Resident reported 'confusion' about evening medication schedule. Has missed 2 doses in the past week.",
    recommendedAction: "Review medication schedule and provide clear instructions"
  },
  {
    type: "high" as const,
    message: "Mood score significantly declining for patients at Golden Years Care",
    timestamp: "1 hour ago",
    facilityName: "Golden Years Care",
    category: "Mood Issues",
    details: "Average mood score has decreased from 6.8 to 5.4 over the past 8 weeks. Multiple patients reporting feelings of isolation.",
    recommendedAction: "Implement additional social engagement activities and schedule mental health assessment"
  },
  {
    type: "high" as const,
    message: "Medication adherence rates dropping at Golden Years Care",
    timestamp: "2 hours ago",
    facilityName: "Golden Years Care",
    category: "Medication",
    details: "Medication adherence has fallen from 83% to 66% over the past 8 weeks. Multiple patients are missing doses.",
    recommendedAction: "Conduct medication management assessment and review staff protocols"
  },
  {
    type: "medium" as const,
    message: "Monthly health assessment due for Mary Williams",
    timestamp: "2 hours ago",
    patientName: "Mary Williams",
    facilityName: "Sunrise Senior Living",
    category: "Routine Check",
    details: "Routine monthly assessment is overdue by 2 days. Last vitals check was on June 15th.",
    recommendedAction: "Schedule health assessment within next 24 hours"
  },
  {
    type: "high" as const,
    message: "Staff shortage alert in night shift",
    timestamp: "3 hours ago",
    facilityName: "Golden Years Care",
    category: "Staffing",
    details: "Night shift on June 25th has 2 staff members calling in sick. Current staff-to-patient ratio will fall below regulatory requirements.",
    recommendedAction: "Arrange for additional staff or contact on-call personnel"
  },
  {
    type: "medium" as const,
    message: "Mood decline detected for Emily Davis",
    timestamp: "45 mins ago",
    patientName: "Emily Davis",
    facilityName: "Sunrise Senior Living",
    category: "Mood Issues",
    details: "Mood score has declined from 7.5 to 6.8 over the past three days. Resident mentioned feeling 'lonely' 7 times during recent calls.",
    recommendedAction: "Schedule social activity and check for depression indicators"
  },
  {
    type: "high" as const,
    message: "Fall risk alert for James Brown",
    timestamp: "1 day ago",
    patientName: "James Brown",
    facilityName: "Sunrise Senior Living",
    category: "Falls",
    details: "Balance assessment score decreased by 15%. Resident reported feeling 'dizzy' 3 times in recent calls.",
    recommendedAction: "Conduct fall risk assessment and implement preventive measures"
  }
];

// Sample diary entries generator function
export const generateDiaryEntries = (days = 30, gender = 'female') => {
  const pronoun = gender === 'male' ? 'he' : 'she';
  const possessivePronoun = gender === 'male' ? 'his' : 'her';
  const capitalPronoun = gender === 'male' ? 'He' : 'She';
  
  // First part of the activities (main activity) - expanded list with more variety
  const activities = [
    // Social activities
    `Had dinner with ${possessivePronoun} grandson who came to visit. They shared stories about family vacations and looked at old photographs together.`,
    `Received a surprise visit from ${possessivePronoun} niece and her children. ${capitalPronoun} was delighted to see the young ones and gave them each a small gift ${pronoun} had been saving.`,
    `Celebrated another resident's birthday in the common room. ${capitalPronoun} helped serve cake and led everyone in singing happy birthday.`,
    `Had a video call with ${possessivePronoun} son who lives abroad. They talked for nearly an hour about the grandchildren's school achievements and upcoming holiday plans.`,
    `Enjoyed lunch with a small group of friends in the dining hall. The conversation was lively as they discussed a book they had all recently read.`,
    
    // Entertainment activities
    `Watched a documentary about ocean life and was very engaged. ${capitalPronoun} mentioned wanting to visit the aquarium soon to see some of the sea creatures up close.`,
    `Attended a classical music concert held in the community room. ${capitalPronoun} particularly enjoyed the violin solos that reminded ${pronoun} of concerts from years ago.`,
    `Participated in movie night and watched a classic film from the 1960s. ${capitalPronoun} shared interesting facts about the actors with other residents afterward.`,
    `Listened to an audiobook about historical figures. ${capitalPronoun} has always been fascinated by history and enjoys learning new details about famous people.`,
    `Watched a comedy show on television with a group of residents. The laughter was contagious, and everyone had a wonderful time together.`,
    
    // Creative activities
    `Participated in the group painting class and created a landscape painting. The instructor complimented ${possessivePronoun} use of color and attention to detail.`,
    `Joined the poetry writing workshop and composed a short poem about seasons. ${capitalPronoun} read it aloud to the group and received warm applause.`,
    `Worked on a knitting project for ${possessivePronoun} great-granddaughter. The sweater is nearly complete and features a beautiful pattern ${pronoun} designed.`,
    `Took part in a ceramics class and made a small decorative bowl. ${capitalPronoun} plans to glaze it next week and give it to ${possessivePronoun} daughter.`,
    `Joined the choir practice and rehearsed songs for the upcoming spring concert. The music director mentioned that ${possessivePronoun} voice adds beautiful harmony to the group.`,
    
    // Games and cognitive activities
    `Played bingo with other residents and won twice. ${capitalPronoun} was delighted with the small prize and shared it with ${possessivePronoun} neighbor.`,
    `Participated in a chess tournament organized by the activities department. Though ${pronoun} didn't win, ${pronoun} enjoyed the mental challenge and social interaction.`,
    `Completed a 500-piece puzzle with help from two other residents. The finished image of a mountain landscape will be framed and displayed in the common area.`,
    `Played card games with ${possessivePronoun} regular Tuesday group. ${capitalPronoun} taught everyone a new game ${pronoun} learned from ${possessivePronoun} grandchildren.`,
    `Participated in a memory game session with good results. The activity coordinator mentioned that ${pronoun} has shown consistent improvement in these cognitive exercises.`,
    
    // Physical activities
    `Went for a walk in the garden and enjoyed identifying different flowers. ${capitalPronoun} spoke about how gardening was a favorite hobby in younger years.`,
    `Participated in the chair yoga class and demonstrated impressive flexibility. The instructor used ${possessivePronoun} form as an example for others.`,
    `Joined the morning stretching group and completed all exercises with enthusiasm. ${capitalPronoun} mentioned feeling more energetic afterward.`,
    `Took a short walk around the outdoor trail with ${possessivePronoun} walker. The fine weather allowed for a longer outing than usual, which ${pronoun} thoroughly enjoyed.`,
    `Participated in the balloon volleyball game in the activity room. ${capitalPronoun} helped ${possessivePronoun} team score several points with well-placed hits.`,
    
    // Educational and enrichment
    `Attended a lecture about local history presented by a museum curator. ${capitalPronoun} asked several insightful questions that enhanced the discussion.`,
    `Participated in a technology workshop and learned how to use a new feature on ${possessivePronoun} tablet. ${capitalPronoun} was excited to show off the new skills.`,
    `Attended a cooking demonstration focusing on healthy desserts. ${capitalPronoun} requested a copy of the recipe to share with the kitchen staff.`,
    `Joined a discussion group about current events and contributed thoughtful perspectives. Other participants appreciated ${possessivePronoun} well-informed views.`,
    `Participated in a language class where ${pronoun} practiced conversational Spanish. ${capitalPronoun} used to travel to Mexico frequently and enjoys keeping up the language.`,
    
    // Community and contribution
    `Helped organize the community bookshelf and recommended books to other residents. ${capitalPronoun} has an extensive knowledge of mystery novels and enjoys suggesting titles.`,
    `Volunteered to help with the facility newsletter and contributed a short article about ${possessivePronoun} favorite recipes. The editor praised ${possessivePronoun} clear writing style.`,
    `Participated in a charity knitting project making baby blankets for the local hospital. ${capitalPronoun} has completed three blankets so far this month.`,
    `Helped welcome a new resident by showing them around and introducing them to others. The staff thanked ${pronoun} for being such a kind ambassador.`,
    `Assisted with decorating the common areas for the upcoming holiday. ${capitalPronoun} has a good eye for arrangement and made beautiful centerpieces for the tables.`,
    
    // Reminiscence and life story
    `Shared stories from ${possessivePronoun} youth during group reminiscence time. Everyone was particularly amused by the tale of ${possessivePronoun} first job at a small town newspaper.`,
    `Looked through old family albums with a staff member and identified people in photographs. These will be digitized and shared with ${possessivePronoun} family.`,
    `Recorded a video message sharing wisdom and advice for ${possessivePronoun} great-grandchildren. ${capitalPronoun} spoke about the importance of education and kindness.`,
    `Participated in the life story project and discussed ${possessivePronoun} experiences during important historical events. These stories will be compiled into a book for residents.`,
    `Shared memories of ${possessivePronoun} wedding day during a themed reminiscence session. ${capitalPronoun} described the dress, music, and special moments in vivid detail.`,
    
    // Outings and trips
    `Took a trip to the local museum with other residents. ${capitalPronoun} was particularly interested in the historical exhibits about the local area.`,
    `Went on a scenic drive through the countryside with a small group of residents. The autumn colors were spectacular, and ${pronoun} pointed out several landmarks.`,
    `Visited a nearby botanical garden and enjoyed the seasonal flower display. ${capitalPronoun} used to have a similar flower variety in ${possessivePronoun} own garden.`,
    `Attended a concert at the downtown performing arts center. It was ${possessivePronoun} first outing to this venue, and ${pronoun} was impressed by the acoustics.`,
    `Joined the group trip to a local farmers' market and selected fresh produce. ${capitalPronoun} gave the chef suggestions for using the seasonal vegetables in upcoming meals.`,
    
    // Special interests and hobbies
    `Watched ${possessivePronoun} favorite TV show and discussed it afterward. ${capitalPronoun} has been following this series for several seasons and enjoys predicting what will happen next.`,
    `Enjoyed a book from the library about travel. ${capitalPronoun} shared memories of trips to Europe in ${possessivePronoun} younger days.`,
    `Listened to a collection of classical music that ${possessivePronoun} daughter brought on a new portable player. ${capitalPronoun} closed ${possessivePronoun} eyes and conducted along with favorite passages.`,
    `Worked on ${possessivePronoun} stamp collection, organizing and cataloging new additions. This hobby has been a passion for over fifty years.`,
    `Tended to the small container garden on ${possessivePronoun} patio. The herbs ${pronoun} grows are often used by the kitchen staff in meal preparation.`,
    
    // Animal therapy and nature
    `Had a visit from a therapy dog that ${pronoun} particularly enjoyed. ${capitalPronoun} mentioned having owned several dogs throughout ${possessivePronoun} life and missed having a pet.`,
    `Spent time bird watching from the sunroom and identified several species. ${capitalPronoun} keeps a notebook of all the birds ${pronoun} spots throughout the seasons.`,
    `Interacted with the visiting therapy rabbits and helped groom them. The soft fur and gentle nature of the animals had a visibly calming effect.`,
    `Watched the sunset from the patio with other residents. ${capitalPronoun} commented on how the beautiful colors reminded ${pronoun} of painting classes ${pronoun} took years ago.`,
    `Enjoyed time in the sensory garden, touching and smelling the aromatic herbs. This activity always brings back pleasant memories of ${possessivePronoun} childhood home.`
  ];
  
  const medicallyRelevantEvents = [
    `Mentioned feeling slight dizziness when standing up quickly. ${capitalPronoun} noted this has happened a few times this week but passes quickly.`,
    `Noted some discomfort in ${possessivePronoun} left knee during the walking activity. ${capitalPronoun} said it feels better when sitting with a small pillow under the knee.`,
    `Reported sleeping better after changing the evening routine to include reading instead of TV. ${capitalPronoun} has been averaging about seven hours of uninterrupted sleep.`,
    `Mentioned having a headache in the morning that improved after breakfast. ${capitalPronoun} thinks it might be related to not drinking enough water the previous day.`,
    `Expressed feeling more energetic after the medication adjustment made last week. ${capitalPronoun} has been participating in more afternoon activities as a result.`,
    `Reported some confusion about the day of the week during morning check-in. ${capitalPronoun} was oriented after looking at the calendar in ${possessivePronoun} room.`,
    `Mentioned appetite has improved over the past few days. ${capitalPronoun} has been finishing most meals and enjoying the fruit options at lunch.`,
    `Noted that ${possessivePronoun} vision seemed a bit blurry while reading. ${capitalPronoun} mentioned it's time to schedule an eye exam as it's been over a year.`,
    `Reported feeling more stable when using the new walking aid provided by physical therapy. ${capitalPronoun} appreciates the additional support when walking longer distances.`,
    `Mentioned being more aware of staying hydrated throughout the day. ${capitalPronoun} has been using the water bottle given by ${possessivePronoun} daughter and refilling it regularly.`,
    `Noticed some mild swelling in ${possessivePronoun} ankles after sitting for a long period. ${capitalPronoun} elevated ${possessivePronoun} feet as recommended by the nurse.`,
    `Reported that ${possessivePronoun} new glasses have made reading much more comfortable. ${capitalPronoun} can now enjoy books for longer periods without eye strain.`,
    `Mentioned feeling a bit more short of breath than usual during the morning exercise. ${capitalPronoun} took breaks as needed and recovered quickly.`,
    `Reported that the new pillow has helped reduce neck pain in the mornings. ${capitalPronoun} is now waking up with less stiffness and greater comfort.`,
    `Noticed improvement in hand dexterity after consistent participation in the fine motor skill activities. ${capitalPronoun} can now button ${possessivePronoun} shirts with greater ease.`
  ];
  
  // Create weekly themes to make the weekly view more interesting
  const weeklyThemes = [
    { 
      theme: "Music Week", 
      activities: [
        `Attended a piano recital by a visiting musician. ${capitalPronoun} was moved to tears by a piece that was played at ${possessivePronoun} wedding.`,
        `Participated in the rhythm and percussion workshop. ${capitalPronoun} showed natural talent with the drums and enjoyed the lively session.`,
        `Joined the sing-along session featuring songs from the 1950s. ${capitalPronoun} knew all the lyrics and helped others remember them.`,
        `Listened to a presentation about the history of jazz music. ${capitalPronoun} shared memories of seeing famous performers in ${possessivePronoun} youth.`
      ]
    },
    { 
      theme: "Art Appreciation Week", 
      activities: [
        `Visited a traveling art exhibition at the local gallery. ${capitalPronoun} particularly enjoyed the impressionist paintings.`,
        `Participated in an art therapy session using watercolors. The therapist commented on the emotional depth of ${possessivePronoun} painting.`,
        `Attended a lecture about famous sculptures throughout history. ${capitalPronoun} asked thoughtful questions about the creative process.`,
        `Helped create a community mural for the activity room. ${possessivePronoun} contribution featured a beautiful landscape from ${possessivePronoun} hometown.`
      ]
    },
    { 
      theme: "Cultural Heritage Week", 
      activities: [
        `Shared family recipes for the community cookbook project. ${capitalPronoun} described how these dishes were passed down through generations.`,
        `Participated in a traditional dance demonstration. ${capitalPronoun} showed everyone a few steps from dances ${pronoun} learned as a child.`,
        `Attended a presentation about different cultural celebrations around the world. ${capitalPronoun} was fascinated by the similarities across traditions.`,
        `Helped prepare a special cultural meal with the kitchen staff. The dishes represented ${possessivePronoun} family heritage and were shared with all residents.`
      ]
    },
    { 
      theme: "Nature and Gardening Week", 
      activities: [
        `Participated in planting flowers in the community garden. ${capitalPronoun} knew exactly how to arrange the plants for optimal growth.`,
        `Attended a presentation about local wildlife by a park ranger. ${capitalPronoun} shared observations of birds ${pronoun} has seen from ${possessivePronoun} window.`,
        `Helped create dried flower arrangements for the dining tables. ${possessivePronoun} artistic touch made each arrangement unique.`,
        `Joined a nature walk around the grounds, identifying various plants and trees. ${capitalPronoun} shared knowledge about medicinal uses of certain plants.`
      ]
    }
  ];
  
  const diary = [];
  const today = new Date();
  
  // Create diary entries for each day
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Determine if this day falls within a themed week (first 28 days divided into 4 themed weeks)
    let dailyActivities = [];
    const weekIndex = Math.floor(i / 7) % weeklyThemes.length;
    const dayInWeek = i % 7;
    
    // On certain days of themed weeks, include a themed activity
    if (i < 28 && dayInWeek < 4) { // First 4 days of each themed week
      dailyActivities.push(weeklyThemes[weekIndex].activities[dayInWeek]);
    }
    
    // Select 1-2 additional random activities for the day (less than before since we have themed activities)
    const numActivities = Math.floor(Math.random() * 2) + 1; // 1-2 activities
    
    // Create a set to avoid duplicate activity indices
    const selectedIndices = new Set();
    
    for (let j = 0; j < numActivities; j++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * activities.length);
      } while (selectedIndices.has(randomIndex));
      
      selectedIndices.add(randomIndex);
      dailyActivities.push(activities[randomIndex]);
    }
    
    // Decide if there should be something medically relevant (20% chance)
    const hasMedicallyRelevant = Math.random() < 0.2;
    if (hasMedicallyRelevant) {
      const randomIndex = Math.floor(Math.random() * medicallyRelevantEvents.length);
      dailyActivities.push(medicallyRelevantEvents[randomIndex]);
    }
    
    // Create the content by joining the activities
    const content = dailyActivities.join(' ');
    
    diary.push({
      date: date.toISOString().split('T')[0],
      content,
      activities: dailyActivities,
      medicallyRelevant: hasMedicallyRelevant
    });
  }
  
  return diary;
};

// Apply diary entries to all patients
export const patientsWithDiaries = patients.map(patient => ({
  ...patient,
  diaryEntries: generateDiaryEntries(30, patient.gender)
})); 