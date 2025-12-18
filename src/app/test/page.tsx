'use client';

import S3Uploader from '@/components/common/s3-uploader';
import { useState } from 'react';

// ============================================================================
// 1. S3Uploader Component (Local Definition)
// ============================================================================

export default function UploadTestPage() {
  // Case 1: 단일 이미지 (프로필 등)
  const [singleUrl, setSingleUrl] = useState<string>('');

  // Case 2: 다중 이미지 (갤러리 등)
  const [multiUrls, setMultiUrls] = useState<string[]>([]);

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold border-b pb-4">S3 Upload Test</h1>

      {/* --- 테스트 1: 단일 파일 업로드 --- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">1. 단일 파일 (프로필)</h2>
        <div className="flex items-center gap-6">
          <S3Uploader
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            onSuccess={(urls) => setSingleUrl(urls[0])}
            onError={(e) => alert(e.message)}
          >
            {({ open, uploading, progress }) => (
              <div
                onClick={open}
                className="relative w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 overflow-hidden"
              >
                {singleUrl ? (
                  <img src={singleUrl} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm">Click Upload</span>
                )}

                {/* 로딩 오버레이 */}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                    {progress}%
                  </div>
                )}
              </div>
            )}
          </S3Uploader>

          <div className="text-sm text-gray-600">
            <p>업로드된 URL:</p>
            <code className="bg-gray-100 px-2 py-1 rounded block mt-1 break-all">{singleUrl || '아직 없음'}</code>
          </div>
        </div>
      </section>

      {/* --- 테스트 2: 다중 파일 업로드 --- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">2. 다중 파일 (갤러리)</h2>

        <S3Uploader
          multiple // 다중 선택 활성화
          accept="image/*"
          onSuccess={(urls) => setMultiUrls((prev) => [...prev, ...urls])}
          onError={(e) => alert(e.message)}
        >
          {({ open, uploading, progress, files }) => (
            <div className="space-y-4">
              <button
                onClick={open}
                disabled={uploading}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {uploading ? `업로드 중... (${progress}%)` : '+ 이미지 여러 장 추가'}
              </button>

              {/* 업로드 중 파일 목록 */}
              {uploading && (
                <div className="text-sm text-gray-500">
                  <p>업로드 중인 파일: {files.length}개</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 결과 그리드 */}
              <div className="grid grid-cols-4 gap-4">
                {multiUrls.map((url, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded border overflow-hidden">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </S3Uploader>
      </section>
    </div>
  );
}
