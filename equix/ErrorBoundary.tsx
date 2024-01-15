import ErrorStackParser from "error-stack-parser";
import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorPage } from "./ErrorPage";

function captureError(source: string, error: unknown, componentStack?: string) {
  if (error instanceof Error)
    fetch("/api/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        source,
        name: error.name,
        message: error.message,
        stack: ErrorStackParser.parse(error),
        componentStack:
          componentStack && ErrorStackParser.parse({ stack: componentStack }),
      }),
    });
}

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: Readonly<State> = { hasError: false };

  captureTimeoutId: NodeJS.Timeout | null = null;
  errorHandlersController: AbortController | null = null;

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.captureTimeoutId) clearTimeout(this.captureTimeoutId);
    captureError("componentDidCatch", error, errorInfo.componentStack);
  }

  componentDidMount() {
    this.errorHandlersController = new AbortController();

    window.addEventListener(
      "error",
      ({ error }) => {
        this.setState({ hasError: true });

        this.captureTimeoutId = setTimeout(
          () => captureError("window.onerror", error),
          100,
        );
      },
      { signal: this.errorHandlersController.signal },
    );

    window.addEventListener(
      "unhandledrejection",
      ({ reason }) => {
        this.setState({ hasError: true });

        this.captureTimeoutId = setTimeout(
          () => captureError("window.onunhandledrejection", reason),
          100,
        );
      },
      { signal: this.errorHandlersController.signal },
    );
  }

  componentWillUnmount() {
    if (this.errorHandlersController) {
      this.errorHandlersController.abort();
      this.errorHandlersController = null;
    }
  }

  render() {
    return this.state.hasError ? <ErrorPage /> : this.props.children;
  }
}
