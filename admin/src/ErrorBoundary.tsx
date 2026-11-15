import { Component, type ErrorInfo, type ReactNode } from 'react';

// Évite la page blanche : affiche l'erreur et un bouton pour recharger
// Avoids the blank page: shows the error and a button to reload
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main role="alert" style={{ maxWidth: 560, margin: '4rem auto', padding: '0 1rem', fontFamily: "'Fira Sans', system-ui, sans-serif" }}>
        <h1 style={{ fontSize: '1.5rem' }}>Le back office ne peut pas s'afficher</h1>
        <p>L'API est peut-être arrêtée ou injoignable. Vérifiez qu'elle tourne (make dev), puis rechargez la page.</p>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>{this.state.error.message}</pre>
        <button type="button" onClick={() => window.location.reload()} style={{ minHeight: 44, padding: '0 1.25rem', cursor: 'pointer' }}>
          Recharger
        </button>
      </main>
    );
  }
}
