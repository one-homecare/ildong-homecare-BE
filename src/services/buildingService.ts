import * as buildingModel from '../models/buildingModel';

// 회사 등록하기
export const createBuilding = async (buildingInfo: any) => {
  try {
    const result = await buildingModel.insertBuildingInfo(buildingInfo);
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};
