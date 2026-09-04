import { useState } from 'react';
import DemoGuide from './components/DemoGuide';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';
import Header from './components/Header';
import PrototypeAccess from './components/PrototypeAccess';
import StickyNav from './components/StickyNav';
import ThankYou from './components/ThankYou';

export default function App() {
  const [submittedMode, setSubmittedMode] = useState<'sheets' | 'local' | null>(null);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <StickyNav />
      <main id="main" className="page-main">
        <PrototypeAccess />
        <DemoGuide />
        {submittedMode ? (
          <ThankYou mode={submittedMode} onReset={() => setSubmittedMode(null)} />
        ) : (
          <FeedbackForm onSubmitted={setSubmittedMode} />
        )}
      </main>
      <Footer />
    </>
  );
}
