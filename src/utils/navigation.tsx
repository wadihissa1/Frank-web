// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';

// Static Route Definition
export const homepageRoute = {
  name: 'Homepage',
  path: '/',
};

// Function to Get the Active Route (Static Implementation)
export const getActiveRoute = (pathname: string): string => {
  return pathname === homepageRoute.path ? homepageRoute.name : 'Default Brand Text';
};

// Function to Check if Active Navbar is Needed (Always False for Static Setup)
export const getActiveNavbar = (pathname: string): boolean => {
  return false; // No secondary navbar for the single route
};

// Function to Get Active Navbar Text
export const getActiveNavbarText = (pathname: string): string | boolean => {
  return getActiveRoute(pathname) || false;
};
