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
        <Chevron $open={open} />
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
  background: #fff;
  border: 1px solid #11B55F;
  border-radius: 5px;
  cursor: pointer;
  transition: background .25s ease, color .25s ease, border-color .25s ease;

  &:hover { background: #F6FFF9; }
  &:disabled { opacity: .6; cursor: not-allowed; }
  position: relative;
`;

const Label = styled.span`
  color: ${({ $placeholder }) => ($placeholder ? "#9CA3AF" : "#009F25")};
`;

const Chevron = styled(DownIcon)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(${p => (p.$open ? 180 : 0)}deg);
  transition: transform .2s ease;
  color: #000; /* fill="currentColor"인 경우 색상 적용됨 */
`;

const Menu = styled.ul`
  position: absolute;
  left: 0; right: 0;
  margin: 6px 0 0;
  padding: 8px 0;
  list-style: none;
  background: #fff;
  border: 1px solid #11B55F;
  border-radius: 8px;
  box-shadow: 0 10px 24px rgba(0,0,0,.08);
  max-height: 240px;
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