package com.dj.base.user.utils;

import com.dj.base.common.constant.GlobalConstant;
import com.dj.base.common.utils.JwtUtil;
import com.dj.base.user.entity.UserDO;
import com.dj.base.user.entity.UserVO;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class LoginInfoUtil {

    public static String getSession() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return request.getHeader(GlobalConstant.SESSION);
    }

    public static void setUserInfo(UserVO user) {
        if (user != null) {
            Map<String, Object> m = new HashMap<>();
            m.put(GlobalConstant.SESSION_ID, user.getId());
            m.put(GlobalConstant.SESSION_USERNAME, user.getUsername());
            m.put(GlobalConstant.SESSION, user.getSession());
            String jwt = JwtUtil.generateJwt(m);
            user.setSession(jwt);
        }
    }

    public static UserDO getUserInfo() {
        String session = getSession();
        if (session == null) return null;
        try {
            Claims claims = JwtUtil.parseJwt(session);
            UserDO user = new UserDO();
            user.setId(Long.parseLong(claims.get(GlobalConstant.SESSION_ID).toString()));
            user.setUsername((String) claims.get(GlobalConstant.SESSION_USERNAME));
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("无用户信息或令牌校验失败");
        }
        return null;
    }

    public static boolean isLogin() {
        return getUserInfo() != null;
    }
}
