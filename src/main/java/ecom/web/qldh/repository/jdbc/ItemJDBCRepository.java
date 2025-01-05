package ecom.web.qldh.repository.jdbc;

import ecom.web.qldh.page.ItemPerPage;
import ecom.web.qldh.page.PageItem;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ItemJDBCRepository extends BaseRepository {
    public PageItem<ItemPerPage> getPageItem(int page, int size, int itemStatus, int statisticStatus, String platform, String phoneNumber) {
        if (platform.equals("Tất cả")) {
            platform = "0";
        }
        long timeCondition = switch (statisticStatus) {
            case 1 -> getStartOfTodayInMillis();
            case 2 -> getTimeInMillisSevenDaysAgo();
            case 3 -> getTimeInMillisThirtyDaysAgo();
            default -> 0;
        };
        StringBuilder query = new StringBuilder("""
                WITH RankedItems AS (
                    SELECT *, ROW_NUMBER() OVER (ORDER BY date_time DESC) AS rowNum
                    FROM item
                    WHERE (CASE WHEN :status = 0 THEN :status ELSE status END) = :status
                        AND (CASE WHEN :platform = '0' THEN :platform ELSE platform END) = :platform""");
        if (!phoneNumber.equals("0")) {
            query.append(" AND phone_number LIKE '").append("%").append(phoneNumber).append("%'");
        }
        query.append("""
                    AND date_time >= :timeCondition
                                ),
                                totalCount AS (
                                SELECT COUNT(*) AS Total
                                FROM item
                                WHERE (CASE WHEN :status = 0 THEN :status ELSE status END) = :status
                                AND (CASE WHEN :platform = '0' THEN :platform ELSE platform END) = :platform
                                          
                """);
        if (!phoneNumber.equals("0")) {
            query.append(" AND phone_number LIKE '").append("%").append(phoneNumber).append("%'");
        }
        query.append("""
                          AND date_time >= :timeCondition
                )
                SELECT *, (SELECT Total FROM totalCount) AS totalCount
                FROM RankedItems
                WHERE rowNum BETWEEN :pageBegin AND :pageEnd;
                """);
        Map<String, Object> params = new HashMap<>();
        params.put("pageBegin", page * size + 1);
        params.put("pageEnd", (page + 1) * size);
        params.put("status", itemStatus);
        params.put("timeCondition", timeCondition);
        params.put("platform", platform);
        params.put("phone", phoneNumber);
        List<ItemPerPage> items = getListData(query.toString(), params, ItemPerPage.class);
        if (items.isEmpty()) {
            return new PageItem<>(0, 10, 0L, 1L, 0, new ArrayList<>());
        }
        PageItem<ItemPerPage> result = new PageItem<>();
        result.setPage(page);
        result.setSize(size);
        result.setTotalElements(items.get(0).getTotalCount());
        result.setTotalPage((long) Math.ceil((double) items.get(0).getTotalCount() / size));
        result.setContent(items);
        long totalMoney = items.stream().mapToLong(ItemPerPage::getPrice).sum();
        result.setTotalMoney(totalMoney);
        return result;
    }
    public static String removeNonNumeric(String input) {
        // Kiểm tra nếu chuỗi đầu vào là null
        if (input == null) {
            return null;
        }
        // Sử dụng regular expression để giữ lại chỉ các số
        return input.replaceAll("[^0-9]", "");
    }
    public static long getStartOfTodayInMillis() {
        // Lấy ngày bắt đầu hôm nay
        LocalDate today = LocalDate.now();
        // Chuyển đổi sang ZonedDateTime với múi giờ UTC+7
        ZonedDateTime startOfToday = today.atStartOfDay(ZoneId.of("Asia/Bangkok"));
        // Trả về thời gian tính theo milliseconds
        return startOfToday.toInstant().toEpochMilli();
    }

    public static long getTimeInMillisSevenDaysAgo() {
        // Lấy ngày hôm nay
        LocalDate today = LocalDate.now();
        // Tính ngày 7 ngày trước
        LocalDate sevenDaysAgo = today.minusDays(7);
        // Chuyển đổi sang ZonedDateTime với múi giờ UTC+7
        ZonedDateTime startOfSevenDaysAgo = sevenDaysAgo.atStartOfDay(ZoneId.of("Asia/Bangkok"));
        // Trả về thời gian tính theo milliseconds
        return startOfSevenDaysAgo.toInstant().toEpochMilli();
    }

    public static long getTimeInMillisThirtyDaysAgo() {
        // Lấy ngày hôm nay
        LocalDate today = LocalDate.now();
        // Tính ngày 30 ngày trước
        LocalDate thirtyDaysAgo = today.minusDays(30);
        // Chuyển đổi sang ZonedDateTime với múi giờ UTC+7
        ZonedDateTime startOfThirtyDaysAgo = thirtyDaysAgo.atStartOfDay(ZoneId.of("Asia/Bangkok"));
        // Trả về thời gian tính theo milliseconds
        return startOfThirtyDaysAgo.toInstant().toEpochMilli();
    }

}
