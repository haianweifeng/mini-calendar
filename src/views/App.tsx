import { useRef, useState } from 'react';
import './App.css';
import MiniCalendar from './MiniCalendar';
import dayjs, { Dayjs } from 'dayjs';
import Modal from '@/components/Modal';

function App() {
  const [checked, setChecked] = useState<boolean>(true);
  const [markedDays, setMarkedDays] = useState<Dayjs[]>([dayjs('2024-11-12')]);
  const [open, setOpen] = useState<boolean>(false);
  const [markedInfos, setMarkedInfos] = useState<Record<string, string>>({});

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tempMarkedDay = useRef<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleClick = (date: Dayjs) => {
    if (checked) {
      tempMarkedDay.current = date.format('YYYY-MM-DD');
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
      setMarkedDays((prev) => {
        return [...prev, dayjs(tempMarkedDay.current!)];
      });
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
        <span className="pl-2">开启Modal标记事件</span>
      </label>
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
