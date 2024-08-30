package com.hyit.base.common.exception;


import com.hyit.base.common.exception.BaseException;

import static com.hyit.base.common.meta.constant.CodeConstant.API_CODE_SERVER_ERROR;

/**
 * @author WJT
 * @explain 自定义异常类
 * @dateUpdated 2022-01-01 00:00:00
 */
public class BussException extends BaseException {

    private static final long serialVersionUID = 2832067116403925229L;

    /**
     * 状态码
     */
    private String statusCode;

    public BussException(String message) {
        this(API_CODE_SERVER_ERROR, message);
    }

    public BussException(String statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }

    public String getStatusCode() {
        return statusCode;
    }
}