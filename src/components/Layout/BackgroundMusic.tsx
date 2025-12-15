import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Background Music Player
 * เล่นเพลงประกอบในพื้นหลัง ดังที่ 50%
 */
export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ตั้งค่าเสียงเริ่มต้นที่ 50%
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('⚠️ เบราว์เซอร์บล็อก autoplay - กดปุ่มเพื่อเล่นเพลง');
          setIsPlaying(false);
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="glass-card p-3 rounded-full backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all"
        title={isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white/50" />
        )}
      </motion.button>

      {/* Audio Element - เพลง Lo-fi Chill (No Copyright) */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        crossOrigin="anonymous"
      >
        {/*
          🎵 เพลงจาก Pixabay (Free to use)
          เปลี่ยน URL ได้ตามต้องการที่: https://pixabay.com/music/
        */}
        <source
          src="https://cdn.pixabay.com/audio/2022/03/10/audio_4a480b5332.mp3"
          type="audio/mpeg"
        />
        <source
          src="https://cdn.pixabay.com/audio/2023/11/01/audio_39cac0c8f2.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
