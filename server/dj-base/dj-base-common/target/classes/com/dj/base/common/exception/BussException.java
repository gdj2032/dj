package com.dj.base.common.exception;

import com.dj.base.common.constant.CodeConstant;

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
    private Number statusCode;

    public BussException(String message) {
        this(CodeConstant.API_CODE_SERVER_ERROR, message);
    }

    public BussException(Number statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }

    public Number getStatusCode() {
        return statusCode;
    }
}