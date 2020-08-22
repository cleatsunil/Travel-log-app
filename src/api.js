const API_URL =
  window.location.hostname === 'localhost'
    ? 'https://localhost:1337'
    : 'https://cleat-travel-log-app.herokuapp.com';

export async function listLogEntries() {
  const response = fetch(`${API_URL}/api/logs`);
  return (await response).json();
}

export async function createLogEntry(entry) {
  const apikey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apikey
    },
    body: JSON.stringify(entry)
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
