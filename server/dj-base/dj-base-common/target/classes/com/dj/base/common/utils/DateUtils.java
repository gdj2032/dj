package com.dj.base.common.utils;

import java.time.format.DateTimeFormatter;
import java.time.temporal.IsoFields;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import com.dj.base.common.constant.MsgConstant;
import com.dj.base.common.exception.BussException;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author GDJ
 * @explain 日期工具类
 * @dateUpdated 2024-01-01 00:00:00
 */
public class DateUtils {

    public static final String YM_FORMAT = "yyyy-MM";
    public static final String YMD_FORMAT = "yyyy-MM-dd";
    public static final String YMD_DOT_FORMAT = "yyyy.MM.dd";
    public static final String YMDHMS_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String YMD_FORMAT2 = "yyyyMMdd";

    public static String getDate() {
        return format(new Date(), YMD_FORMAT);
    }

    public static String getMonth() {
        return format(new Date(), YM_FORMAT);
    }

    /**
     * 获取本周的第一天
     *
     * @param localDate
     * @return
     */
    public static LocalDate getWeek(LocalDate localDate) {
        return localDate.with(DayOfWeek.MONDAY);
    }

    /**
     * 获取本月的第一天
     *
     * @param localDate
     * @return
     */
    public static LocalDate getMonth(LocalDate localDate) {
        return localDate.with(TemporalAdjusters.firstDayOfMonth());
    }

    /**
     * 获取本季度的第一天
     *
     * @param localDate
     * @return
     */
    public static LocalDate getQuarter(LocalDate localDate) {
        // 先获取月份
        int month = localDate.getMonthValue();
        // 获取季度
        int quarter = (month - 1) / 3 + 1;
        // 获取季度的第一个月
        int quarterMonth = (quarter - 1) * 3 + 1;
        return LocalDate.of(localDate.getYear(), quarterMonth, 1);
    }

    /**
     * 获取本年的第一天
     *
     * @param localDate
     * @return
     */
    public static LocalDate getYear(LocalDate localDate) {
        return localDate.with(TemporalAdjusters.firstDayOfYear());
    }

    public static String getDateTime() {
        return format(new Date(), YMDHMS_FORMAT);
    }


    /**
     * 秒数转人类语言
     */
    public static String secondToHumanLanguage(long second) {
        // 小于60秒 x秒
        // 小于60分钟 x分钟x秒
        // 小于24小时 x小时x分钟x秒
        // 大于24小时 x天x小时x分钟x秒

        if (second < 60) {
            return second + "秒";
        }
        if (second < 60 * 60) {
            return second / 60 + "分钟" + second % 60 + "秒";
        }
        if (second < 60 * 60 * 24) {
            return second / 60 / 60 + "小时" + second / 60 % 60 + "分钟" + second % 60 + "秒";
        }
        return second / 60 / 60 / 24 + "天" + second / 60 / 60 % 24 + "小时" + second / 60 % 60 + "分钟" + second % 60 + "秒";
    }

    public static String format(Date date, String pattern) {
        if (date == null) return null;
        if (!StringUtils.hasLength(pattern)) pattern = YMD_FORMAT;
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }


    public static String format(Timestamp date, String pattern) {
        if (date == null) return null;
        if (!StringUtils.hasLength(pattern)) pattern = YMD_FORMAT;
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }


