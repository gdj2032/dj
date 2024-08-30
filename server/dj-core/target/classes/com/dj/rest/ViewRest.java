package com.dj.rest;

import com.dj.base.common.entity.WebResponse;
import com.dj.entity.ViewDO;
import com.dj.service.impl.ViewServiceImpl;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("view")
public class ViewRest {

    @Resource
    private ViewServiceImpl viewService;

    @GetMapping("/all")
    public WebResponse<List<ViewDO>> all() {
        return WebResponse.ok(viewService.list());
    }

}
