import { MutableRefObject, useEffect, useState } from "react";

let _isDraping = false;
let direction: "right" | "left" | "top" | "bottom" = "right";
const f = 70;
let targetWidth: number = null;
let targetHeight: number = null;

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
      const c = ref.current;
      c.style.transition = "all 0.15s";
      c.style.position = "relative";
      targetWidth = c.clientWidth;
      targetHeight = c.clientHeight;

      document.documentElement.onmousedown = ({ target, offsetX, offsetY }) => {
        const ele = ref.current;
        if (ele === target) {
          if (ele.clientWidth - offsetX <= f) {
            _isDraping = true;
            direction = "right";
          } else if (ele.clientHeight - offsetY <= f) {
            _isDraping = true;
            direction = "bottom";
          } else if (ele.clientHeight - offsetY >= ele.clientHeight - f) {
            _isDraping = true;
            direction = "top";
          } else if (ele.clientWidth - offsetX >= ele.clientWidth - f) {
            _isDraping = true;
            direction = "left";
          }
          setIsDraping(true);
        }
      };
      document.documentElement.onmousemove = (ev: MouseEvent) => {
        const { offsetX, offsetY, target, clientX, clientY } = ev;
        const ele: HTMLDivElement = ref.current as any;

        const style = ele?.style;

        requestAnimationFrame(() => {
          if (ele === target) {
            if (ele.clientWidth - offsetX <= f) {
              style.cursor = "e-resize";
            } else if (ele.clientHeight - offsetY <= f) {
              style.cursor = "n-resize";
            } else if (ele.clientHeight - offsetY >= ele.clientHeight - f) {
              style.cursor = "n-resize";
            } else if (ele.clientWidth - offsetX >= ele.clientWidth - f) {
              style.cursor = "e-resize";
            } else {
              style.cursor = "";
            }
          }
        });

        requestAnimationFrame(() => {
          if (!_isDraping) return;

          const offsetLeft = clientX - ele.offsetLeft;
          const offsetTop = clientY - ele.offsetTop;

          switch (direction) {
            case "right":
              const width = Math.max(
                options.minWidth,
                clientX - ele.offsetLeft
              );
              targetWidth = width;
              style.width = width + "px";
              break;
            case "top":
              style.top = offsetTop >= 0 ? "0" : offsetTop + "px";
              style.height =
                Math.max(
                  targetHeight,
                  offsetTop >= 0
                    ? targetHeight - offsetTop
                    : targetHeight + Math.abs(offsetTop)
                ) + "px";
              break;
            case "bottom":
              const height = Math.max(
                options.minHeight,
                clientY - ele.offsetTop
              );
              targetHeight = height;
              style.height = height + "px";
              break;
            case "left":
              style.left = offsetLeft >= 0 ? "0" : offsetLeft + "px";
              style.width =
                Math.max(
                  targetWidth,
                  offsetLeft >= 0
                    ? targetWidth - offsetLeft
                    : targetWidth + Math.abs(offsetLeft)
                ) + "px";
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
