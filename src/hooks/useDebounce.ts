import { useState, useEffect } from 'react';

/**
 * 防抖 Hook
 * 延迟更新值，直到指定时间没有新的变化
 *
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置定时器
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函数
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 节流 Hook
 * 在指定时间内只更新一次值
 *
 * @param value 需要节流的值
 * @param limit 时间限制（毫秒）
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const [lastRan, setLastRan] = useState<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan >= limit) {
        setThrottledValue(value);
        setLastRan(Date.now());
      }
    }, limit - (Date.now() - lastRan));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit, lastRan]);

  return throttledValue;
}
