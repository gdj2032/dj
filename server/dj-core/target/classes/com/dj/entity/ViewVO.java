package com.dj.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.dj.base.common.entity.IdName;
import com.dj.enums.ViewTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    /**
     * 导航栏名称
     */
    private String title;
    /**
     * 组件名
     */
    private String name;
    /**
     * 页面类型
     */
    private ViewTypeEnum viewType;
    /**
     * 页面路径
     */
    private String path;
    /**
     * 是否在导航栏显示 web端使用
     */
    private Boolean showInTab;
    /**
     * 是否可删除 服务web端使用
     */
    private Boolean canCancel;
    /**
     * 是否可编辑 服务web端使用
     */
    private Boolean canEdit;
    /**
     * 父路由(导航)id
     */
    private ViewVO parentView;
    /**
     * 角色id
     */
    private IdName role;
    /**
     * 角色id
     */
    private String content;
    /**
     * 创建人id
     */
    private IdName creator;
    /**
     * 创建时间
     */
    private Timestamp createTime;
    /**
     * 编辑时间
     */
    private Timestamp updateTime;
}
