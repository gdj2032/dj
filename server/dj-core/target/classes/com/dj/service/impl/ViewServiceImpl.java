package com.dj.service.impl;

import com.dj.base.dao.ContainerServiceImpl;
import com.dj.entity.ViewDO;
import com.dj.mapper.ViewMapper;
import com.dj.service.IViewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ViewServiceImpl extends ContainerServiceImpl<ViewMapper, ViewDO> implements IViewService {
}
