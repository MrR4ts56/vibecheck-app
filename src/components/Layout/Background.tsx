/**
 * Background Component พร้อม Glow Effect
 * สำหรับพื้นหลังแบบ Obsidian Theme
 */
export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Main Background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-[96px] animate-pulse delay-500" />
    </div>
  );
}
