package com.dj.base.user.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.dj.base.dao.IContainerBaseService;
import com.dj.base.user.entity.UserDO;
import com.dj.base.user.entity.UserVO;

public interface IUserService extends IContainerBaseService<UserDO> {

    UserVO login(UserDO user);

    IPage<UserVO> pageData(Integer limit, Integer offset);
}
