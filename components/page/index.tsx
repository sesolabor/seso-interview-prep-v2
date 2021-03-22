import { Router, MemoryRouter, Redirect, Switch, Route } from "react-router-dom";
import { historyRef } from "@/client-state/store";
import type { THistoryType } from "@/client-state/types";
import AuthForms from "@/components/auth-forms";
import Notifications from "@/components/notifications";
import ErrorBoundary from "@/components/error-boundary";

export const pageViewConstructor = ({
  RouterComponent,
  history,
}: {
  RouterComponent: typeof Router | typeof MemoryRouter;
  history: THistoryType;
}) => () => {
  return (
    <ErrorBoundary>
      <Notifications />
      <RouterComponent history={history}>
        <Switch>
          <Route path="/login">
            <AuthForms />
          </Route>
          <Route path="/signup">
            <AuthForms />
          </Route>
          <Route path="/reset-password">
            <AuthForms />
          </Route>
          <Route path="/verify-reset-password/:token">
            <AuthForms />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </RouterComponent>
    </ErrorBoundary>
  );
};

const Page = pageViewConstructor({ RouterComponent: Router, history: historyRef });

export default Page;
