module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Cho phép người dùng nhập tự do commit message (tiếng Việt, không bắt buộc type/scope nghiêm ngặt)
    // để tránh bị chặn commit trên máy cá nhân
    'type-enum': [
      1,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'type-empty': [0],
    'type-case': [0],
    'subject-empty': [0],
    'subject-case': [0],
    'subject-full-stop': [0],
    'header-max-length': [0],
  },
};
