import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as DownIcon } from "../../assets/icons/downIcon.svg";

export default function CustomSelect({
  options = [],           // [{value, label}]
  value = "",
  onChange,
  placeholder = "선택하세요",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const current = options.find(o => String(o.value) === String(value));

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <Wrap ref={wrapRef}>
      <Trigger
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <Label $placeholder={!current}>{current?.label || placeholder}</Label>
        <Arrow $open={open} />
      </Trigger>

      {open && !disabled && (
        <Menu role="listbox">
          {options.map((opt) => (
            <Item
              key={opt.value}
              role="option"
              aria-selected={String(opt.value) === String(value)}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </Item>
          ))}
        </Menu>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button`
  width: 100%;
  height: 47px;
  padding: 0 44px 0 16px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #009F25;
  background: #FFFFFF;
  border: 1px solid #11B55F;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease;

  &:hover {
    background: #11B55F;
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }

  position: relative;
`;

const Label = styled.span`
  color: #009F25;
  transition: color 0.4s ease;

  ${Trigger}:hover & {
    color: #FFFFFF;
  }
`;

const Arrow = styled(DownIcon)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(${p => (p.$open ? 180 : 0)}deg);
  transition: transform .2s ease;
  color: #000; /* fill="currentColor"인 경우 색상 적용됨 */

  ${Trigger}:hover & {
    color: #ffffff;
  }
`;

const Menu = styled.ul`
  position: absolute;
  left: 0; right: 0;
  margin: 8px 0 0;
  padding: 20px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  list-style: none;
  background: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  max-height: 470px;
  overflow: auto;
  z-index: 10;
`;

const Item = styled.li`
  padding: 10px 14px;
  font-size: 16px;
  cursor: pointer;
  color: #111;

  &[aria-selected="true"] {
    font-weight: 700;
    color: #009F25;
    background: #EAFBF2;
  }

  &:hover { background: #F1FBF7; }
`;