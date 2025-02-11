import * as careReportModel from '../models/careReportModel';
import * as formatting from '../utils/formatting';
import { pool } from '../config/db';

// 작업내역 등록하기
export const createCareReport = async (careReportInfo: any) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 트랜잭션 시작

    // 작업 내역 등록
    const result = await careReportModel.insertCareReport(conn, careReportInfo);
    if (result.affectedRows === 0) {
      throw new Error('작업 내역 삽입 실패');
    }

    const careReportId = result.insertId; // 생성된 `care_report_id`

    // 카테고리 ID 유효성 체크 후 삽입
    if (careReportInfo.careCategoryId?.length > 0) {
      const validCategoryIds = await careReportModel.getValidCareCategoryIds(
        conn,
        careReportInfo.careCategoryId,
      );

      const invalidCategoryIds = careReportInfo.careCategoryId.filter(
        (id: number) => !validCategoryIds.includes(id),
      );

      if (invalidCategoryIds.length > 0) {
        throw new Error(
          `존재하지 않는 카테고리 ID: ${invalidCategoryIds.join(', ')}`,
        );
      }

      // 유효한 카테고리 ID만 삽입
      const categoryValues = validCategoryIds.map((categoryId: number) => [
        careReportId,
        categoryId,
      ]);

      await careReportModel.insertCareCategory(conn, categoryValues);
    }

    await conn.commit(); // 성공 시 커밋
    return true;
  } catch (error) {
    if (conn) await conn.rollback(); // 에러 발생 시 롤백
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

// 작업 상태 조회하기
export const getAllCareStatus = async () => {
  try {
    let result = await careReportModel.fetchAllCareStatus();
    result = formatting.toCamelCase(result);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {}
};

// 작업 내역 조회하기
export const getAllCareReport = async () => {
  try {
    let result = await careReportModel.fetchAllCareReport();
    result = formatting.toCamelCase(result);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {}
};
