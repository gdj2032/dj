package com.dj.base.common.exception;

/**
 *
 * @author GDJ
 * @explain 基础异常类
 * @dateUpdated 2024-01-01 00:00:00
 *
 */
public abstract class BaseException extends RuntimeException {

	private static final long serialVersionUID = -6468564165993408633L;

	public BaseException() {
		super();
	}

	public BaseException(String message) {
		super(message);
	}

	public BaseException(Throwable throwable) {
		super(throwable);
	}

	public BaseException(String message, Throwable throwable) {
		super(message, throwable);
	}

}