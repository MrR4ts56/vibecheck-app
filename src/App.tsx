import { useState } from 'react';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Background } from './components/Layout/Background';
import { Header } from './components/Layout/Header';
import { MoodInput } from './components/Vibe/MoodInput';
import { LoadingAnimation } from './components/Vibe/LoadingAnimation';
import { ResultCard } from './components/Vibe/ResultCard';
import { SaveImageButton } from './components/Vibe/SaveImageButton';
import { HistoryButton } from './components/History/HistoryButton';
import { HistoryModal } from './components/History/HistoryModal';
import { useDailyVibe } from './hooks/useDailyVibe';

function App() {
  const { todayVibe, hasPlayedToday, isLoading, error, createTodayVibe } = useDailyVibe();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleCheckVibe = async (mood: string) => {
    setIsGenerating(true);

    // แสดง Loading Animation เป็นเวลา 2 วินาที
    await new Promise(resolve => setTimeout(resolve, 2000));

    // สุ่มดวงและบันทึกลง Database
    await createTodayVibe(mood);

    setIsGenerating(false);
  };

  return (
    <ProtectedRoute>
      <Background />

      <div className="min-h-screen relative">
        <Header />

        {/* History Button */}
        {hasPlayedToday && (
          <HistoryButton onClick={() => setIsHistoryOpen(true)} />
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
          {/* Error Message */}
          {error && (
            <div className="mb-8 px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && !isGenerating && (
            <div className="text-white/70">กำลังโหลด...</div>
          )}

          {/* Generating Animation */}
          {isGenerating && <LoadingAnimation />}

          {/* Main Content - Show Result or Input */}
          {!isLoading && !isGenerating && (
            <>
              {hasPlayedToday && todayVibe ? (
                <>
                  <ResultCard vibe={todayVibe} />
                  <div className="mt-6">
                    <SaveImageButton />
                  </div>
                </>
              ) : (
                <MoodInput onSubmit={handleCheckVibe} />
              )}
            </>
          )}
        </div>

        {/* History Modal */}
        <HistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
}

export default App;
