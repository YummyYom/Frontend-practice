import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Settings from './settings/settings';

const AccountRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="settings" element={<Settings />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default AccountRoutes;
