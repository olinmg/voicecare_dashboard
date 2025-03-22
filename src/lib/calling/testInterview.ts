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
    console.warn('Backend URL not configured. Falling back to default.');
    return 'http://localhost:3001';
  }
  
  return backendUrl;
};

export const setupWebTestInterview = async ({ userId, interviewId, roleDescription }: TestInterviewParams) => {
  const response = await fetch(`${getBackendUrl()}/create_test_interview`, {
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

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to create test interview');
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
  const response = await fetch(`${getBackendUrl()}/create_phone_call`, {
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

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to create phone call');
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