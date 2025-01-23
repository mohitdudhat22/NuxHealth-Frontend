export function identifyRole() {
    const url = window.location.pathname;  // Get the current URL path
  
    if (url.includes('/admin')) {
      return 'admin';
    } else if (url.includes('/doctor')) {
      return 'doctor';
    } else if (url.includes('/patient')) {
      return 'patient';
    } else if (url.includes('/reception')) {
      return 'receptionist';
    } else {
      return 'unknown';
    }
  }

  