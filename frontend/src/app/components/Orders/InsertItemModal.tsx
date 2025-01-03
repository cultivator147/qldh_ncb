import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Select, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { uploadImage } from "../../api/imageUploader";
import { StyledImage } from "../common/StyledImage";
import { insertItem } from "../../api/apis";
import { IconHash } from "@tabler/icons-react";

export const InsertItemModal = ({ isShowing, hide }: any) => {
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [itemDescription, setitemDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setprice] = useState(0);
  const [dateTime, setdateTime] = useState("");
  const [status, setstatus] = useState(1);
  const [platform, setPlatform] = useState("Tiktok");

  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const callApiInsertItem = async () => {
    try{
      await insertItem({
        id:  null,
        buyerName: buyerName,
        buyerAddress: buyerAddress,
        phoneNumber: phoneNumber,
        datetime: dateTime,
        orderImage: fileUrls,
        status: status,
        platform: platform,
        price: price,
        itemName: itemName,
        itemDescription: itemDescription
      });
    }catch(e: any){
      console.log(e);
    }
  }

  const handleUploadImage = async (e: any) => {
    if (!e.target.files) return;
    const uri: string = await uploadImage(e.target.files[0]);
    console.log("uri ", uri);
    if (uri) {
      setFileUrls([...fileUrls, uri]);
    } else {
      console.log("no file uploaded...");
    }
  };

  const onCompletedInsertOrder = async () => {
    await callApiInsertItem();
    hide();
  };
  const setItemStatus = (v: any) => {
    if(v == "Chưa đặt hàng"){
      setstatus(1);
    }
    if(v == "Đã đặt hàng"){
      setstatus(2);
    }
    if(v == "Đã gửi hàng"){
      setstatus(3);
    }
  }
  const setItemPlatform = (v: any) => {
    if (v == "Tiktok"){
      setPlatform("Tiktok");
    }
    if (v == "Zalo"){
      setPlatform("Zalo");
    }
    if (v == "Instagram"){
      setPlatform("Instagram");
    }

  }
  return isShowing ? (
    <Flex
      sx={{
        position: "fixed",
        zIndex: 99,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(248, 242, 242, 0.5)",
        left: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex
        direction={"column"}
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          zIndex: 100,
          width: "50%",
          height: "90%",
          background: "white",
          borderRadius: "9px",
          border: "solid #6962639d",
        }}
      >
        <Flex
          style={{
            backgroundColor: "#FFFFFF",
            height: "5rem",
            zIndex: 102,
            width: "48%",
            position: "fixed",
            gap: '12px'
          }}
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Flex justify={"center"} align={"center"} style={{}}>
            <h1
            style={{color: '#000000'}}
            >
            Thêm đơn hàng
            </h1>
          </Flex>
          <Flex
            onClick={hide}
            justify={"center"}
            align={"center"}
            style={{
              cursor: "pointer",
              position: "absolute",
              borderRadius: "50%",
              right: 0,
              top: 0,
              height: "2.5rem",
              width: "2.5rem",
              backgroundColor: "#fcfbfb",
            }}
          >
            <FontAwesomeIcon cursor={"pointer"} icon={faClose} color="red" />
          </Flex>
          <div
            style={{
              width: "100%",
              opacity: "70%",
              height: "1px",
              backgroundColor: "grey",
            }}
          />
        </Flex>
        <div style={{ marginTop: "5rem", marginBottom: "5rem", display: 'flex', flexDirection: 'column',  gap: '16px', padding: '28px'}}>
          <Flex style={{}}>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Tên người mua: "}
              </Text>
            </Flex>

            <TextInput
              onChange={(e) => {
                setBuyerName(e.currentTarget.value);
              }}
              value={buyerName}
              style={{ width: "100%" }}
              placeholder="Điền tên người mua"
            />
          </Flex>

          <Flex>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Địa chỉ: "}
              </Text>
            </Flex>

            <TextInput
              onChange={(e) => {
                setBuyerAddress(e.currentTarget.value);
              }}
              value={buyerAddress}
              style={{ width: "100%" }}
              placeholder="Điền địa chỉ"
            />
          </Flex>

          <Flex>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Số điện thoại: "}
              </Text>
            </Flex>

            <TextInput
              onChange={(e) => {
                setphoneNumber(e.currentTarget.value);
              }}
              value={phoneNumber}
              style={{ width: "100%" }}
              placeholder="Điền SĐT"
            />
          </Flex>
          <Flex>
            <Flex align={""} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "0px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Ảnh sản phẩm: "}
              </Text>
            </Flex>

            <Flex direction={'column'} style={{width: '100%'}}>
              <Flex>
                <Flex style={{gap: '12px'}} align={'center'}>
                  <label style={{display:'flex', justifyContent: 'center', height: '24px', width: '96px', cursor: 'pointer', borderStyle: 'solid', borderWidth: '1px', marginBottom: '6px', alignItems: 'center', padding: '4px', color: 'green'}} className="" htmlFor="file-upload">
                    <FontAwesomeIcon
                      icon={faImage}
                      style={{ marginRight: "4px" }}
                    />
                    Thêm ảnh
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleUploadImage}
                      hidden={true}
                    />
                  </label>

                 
                </Flex>
              </Flex>
              <Flex style={{width: '100%'}}>
                {fileUrls.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "4px",
                    }}
                  >
                    {fileUrls.map((url) => (
                      <StyledImage width={200} height={200} src={url} />
                    ))}
                  </div>
                )}
                 
              </Flex>
              <Flex style={{width: '100%', marginTop: '20px'}}>
              {fileUrls.length > 0 && ( <button 
              style={{height: '24px', width: '72px', color: 'red', cursor: 'pointer', borderStyle: 'solid', borderWidth: '1px', marginBottom: '6px', alignItems: 'center',}}
              onClick={() => {setFileUrls([])}}
              >
                    Xoá ảnh
                  </button>)}
             
              </Flex>
              
            </Flex>
            
          </Flex>
          
          <Flex>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Giá tiền: "}
              </Text>
            </Flex>

            <TextInput
              onChange={(e) => {
                setprice(+e.currentTarget.value);
              }}
              value={price}
              style={{ width: "100%" }}
            />
          </Flex>
          <Flex  style={{width: '100%'}}>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Tên hàng: "}
              </Text>
            </Flex>

            <TextInput
              onChange={(e) => {
                setItemName(e.currentTarget.value);
              }}
              value={itemName}
              style={{ width: "100%" }}
            />
          </Flex>
          <Flex style={{width: '80%'}}>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Trạng thái:"}
              </Text>
            </Flex>
              
              <Select
            onChange={(v) => {setItemStatus(v)}}
            placeholder="Chọn giá trị"
            data={["Tất cả",  "Chưa đặt hàng", "Đã đặt hàng", "Đã gửi hàng"]}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            icon={<IconHash />}
          />
          </Flex>

          <Flex style={{width: '80%'}}>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Nền tảng: "}
              </Text>
            </Flex>
              
              <Select
            onChange={(v) => {setItemPlatform(v)}}
            placeholder="Chọn giá trị"
            data={["Tiktok",  "Zalo", "Instagram"]}
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            icon={<IconHash />}
          />
          </Flex>

          <Flex  style={{width: '100%'}}>
            <Flex align={"center"} style={{ width: "25%" }}>
              <Text
                style={{ marginLeft: "2px" }}
                // variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={500}
              >
                {"Ghi chú: "}
              </Text>
            </Flex>

            <TextInput
              onChange={(e) => {
                setitemDescription(e.currentTarget.value);
              }}
              value={itemDescription}
              style={{ width: "100%" }}
            />
          </Flex>
        </div>
        <Flex
          align={"center"}
          justify={"center"}
          style={{
            zIndex: 99,
            width: "100%",
            borderTop: "1px solid #e5e5e5",
            padding: "16px",
          }}
        >
          <button
            className="btn-choose"
            onClick={() => {
              hide();
              onCompletedInsertOrder();
            }}
          >
            {"Xác nhận"}
          </button>
          <button className="btn-closed" onClick={hide} style={{cursor: "pointer"}}>
            {"Đóng"}
          </button>
        </Flex>
      </Flex>
    </Flex>
  ) : null;
};
