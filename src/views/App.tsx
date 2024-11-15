import { useRef, useState } from 'react';
import './App.css';
import MiniCalendar from './MiniCalendar';
import dayjs, { Dayjs } from 'dayjs';
import Modal from '@/components/Modal';

const FORMAT = 'YYYY-MM-DD';
function App() {
  const [checked, setChecked] = useState<boolean>(true);
  const [markedDays, setMarkedDays] = useState<Dayjs[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [markedInfos, setMarkedInfos] = useState<Record<string, string>>({});

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tempMarkedDay = useRef<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleClick = (date: Dayjs) => {
    if (checked) {
      tempMarkedDay.current = date.format(FORMAT);
      setOpen(true);
    }
  };

  const handleCancel = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    tempMarkedDay.current = undefined;
    setOpen(false);
  };

  const handleOk = () => {
    if (textareaRef.current) {
      const markedInfo = {
        [tempMarkedDay.current!]: textareaRef.current!.value,
      };
      const newMarkedDays = [...markedDays, dayjs(tempMarkedDay.current!)];
      setMarkedDays(newMarkedDays);
      setMarkedInfos((prev) => {
        return {
          ...prev,
          ...markedInfo,
        };
      });
    }
    handleCancel();
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="pl-2 text-sm">开启Modal标记事件</span>
      </label>
      <div className="flex items-center justify-center text-sm mt-2">
        <div className="flex items-center justify-center mr-2">
          <span className="inline-block w-4 h-4 rounded-[50%] bg-[#1677ff] mr-1"></span>
          <span>选中</span>
        </div>
        <div className="flex items-center justify-center mr-2">
          <span className="inline-block w-4 h-4 rounded-[50%] bg-[#ff4d4f] mr-1"></span>
          <span>标记</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="inline-block w-4 h-4 rounded-[50%] border border-[#1677ff] solid mr-1"></span>
          <span>今天</span>
        </div>
      </div>
      <div className="mt-3">
        <MiniCalendar
          markedDays={markedDays}
          markedInfos={markedInfos}
          onClick={handleClick}
        />
      </div>

      {open && (
        <Modal open={open} title="备注" onOk={handleOk} onCancel={handleCancel}>
          <textarea
            ref={textareaRef}
            rows={3}
            style={{ width: '100%' }}
            placeholder="请输入"
          ></textarea>
        </Modal>
      )}
    </div>
  );
}

export default App;
