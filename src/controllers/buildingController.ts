import { Request, Response } from 'express';
import * as buildingService from '../services/buildingService';

// 건물 등록하기
export const createBuilding = async (req: Request, res: Response) => {
  const buildingInfo = req.body;

  try {
    const result = await buildingService.createBuilding(buildingInfo);

    if (result) {
      return res.status(201).send({
        success: true,
        message: '건물 등록을 성공했습니다.',
      });
    }
  } catch (error) {
    console.log('건물 등록 실패: ', error);
    return res.status(500).send({
      success: false,
      message: '서버 오류로 건물 등록 실패',
    });
  }
};

// 건물 전체 조회하기
export const getAllBuilding = async (req: Request, res: Response) => {
  try {
    const result = await buildingService.getAllBuilding();

    if (result) {
      return res.status(200).send({
        success: true,
        message: '건물 전체 조회를 성공했습니다.',
        data: result,
      });
    }
  } catch (error) {
    console.log('건물 전체 조회 실패: ', error);
    return res.status(500).send({
      success: false,
      message: '서버 오류로 건물 전체 조회 실패',
    });
  }
};
