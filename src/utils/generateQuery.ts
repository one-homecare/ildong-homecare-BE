import * as utils from './formatting';

// 받은 업데이트 데이터를 쿼리에 사용할 수 있는 쿼리문으로 변경
export const generateUpdateQuery = (updateFields: Record<string, any>) => {
  // 필드 이름만 스네이크 케이스로 변환
  const snakeCaseFields = Object.keys(updateFields).map((key) =>
    utils.toSnakeCase(key),
  );

  const fields = snakeCaseFields;
  const values = Object.values(updateFields); // 원래의 값을 그대로 사용

  if (fields.length === 0) {
    throw new Error('업데이트할 정보가 없습니다.');
  }
  const setQuery = fields.map((field) => `${field} = ?`).join(', ');

  return { setQuery, values };
};
