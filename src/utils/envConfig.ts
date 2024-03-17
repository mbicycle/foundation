type Config = {
    redirectUri: string,
    cvGenUrl: string,
    timeTrackerUrl: string,
    appDomain?: string,
}

const CONFIG: Config = {
  redirectUri: import.meta.env.VITE_REDIRECT_URL || 'http://localhost:3000/',
  cvGenUrl: import.meta.env.VITE_CV_GEN_URL || 'http://localhost:3001/',
  timeTrackerUrl: import.meta.env.VITE_TIME_TRACKER_URL || 'http://localhost:3002/',
  appDomain: import.meta.env.VITE_DOMEN,
};

export default CONFIG;
