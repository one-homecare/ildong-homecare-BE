import * as buildingModel from '../models/buildingModel';
import * as utils from '../utils/formatting';

// 건물 등록하기
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

// 건물 전체 조회 하기
export const getAllBuilding = async () => {
  try {
    let result = await buildingModel.fetchAllBuildingInfo();
    result = utils.toCamelCase(result);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {}
};
