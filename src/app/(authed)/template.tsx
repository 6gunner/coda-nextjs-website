"use client";

import React, { Suspense } from "react";
import { Layout, Breadcrumb, Menu, Image, theme } from "antd";
import { MenuProps } from "antd";
import { useSession, signOut } from "next-auth/react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
// 自定义的导入

import Loading from "./loading";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function AuthedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { data: session } = useSession();

  const menus: MenuItem[] = [
    getItem(
      session?.user?.name,
      "user",
      null,
      [
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
      ],
      "group"
    ),
  ];
  return (
    <>
      <Layout hasSider style={{ minHeight: "100vh" }} className="flex flex-row">
        <Sider style={{ background: colorBgContainer }}>
          <div className="py-4 px-3 flex items-center justify-start align-middle gap-2">
            <Image
              src="/images/logo.png"
              width={32}
              height={32}
              alt="logo"
            ></Image>
            <span>Coda&apos;s Admin</span>
          </div>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={menus} />
          <button onClick={() => signOut()}>Signout</button>
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
