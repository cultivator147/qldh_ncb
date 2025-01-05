import React, { useState } from "react";
import { OrderDetail, TableOrders } from "../components/Orders/TableOrders";
import request from "../api/request";
import {
  IconArrowsLeftRight,
  IconHash,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { SidebarData, SidebarItem } from "../components/sidebar/SidebarItem";
import "../../App.css";
import { Menu, Select, Title } from "@mantine/core";
import { ChooseButton } from "../components/common/StyledChooseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

import {
  faAdd,
  faAngleDown,
  faAngleUp,
  faAnglesDown,
  faBook,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { InsertItemModal } from "../components/Orders/InsertItemModal";
import "./pagination.css";
export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = async (pageNumber: number) => {
    console.log("currnet page: " + pageNumber);
    setCurrentPage(pageNumber);
  };

  const [isShowing, setIsShowing] = useState(false);

  const [itemStatus, setItemStatus] = useState(0);
  const [statisticStatus, setStatisticStatus] = useState(0);
  const [platform, setPlatform] = useState("Tất cả");
  const [totalMoney, setTotalMoney] = useState(0);
  const [items, setItems] = useState<OrderDetail[]>([]);
  const setFilterStatus = (value: any) => {
    switch (value) {
      case "Chưa đặt hàng":
        setItemStatus(1);
        break;
      case "Đã đặt hàng":
        setItemStatus(2);
        break;
      case "Đã gửi hàng":
        setItemStatus(3);
        break;
      default:
        setItemStatus(0);
        break;
    }
  };
  const castStatisticStatus = (value: any) => {
    switch (value) {
      case "Hôm nay":
        setStatisticStatus(1);
        break;
      case "7 ngày":
        setStatisticStatus(2);
        break;
      case "1 tháng":
        setStatisticStatus(3);
        break;
      case "Toàn thời gian":
        setStatisticStatus(0);
        break;
    }
  };
  const castPlatform = (value: any) => {
    setPlatform(value);
  };
  const onClickShowInsertOrderModal = () => {
    setIsShowing(true);
  };
  const onHiden = async () => {
    setIsShowing(false);
    getStory();
  };
  function formatCurrency(amount: any) {
    // Chuyển số thành chuỗi
    let amountString = amount.toString();
    // Tách phần nguyên và phần thập phân
    let parts = amountString.split(".");
    let integerPart = parts[0];
    let formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );
    if (parts.length > 1) {
      return formattedIntegerPart + "." + parts[1] + " VNĐ";
    } else {
      return formattedIntegerPart + " VNĐ";
    }
  }
  const getStory = async () => {
    console.log("cr" + currentPage);
    const response = await request.get(
      `/v1.0/items/find-all?page=${currentPage}&size=10&itemStatus=${itemStatus}&statisticStatus=${statisticStatus}&platform=${platform}`
    );
    const data: OrderDetail[] = response?.data?.data?.content || [];
    setTotalMoney(response?.data?.data?.totalMoney || 0);
    setTotalPages(totalPages);
    setItems(data);
  };
  React.useEffect(() => {
    getStory();
  }, [currentPage, itemStatus, statisticStatus, platform]);
  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
      {/* <div className='sidebar' style={{ width: '20%', minHeight: '100vh', height: '100%', backgroundColor: 'antiquewhite' }}>
        <div className='sidebar-list'>
          {SidebarData.map((data) => (<SidebarItem title={data.title} icon={data.icon} link={data.link} />))}
        </div>
      </div> */}

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#ffffff",
            width: "100%",
            justifyItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Title order={1}>QUẢN LÝ ĐƠN HÀNG</Title>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "72px",
              marginLeft: '48px'

            }}
          >
            <Menu.Label style={{ color: "#000000", fontSize: "1.2rem" }}>
              Trạng thái đơn hàng:
            </Menu.Label>
            <Select
              onChange={(v) => {
                setFilterStatus(v);
              }}
              placeholder="Chọn giá trị"
              data={["Tất cả", "Chưa đặt hàng", "Đã đặt hàng", "Đã gửi hàng"]}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              icon={<IconHash />}
            />
            <div>
              {/* <ChooseButton
                onClick={() => {
                  fetchByStatus();
                }}
              >
                {"Tìm kiếm"}
              </ChooseButton> */}
            </div>
            <div style={{ marginLeft: "64px" }}>
              <ChooseButton
                onClick={() => {
                  onClickShowInsertOrderModal();
                }}
              >
                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "4px" }} />
                {"Thêm đơn hàng"}
              </ChooseButton>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "12px",
              marginLeft: '48px'
            }}
          >
            <Menu.Label style={{ color: "#000000", fontSize: "1.2rem" }}>
              Thống kê theo:
            </Menu.Label>
            <Select
              onChange={(v) => {
                castStatisticStatus(v);
              }}
              placeholder="Chọn giá trị"
              data={["Toàn thời gian", "Hôm nay", "7 ngày", "1 tháng"]}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              icon={<IconHash />}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "12px",
              marginLeft: '48px'

            }}
          >
            <Menu.Label style={{ color: "#000000", fontSize: "1.2rem" }}>
              Nền tảng:
            </Menu.Label>
            <Select
              onChange={(v) => {
                castPlatform(v);
              }}
              placeholder="Chọn giá trị"
              data={["Tất cả", "Tiktok", "Instagram", "Zalo"]}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              icon={<IconHash />}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "100px",
            marginTop: "42px",
            gap: '8px'
          }}
        >
          <label style={{ fontSize: "1.5rem", color: "#b42f2f" }}>
            {"Tổng húp: "}
          </label>
          <label style={{ fontSize: "1.5rem", fontWeight:"bold" }}>
            {formatCurrency(totalMoney)}
          </label>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactPaginate
              nextLabel="Trang tiếp"
              onPageChange={(selectedItem) =>
                handlePageChange(selectedItem.selected)
              }
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="Trang trước"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
          <TableOrders page={1} size={10} items={items} />
        </div>

        <InsertItemModal isShowing={isShowing} hide={onHiden} />
      </div>
    </div>
  );
};
function useModal(): { isShowing: any; toggle: any } {
  throw new Error("Function not implemented.");
}
