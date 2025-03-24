interface TestInterviewParams {
  userId: string;
  interviewId: string;
  roleDescription: string;
  phoneNumber?: string;
}

const getBackendUrl = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 
                    import.meta.env.VITE_BACKEND_URL_DEV;
  
  if (!backendUrl) {
    console.warn('Backend URL not configured in environment variables. Using production URL as fallback.');
    return 'https://api.voicecare.ai';
  }
  
  // Log which URL we're using to help with debugging
  console.log(`Using backend URL: ${backendUrl}`);
  
  // Check if URL seems valid (basic check)
  if (!backendUrl.startsWith('http://') && !backendUrl.startsWith('https://')) {
    console.warn(`Warning: Backend URL (${backendUrl}) doesn't start with http:// or https://. This might cause connection issues.`);
  }
  
  return backendUrl;
};

export const setupWebTestInterview = async ({ userId, interviewId, roleDescription }: TestInterviewParams) => {
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/create_test_interview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: JSON.stringify({ 
      userId, 
      interviewId, 
      phoneNumber: 'web', // Special flag to indicate web call
      roleDescription 
    }),
  });

  // Check response content type before parsing
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    // Handle non-OK responses properly
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create test interview');
    } else {
      // Handle HTML or other non-JSON responses
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 100) + '...');
      throw new Error(`Server error (${response.status}): Backend API returned HTML instead of JSON. Check that the backend server is running correctly.`);
    }
  }

  // Make sure we're dealing with JSON before parsing
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Received non-JSON response:', text.substring(0, 100) + '...');
    throw new Error('Backend API returned non-JSON response. Check that the backend URL is correct and the server is running properly.');
  }

  return await response.json();
};

export const setupVapiPhoneTestInterview = async (
  userId: string,
  interviewId: string,
  phoneNumber: string,
  roleDescription: string,
  prompt: string,
  interviewTitle: string
) => {
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}/create_phone_call`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: JSON.stringify({
      userId,
      interviewId,
      phoneNumber,
      roleDescription,
      prompt,
      interviewTitle
    })
  });

  // Check response content type before parsing
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    // Handle non-OK responses properly
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create phone call');
    } else {
      // Handle HTML or other non-JSON responses
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 100) + '...');
      throw new Error(`Server error (${response.status}): Backend API returned HTML instead of JSON. Check that the backend server is running correctly.`);
    }
  }

  // Make sure we're dealing with JSON before parsing
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Received non-JSON response:', text.substring(0, 100) + '...');
    throw new Error('Backend API returned non-JSON response. Check that the backend URL is correct and the server is running properly.');
  }

  return await response.json();
};

export const promptForRoleDescription = () => {
  return window.prompt(
    'Please describe who you want to be treated as during this test interview.\n\n' +
    'For example: "Sarah, a 35-year-old product manager who has been using the product for 6 months" or "John, a new user who has never seen the product before"'
  );
};

export const promptForPhoneNumber = () => {
  return window.prompt('Please enter your phone number to receive the test call (e.g. +15551234567):');
}; 