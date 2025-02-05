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
