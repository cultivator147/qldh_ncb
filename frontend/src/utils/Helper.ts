export function convertTimeToFacebookStyle(inputTime: any) {
    console.log(inputTime);
    const inputDate:any = new Date(inputTime);
    const currentDate:any = new Date();
    const timeDifference: any = currentDate - inputDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
  
    if (secondsDifference < 60) {
      return `Vừa xong`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference} phút trước`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference} giờ trước`;
    } else if (secondsDifference < 604800) {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference} ngày trước`;
    } else if (secondsDifference < 2419200) {
      const weeksDifference = Math.floor(secondsDifference / 604800);
      return `${weeksDifference} tuần trước`;
    } else if (secondsDifference < 29030400) {
      const monthsDifference = Math.floor(secondsDifference / 2419200);
      return `${monthsDifference} tháng trước`;
    } else {
      const yearsDifference = Math.floor(secondsDifference / 29030400);
      return `${yearsDifference} năm trước`;
    }
  };

 export function convertMillisecondsToTime(milliseconds: any) {
    const date = new Date(milliseconds);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }