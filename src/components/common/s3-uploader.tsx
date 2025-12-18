import { getPresignedUrl } from '@/lib/asset';
import axios from 'axios';
import { ChangeEvent, InputHTMLAttributes, ReactNode, useRef, useState } from 'react';

interface RenderProps {
  open: () => void;
  uploading: boolean;
  progress: number;
  files: File[];
}

interface S3UploaderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'children' | 'onError'
> {
  onSuccess: (urls: string[]) => void;
  onError?: (error: Error) => void;
  maxSize?: number;
  children: (props: RenderProps) => ReactNode;
}

const S3Uploader = ({ onSuccess, onError, maxSize, children, ...inputProps }: S3UploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const open = () => fileInputRef.current?.click();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    setSelectedFiles(files);

    if (maxSize) {
      const oversizedFiles = files.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        const errorMsg = `파일 사이즈는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다. (${oversizedFiles.map((f) => f.name).join(', ')})`;
        onError?.(new Error(errorMsg));
        e.target.value = '';
        return;
      }
    }

    try {
      setUploading(true);
      setProgress(0);

      // 전체 업로드 진행률 계산을 위한 상태
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      let loadedSize = 0;
      const fileProgress = Array.from({ length: files.length }, () => 0);

      // 병렬 업로드 처리
      const uploadPromises = files.map(async (file, index) => {
        // Presigned URL 발급
        const { data } = await getPresignedUrl({ fileName: file.name });
        const presignedUrl = data.url;

        // S3 업로드
        await axios.put(presignedUrl, file, {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (ev) => {
            if (!ev.total) return;
            // 개별 파일의 업로드된 바이트 계산
            const currentFileLoaded = ev.loaded;
            const prevFileLoaded = fileProgress[index];

            // 전체 loadedSize 업데이트
            loadedSize += currentFileLoaded - prevFileLoaded;
            fileProgress[index] = currentFileLoaded;

            setProgress(Math.round((loadedSize * 100) / totalSize));
          },
        });

        // 쿼리 파라미터 떼고 URL 반환
        return presignedUrl.split('?')[0];
      });

      const urls = await Promise.all(uploadPromises);
      onSuccess(urls);
    } catch (error) {
      console.error(error);
      onError?.(error instanceof Error ? error : new Error('Upload failed'));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <>
      <input {...inputProps} type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      {children({ open, uploading, progress, files: selectedFiles })}
    </>
  );
};

export default S3Uploader;
