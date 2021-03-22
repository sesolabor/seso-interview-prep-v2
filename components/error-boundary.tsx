import React from "react";
import log from "@/lib/log";

interface IProps {}
interface IState {
  hasError?: boolean;
}
class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    log.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong :(</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
