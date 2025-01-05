package ecom.web.qldh;

import ecom.web.qldh.model.entity.Item;
import ecom.web.qldh.page.ItemPerPage;
import ecom.web.qldh.page.PageItem;
import ecom.web.qldh.service.ItemService;
import ecom.web.qldh.util.BaseResponse;
import ecom.web.qldh.util.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1.0/items")
@CrossOrigin("http://localhost:3000")
public class ItemController {
    private final ItemService itemService;
    @GetMapping("/find-all")
    ResponseEntity<ResponseData<PageItem<ItemPerPage>>> getListItems(@RequestParam (name = "page", defaultValue = "0") int page,
                                                                     @RequestParam (name = "size", defaultValue = "10") int size,
                                                                     @RequestParam (name = "itemStatus", defaultValue = "0") int itemStatus,
                                                                     @RequestParam (name = "statisticStatus", defaultValue = "0") int statisticStatus,
                                                                     @RequestParam (name = "platform", defaultValue = "0") String platform

                                                          ) {
        return BaseResponse.success(itemService.getListService(page, size, itemStatus, statisticStatus, platform));
    }
    @PostMapping("/update")
    ResponseEntity<ResponseData<Item>> updateItem(@RequestBody Item item) {
        return BaseResponse.success(itemService.updateOrder(item));
    }
    @PostMapping("/insert")
    ResponseEntity<ResponseData<Item>> insertItem(@RequestBody Item item) {
        return BaseResponse.success(itemService.insertOrder(item));
    }
    @PostMapping("/delete")
    ResponseEntity<ResponseData<Item>> deleteItem(@RequestBody Item item) {
        return BaseResponse.success(itemService.deleteItem(item));
    }
}
