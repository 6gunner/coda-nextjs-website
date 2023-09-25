"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Layout, Breadcrumb, Menu } from "antd";
import { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
// 自定义的导入
import useStyle from "./dashboard/dashboard_style";
import Loading from "./loading";
import { CookieOption, CookiesOptions } from "next-auth";
const siteTitle = "Coda Admin Website";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menus: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

// async function checkAuthentication(cookie: CookieOption){
//   return false;
// }

//  async function getServerSideProps(ctx) {
//   const { req } = ctx;
//   const cookie = req?.headers?.cookie;

//   if (cookie) {
//     // 替换为你的身份验证逻辑
//     const isAuthenticated:boolean= await checkAuthentication(cookie);
//     if (!isAuthenticated) {
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false,
//         },
//       }
//     }
//   } else {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }
// }

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { styles } = useStyle();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout hasSider style={{ minHeight: "100vh" }} className="flex flex-row">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menus}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            {/* // 重点 */}
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            NextJs Demo ©2023 Created by Coda
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
