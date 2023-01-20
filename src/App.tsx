import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Albums from './components/Albums';
import ErrorBoundary from './components/ErrorBoundary';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchInput />
          <Albums />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
