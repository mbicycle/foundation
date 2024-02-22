import ProtectedRoute from './ProtectedRoute';

function withProtected(Component: JSX.Element): JSX.Element {
  return (
    <ProtectedRoute>
      {Component}
    </ProtectedRoute>
  );
}

export default withProtected;
