import { Request, Response } from 'express';
import * as careReportService from '../services/careReportService';

// 작업내역 등록하기
export const createCareReport = async (req: Request, res: Response) => {
  const careReportInfo = req.body;

  try {
    const result = await careReportService.createCareReport(careReportInfo);

    if (result) {
      return res.status(201).send({
        success: true,
        message: '작업 내역 등록을 성공했습니다.',
      });
    }
  } catch (error) {
    console.log('작업 내역 등록 실패: ', error);
    return res.status(500).send({
      success: false,
      message: '서버 오류로 작업 내역 등록 실패',
    });
  }
};

// 작업 상태 조회하기
export const getAllCareStatus = async (req: Request, res: Response) => {
  try {
    const result = await careReportService.getAllCareStatus();

    if (result) {
      return res.status(200).send({
        success: true,
        message: '작업 상태 조회를 성공했습니다.',
        data: result,
      });
    }
  } catch (error) {
    console.log('작업 상태 조회 실패: ', error);
    return res.status(500).send({
      success: false,
      message: '서버 오류로 작업 상태 조회 실패',
    });
  }
};