    /**
     * 字符串时间yyyy-MM-dd HH:mm:ss转换为时间戳
     *
     * @param dateStr 时间字符串
     * @return 时间戳
     */
    public static Long dateStrToTimestamp(String dateStr) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date date = sdf.parse(dateStr);
            return date.getTime();
        } catch (ParseException e) {
            throw new BussException("时间格式转换异常");
        }
    }

    public static String format(LocalDate date, String pattern) {
        if (date == null) {
            return null;
        }
        if (!StringUtils.hasLength(pattern)) {
            pattern = YMD_FORMAT;
        }
        DateTimeFormatter sdf = DateTimeFormatter.ofPattern(pattern);
        return sdf.format(date);
    }

    public static String format(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return "";
        }

        DateTimeFormatter sdf = DateTimeFormatter.ofPattern(YMDHMS_FORMAT);
        return sdf.format(localDateTime);
    }

    public static String format(LocalDate date) {
        return format(date, null);
    }


    public static Date parse(String dateStr, String pattern) throws ParseException {
        if (!StringUtils.hasLength(dateStr)) return null;
        if (!StringUtils.hasLength(pattern)) pattern = YMD_FORMAT;
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.parse(dateStr);
    }

    /**
     * 日期比较
     *
     * @param format   日期格式
     * @param dateStr1 日期字符串1
     * @param dateStr2 日期字符串1
     * @return 1：表示日期1大于日期2；-1：表示日期2大于日期1；0：表示日期1等于日期2；
     * @throws ParseException
     * @author WJT
     * @date 2022-01-01
     */
    public static int judgeDate(String format, String dateStr1, String dateStr2) throws ParseException {
        if (!StringUtils.hasLength(format) || !StringUtils.hasLength(dateStr1) || !StringUtils.hasLength(dateStr2)) {
            throw new BussException(MsgConstant.ERROR_MSG_PARAM);
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        Date date1 = simpleDateFormat.parse(dateStr1);
        Date date2 = simpleDateFormat.parse(dateStr2);
        if (date1.getTime() > date2.getTime()) {
            return 1;
        } else if (date1.getTime() < date2.getTime()) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * 获取日期区间的时间点
     * 实例：获取当前年份[2019]的前四年和后四年
     * 参数：format="YYYY"; date=new Date(); field=Calendar.YEAR; start=-4; end=4;
     * 结果集：[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
     *
     * @param format 结果集中日期格式
     * @param date   日期
     * @param field  单位
     * @param start  开始值
     * @param end    结束值
     * @return
     * @author WJT
     * @date 2022-01-01
     */
    public static List<String> eventPointDateTime(String format, Date date, int field, int start, int end) {
        Calendar calendar = Calendar.getInstance();
        List<String> resultList = new ArrayList<String>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        for (int i = start; i <= end; i++) {
            calendar.setTime(date);
            calendar.add(field, i);
            resultList.add(simpleDateFormat.format(calendar.getTime()));
        }
        return resultList;
    }

    /**
     * 获取时间段内的时间点[个数限制]
     *
     * @param dateFormat         时间格式
     * @param exeDateStr         执行时间
     * @param endDateStr         结束时间
     * @param eventCycle         事件周期[1-小时；2-天；3-周；4-月；5-年]
     * @param eventCycleDuration 事件周期时长[正整数]
     * @return
     * @throws ParseException
     * @author WJT
     * @date 2022-01-01
     */
    public static List<String> eventPointDateTime(String dateFormat, String exeDateStr, String endDateStr,
                                                  String eventCycle, Integer eventCycleDuration) throws ParseException {
        // 参数校验(防止参数错误导致死循环)：
        if (eventCycleDuration == null || !StringUtils.hasLength(eventCycle) || !StringUtils.hasLength(dateFormat)
                || !StringUtils.hasLength(exeDateStr) || !StringUtils.hasLength(endDateStr)) {
            throw new BussException(MsgConstant.ERROR_MSG_PARAM);
        }
        // 日期校验(防止参数错误导致死循环)：
        if (judgeDate(dateFormat, exeDateStr, endDateStr) == 1) {
            throw new BussException(MsgConstant.ERROR_MSG_DATA);
        }
        // 时长校验(防止参数错误导致死循环)：
        if (eventCycleDuration <= 0) {
            throw new BussException(MsgConstant.ERROR_MSG_DATA);
        }
        boolean flag = true;
        Calendar calendar = Calendar.getInstance();
        List<String> resultList = new ArrayList<String>();
        resultList.add(exeDateStr);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
        Date exeDate = simpleDateFormat.parse(exeDateStr);
        Date endDate = simpleDateFormat.parse(endDateStr);
        while (flag) {
            calendar.setTime(exeDate);
            // 周期-时：1
            if ("1".equals(eventCycle)) {
                calendar.add(Calendar.HOUR, eventCycleDuration);
                // 设置：YYYY-MM-DD HH:00:00
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
            }
            // 周期-天：2
            else if ("2".equals(eventCycle)) {
                calendar.add(Calendar.DATE, eventCycleDuration);
                // 设置：YYYY-MM-DD 00:00:00
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
            }
            // 周期-周：3
            else if ("3".equals(eventCycle)) {
                // 获取入参日期是本周的第几天：
                int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
                // 计算入参日期离下周一的偏移量：在国外，星期一是一周的第二天，所以下周一是这周的第九天；
                int nextMondayOffset = dayOfWeek == 1 ? 1 : 9 - dayOfWeek;
                calendar.add(Calendar.DAY_OF_MONTH, nextMondayOffset + (eventCycleDuration - 1) * 7);
                // 设置：YYYY-MM-DD 00:00:00
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
            }
            // 周期-月：4
            else if ("4".equals(eventCycle)) {
                calendar.add(Calendar.MONTH, eventCycleDuration);
                // 设置：YYYY-MM-01 00:00:00
                calendar.set(Calendar.DAY_OF_MONTH, 1);
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
            }
            // 周期-年：5
            else if ("5".equals(eventCycle)) {
                calendar.add(Calendar.YEAR, eventCycleDuration);
                // 设置：YYYY-01-01 00:00:00
                calendar.set(Calendar.MONTH, 0);
                calendar.set(Calendar.DAY_OF_MONTH, 1);
                calendar.set(Calendar.HOUR_OF_DAY, 0);
                calendar.set(Calendar.MINUTE, 0);
                calendar.set(Calendar.SECOND, 0);
            }
            // 周期-无：跳出循环
            else {
                flag = false;
            }
            exeDate = calendar.getTime();
            // 判断结束时间是否大于等于执行时间，是则记录并跳入下次循环，否则跳出本次循环：
            if (exeDate.getTime() <= endDate.getTime()) {
                resultList.add(simpleDateFormat.format(exeDate));
                /**
                 * 限制生成时间的个数：
                 * 1.原因-防止程序或其他外部原因导致死循环；
                 * 2.原因-生成的量大导致程序出现长时间等待或无响应；
                 */
                if (resultList.size() >= 500) {
                    resultList.clear();
                    flag = false;
                }
                System.out.println(simpleDateFormat.format(exeDate));
            } else {
                flag = false;
            }
        }
        return resultList;
    }

    /**
     * 将date转为localDate
     *
     * @param date 日期
     * @return LocalDate
     */
    public static LocalDate convertToLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    /**
     * 将date转为localDateTime
     *
     * @param date 日期
     * @return LocalDateTime
     */
    public static LocalDateTime convertToLocalDateTime(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    public static LocalDateTime convertToLocalDateTime(String date) {
        // 解析日期时间字符串
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(YMDHMS_FORMAT);
        return LocalDateTime.parse(date, formatter);
    }

    /**
     * 获取下个月的第一天
     *
     * @return localDate
     */
    public static LocalDate getNextMonthFistDay() {
        LocalDate today = LocalDate.now();
        LocalDate monthLastDay = today.with(TemporalAdjusters.lastDayOfMonth());
        return monthLastDay.plusDays(1);
    }

    public static Date convertToDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date convertToDate(LocalDateTime localDateTime) {
        if (null == localDateTime) {
            return null;
        }
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 获取当前日期月份的第一天
     *
     * @param date date
     * @return LocalDate
     */
    public static LocalDate getMonthFirstDay(Date date) {
        LocalDate localDate = convertToLocalDate(date);
        return localDate.with(TemporalAdjusters.firstDayOfMonth());
    }

    public static LocalDate getMonthFirstDay(LocalDate date) {
        return date.with(TemporalAdjusters.firstDayOfMonth());
    }

    /**
     * 获取当前日期月份的第一天
     *
     * @param date date
     * @return LocalDate
     */
    public static LocalDate getYearFirstDay(Date date) {
        LocalDate localDate = convertToLocalDate(date);
        return localDate.with(TemporalAdjusters.firstDayOfYear());
    }

    /**
     * 获取今年最后一天
     *
     * @param date date
     * @return LocalDate
     */
    public static LocalDate getYearLastDay(Date date) {
        LocalDate localDate = convertToLocalDate(date);
        return localDate.with(TemporalAdjusters.lastDayOfYear());
    }

    /**
     * 获取今年最后一天
     *
     * @param localDate date
     * @return LocalDate
     */
    public static LocalDate getYearLastDay(LocalDate localDate) {
        return localDate.with(TemporalAdjusters.lastDayOfYear());
    }

    /**
     * 获取当前日期月份的最后一天
     *
     * @param date date
     * @return LocalDate
     */
    public static LocalDate getMonthLastDay(Date date) {
        LocalDate localDate = convertToLocalDate(date);
        return localDate.with(TemporalAdjusters.lastDayOfMonth());
    }

    public static LocalDate getMonthLastDay(LocalDate date) {
        return date.with(TemporalAdjusters.lastDayOfMonth());
    }

    /**
     * 获取当前日期的0点
     *
     * @param date date
     * @return LocalDate
     */
    public static LocalDateTime getDayStartTime(Date date) {
        LocalDate localDate = convertToLocalDate(date);
        return LocalDateTime.of(localDate, LocalTime.MIN);
    }

    /**
     * 获取当前日期的23点59分59秒
     *
     * @param date date
     * @return LocalDate
     */
    public static LocalDateTime getDayEndTime(Date date) {
        LocalDate localDate = convertToLocalDate(date);
        return LocalDateTime.of(localDate, LocalTime.MAX);
    }

    public static LocalDateTime getDayEndTime(LocalDateTime date) {
        return LocalDateTime.of(date.toLocalDate(), LocalTime.MAX);
    }

    /**
     * 获取当前日期+套餐月份的最后一天
     *
     * @param localDate        localDate
     * @param purchaseMinMonth 套餐期限
     * @return Date
     */
    public static Date getMonthEndDate(LocalDate localDate, Integer purchaseMinMonth) {
        LocalDate date = localDate.plusMonths(purchaseMinMonth - 1);
        LocalDateTime localDateTime = LocalDateTime.of(date.with(TemporalAdjusters.lastDayOfMonth()), LocalTime.MAX);

        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 获取date的yyyymmdd
     *
     * @param date date
     * @return stringDate
     */
    public static String getStringDate(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        String month = localDate.getMonthValue() + "";
        String day = localDate.getDayOfMonth() + "";
        if (localDate.getMonthValue() < 10) {
            month = 0 + month;
        }
        if (localDate.getDayOfMonth() < 10) {
            day = 0 + day;
        }
        return localDate.getYear() + month + day;
    }

    /**
     * 获取date的yyyymm
     *
     * @param date date
     * @return stringDate
     */
    public static String getSixStringDate(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        String month = localDate.getMonthValue() + "";
        if (localDate.getMonthValue() < 10) {
            month = 0 + month;
        }
        return localDate.getYear() + month;
    }

    /**
     * 获取date的yyyymm
     *
     * @param localDate localDate
     * @return stringDate
     */
    public static String getSixStringDate(LocalDate localDate) {
        String month = localDate.getMonthValue() + "";
        if (localDate.getMonthValue() < 10) {
            month = 0 + month;
        }
        return localDate.getYear() + month;
    }

    /**
     * 获取前n个月的yyyymm
     *
     * @param localDate localDate
     * @param n         前n个月
     * @return stringDate
     */
    public static String getPastMonthDate(LocalDate localDate, int n) {
        localDate = localDate.minusMonths(n);
        String month = localDate.getMonthValue() + "";
        if (localDate.getMonthValue() < 10) {
            month = 0 + month;
        }
        return localDate.getYear() + month;
    }


    /**
     * 将date转为localDateTime
     *
     * @param timestamp timestamp
     * @return LocalDateTime
     */
    public static LocalDateTime convertToLocalDateTime(Timestamp timestamp) {
        if (null == timestamp) {
            return null;
        }
        return timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    /**
     * localDateTime 转 dateTIme
     *
     * @param localDateTime localDateTime
     * @return rs
     */
    public static Timestamp convertToTimeStamp(LocalDateTime localDateTime) {
        if (null == localDateTime) {
            return null;
        }
        return Timestamp.from(localDateTime.atZone(ZoneOffset.systemDefault()).toInstant());
    }

    /**
     * localDateTime 转 dateTIme
     *
     * @param timeStr timeStr
     * @return rs
     */
    public static Timestamp convertToTimeStamp(String timeStr, String format) {

        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        try {
            Date date = dateFormat.parse(timeStr);
            return new Timestamp(date.getTime());
        } catch (Exception e) {
            throw new BussException("时间格式转换异常");
        }
    }

    public static Timestamp convertToTimeStamp(LocalDate localDate) {
        if (null == localDate) {
            return null;
        }
        return Timestamp.from(localDate.atStartOfDay(ZoneOffset.systemDefault()).toInstant());
    }

    public static Timestamp convertToTimeStamp(Date date) {
        if (null == date) {
            return null;
        }
        return new Timestamp(date.getTime());
    }

    /**
     * 将date转为localDate
     *
     * @param timestamp 日期
     * @return LocalDate
     */
    public static LocalDate convertToLocalDate(Timestamp timestamp) {
        if (null == timestamp) {
            return null;
        }
        return timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    /**
     * format格式的string字符串转换成
     *
     * @param format
     * @return
     */
    public static LocalDate convertStringToLocalDate(String dateStr, String format) throws ParseException {
        Date date = new SimpleDateFormat(format).parse(dateStr);
        return convertToLocalDate(date);
    }

    private static LocalDateTime convertStrToLocalDateTime(String timeStr, String format) {
        DateTimeFormatter df = DateTimeFormatter.ofPattern(format);

        return LocalDateTime.parse(timeStr, df);
    }

    /**
     * format格式的string字符串转换成
     */
    public static Timestamp convertStringToTimestamp(String dateStr, LocalDate localDate) {
        DateTimeFormatter df = DateTimeFormatter.ofPattern(YMDHMS_FORMAT);
        String yms = localDate.toString();

        String substring = dateStr.substring(11);
        String result = yms + " " + substring;
        return convertToTimeStamp(LocalDateTime.parse(result, df));
    }

    /**
     * 获取去年时间
     */
    public static Timestamp getDateLastYearConvertToTimestamp(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        return Timestamp.from(timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().minusYears(1).atStartOfDay(ZoneOffset.systemDefault()).toInstant());
    }

    public static Timestamp getMonthFirstTime(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDateTime localDateTime = LocalDateTime.of(localDate.with(TemporalAdjusters.firstDayOfMonth()), LocalTime.MIN);
        return convertToTimeStamp(localDateTime);
    }

    public static Timestamp getMonthLastTime(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDateTime localDateTime = LocalDateTime.of(localDate.with(TemporalAdjusters.lastDayOfMonth()), LocalTime.MAX);
        return convertToTimeStamp(localDateTime);
    }

    /**
     * 获取传入年份的开始时间和结束时间
     *
     * @param now  当前时间
     * @param year 指定年份
     * @return 时间
     */
    public static List<Timestamp> getYearStartTimeAndEndTime(LocalDateTime now, Integer year) {
        LocalDateTime firstDateTime = now.plusYears(year - now.getYear()).with(TemporalAdjusters.firstDayOfYear()).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime lastDataTime = now.plusYears(year - now.getYear()).with(TemporalAdjusters.lastDayOfYear()).withHour(23).withMinute(59).withSecond(59).withNano(999999999);
        List<Timestamp> yearList = new ArrayList<>();
        yearList.add(convertToTimeStamp(firstDateTime));
        yearList.add(convertToTimeStamp(lastDataTime));
        return yearList;
    }

    public static Timestamp getDayStartTime(Timestamp date) {
        LocalDateTime of = LocalDateTime.of(date.toLocalDateTime().toLocalDate(), LocalTime.MIN);
        return convertToTimeStamp(of);
    }

    public static Timestamp getDayEndTime(Timestamp date) {
        LocalDateTime localDateTime = LocalDateTime.of(date.toLocalDateTime().toLocalDate(), LocalTime.MAX);
        return convertToTimeStamp(localDateTime);
    }

    /**
     * 比较时间是否大于当前时间
     *
     * @param date 时间
     * @return
     */
    public static boolean isGtCurrentTime(LocalDate date) {
        if (date.isAfter(LocalDate.now())) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 字符串格式 --给定日期格式--转换为Timestamp格式
     * <p>
     * 字符格式 yyyy-MM-dd
     *
     * @param targetTime 目标时间
     * @return Timestamp
     */
    public static Timestamp characterTimeConvertTimestamp(String targetTime) {
        SimpleDateFormat sf = new SimpleDateFormat(YMD_FORMAT);
        try {
            Date date = sf.parse(targetTime);
            return new Timestamp(date.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 判断日期格式是否是yyyy-MM-dd or yyyy-MM-dd HH:mm:ss
     *
     * @param targetTime 目标字符串日期
     * @param isYmd      是否是yyyy-MM-dd格式
     * @return 是否格式正确
     */
    public static Boolean checkDateFormat(String targetTime, Boolean isYmd) {
        if (!StringUtils.hasLength(targetTime)) {
            return false;
        }
        DateTimeFormatter dtf;
        boolean flag = true;
        if (isYmd) {
            dtf = DateTimeFormatter.ofPattern(YMD_FORMAT);
            try {
                LocalDate.parse(targetTime, dtf);
            } catch (Exception e) {
                flag = false;
            }
        } else {
            dtf = DateTimeFormatter.ofPattern(YMDHMS_FORMAT);
            try {
                LocalDateTime.parse(targetTime, dtf);
            } catch (Exception e) {
                flag = false;
            }
        }
        return flag;
    }

    /**
     * 获取指定年月的下的，该月开始时间
     *
     * @param year  年：2023
     * @param month 月：9
     * @return Timestamp
     */
    public static Timestamp getMonthFirstDayByYearMonth(Integer year, Integer month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate localDate = yearMonth.atDay(1);
        LocalDateTime startOfDay = localDate.atStartOfDay();
        ZonedDateTime zonedDateTime = startOfDay.atZone(ZoneId.of("Asia/Shanghai"));
        return new Timestamp(Date.from(zonedDateTime.toInstant()).getTime());
    }

    /**
     * 获取指定年月的下的，该月结束时间
     *
     * @param year  年：2023
     * @param month 月：9
     * @return Timestamp
     */
    public static Timestamp getMonthLastDayByYearMonth(Integer year, Integer month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate endOfMonth = yearMonth.atEndOfMonth();
        LocalDateTime localDateTime = endOfMonth.atTime(23, 59, 59, 999);
        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.of("Asia/Shanghai"));
        return new Timestamp(Date.from(zonedDateTime.toInstant()).getTime());
    }

    /**
     * 获取迟到次数
     *
     * @param startStr  配置的迟到字符串
     * @param startTime 当前打卡时间
     * @return 次数
     */
    public static int lateAbnormalTimeCount(String startStr, Timestamp startTime) {
        int count = 0;
        if (startTime == null) {
            return count;
        }

        LocalDateTime nowLocalDateTime = startTime.toLocalDateTime();
        SimpleDateFormat sf = new SimpleDateFormat(YMDHMS_FORMAT);
        try {
            Date startDate = sf.parse(startStr);
            LocalDateTime startLocalDateTime = convertToLocalDateTime(startDate);
            LocalTime startLocalTime = startLocalDateTime.toLocalTime();
            LocalTime nowLocalTime = nowLocalDateTime.toLocalTime();
            //判断迟到
            if (nowLocalTime.isAfter(startLocalTime)) {
                count++;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return count;
    }

    /**
     * 获取早退次数
     *
     * @param endStr  配置的迟到字符串
     * @param endTime 当前打卡时间
     * @return 次数
     */
    public static int earlyDepartureAbnormalTimeCount(String endStr, Timestamp endTime) {
        int count = 0;
        if (endTime == null) {
            return count;
        }

        LocalDateTime nowLocalDateTime = endTime.toLocalDateTime();
        SimpleDateFormat sf = new SimpleDateFormat(YMDHMS_FORMAT);
        try {
            Date endDate = sf.parse(endStr);
            LocalDateTime endLocalDateTime = convertToLocalDateTime(endDate);
            LocalTime endLocalTime = endLocalDateTime.toLocalTime();
            LocalTime nowLocalTime = nowLocalDateTime.toLocalTime();
            //判断早退
            if (nowLocalTime.isBefore(endLocalTime)) {
                count++;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return count;
    }

    /**
     * 给定一个年获取今年的开始时间和结束时间
     *
     * @param year 年份
     * @return List<localDate>第一个是开始时间第二个是结束时间
     */
    public static List<LocalDate> getYearStartTimeAndEndTime(Integer year) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        Date currYearFirst = calendar.getTime();
        LocalDate startLocalDate = convertToLocalDate(currYearFirst);

        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.roll(Calendar.DAY_OF_YEAR, -1);
        LocalDate endLocalDate = convertToLocalDate(calendar.getTime());

        return Arrays.asList(startLocalDate, endLocalDate);
    }


    /**
     * 给定一个年份和季度获取开始时间和结束时间
     *
     * @param year    年份
     * @param quarter 季度
     * @return List<localDate>第一个是开始时间第二个是结束时间
     */
    public static List<LocalDate> getQuarterStartTimeAndEndTime(Integer year, Integer quarter) {
        //获取开始时间
        int startMonth = (quarter - 1) * 3;
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, startMonth);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        cal.set(Calendar.HOUR, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);

        LocalDate startQuarterDate = convertToLocalDate(cal.getTime());

        //获取结束时间
        int lastMonth = quarter * 3 - 1;
        cal.clear();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, lastMonth);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        cal.set(Calendar.HOUR, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);

        LocalDate endQuarterDate = convertToLocalDate(cal.getTime());

        return Arrays.asList(startQuarterDate, endQuarterDate);
    }

    /**
     * 给定一个年份和月度获取开始时间和结束时间
     *
     * @param year  年份
     * @param month 月度
     * @return List<localDate>第一个是开始时间第二个是结束时间
     */
    public static List<LocalDate> getMonthStartTimeAndEndTime(Integer year, Integer month) {
        // 获取当前分区的日历信息(这里可以使用参数指定时区)
        Calendar calendar = Calendar.getInstance();
        // 设置年
        calendar.set(Calendar.YEAR, year);
        // 设置月，月份从0开始
        calendar.set(Calendar.MONTH, month - 1);
        // 设置为指定月的第一天
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        // 获取指定月第一天的时间
        Date start = calendar.getTime();
        LocalDate startMonthDate = convertToLocalDate(start);
        // 设置日历天数为当前月实际天数的最大值，即指定月份的最后一天
        calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));
        // 获取最后一天的时间
        Date end = calendar.getTime();
        LocalDate endMonthDate = convertToLocalDate(end);

        return Arrays.asList(startMonthDate, endMonthDate);
    }

    /**
     * 给定一个年份和月度获取开始时间和结束时间
     *
     * @param year 年份
     * @param week 周
     * @return List<localDate>第一个是开始时间第二个是结束时间
     */
    public static List<LocalDate> getWeekStartTimeAndEndTime(Integer year, Integer week) {
        LocalDate startLocalDate = null;
        LocalDate endLocalDate = null;
        try {
            Calendar cal = getCalendarFormYear(year);
            cal.set(Calendar.WEEK_OF_YEAR, week);
            startLocalDate = convertStringToLocalDate(
                    cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" +
                            cal.get(Calendar.DAY_OF_MONTH), YMD_FORMAT);

            Calendar cal2 = getCalendarFormYear(year);
            cal2.set(Calendar.WEEK_OF_YEAR, week);
            cal2.add(Calendar.DAY_OF_WEEK, 6);
            endLocalDate = convertStringToLocalDate(cal2.get(Calendar.YEAR) + "-" + (cal2.get(Calendar.MONTH) + 1) + "-" + cal2.get(Calendar.DAY_OF_MONTH), YMD_FORMAT);
            cal2.set(Calendar.WEEK_OF_YEAR, week);
        } catch (ParseException e) {
            e.printStackTrace();
        }


        return Arrays.asList(startLocalDate, endLocalDate);
    }


    /**
     * 获取指定年份的最大周数
     *
     * @param year year
     * @return 最大周数
     */
    public static Integer getYearHaveWeek(Integer year) {
        LocalDate date = LocalDate.of(year, 12, 31);
        return Math.toIntExact(IsoFields.WEEK_OF_WEEK_BASED_YEAR.rangeRefinedBy(date).getMaximum());
    }

    /**
     * 获取这一年的日历
     */
    private static Calendar getCalendarFormYear(int year) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        cal.set(Calendar.YEAR, year);
        return cal;
    }


    public static int getDaysOfMonth(Integer month) {
        Calendar calendar = Calendar.getInstance();
        Date date = new Date();
        date.setMonth(month - 1);
        calendar.setTime(date);
        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }


    /**
     * 获取时间范围内的周时间数组
     *
     * @param timestampList 指定时间集合
     * @return 指定时间集合所有的周时间
     */
    public static List<Timestamp> getWeekAllTime(List<Timestamp> timestampList) {
        HashSet<Timestamp> set = new HashSet<>();
        for (Timestamp timestamp : timestampList) {
            Timestamp weekOne = getFirstDayOfWeek(timestamp);
            set.add(weekOne);
        }
        List<Timestamp> list = new ArrayList<>();
        for (Timestamp timestamp : set) {
            list.add(timestamp);
            for (int i = 0; i < 6; i++) {
                Calendar c = Calendar.getInstance();
                c.setTime(timestamp);
                //加一天
                c.add(Calendar.DATE, i + 1);
                list.add(new Timestamp(c.getTimeInMillis()));
            }
        }

        return list;
    }

    /**
     * 获取指定时间的周一
     *
     * @param timestamp 时间
     * @return 周一时间
     */
    public static Timestamp getFirstDayOfWeek(Timestamp timestamp) {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date(timestamp.getTime()));
        if (c.get(Calendar.DAY_OF_WEEK) == 1) {
            c.add(Calendar.DAY_OF_MONTH, -1);
        }
        c.add(Calendar.DATE, c.getFirstDayOfWeek() - c.get(Calendar.DAY_OF_WEEK) + 1);
        return new Timestamp(c.getTime().getTime());
    }


    /**
     * 获取时间范围内的月时间数组
     *
     * @param timestampList 指定时间集合
     * @return 指定时间集合所有的月时间
     */
    public static List<Timestamp> getMonthAllTime(List<Timestamp> timestampList) {
        HashSet<Timestamp> set = new HashSet<>();
        for (Timestamp timestamp : timestampList) {
            LocalDateTime localDateTime = timestamp.toLocalDateTime();
            Timestamp monthFirstDayByYearMonth = getMonthFirstDayByYearMonth(localDateTime.getYear(), localDateTime.getMonthValue());
            set.add(monthFirstDayByYearMonth);
        }
        List<Timestamp> list = new ArrayList<>();
        for (Timestamp timestamp : set) {
            list.add(timestamp);
            LocalDateTime localDateTime = timestamp.toLocalDateTime();

            for (int i = 0; i < getMonthDays(localDateTime.getYear(), localDateTime.getMonthValue()) - 1; i++) {
                Calendar c = Calendar.getInstance();
                c.setTime(timestamp);
                //加一天
                c.add(Calendar.DATE, i + 1);
                list.add(new Timestamp(c.getTimeInMillis()));
            }
        }
        return list;
    }

    /**
     * 获取指定年月下的天数
     *
     * @param year  年
     * @param month 月
     * @return 天数
     */
    public static int getMonthDays(int year, int month) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, (month - 1));
        cal.set(Calendar.DATE, 1);
        cal.roll(Calendar.DATE, -1);
        return cal.getActualMaximum(Calendar.DATE);
    }

    /**
     * 获取时间范围内的月时间数组
     *
     * @param timestampList 指定时间集合
     * @return 指定时间集合所有的月时间
     */
    public static List<Timestamp> getYearStartTimeAndEndTimeByTimeList(List<Timestamp> timestampList) {
        HashSet<Timestamp> set = new HashSet<>();
        for (Timestamp timestamp : timestampList) {
            LocalDate yearFirstDay = getYearFirstDay(timestamp);
            set.add(convertToTimeStamp(yearFirstDay));
        }
        List<Timestamp> list = new ArrayList<>();
        Timestamp now = new Timestamp(System.currentTimeMillis());
        for (Timestamp timestamp : set) {
            if (timestamp.after(now)) {
                continue;
            }
            list.add(timestamp);


            Calendar c = Calendar.getInstance();
            c.setTime(timestamp);
            c.add(Calendar.YEAR, 1);
            c.add(Calendar.DATE, -1);
            list.add(new Timestamp(c.getTime().getTime()));
        }
        return list;
    }

    public static String timeStampToStr(Timestamp employedDate, String format) {

        if (null == employedDate) {
            return null;
        }
        return new SimpleDateFormat(format).format(employedDate);
    }

    /**
     * 获取季度下的所有时间
     *
     * @param timestampList 时间集合
     * @return 时间集合
     */
    public static List<Timestamp> getQuarterAllTime(List<Timestamp> timestampList) {
        Map<String, List<Integer>> map = new HashMap<>();
        for (Timestamp timestamp : timestampList) {
            LocalDateTime localDateTime = timestamp.toLocalDateTime();
            List<Integer> quarterTime = new ArrayList<>();
            int quarter = getQuarterByLocalDateTime(localDateTime);
            int startMonth = (quarter - 1) * 3;
            quarterTime.add(startMonth);
            int lastMonth = quarter * 3 - 1;
            quarterTime.add(lastMonth);
            map.put(localDateTime.getYear() + "-" + quarter, quarterTime);
        }

        List<Timestamp> quarterTimestampList = new ArrayList<>();
        for (String yearQuarter : map.keySet()) {
            List<Integer> list = map.get(yearQuarter);
            //年季度  yyyy-quarter
            String[] yearQuarterArray = yearQuarter.split("-");
            int year = Integer.parseInt(yearQuarterArray[0]);
            // 根据月获取开始时间
            Calendar startCal = Calendar.getInstance();
            startCal.set(Calendar.YEAR, year);
            startCal.set(Calendar.MONTH, list.get(0));
            startCal.set(Calendar.DAY_OF_MONTH, 1);
            startCal.set(Calendar.HOUR, 0);
            startCal.set(Calendar.MINUTE, 0);
            startCal.set(Calendar.SECOND, 0);
            Date startTime = startCal.getTime();


            Calendar endCal = Calendar.getInstance();
            endCal.set(Calendar.YEAR, year);
            endCal.set(Calendar.MONTH, list.get(1));
            endCal.set(Calendar.DAY_OF_MONTH, endCal.getActualMaximum(Calendar.DAY_OF_MONTH));
            endCal.set(Calendar.HOUR, 0);
            endCal.set(Calendar.MINUTE, 0);
            endCal.set(Calendar.SECOND, 0);
            Date endTime = endCal.getTime();


            Timestamp timestamp = new Timestamp(startTime.getTime());
            quarterTimestampList.add(timestamp);
            int i = 0;
            while (true) {
                Calendar c = Calendar.getInstance();
                c.setTime(timestamp);
                //加一天
                c.add(Calendar.DATE, i + 1);
                quarterTimestampList.add(new Timestamp(c.getTimeInMillis()));
                i++;
                if (c.getTimeInMillis() == endTime.getTime()) {
                    break;
                }
            }
            quarterTimestampList.add(new Timestamp(endTime.getTime()));

        }

        return quarterTimestampList;
    }

    /**
     * 获取年下的所有时间
     *
     * @param timestampList 时间集合
     * @return 时间集合
     */
    public static List<Timestamp> getYearAllTime(List<Timestamp> timestampList) {
        List<Integer> yearList = new ArrayList<>();
        for (Timestamp timestamp : timestampList) {
            LocalDateTime localDateTime = timestamp.toLocalDateTime();
            yearList.add(localDateTime.getYear());
        }

        List<Timestamp> yearTimestampList = new ArrayList<>();
        for (Integer year : yearList) {
            // 根据月获取开始时间
            Calendar startCal = Calendar.getInstance();
            startCal.set(Calendar.YEAR, year);
            startCal.set(Calendar.MONTH, 1);
            startCal.set(Calendar.DAY_OF_MONTH, 1);
            startCal.set(Calendar.HOUR, 0);
            startCal.set(Calendar.MINUTE, 0);
            startCal.set(Calendar.SECOND, 0);
            Date startTime = startCal.getTime();

            Calendar endCal = Calendar.getInstance();
            endCal.set(Calendar.YEAR, year);
            endCal.set(Calendar.MONTH, 12);
            endCal.set(Calendar.DAY_OF_MONTH, endCal.getActualMaximum(Calendar.DAY_OF_MONTH));
            endCal.set(Calendar.HOUR, 0);
            endCal.set(Calendar.MINUTE, 0);
            endCal.set(Calendar.SECOND, 0);
            Date endTime = endCal.getTime();


            Timestamp timestamp = new Timestamp(startTime.getTime());
            yearTimestampList.add(timestamp);
            int i = 0;
            while (true) {
                Calendar c = Calendar.getInstance();
                c.setTime(timestamp);
                //加一天
                c.add(Calendar.DATE, i + 1);
                yearTimestampList.add(new Timestamp(c.getTimeInMillis()));
                i++;
                if (c.getTimeInMillis() == endTime.getTime()) {
                    break;
                }
            }
            yearTimestampList.add(new Timestamp(endTime.getTime()));
        }


        return yearTimestampList;
    }


    /**
     * 根据localDateTime获取季度值
     *
     * @param localDateTime 日期
     * @return 季度
     */
    public static Integer getQuarterByLocalDateTime(LocalDateTime localDateTime) {
        return (localDateTime.getMonthValue() - 1) / 3 + 1;
    }

    /**
     * 增加小时计算
     *
     * @return 时间
     */
    public static Timestamp timestampAddHours(Timestamp timestamp, Integer hours) {
        long newTime = timestamp.getTime() + (hours * 60 * 60 * 1000);
        return new Timestamp(newTime);
    }

    /**
     * 时间格式为yyyy-MM-dd或者yyyy/MM/dd
     *
     * @param timeStr timeStr
     * @return Timestamp
     */
    public static Timestamp stringToTimestamp(String timeStr) {
        try {
            Date parse = parse(timeStr, YMD_FORMAT);
            return new Timestamp(parse.getTime());
        } catch (ParseException e) {
            try {
                Date parse = parse(timeStr, "yyyy/MM/dd");
                return new Timestamp(parse.getTime());
            } catch (ParseException parseException) {
                parseException.printStackTrace();
            }
        }
        return null;
    }

    public static String dateToStr(Date date, String format) {
        final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        return simpleDateFormat.format(date);
    }

    public static String timestampToString(Timestamp timestamp) {
        if (timestamp == null) {
            return "";
        }
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = timestamp.toLocalDateTime();
        return localDateTime.format(dateTimeFormatter);
    }
}