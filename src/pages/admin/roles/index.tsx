/**
 * @file index.tsx
 * @description Màn hình Quản lý Phân quyền chức năng & Nhóm người dùng theo chuẩn Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { IRole, IRoleMember, IRoleSubmit } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import React, { useEffect, useState } from 'react';
import { useRole } from './hooks';
import ModalComponent from './modal';
import ModalAddMemberComponent from './modal-add-member';
import Table from './table';
import { RoleContext } from './useContext';

export const AdminRolesPage: React.FC = () => {
  const windowSize = useWindowSize();
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});
  const [members, setMembers] = useState<IRoleMember[]>([]);
  const [openModalAddMember, setOpenModalAddMember] = useState<boolean>(false);
  const [selectedScope, setSelectedScope] = useState<string>('GLOBAL');
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined,
  );
  const [activeTab, setActiveTab] = useState<'members' | 'permissions'>(
    'members',
  );

  const {
    openModal,
    handleModal,
    dataItem,
    setDataItem,
    typeModal,
    setTypeModal,
  } = useModal<IRole>();

  const { roles, setRoles, getRoles, getMembers, addRole, updateRole } =
    useRole();

  // Khởi tạo danh sách vai trò
  useEffect(() => {
    getRoles({ status: selectedStatus, scope: selectedScope }).then((res) => {
      if (res && res.length > 0) {
        if (!selectedRole) {
          setSelectedRole(res[0]);
          setPermissions(res[0].permissions || {});
        }
      }
    });
  }, [getRoles, selectedStatus, selectedScope]);

  const handleModalAddMember = () => {
    setOpenModalAddMember((prev) => !prev);
  };

  const handleFinishModal = async (values: IRoleSubmit): Promise<boolean> => {
    if (typeModal.value === 'EDIT' && dataItem) {
      return await updateRole(dataItem.id, values, () => {
        getRoles({ status: selectedStatus, scope: selectedScope });
      });
    }
    return await addRole(values, () => {
      getRoles({ status: selectedStatus, scope: selectedScope });
    });
  };

  return (
    <RoleContext.Provider
      value={{
        windowSize,
        openModal,
        handleModal,
        dataItem,
        setDataItem,
        typeModal,
        setTypeModal,
        roles,
        setRoles,
        selectedRole,
        setSelectedRole,
        members,
        setMembers,
        permissions,
        setPermissions,
        openModalAddMember,
        handleModalAddMember,
        selectedScope,
        setSelectedScope,
        selectedStatus,
        setSelectedStatus,
        activeTab,
        setActiveTab,
      }}
    >
      <Helmet>
        <title>Phân quyền chức năng | Hệ thống Becoxy</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Phân quyền chức năng',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Quản trị hệ thống', path: '/admin' },
              { title: 'Phân quyền chức năng', path: '/admin/roles' },
            ],
          },
        }}
      >
        <Table />

        {/* Modal Thêm/Sửa vai trò */}
        <ModalComponent onFinish={handleFinishModal} />

        {/* Modal Thêm thành viên vào nhóm phân quyền */}
        <ModalAddMemberComponent
          onSuccess={() => {
            if (selectedRole) {
              getMembers(selectedRole.id).then((res) => setMembers(res));
            }
          }}
        />
      </PageContainer>
    </RoleContext.Provider>
  );
};

export default AdminRolesPage;
