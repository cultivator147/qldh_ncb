import { Flex } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

interface SidebarItemProps {
  title: any;
  icon: any;
  link: any;
}
export const SidebarItem = (props: SidebarItemProps) => {
  return <div className="row sidebar-item">
    <div className="align-center">{props.icon}</div>
    <div className="align-center">{props.title}</div>
  </div>;
};
export const SidebarData = [
  { title: "Trang chủ", icon: <IconHome />, link: "/home" },
  { title: "Tạo đơn hàng", icon: <IconHome />, link: "/home" },
  { title: "Thống kê đơn hàng", icon: <IconHome />, link: "/home" },
];
