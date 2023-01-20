import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Albums from './components/Albums';
import ErrorBoundary from './components/ErrorBoundary';
import SearchInput from './components/SearchInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Container>
            <Row className="pt-5 pb-3">
              <Col>
                <h1 className="text-center">
                  Find your favorite album across our top 100
                </h1>
              </Col>
            </Row>
            <Row className="pb-5">
              <Col xs={5} className="mx-auto">
                <SearchInput />
              </Col>
            </Row>
            <Row>
              <Col>
                <Albums />
              </Col>
            </Row>
          </Container>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
