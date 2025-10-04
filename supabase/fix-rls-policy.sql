-- 기존 정책 삭제
DROP POLICY IF EXISTS "Authenticated users can insert reports" ON reports;

-- 새로운 정책 생성 (익명 제보도 허용)
CREATE POLICY "Anyone can insert reports"
  ON reports FOR INSERT
  WITH CHECK (true);

-- 또는 인증된 사용자와 익명 사용자 모두 허용
CREATE POLICY "Authenticated and anonymous users can insert reports"
  ON reports FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' OR user_id IS NULL
  );
