import React, { useState } from "react";
import { OrderDetail, TableOrders } from "../components/Orders/TableOrders";
import request from "../api/request";
import { IconArrowsLeftRight, IconHash, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from "@tabler/icons-react";
import { SidebarData, SidebarItem } from "../components/sidebar/SidebarItem";
import "../../App.css"
import { Menu, Select, Title } from "@mantine/core";
export const HomePage = () => {
  const [itemStatus, setItemStatus] = useState(0);
  const [items, setItems] = useState<OrderDetail[]>([]);
  const setFilterStatus = (value: any) => {
    setItemStatus(value);
  }
  React.useEffect(() => {
    const getStory = async () => {
      const response = await request.get("/v1.0/items/find-all");
      const data: OrderDetail[] = response?.data?.data || [];
      setItems(data);
    }
    getStory();
  }, [])
  return (
    <div style={{ width: "100%", minHeight: '100vh', display: "flex" }}>
      <div className='sidebar' style={{ width: '25%', minHeight: '100vh', height: '100%', backgroundColor: 'antiquewhite' }}>
        <div className='sidebar-list'>
          {SidebarData.map((data) => (<SidebarItem title={data.title} icon={data.icon} link={data.link} />))}
        </div>
      </div>

      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', backgroundColor: '#ffffff', width: '100%', justifyItems: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Title
            order={1} >
            QUẢN LÝ ĐƠN HÀNG
          </Title>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Menu.Label style={{ color: "#000000", fontSize: "1.2rem" }}>
            Trạng thái đơn hàng:
          </Menu.Label>
          <Select
            onChange={(v) => {setFilterStatus(v)}}
            placeholder="Chọn giá trị"
            data={["Tất cả",  "Chưa đặt hàng", "Đã đặt hàng", "Đã gửi hàng"]}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            icon={<IconHash />}
          />
        </div>

        <div>
          <TableOrders page={1} size={10} items={items} />
        </div>
      </div>

    </div>

  );
};
