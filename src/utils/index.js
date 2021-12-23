import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 进入页面只请求一次的hook
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖hook，对input的传入参数进行debounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次value变化后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行，消除上一个
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
