import { getPresignedUrl } from '@/lib/asset';
import axios from 'axios';
import { useState } from 'react';

export const useS3Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);

    try {
      // 1. Presigned URL 받아오기
      const preRes = await getPresignedUrl({ fileName: file.name, expiration: 5 });
      const presignedUrl = preRes.data.url;

      // 2. S3로 직접 업로드 (PUT)
      await axios.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      // 3. 업로드된 파일의 순수 URL 반환 (쿼리 파라미터 제거)
      const s3Url = presignedUrl.split('?')[0];
      return s3Url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, progress };
};
