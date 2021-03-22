import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { useTypedSelector } from "@/client-state/store";
import * as ducks from "@/client-state/ducks";

interface IProps {
  children: React.ReactNode;
  path: string;
  location: {
    pathname: string;
  };
  internalOnly: boolean;
}
const ProtectedRoute = (props: IProps) => {
  const userState = useTypedSelector(ducks.userAccount.selectors.stateSelector);
  const { user: currentUser } = userState;
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return props.children;
};

export default withRouter(ProtectedRoute);
