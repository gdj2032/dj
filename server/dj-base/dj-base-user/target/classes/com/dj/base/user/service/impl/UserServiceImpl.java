package com.dj.base.user.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dj.base.common.exception.BaseResult;
import com.dj.base.user.utils.LoginInfoUtil;
import com.dj.base.common.utils.MergeUtil;
import com.dj.base.dao.ContainerServiceImpl;
import com.dj.base.user.entity.UserDO;
import com.dj.base.user.entity.UserVO;
import com.dj.base.user.mapper.UserMapper;
import com.dj.base.user.service.IUserService;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ContainerServiceImpl<UserMapper, UserDO> implements IUserService {

    @Resource
    private UserMapper userMapper;

    public UserVO login(UserDO user) {
        UserDO u = baseMapper.selectJoinOne(UserDO.class,
                new MPJLambdaWrapper<UserDO>()
                        .eq(UserDO::getUsername, user.getUsername())
                        .eq(UserDO::getPassword, user.getPassword())
        );
        if (u != null) {
            UserVO userVO = new UserVO();
            MergeUtil.merge(u, userVO);
            LoginInfoUtil.setUserInfo(userVO);
            log.info(String.valueOf(userVO));
            return userVO;
        }
        throw BaseResult.USERNAME_PASSWORD_ERROR.message("用户名密码错误").exception();
    }

    @Override
    public IPage<UserVO> pageData(
            Integer limit,
            Integer offset
    ) {
        int pageNumber = offset / limit + 1;
        return baseMapper.selectJoinPage(new Page<>(pageNumber, limit), UserVO.class,
                new MPJLambdaWrapper<UserDO>()
                        .selectAll(UserDO.class)
        );
    }
}
