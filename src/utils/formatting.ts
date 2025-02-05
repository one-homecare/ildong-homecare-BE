// 카멜케이스를 스네이크케이스로 변환하는 메소드
export const toSnakeCase = <T>(data: T): T => {
  if (Array.isArray(data)) {
    // 배열의 경우, 각 요소에 대해 재귀적으로 toSnakeCase 적용
    return data.map((item) => toSnakeCase(item)) as T;
  } else if (data !== null && typeof data === 'object') {
    // 객체의 경우, 각 키에 대해 스네이크 케이스 변환 적용
    const newObj: Record<string, any> = {};
    for (const key in data) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      newObj[snakeKey] = toSnakeCase((data as Record<string, any>)[key]); // 속성 값에 대해서도 재귀 호출
    }
    return newObj as T;
  } else if (typeof data === 'string') {
    // 문자열의 경우 스네이크 케이스 변환 적용
    return data.replace(/([A-Z])/g, '_$1').toLowerCase() as T;
  } else {
    // 배열, 객체, 문자열이 아닌 경우 변환 없이 반환
    return data;
  }
};

// 스네이크케이스를 카멜케이스로 변환하는 메소드
export const toCamelCase = <T>(data: T): T => {
  if (Array.isArray(data)) {
    // 배열의 경우, 각 요소에 대해 재귀적으로 toCamelCase 적용
    return data.map((item) => toCamelCase(item)) as T;
  } else if (data !== null && typeof data === 'object') {
    // 객체의 경우, 각 키에 대해 카멜 케이스 변환 적용
    const newObj: Record<string, any> = {};
    for (const key in data) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      newObj[camelKey] = toCamelCase((data as Record<string, any>)[key]); // 속성 값에 대해서도 재귀 호출
    }
    return newObj as T;
  } else if (typeof data === 'string') {
    // 문자열의 경우 카멜 케이스 변환 적용
    return data.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) as T;
  } else {
    // 배열, 객체, 문자열이 아닌 경우 변환 없이 반환
    return data;
  }
};
