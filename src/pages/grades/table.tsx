/**
 * @file table.tsx
 * @description Bảng điểm sinh viên (Table & Summary) theo chuẩn Mes-Client-ES
 */

import {
  DownloadOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { IGradeItem } from '@domain/models';
import { calculateGradeScale } from '@utils/Utils';
import {
  Alert,
  Table as AntTable,
  Button,
  Card,
  Col,
  Row,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getGradeColumns } from './columns';
import { calculateTotalScore, useGrade } from './hooks';
import { GradeContext } from './useContext';

const { Text } = Typography;

export const Table: React.FC = () => {
  const {
    selectedClassCode,
    setSelectedClassCode,
    grades,
    setGrades,
    handleModal,
  } = useContext(GradeContext);

  const { loading, getGradesByClass, saveBatchGrades, exportGrades } =
    useGrade();
  const [isEditingAll, setIsEditingAll] = useState<boolean>(false);

  useEffect(() => {
    getGradesByClass(selectedClassCode).then((res) => {
      setGrades(res);
    });
  }, [selectedClassCode, getGradesByClass, setGrades]);

  const handleEditSingle = (record: IGradeItem) => {
    handleModal?.(record, { value: 'EDIT', title: 'Chỉnh sửa điểm' });
  };

  const handleGradeChange = (
    id: string,
    field: keyof IGradeItem,
    value: number,
  ) => {
    setGrades((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          const totalScore = calculateTotalScore(updated);
          const scale = calculateGradeScale(totalScore);
          return {
            ...updated,
            totalScore,
            letterGrade: scale.letter,
            isPassed: scale.isPassed,
          };
        }
        return item;
      }),
    );
  };

  const handleSaveAll = async () => {
    const success = await saveBatchGrades(selectedClassCode, grades);
    if (success) {
      setIsEditingAll(false);
    }
  };

  // Tính toán số liệu thống kê nhanh của lớp
  const totalStudents = grades.length;
  const passedStudents = grades.filter((g) => g.isPassed).length;
  const failedStudents = totalStudents - passedStudents;
  const passRate =
    totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0;
  const averageTotalScore =
    totalStudents > 0
      ? (
          grades.reduce((sum, g) => sum + (g.totalScore || 0), 0) /
          totalStudents
        ).toFixed(2)
      : '0.00';

  const columns = getGradeColumns({
    onEdit: handleEditSingle,
    isEditingAll,
    onGradeChange: handleGradeChange,
  });

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} md={10}>
            <Space align="center">
              <Text strong style={{ minWidth: 100 }}>
                Chọn lớp học:
              </Text>
              <Select
                value={selectedClassCode}
                onChange={(val) => setSelectedClassCode(val)}
                style={{ width: 280 }}
                options={[
                  { label: 'IT4409 - Lập trình Web nâng cao', value: 'IT4409' },
                  { label: 'IT3090 - Cơ sở dữ liệu phân tán', value: 'IT3090' },
                  { label: 'IT4010 - Kiến trúc máy tính', value: 'IT4010' },
                ]}
              />
            </Space>
          </Col>

          <Col xs={24} md={14} style={{ textAlign: 'right' }}>
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => exportGrades(selectedClassCode)}
              >
                Xuất file Excel
              </Button>

              {isEditingAll ? (
                <>
                  <Button onClick={() => setIsEditingAll(false)}>
                    Hủy sửa nhanh
                  </Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSaveAll}
                    loading={loading}
                  >
                    Lưu toàn bộ điểm
                  </Button>
                </>
              ) : (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setIsEditingAll(true)}
                >
                  Nhập điểm nhanh cả lớp
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng sinh viên"
              value={totalStudents}
              suffix="SV"
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Điểm TB lớp"
              value={averageTotalScore}
              valueStyle={{
                color: Number(averageTotalScore) >= 7.0 ? '#52c41a' : '#faad14',
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tỷ lệ đạt học phần"
              value={passRate}
              suffix="%"
              valueStyle={{ color: passRate >= 80 ? '#52c41a' : '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Học lại / Không đạt"
              value={failedStudents}
              valueStyle={{ color: failedStudents > 0 ? '#ff4d4f' : '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Alert
        message="Quy chế tính điểm học phần"
        description="Điểm tổng kết = (Chuyên cần × 10%) + (Bài tập × 20%) + (Giữa kỳ × 20%) + (Cuối kỳ × 50%). Điểm tổng kết dưới 4.0 sẽ bị xếp loại F (học lại)."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <AntTable<IGradeItem>
        rowKey="id"
        columns={columns}
        dataSource={grades}
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} sinh viên`,
        }}
        bordered
      />
    </div>
  );
};

export default Table;
