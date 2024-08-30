package com.dj.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("t_view")
public class ViewDO implements Serializable {

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
     * 页面类型id
     */
    private Long viewPageId;
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
    private String parentViewId;
    /**
     * 角色id
     */
    private String roleId;
    /**
     * 角色id
     */
    private String content;
    /**
     * 创建人id
     */
    private Long creatorId;
    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    /**
     * 编辑时间
     */
    private LocalDateTime updateTime;
}
