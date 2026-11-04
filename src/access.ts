/**
 * @see https://umijs.org/docs/max/access#access
 * Phân quyền hệ thống theo 3 vai trò: Admin, Teacher (Giáo viên), Student (Sinh viên)
 */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  const role = currentUser?.access;

  return {
    canAdmin: role === 'admin',
    canTeacher: role === 'teacher' || role === 'admin',
    canStudent: role === 'student' || role === 'admin',
    isAdmin: role === 'admin',
    isTeacher: role === 'teacher',
    isStudent: role === 'student',
  };
}
