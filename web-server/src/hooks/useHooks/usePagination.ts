/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, DependencyList } from 'react';
import { debounce } from 'lodash';
import { useLatest } from 'react-use';
import { nextTick } from '@/utils';
import { message } from 'antd';

export interface IPaginationResult<T = any> {
  // dataSource,
  tableProps: {
    loading?: boolean;
    dataSource: T[];
  };
  paginationProps: {
    current: number;
    // defaultPageSize: pageSize,
    pageSize: number;
    total: number;
    onChange: (current: number) => Promise<void>;
    onPageSizeChange: (size: number, current: number) => Promise<void>;
  };
  isFirstComplete: boolean;
  refresh: (resetPage?: boolean) => Promise<void>;
  debounceRefresh: (resetPage?: boolean) => void;
  /* 快速逃避方案 */
  setDataSource: React.Dispatch<React.SetStateAction<T[]>>;
  customRow: any;
}

interface IServerParams {
  offset: number;
  limit: number;
  current: number;
}

// tslint:disable-next-line: whitespace
const usePagination = <T,>(
  server: (params: IServerParams) => { dataSource: Array<T>; total: number } | Promise<{ dataSource: Array<T>; total: number }>,
  deps?: DependencyList, //依赖条件
  option?: {
    isReady?: boolean;
    dataSource?: Array<T>;
    current?: number;
    pageSize?: number;
    key?: string;
  },
) => {
  const {
    isReady = true,
    dataSource: propDataSource = [],
    current: propCurrent = 1,
    pageSize: propPageSize = 10,
    key = 'id'
  } = option || {};
  let dragItem: T
  let dropItem: T
  //是否完成了一次请求
  const [isFirstComplete, setIsFirstComplete] = useState(false);
  //分页
  const [current, setCurrent] = useState(propCurrent);
  const [pageSize, setPageSize] = useState(propPageSize);
  const [total, setTotal] = useState(0);

  //表格
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState(propDataSource);

  //计数器
  const seq = useRef(0);
  const doSearch = async () => {
    if (!isReady) {
      return;
    }
    let _current = current;
    const _pageSize = pageSize;
    setIsLoading(true);

    seq.current++;
    const _seq = seq.current;
    try {
      //发送请求
      // tslint:disable-next-line: no-shadowed-variable
      let { dataSource, total } = await server({ limit: _pageSize, offset: Math.round((_current - 1) * _pageSize), current: _current });
      if (_seq !== seq.current) return;
      if (pageSize * (_current - 1) >= total && _current !== 1) {
        const totalPage = Math.ceil(total / pageSize);
        ({ dataSource, total } = await server({ limit: _pageSize, offset: Math.round((totalPage - 1) * _pageSize), current: _current }));
        if (_seq !== seq.current) return;
        _current = totalPage;
        message.warning('数据源发生变化，该页没有数据，自动为您跳转到最后一页');
      }
      setDataSource(dataSource);
      setCurrent(_current);
      setPageSize(_pageSize);
      setTotal(total);
    } catch (error) {
      console.error('fetch err', error);
      if (_seq !== seq.current) return;
    }
    setIsFirstComplete(true);
    setIsLoading(false);
  };
  const latestDoSearch = useLatest(doSearch);

  /* 暴露方法 */
  /* 暴露方法 */
  const refresh = async (resetPage?: boolean) => {
    if (resetPage) {
      setCurrent(propCurrent);
      setPageSize(propPageSize);
    }
    await latestDoSearch.current();
  };

  /* 重置逻辑 */
  const _deps = [...(deps || []), isReady];

  useEffect(() => {
    if (!isReady) return;
    refresh(true);
  }, _deps);

  const debounceRefresh = debounce(
    (resetPage?: boolean) => {
      //todo: resetPage应该直接重置非reset的缓存
      refresh(resetPage);
    },
    100,
    {
      maxWait: 400,
    },
  )

  return {
    // dataSource,
    tableProps: {
      loading: isLoading,
      dataSource,
    },
    paginationProps: {
      current,
      // defaultPageSize: pageSize,
      pageSize,
      total,
      // tslint:disable-next-line: no-shadowed-variable
      onChange: async (current: number) => {
        setCurrent(current);
        //todo: fix
        // await refresh();
        await nextTick(async () => {
          await refresh();
        });
      },
      onPageSizeChange: async (size: number) => {
        setPageSize(size);
        await refresh();
      },
      showTotal: (t) => `共 ${t} 条`,
      showQuickJumper: true,
    },
    isFirstComplete,
    refresh: refresh,
    debounceRefresh,
    /* 快速逃避方案 */
    setDataSource,
    // 拖拽换行
    customRow: (record: T) => ({
      draggable: true,
      // ondrag(e: DragEvent) {
      ondrag() {
        dragItem = record
      },
      ondrop() {
        dropItem = record
      },
      ondragend() {
        if (dragItem[key] !== dropItem[key]) {
          const keys = dataSource.map((v) => v[key])
          const dragItemIndex = keys.indexOf(dragItem[key]);
          const dropItemIndex = keys.indexOf(dropItem[key]);
          // 解构交换
          if (dragItemIndex !== -1 && dropItemIndex !== -1) {
            // eslint-disable-next-line no-param-reassign
            [dataSource[dragItemIndex], dataSource[dropItemIndex]] = [dataSource[dropItemIndex], dataSource[dragItemIndex]]
          }
        }
      },
      ondragover() {
        return false
      }
    }),
  } as IPaginationResult<T>;
};

export default usePagination;
