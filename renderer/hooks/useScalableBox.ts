import { MutableRefObject, useEffect, useState } from "react";

let _isDraping = false;
let direction: "right" | "left" | "top" | "bottom" = "right";
const f = 50;
export function useScalableBox(
  ref: MutableRefObject<HTMLElement>,
  options = {
    minWidth: 300,
    minHeight: 300,
  }
) {
  const [isDraping, setIsDraping] = useState<boolean>(_isDraping);

  function initMouseEvent() {
    if (ref?.current) {
      document.documentElement.onmousedown = ({ target, offsetX, offsetY }) => {
        if (target === ref.current) {
          const that = ref.current;
          if (that.clientWidth - offsetX <= f) {
            _isDraping = true;
            setIsDraping(true);
          } else if (that.clientHeight - offsetY <= f) {
            _isDraping = true;
            setIsDraping(true);
          } else if (that.clientHeight - offsetY >= that.clientHeight - f) {
            _isDraping = true;
            setIsDraping(true);
          } else if (that.clientWidth - offsetX >= that.clientWidth - f) {
            _isDraping = true;
            setIsDraping(true);
          }
        }
      };
      document.documentElement.onmousemove = ({
        offsetX,
        offsetY,
        target,
        clientX,
        clientY,
      }: MouseEvent) => {
        const that: HTMLDivElement = ref.current as any;

        if (target === that) {
          if (that.clientWidth - offsetX <= f) {
            that.style.cursor = "e-resize";
            direction = "right";
          } else if (that.clientHeight - offsetY <= f) {
            that.style.cursor = "n-resize";
            direction = "bottom";
          } else if (that.clientHeight - offsetY >= that.clientHeight - f) {
            that.style.cursor = "n-resize";
            direction = "top";
          } else if (that.clientWidth - offsetX >= that.clientWidth - f) {
            that.style.cursor = "e-resize";
            direction = "left";
          } else {
            that.style.cursor = "";
          }
        }

        requestAnimationFrame(() => {
          if (!_isDraping) return;
          switch (direction) {
            case "right":
              that.style.width = Math.max(options.minWidth, clientX) + "px";
              break;
            case "top":
              that.style.height = Math.max(options.minHeight, clientY) + "px";
              break;
            case "bottom":
              that.style.height = Math.max(options.minHeight, clientY) + "px";
              break;
            case "left":
              that.style.width = Math.max(options.minWidth, clientX) + "px";
              break;
            default:
              break;
          }
        });
      };
      document.documentElement.onmouseup = () => {
        _isDraping = false;
        setIsDraping(false);
      };
    } else {
      setTimeout(initMouseEvent, f);
    }
  }
  useEffect(initMouseEvent, []);

  return { isDraping, setIsDraping };
}
