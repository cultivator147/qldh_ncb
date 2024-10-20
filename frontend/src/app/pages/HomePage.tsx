import React, { useState } from "react";
import { OrderDetail, TableOrders } from "../components/Orders/TableOrders";
import request from "../api/request";
import { IconArrowsLeftRight, IconHash, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from "@tabler/icons-react";
import { SidebarData, SidebarItem } from "../components/sidebar/SidebarItem";
import "../../App.css"
import { Menu, Select, Title } from "@mantine/core";
import { ChooseButton } from "../components/common/StyledChooseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAngleDown,
  faAngleUp,
  faAnglesDown,
  faBook,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { InsertItemModal } from "../components/Orders/InsertItemModal";
export const HomePage = () => {
  const [isShowing, setIsShowing] = useState(false);

  const [itemStatus, setItemStatus] = useState(0);
  const [items, setItems] = useState<OrderDetail[]>([]);
  const setFilterStatus = (value: any) => {
    setItemStatus(value);
  }
  const onClickShowInsertOrderModal = () => {
    setIsShowing(true);
  };
  const onHiden = async () => {
    setIsShowing(false);
    const getStory = async () => {
      const response = await request.get("/v1.0/items/find-all");
      const data: OrderDetail[] = response?.data?.data || [];
      setItems(data);
    }
    getStory();
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
      <div className='sidebar' style={{ width: '20%', minHeight: '100vh', height: '100%', backgroundColor: 'antiquewhite' }}>
        <div className='sidebar-list'>
          {SidebarData.map((data) => (<SidebarItem title={data.title} icon={data.icon} link={data.link} />))}
        </div>
      </div>

      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '8px' }}>
        <div style={{ display: 'flex', backgroundColor: '#ffffff', width: '100%', justifyItems: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Title
            order={1} >
            QUẢN LÝ ĐƠN HÀNG
          </Title>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '24px', marginTop: '72px'}}>
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
          <ChooseButton 
          onClick={onClickShowInsertOrderModal}
          >
          <FontAwesomeIcon
                icon={faAdd}
                style={{ marginRight: "4px" }}
              />
            {"Thêm đơn hàng"}
          </ChooseButton>
        </div>

        <div>
          <TableOrders page={1} size={10} items={items} />
        </div>
        <InsertItemModal
            isShowing={isShowing}
            hide={onHiden}
          />
      </div>

    </div>

  );
};
function useModal(): { isShowing: any; toggle: any; } {
  throw new Error("Function not implemented.");
}

