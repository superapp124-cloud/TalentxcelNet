export const TALENTXCEL_TOKENS = {
  colors: {
    // Brand Foundation
    navy: {
      950: '#070B14', // Deep space background
      900: '#0B132B', // Main dark container
      800: '#1C2541', // Card surface
      700: '#2A365D', // Elevated element / border
      600: '#3A4B7C',
    },
    cobalt: {
      500: '#0080FF', // TalentXcel Primary Electric Cobalt
      600: '#0066CC',
      400: '#3399FF',
      glow: 'rgba(0, 128, 255, 0.4)',
    },
    cyan: {
      400: '#00D2FF', // High-contrast spatial focus ring
      300: '#33DBFF',
    },
    // Vibrant Subject Identity Colors (Identical to user's uploaded screenshot)
    subjects: {
      math: {
        bg: '#FFF7ED',
        border: '#FDBA74',
        accent: '#F97316',
        badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
        gradient: 'from-amber-500/20 to-orange-500/10',
      },
      science: {
        bg: '#F0FDF4',
        border: '#86EFAC',
        accent: '#22C55E',
        badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        gradient: 'from-emerald-500/20 to-green-500/10',
      },
      english: {
        bg: '#EFF6FF',
        border: '#93C5FD',
        accent: '#3B82F6',
        badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        gradient: 'from-blue-500/20 to-cyan-500/10',
      },
      hindi: {
        bg: '#FFF1F2',
        border: '#FDA4AF',
        accent: '#F43F5E',
        badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
        gradient: 'from-rose-500/20 to-pink-500/10',
      },
      socialScience: {
        bg: '#FAF5FF',
        border: '#D8B4FE',
        accent: '#A855F7',
        badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        gradient: 'from-purple-500/20 to-indigo-500/10',
      },
    },
  },
  typography: {
    fontSans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  shadows: {
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
    glow: '0 0 25px rgba(0, 128, 255, 0.35)',
    tvFocus: '0 0 0 4px #00D2FF, 0 8px 30px rgba(0, 210, 255, 0.4)',
  },
} as const
