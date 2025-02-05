import { FieldPacket, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

// 건물 정보 등록
export const insertBuildingInfo = async (buildingInfo: any) => {
  let conn;
  const time = new Date();
  const values = Object.values(buildingInfo);
  values.push(time);

  try {
    let sql = `
    INSERT INTO t_building (user_id, building_name, address, created_at)
        VALUES (?, ?, ?, ?)`;

    conn = await pool.getConnection();

    const [result]: any = await conn.query(sql, values);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

// 건물 전체 정보 조회
export const fetchAllBuildingInfo = async () => {
  let conn;
  const deleteStatus = 0;

  try {
    let sql = `
      SELECT building_id, user_id, building_name, address
      FROM t_building`;

    conn = await pool.getConnection();

    const [rows]: [RowDataPacket[], FieldPacket[]] = await conn.query(
      sql,
      deleteStatus,
    );
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
