package com.dj.enums;

/**
 * 页面类型
 */
public enum ViewTypeEnum {

    /**
     * PAGE
     */
    PAGE("PAGE"),

    /**
     * MODAL
     */
    MODAL("MODAL"),

    /**
     * CUSTOM
     */
    CUSTOM("CUSTOM");

    private final String value;

    ViewTypeEnum(String value) {
        this.value = value;
    }
}
