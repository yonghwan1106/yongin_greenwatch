'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { REPORT_TYPES, ReportType } from '@/lib/types/report';
import { supabase } from '@/lib/supabase/client';

export default function NewReportPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 5);
    setImages(newImages);

    // 미리보기 생성
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!selectedType || !location) return;

    setIsSubmitting(true);

    try {
      // 현재 세션 가져오기
      const { data: { session } } = await supabase.auth.getSession();
      console.log('=== 제보 작성 시작 ===');
      console.log('Session exists:', !!session);
      console.log('User ID:', session?.user?.id || 'NONE');
      console.log('Access token:', session?.access_token ? 'EXISTS' : 'NONE');

      const formData = new FormData();
      formData.append('type', selectedType);
      formData.append('description', description);
      formData.append('lat', location.lat.toString());
      formData.append('lng', location.lng.toString());
      formData.append('address', address);
      formData.append('isAnonymous', isAnonymous.toString());

      // 이미지 파일 추가
      images.forEach((image) => {
        formData.append('images', image);
      });

      // Authorization 헤더 추가
      const headers: HeadersInit = {};
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers,
        body: formData,
      });

      const result = await response.json();

      console.log('=== 제보 응답 ===');
      console.log('Success:', result.success);
      console.log('Debug info:', result.debug);
      console.log('Saved user_id:', result.debug?.user_id || '(익명)');
      console.log('Session user_id:', result.debug?.session_user_id || 'NONE');
      console.log('Is anonymous:', result.debug?.is_anonymous);

      if (result.success) {
        alert(`제보가 성공적으로 접수되었습니다!\n${isAnonymous ? '' : '50 포인트가 지급되었습니다.'}\n\nUser ID: ${result.debug?.user_id || '익명'}`);
        router.push('/reports');
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error('제보 제출 실패:', error);
      alert(`제보 제출 중 오류가 발생했습니다.\n${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-gray-600">
            ← 돌아가기
          </button>
          <h1 className="text-xl font-bold">환경 문제 제보</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* 진행 단계 표시 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > s ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            {step === 1 && '사진 촬영'}
            {step === 2 && '위치 확인'}
            {step === 3 && '정보 입력'}
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">사진 첨부</h2>
              <p className="text-sm text-gray-600 mb-4">
                환경 문제를 촬영한 사진을 첨부해주세요 (최대 5장)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="grid grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`미리보기 ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {images.length < 5 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary transition"
                  >
                    <span className="text-3xl text-gray-400">+</span>
                    <span className="text-xs text-gray-500 mt-1">
                      사진 추가
                    </span>
                  </button>
                )}
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              size="lg"
              className="w-full"
              disabled={images.length === 0}
            >
              다음 단계
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">위치 확인</h2>

              {location ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-700">
                      ✓ 현재 위치가 자동으로 설정되었습니다
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      위도: {location.lat.toFixed(6)}, 경도: {location.lng.toFixed(6)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      주소 (선택)
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="예: 경기도 용인시 처인구..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  <p className="text-sm text-gray-600 mt-4">
                    위치 정보를 가져오는 중...
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                size="lg"
                variant="outline"
                className="flex-1"
              >
                이전
              </Button>
              <Button
                onClick={() => setStep(3)}
                size="lg"
                className="flex-1"
                disabled={!location}
              >
                다음 단계
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">제보 정보 입력</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    문제 유형 *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {REPORT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`p-3 border rounded-lg text-left transition ${
                          selectedType === type.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        <span className="text-2xl">{type.emoji}</span>
                        <span className="ml-2 font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    상세 설명 (선택)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="발생 상황을 자세히 설명해주세요..."
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {description.length}/500
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-primary"
                  />
                  <label htmlFor="anonymous" className="text-sm">
                    익명으로 제보하기
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                size="lg"
                variant="outline"
                className="flex-1"
              >
                이전
              </Button>
              <Button
                onClick={handleSubmit}
                size="lg"
                className="flex-1"
                disabled={!selectedType || isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '제보 제출'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
