// API key management
const API_KEY_STORAGE_KEY = 'straico_api_key';

export function getApiKey(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function setApiKey(apiKey: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

export function clearApiKey(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

export async function verifyApiKey(apiKey: string): Promise<boolean> {
  try {
    // In a real implementation, this would call the Straico API
    // For this demo, we'll simulate a successful verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  } catch (error) {
    console.error('API key verification failed:', error);
    return false;
  }
}
