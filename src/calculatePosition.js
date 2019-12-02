function calculateIntersection (box, viewport) {
  if (box.x + box.width < viewport.x) {
    return 0;
  }
  if (box.x > viewport.x + viewport.width) {
    return 0;
  }
  if (box.y + box.height < viewport.y) {
    return 0;
  }
  if (box.y > viewport.y + viewport.height) {
    return 0;
  }

  const left = Math.max(box.x, viewport.x);
  const right = Math.min(box.x + box.width, viewport.x + viewport.width);
  const top = Math.max(box.y, viewport.y);
  const bottom = Math.min(box.y + box.height, viewport.y + viewport.height);

  return ((bottom - top) * (right - left)) / (box.width * box.height);
}

function checkPosition (position, offset, targetBox, tooltipBox, viewport) {
  const box = {
    width: tooltipBox.width,
    height: tooltipBox.height
  };

  if (position === 'top') {
    box.x = targetBox.x + targetBox.width / 2 - tooltipBox.width / 2;
    box.y = targetBox.y - tooltipBox.height;
  } else if (position === 'bottom') {
    box.x = targetBox.x + targetBox.width / 2 - tooltipBox.width / 2;
    box.y = targetBox.y + targetBox.height;
  } else if (position === 'left') {
    box.x = targetBox.x - tooltipBox.width;
    box.y = targetBox.y + targetBox.height / 2 - tooltipBox.height / 2;
  } else if (position === 'right') {
    box.x = targetBox.x + targetBox.width;
    box.y = targetBox.y + targetBox.height / 2 - tooltipBox.height / 2;
  } else if (position === 'top-left') {
    box.x = targetBox.x - tooltipBox.width;
    box.y = targetBox.y - tooltipBox.height;
  } else if (position === 'top-right') {
    box.x = targetBox.x + targetBox.width;
    box.y = targetBox.y - tooltipBox.width;
  } else if (position === 'bottom-left') {
    box.x = targetBox.x - tooltipBox.width;
    box.y = targetBox.y + targetBox.height;
  } else if (position === 'bottom-right') {
    box.x = targetBox.x + targetBox.width;
    box.y = targetBox.y + targetBox.height;
  }

  return {
    box,
    intersection: calculateIntersection(box, viewport)
  };
}

export default function calculatePosition (preferredPosition, currentPosition, currentOffset, targetBox, tooltipBox, viewport) {
  const preferred = checkPosition(preferredPosition, 0, targetBox, tooltipBox, viewport);
  if (preferred.intersection > 0.99) {
    return preferred;
  }
  const positions = [ 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right' ];
  for (const pos of positions) {
    const current = checkPosition(pos, 0, targetBox, tooltipBox, viewport);
    if (current.intersection > 0.99) {
      return current;
    }
  }
  return preferred;
}
