import React from 'react';

interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Intentionally minimal; surface in console for developers
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: 'white', background: '#0E1630' }}>
          <h2 style={{ fontWeight: 800 }}>حدث خطأ غير متوقع</h2>
          <p>يرجى تحديث الصفحة أو المحاولة لاحقًا.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
