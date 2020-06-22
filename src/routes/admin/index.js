import React from 'react';
import {RiHome2Line, RiDiscLine, RiUserLine, RiArticleLine, RiUserStarLine, RiShieldUserLine} from 'react-icons/ri';
import {PERMISSION_CODE} from "constants/global";

const Manager = React.lazy(() => import('containers/Manager'));
const Song = React.lazy(() => import('containers/Manager/Song'));
const Category = React.lazy(() => import('containers/Manager/Category'));
const Artist = React.lazy(() => import('containers/Manager/Artist'));
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
        title: "Bài hát",
        icon: <RiDiscLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Song
    },
    {
        path: "/manager/categories",
        title: "Danh mục",
        icon: <RiArticleLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Category
    },
    {
        path: "/manager/artists",
        title: "Nghệ sĩ",
        icon: <RiUserStarLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Artist
    },
    {
        path: "/manager/role",
        title: "Phân quyền",
        icon: <RiShieldUserLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Manager
    },
    {
        path: "/manager/user",
        title: "Người dùng",
        icon: <RiUserLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: User
    }
];

export default routes;
