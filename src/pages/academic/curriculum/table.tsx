/**
 * @file table.tsx
 * @description Bảng dữ liệu danh mục học phần & chương trình đào tạo
 */

import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ACADEMIC } from '@domain/constants';
import type { ICourse } from '@domain/models';
import {
  Table as AntTable,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useContext } from 'react';
import { useCurriculumColumns } from './columns';
import { useCurriculum } from './hooks';
import { CurriculumContext } from './useContext';

export const Table: React.FC = () => {
  const {
    courses,
    total,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    keyword,
    setKeyword,
    courseType,
    setCourseType,
    handleModal,
  } = useContext(CurriculumContext);

  const { loading, getCourses, deleteCourse } = useCurriculum();

  const handleEdit = (course: ICourse) => {
    handleModal?.(course, { value: 'EDIT', title: 'Chỉnh sửa học phần' });
  };

  const handleDelete = (course: ICourse) => {
    deleteCourse(course.id, course.name, () => {
      getCourses({
        keyword,
        courseType: courseType as any,
        pageNumber,
        pageSize,
      });
    });
  };

  const columns = useCurriculumColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <Card bordered={false}>
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
        style={{ marginBottom: 16 }}
      >
        <Col xs={24} md={16}>
          <Space wrap size="middle">
            <Input
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Tìm kiếm theo mã học phần, tên môn..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={() =>
                getCourses({
                  keyword,
                  courseType: courseType as any,
                  pageNumber: 1,
                  pageSize,
                })
              }
              style={{ width: 300 }}
              allowClear
            />
            <Select
              placeholder="Khối kiến thức"
              value={courseType}
              onChange={(val) => {
                setCourseType(val);
                getCourses({
                  keyword,
                  courseType: val as any,
                  pageNumber: 1,
                  pageSize,
                });
              }}
              style={{ width: 170 }}
              allowClear
              options={ACADEMIC.COURSE_TYPES}
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={() =>
                getCourses({
                  keyword,
                  courseType: courseType as any,
                  pageNumber,
                  pageSize,
                })
              }
            >
              Làm mới
            </Button>
          </Space>
        </Col>

        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              handleModal?.(null, {
                value: 'CREATE',
                title: 'Thêm học phần mới',
              })
            }
          >
            Thêm học phần
          </Button>
        </Col>
      </Row>

      <AntTable<ICourse>
        rowKey="id"
        columns={columns}
        dataSource={courses}
        loading={loading}
        pagination={{
          current: pageNumber,
          pageSize,
          total,
          onChange: (page, pSize) => {
            setPageNumber(page);
            setPageSize(pSize);
            getCourses({
              keyword,
              courseType: courseType as any,
              pageNumber: page,
              pageSize: pSize,
            });
          },
          showSizeChanger: true,
          showTotal: (t) => `Tổng cộng ${t} học phần trong CTĐT`,
        }}
        size="middle"
        bordered
      />
    </Card>
  );
};

export default Table;
