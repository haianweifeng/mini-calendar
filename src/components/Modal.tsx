import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledDiv = styled.div`
  background: white;
  /* width: 520px; */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const StyledHeader = styled.div`
  /* padding: 16px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
`;
const StyledTitle = styled.div`
  color: var(--color-text);
  font-weight: 600;
`;

const StyledClose = styled.button`
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  background: transparent;
`;

const StyledContent = styled.div`
  color: var(--color-text);
  /* padding: 16px; */
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  /* padding: 16px; */
  border-top: 1px solid var(--color-border);
`;

const StyledButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  color: var(--color-text);
  background-color: #fff;

  &.primary {
    background-color: var(--color-primary);
    color: white;
  }
`;
interface ModalProps {
  title: React.ReactNode;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  maskClosable?: boolean;
}

const Modal = (props: ModalProps) => {
  const {
    open,
    title,
    onCancel,
    onOk,
    children,
    className = '',
    style = {},
    maskClosable = true,
  } = props;
  if (!open) return null;

  const handleOverlayClick = () => {
    maskClosable && onCancel();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledDiv
        className={`xl:w-[520px] lg:w-[480px] md:w-[380px] sm:w-[300px] w-[260px] ${className}`}
        style={style}
        onClick={handleModalClick}
      >
        <StyledHeader className="xl:p-4 lg:p-3 md:p-2 p-1">
          <StyledTitle>{title}</StyledTitle>
          <StyledClose onClick={onCancel}>&times;</StyledClose>
        </StyledHeader>
        <StyledContent className="xl:p-4 lg:p-3 md:p-2 p-1">
          {children}
        </StyledContent>
        <StyledFooter className="xl:p-4 lg:p-3 md:p-2 p-1">
          <StyledButton onClick={onCancel}>取消</StyledButton>
          <StyledButton className="primary" onClick={onOk}>
            确认
          </StyledButton>
        </StyledFooter>
      </StyledDiv>
    </StyledOverlay>,
    document.body,
  );
};
export default Modal;
