import styled from 'styled-components';
import { useEffect, useMemo, useRef } from 'react';

interface SelectProps {
  options: { label: string; value: string | number }[];
  value: string | number | undefined;
  className?: string;
  onChange: (value: string | number) => void;
}
const StyledDiv = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.88);
  height: 32px;
  width: 100px;
  font-size: 14px;
  &:after {
    display: inline-block;
    content: '>';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    pointer-events: none;
    font-size: 12px;
  }
`;

const SelectedDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

const StyledUl = styled.ul`
  display: block;
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin-top: 2px;
  z-index: 1;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition:
    opacity 0.15s ease,
    max-height 0.15s ease;

  &.show {
    opacity: 1;
    max-height: 300px;
    overflow: auto;
  }
`;

const StyledLi = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &.active {
    font-weight: bold;
    background-color: #e6f4ff !important;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const Select = (props: SelectProps) => {
  const { value, options, className = '', onChange } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleClick = () => {
    if (ulRef.current) {
      const isVisible = ulRef.current?.classList.contains('show');
      if (isVisible) {
        ulRef.current?.classList.remove('show');
      } else {
        ulRef.current?.classList.add('show');
      }
    }
  };

  const handleItemClick = (val: number | string) => {
    if (ulRef.current) {
      ulRef.current?.classList.remove('show');
    }
    onChange(val);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        containerRef.current?.contains(target) ||
        ulRef.current?.contains(target)
      ) {
        return;
      }
      if (ulRef.current) {
        ulRef.current.classList.remove('show');
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const formatSelectedValue = useMemo(() => {
    const item = options.find((item) => item.value === value);
    return item?.label ?? '请选择';
  }, [value, options]);

  return (
    <StyledDiv className={className} ref={containerRef}>
      <SelectedDiv onClick={handleClick}>{formatSelectedValue}</SelectedDiv>
      <StyledUl ref={ulRef}>
        {options.map((item) => {
          return (
            <StyledLi
              key={item.value}
              className={`${item.value === value ? 'active' : ''}`}
              onClick={() => handleItemClick(item.value)}
            >
              {item.label}
            </StyledLi>
          );
        })}
      </StyledUl>
    </StyledDiv>
  );
};
export default Select;
