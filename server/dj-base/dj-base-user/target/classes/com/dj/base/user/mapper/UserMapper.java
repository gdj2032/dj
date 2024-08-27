package com.dj.base.user.mapper;

import com.dj.base.dao.ContainerBaseMapper;
import com.dj.base.user.entity.UserDO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends ContainerBaseMapper<UserDO> {
}
