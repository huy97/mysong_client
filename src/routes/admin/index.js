import React from 'react';
import {RiHome2Line, RiDiscLine, RiUserLine, RiArticleLine, RiUserStarLine, RiShieldUserLine} from 'react-icons/ri';
import {PERMISSION_CODE} from "constants/global";

const Manager = React.lazy(() => import('containers/Manager'));
const Song = React.lazy(() => import('containers/Manager/Song'));
const Category = React.lazy(() => import('containers/Manager/Category'));
const Artist = React.lazy(() => import('containers/Manager/Artist'));
const Role = React.lazy(() => import('containers/Manager/Role'));
const User = React.lazy(() => import('containers/Manager/User'));

const routes = [
    {
        path: "/manager",
        title: "Trang chủ",
        isPrivate: true,
        icon: <RiHome2Line className="menu-icon"/>,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Manager
    },
    {
        path: "/manager/songs",
        title: "Quản lý bài hát",
        icon: <RiDiscLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Song
    },
    {
        path: "/manager/categories",
        title: "Quản lý danh mục",
        icon: <RiArticleLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Category
    },
    {
        path: "/manager/artists",
        title: "Quản lý nghệ sĩ",
        icon: <RiUserStarLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Artist
    },
    {
        path: "/manager/role",
        title: "Quản lý phân quyền",
        icon: <RiShieldUserLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Role
    },
    {
        path: "/manager/user",
        title: "Quản lý người dùng",
        icon: <RiUserLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: User
    }
];

export default routes;
