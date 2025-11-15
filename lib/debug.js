const debugState = {
    enabled: true,   // Turn OFF before production
    logs: []
  };
  
  export function debugLog(label, data = null) {
    if (!debugState.enabled) return;
    const entry = { label, data, time: new Date().toISOString() };
    debugState.logs.push(entry);
    console.log(`🔍 DEBUG — ${label}`, data);
  }
  
  export function getDebugLogs() {
    return [...debugState.logs];
  }
  
  export function setDebugEnabled(value) {
    debugState.enabled = value;
  }
  