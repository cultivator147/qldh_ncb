package ecom.web.qldh;

import ecom.web.qldh.model.entity.Item;
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
    ResponseEntity<ResponseData<Page<Item>>> getListItems(@RequestParam (name = "page", defaultValue = "0") int page,
                                                          @RequestParam (name = "size", defaultValue = "10") int size) {
        return BaseResponse.success(itemService.getListService(page, size));
    }
    @GetMapping("/find-by-status")
    ResponseEntity<ResponseData<Page<Item>>> findByStatus(@RequestParam(name = "status", defaultValue = "1") int status,
                                                          @RequestParam (name = "page", defaultValue = "0") int page,
                                                          @RequestParam (name = "size", defaultValue = "10") int size) {
        return BaseResponse.success(itemService.findByStatus(status, page, size));
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
