package com.dj.rest;

import com.dj.base.common.constant.GlobalConstant;
import com.dj.base.common.entity.PageInfo;
import com.dj.base.common.entity.WebResponse;
import com.dj.base.common.utils.PageUtil;
import com.dj.base.user.entity.UserDO;
import com.dj.base.user.entity.UserVO;
import com.dj.base.user.service.impl.UserServiceImpl;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("user")
public class UserRest {

    @Resource
    private UserServiceImpl userService;

    @PostMapping("/login")
    public WebResponse<UserVO> login(@RequestBody UserDO user) {
        return WebResponse.ok(userService.login(user));
    }

    @DeleteMapping("/logout")
    public WebResponse<?> logout(HttpServletRequest request) {
        request.getSession().removeAttribute(GlobalConstant.SESSION);
        return WebResponse.ok("登出成功");
    }

    @GetMapping
    public WebResponse<PageInfo<UserVO>> userList(
            @RequestParam(defaultValue = "10") Integer limit,
            @RequestParam(defaultValue = "0") Integer offset
    ) {
        return WebResponse.ok(PageUtil.page2PageInfo(userService.pageData(limit, offset)));
    }

}
