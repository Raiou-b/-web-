import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 公開ページ
import SigninPage from '../pages/signin';
import SignupPage from '../pages/signup';

// ユーザー保護ページ
import UserProfilePage from '../pages/user/[userId]/profile';

// メイン機能
import CalendarPage from '../pages/calendar';
import InstagramPage from '../pages/instagram';

// タスク関連
import TasksListPage from '../pages/tasks';
import TaskCreatePage from '../pages/tasks/new';
import TaskDetailPage from '../pages/tasks/[taskId]';

// 管理者ページ
import AdminDashboard from '../pages/admin/dashboard';
import AdminMembers from '../pages/admin/members';

export const AppRouter = () => {
  return (
    <Routes>
      {/* --- 公開ルート --- */}
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* デフォルトはログイン画面へリダイレクト（任意） */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* --- ユーザー専用ルート (/user) --- */}
      {/* :userId が [userId] フォルダに対応します */}
      <Route path="/user/:userId/profile" element={<UserProfilePage />} />

      {/* --- 機能ルート (トップレベル) --- */}
      <Route path="/calendar" element={<CalendarPage />} />
      
      <Route path="/instagram" element={<InstagramPage />} />

      {/* --- タスクルート (/tasks) --- */}
      <Route path="/tasks" element={<TasksListPage />} />
      <Route path="/tasks/new" element={<TaskCreatePage />} />
      <Route path="/tasks/:taskId" element={<TaskDetailPage />} />

      {/* --- 管理者ルート (/admin) --- */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/members" element={<AdminMembers />} />

      {/* 404 Not Found (マッチしない場合) */}
      <Route path="*" element={<div className="p-4">404: ページが見つかりません</div>} />
    </Routes>
  );
};