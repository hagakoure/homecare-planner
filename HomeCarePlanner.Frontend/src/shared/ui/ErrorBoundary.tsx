import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public override state: State = { hasError: false };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public override render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="p-6 text-center text-red-600 dark:text-red-400">
                    <h2 className="text-xl font-bold mb-4">Что-то пошло не так</h2>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Попробовать снова
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}