package ecom.web.qldh;

import ecom.web.qldh.model.entity.Item;
import ecom.web.qldh.service.ItemService;
import ecom.web.qldh.util.BaseResponse;
import ecom.web.qldh.util.ResponseData;
import lombok.RequiredArgsConstructor;
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
    ResponseEntity<ResponseData<List<Item>>> getListItems() {
        return BaseResponse.success(itemService.getListService());
    }
    @GetMapping("/find-by-status")
    ResponseEntity<ResponseData<List<Item>>> findByStatus(@RequestParam(name = "status", defaultValue = "1") int status) {
        return BaseResponse.success(itemService.findByStatus(status));
    }
    @PostMapping("/update")
    ResponseEntity<ResponseData<Item>> updateItem(@RequestBody Item item) {
        return BaseResponse.success(itemService.updateOrder(item));
    }
    @PostMapping("/delete")
    ResponseEntity<ResponseData<Item>> deleteItem(@RequestBody Item item) {
        return BaseResponse.success(itemService.deleteItem(item));
    }
}
