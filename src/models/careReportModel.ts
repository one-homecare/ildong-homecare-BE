import { FieldPacket, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

// 작업 내역 등록
export const insertCareReport = async (conn: any, careReportInfo: any) => {
  const time = new Date();

  try {
    let sql = `
    INSERT INTO t_care_report (user_id, building_id, care_status_id, title, care_content, created_at)
        VALUES (?, ?, ?, ?, ? ,?)`;

    const values = [
      careReportInfo.userId,
      careReportInfo.buildingId,
      careReportInfo.careStatusId,
      careReportInfo.title,
      careReportInfo.careContent,
      time,
    ];

    const [result]: any = await conn.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

// 작업 내역 카테고리 삽입
export const insertCareCategory = async (conn: any, categoryValues: any) => {
  try {
    let sql = `
    INSERT INTO t_care_report_category (care_report_id, care_category_id) 
        VALUES ?;`;

    const [result]: any = await conn.query(sql, [categoryValues]);
    return result;
  } catch (error) {
    throw error;
  }
};

// 모든 작업 상태 조회
export const fetchAllCareStatus = async () => {
  let conn;
  const activeStatus = 1;

  try {
    let sql = `
        SELECT care_status_id, care_status_name
        FROM t_care_status
        WHERE is_active =?`;

    conn = await pool.getConnection();

    const [rows]: [RowDataPacket[], FieldPacket[]] = await conn.query(
      sql,
      activeStatus,
    );
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// 유효한 카테고리 ID 조회
export const getValidCareCategoryIds = async (
  conn: any,
  categoryIds: number[],
) => {
  try {
    const sql = `
        SELECT care_category_id FROM t_care_category 
        WHERE care_category_id IN (?);
      `;
    const [rows]: any = await conn.query(sql, [categoryIds]);
    return rows.map((row: any) => row.care_category_id);
  } catch (error) {
    throw error;
  }
};
