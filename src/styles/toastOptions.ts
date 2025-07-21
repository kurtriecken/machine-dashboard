export const toastOptions = {
  // Default toast styles
  style: {
    borderRadius: '12px',
    background: '#4f46e5',  // Indigo-600
    color: 'white',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.5)',
    fontWeight: '600',
    fontSize: '16px',
    padding: '12px 20px',
    userSelect: 'none',
  },
  success: {
    duration: 4000,
    style: {
      background: '#22c55e',  // Green-500
      boxShadow: '0 4px 14px rgba(34, 197, 94, 0.5)',
    },
  },
  error: {
    duration: 5000,
    style: {
      background: '#ef4444',  // Red-500
      boxShadow: '0 4px 14px rgba(239, 68, 68, 0.5)',
    },
  },
}
