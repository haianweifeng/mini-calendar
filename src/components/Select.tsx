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
  color: var(--color-text);
  /* height: 32px; */
  /* width: 100px; */
  &:after {
    display: inline-block;
    content: '>';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    pointer-events: none;
    color: #9195a3;
    /* font-size: 12px; */
  }
`;

const SelectedDiv = styled.div`
  width: 100%;
  height: 100%;
  /* padding: 0 12px; */
  background-color: #fff;
  cursor: pointer;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

const StyledUl = styled.ul`
  display: block;
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--color-border);
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
  /* padding: 5px 10px; */
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const selectedItemRef = useRef<HTMLLIElement | null>(null);

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

  useEffect(() => {
    if (ulRef.current && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [value]);

  const formatSelectedValue = useMemo(() => {
    const item = options.find((item) => item.value === value);
    return item?.label ?? '请选择';
  }, [value, options]);

  return (
    <StyledDiv
      className={`xl:text-xl lg:text-lg md:text-base text-sm ${className}`}
      ref={containerRef}
    >
      <SelectedDiv
        className="xl:py-2 xl:pl-4 xl:pr-10 lg:py-[6px] lg:pl-4 lg:pr-8 md:py-1 md:pl-3 md:pr-6 py-1 pl-2 pr-6"
        onClick={handleClick}
      >
        {formatSelectedValue}
      </SelectedDiv>
      <StyledUl ref={ulRef}>
        {options.map((item) => {
          return (
            <StyledLi
              key={item.value}
              ref={item.value === value ? selectedItemRef : null}
              className={`xl:py-2 xl:px-4 lg:py-[6px] lg:px-3 md:py-1 md:px-2 py-1 px-2 ${item.value === value ? 'active' : ''}`}
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
