import React, { ReactComponent } from "@rbxts/react";

interface ReactErrorInfo {
	readonly componentStack: string;
}

interface ErrorBoundaryProps {
	readonly fallback: (error: unknown) => React.Element;
}

interface ErrorBoundaryState {
	readonly hasError: boolean;
	readonly message?: unknown;
}

@ReactComponent
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	public readonly state: ErrorBoundaryState = { hasError: false };

	constructor(props: ErrorBoundaryProps) {
		super(props);
	}

	public componentDidCatch(message: unknown, errorInfo: ReactErrorInfo) {
		warn(message, errorInfo.componentStack);

		this.setState({
			hasError: true,
			message: `${message} ${errorInfo.componentStack}`,
		});
	}

	public render() {
		if (this.state.hasError) {
			return this.props.fallback(this.state.message);
		}

		return this.props.children as React.Element | undefined;
	}
}
