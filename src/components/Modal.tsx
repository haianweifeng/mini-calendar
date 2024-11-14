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
  width: 520px;
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
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
`;
const StyledTitle = styled.div`
  color: rgba(0, 0, 0, 0.88);
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
  color: rgba(0, 0, 0, 0.88);
  padding: 16px;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.88);
  background-color: #fff;

  &.primary {
    background-color: #1677ff;
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
      <StyledDiv className={className} style={style} onClick={handleModalClick}>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          <StyledClose onClick={onCancel}>&times;</StyledClose>
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <StyledFooter>
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
