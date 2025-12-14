import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

/**
 * ปุ่มสำหรับ Save Result Card เป็นรูปภาพ (.png)
 */
export function SaveImageButton() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    try {
      setIsSaving(true);

      // หา Element ที่จะ Capture
      const element = document.getElementById('vibe-result-card');
      if (!element) {
        alert('ไม่พบการ์ดที่จะบันทึก');
        return;
      }

      // Capture เป็นรูปภาพ
      const canvas = await html2canvas(element, {
        backgroundColor: '#050505',
        scale: 2, // High resolution
        logging: false,
      });

      // สร้าง Download Link
      const link = document.createElement('a');
      const today = new Date().toISOString().split('T')[0];
      link.download = `vibecheck-${today}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('ไม่สามารถบันทึกรูปภาพได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.button
      onClick={handleSaveImage}
      disabled={isSaving}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-4 h-4" />
      <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกเป็นรูปภาพ'}</span>
    </motion.button>
  );
}
